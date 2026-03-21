"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { io, Socket } from "socket.io-client"

type StreamState = "idle" | "connecting" | "streaming" | "error"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export function useWebRTCStream(deviceId: string) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const [streamState, setStreamState] = useState<StreamState>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const cleanup = useCallback(() => {
    if (pcRef.current) {
      pcRef.current.close()
      pcRef.current = null
    }
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [])

  const startStream = useCallback(async () => {
    cleanup()
    setStreamState("connecting")
    setErrorMessage("")

    const socket = io(API_URL, {
      transports: ["websocket", "polling"],
    })
    socketRef.current = socket

    const pc = new RTCPeerConnection({
      iceServers: [
        // STUN — discovers public IP (works on same/similar networks)
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        // TURN — relays video when direct P2P fails (different networks, 4G, firewalls)
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443?transport=tcp",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ],
      iceCandidatePoolSize: 10,
    })
    pcRef.current = pc

    // When video track arrives from the Edge Gateway, show it
    pc.ontrack = (event) => {
      if (videoRef.current && event.streams[0]) {
        videoRef.current.srcObject = event.streams[0]
        setStreamState("streaming")
      }
    }

    // Send ICE candidates to device via backend signaling
    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("webrtc:ice-candidate", {
          candidate: event.candidate,
          deviceId,
          to: null,
        })
      }
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
        setStreamState("error")
        setErrorMessage("Connection lost. Try again.")
      }
    }

    socket.on("connect", async () => {
      // Join the camera room for this device
      socket.emit("webrtc:join", { deviceId })

      // Create and send SDP offer to device
      const offer = await pc.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: false,
      })
      await pc.setLocalDescription(offer)

      socket.emit("webrtc:offer", {
        deviceId,
        sdp: pc.localDescription,
      })
    })

    // Receive SDP answer from device
    socket.on("webrtc:answer", async ({ sdp }) => {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp))
      } catch {
        setStreamState("error")
        setErrorMessage("Failed to set remote description.")
      }
    })

    // Receive ICE candidates from device
    socket.on("webrtc:ice-candidate", async ({ candidate }) => {
      try {
        if (candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
      } catch {
        // Non-fatal: ignore stale ICE candidates
      }
    })

    socket.on("connect_error", () => {
      setStreamState("error")
      setErrorMessage("Cannot connect to backend server.")
    })

    // Timeout: if no stream after 30s, show error
    setTimeout(() => {
      if (streamState === "connecting") {
        setStreamState("error")
        setErrorMessage("No camera device found. Make sure test-camera.py is running.")
      }
    }, 30000)
  }, [deviceId, cleanup, streamState])

  const stopStream = useCallback(() => {
    cleanup()
    setStreamState("idle")
    setErrorMessage("")
  }, [cleanup])

  useEffect(() => {
    return () => cleanup()
  }, [cleanup])

  return { videoRef, streamState, errorMessage, startStream, stopStream }
}
