"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"
import { useWebRTCStream } from "@/hooks/use-webrtc-stream"

interface CameraConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function CameraConfig({ configData, deviceStatus, onConfigChange }: CameraConfigProps) {
  const { videoRef, streamState, errorMessage, startStream, stopStream } = useWebRTCStream("truck_1")

  return (
    <div className="space-y-8">
      {/* Live Camera View — full width at top */}
      <ConfigSection title="Live Camera View">
        <div className="space-y-3">
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {streamState !== "streaming" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                {streamState === "idle" && (
                  <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                )}
                {streamState === "connecting" && (
                  <svg className="w-10 h-10 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                )}
                {streamState === "error" && (
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                )}
                <p className="text-sm text-gray-300">
                  {streamState === "idle" && "Camera stream not started"}
                  {streamState === "connecting" && "Connecting to camera..."}
                  {streamState === "error" && (errorMessage || "Stream error")}
                </p>
              </div>
            )}
            {streamState === "streaming" && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 rounded-full px-2.5 py-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-white font-medium">LIVE</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {streamState === "idle" || streamState === "error" ? (
              <button
                onClick={startStream}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start Live View
              </button>
            ) : streamState === "connecting" ? (
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/50 text-white text-sm font-medium rounded-lg cursor-not-allowed"
              >
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Connecting...
              </button>
            ) : (
              <button
                onClick={stopStream}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z" />
                </svg>
                Stop Stream
              </button>
            )}
            <span className="text-xs text-muted-foreground">
              {streamState === "streaming"
                ? "Live stream active — truck_1"
                : streamState === "connecting"
                ? "Waiting for camera device..."
                : "Click to connect to vehicle camera"}
            </span>
          </div>
        </div>
      </ConfigSection>

      {/* Config + Status row below */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-8">
            <ConfigSection title="Camera Settings">
              <div className="space-y-4">
                <FormField
                  label="Port"
                  type="select"
                  value={configData.camera.port}
                  onChange={(v) => onConfigChange("camera", "port", v)}
                  options={["MIPI CSI", "USB", "IP"]}
                />
                <FormField
                  label="Resolution"
                  type="select"
                  value={configData.camera.resolution}
                  onChange={(v) => onConfigChange("camera", "resolution", v)}
                  options={["720p", "1080p", "4K"]}
                />
                <FormField
                  label="Frame Rate"
                  type="select"
                  value={configData.camera.frameRate}
                  onChange={(v) => onConfigChange("camera", "frameRate", v)}
                  options={["15fps", "30fps", "60fps"]}
                />
                <FormField
                  label="Encoding"
                  type="select"
                  value={configData.camera.encoding}
                  onChange={(v) => onConfigChange("camera", "encoding", v)}
                  options={["H.264", "H.265", "MJPEG"]}
                />
                <FormField
                  label="Bitrate"
                  type="select"
                  value={configData.camera.bitrate}
                  onChange={(v) => onConfigChange("camera", "bitrate", v)}
                  options={["2Mbps", "4Mbps", "8Mbps"]}
                />
              </div>
            </ConfigSection>
            <ConfigSection title="Recording Settings">
              <div className="space-y-4">
                <FormField
                  label="Recording Mode"
                  type="select"
                  value={configData.camera.recordingMode}
                  onChange={(v) => onConfigChange("camera", "recordingMode", v)}
                  options={["Continuous", "Event", "Scheduled"]}
                />
                <FormField
                  label="Pre-Event Buffer"
                  type="select"
                  value={configData.camera.preEventBuffer}
                  onChange={(v) => onConfigChange("camera", "preEventBuffer", v)}
                  options={["10s", "30s", "60s"]}
                />
                <FormField
                  label="Post-Event Buffer"
                  type="select"
                  value={configData.camera.postEventBuffer}
                  onChange={(v) => onConfigChange("camera", "postEventBuffer", v)}
                  options={["10s", "30s", "60s"]}
                />
                <FormField
                  label="Event Triggers"
                  type="text"
                  value={configData.camera.eventTriggers}
                  onChange={(v) => onConfigChange("camera", "eventTriggers", v)}
                />
                <FormField
                  label="Storage Path"
                  type="select"
                  value={configData.camera.storagePath}
                  onChange={(v) => onConfigChange("camera", "storagePath", v)}
                  options={["SD Card", "USB", "Cloud"]}
                />
              </div>
            </ConfigSection>
          </div>
        </div>
        <div>
          <ConfigSection title="Live Data">
            <LiveDataPanel title="Camera Status" connected={deviceStatus.camera?.connected}>
              <LiveDataRow label="Recording" value={deviceStatus.camera?.recording ? "Active" : "Idle"} highlight />
              <LiveDataRow label="Storage Used" value={deviceStatus.camera?.storage} />
              <LiveDataRow label="Events" value={deviceStatus.camera?.events} highlight />
            </LiveDataPanel>
          </ConfigSection>
        </div>
      </div>
    </div>
  )
}
