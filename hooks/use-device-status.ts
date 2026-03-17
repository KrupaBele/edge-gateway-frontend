"use client"

import { useState, useEffect } from "react"

export interface DeviceStatus {
  gnss?: { connected: boolean; satellites: number; fix: string; lat: string; lng: string; hdop: string }
  cellular?: { connected: boolean; signal: number; network: string; carrier: string; ip: string }
  wifi?: { connected: boolean; clients: number; ssid: string; ip: string }
  bluetooth?: { connected: boolean; devices: number; name: string }
  canbus?: { connected: boolean; messages: number; errors: number; busLoad: string }
  obdii?: { connected: boolean; rpm: number; speed: number; temp: number; fuel: number }
  j1939?: { connected: boolean; pgns: number; spns: number }
  imu?: {
    connected: boolean
    accelX: string
    accelY: string
    accelZ: string
    gyroX: string
    gyroY: string
    gyroZ: string
  }
  camera?: { connected: boolean; recording: boolean; storage: string; events: number }
  dms?: { connected: boolean; driver: string; attention: number; drowsiness: string }
  radar?: { connected: boolean; objects: number; closestDistance: string }
  ultrasonic?: { connected: boolean; sensors: number; active: number }
  fuel?: { connected: boolean; level: number; temp: number; volume: string }
  temperature?: { connected: boolean; sensors: string[] }
  tpms?: {
    connected: boolean
    fl: number
    fr: number
    rl: number
    rr: number
    flTemp: number
    frTemp: number
    rlTemp: number
    rrTemp: number
  }
  digitalInputs?: { ignition: boolean; door: boolean; seatbelt: boolean; pto: boolean }
  digitalOutputs?: { relay1: boolean; relay2: boolean }
  serial?: { connected: boolean; rxBytes: number; txBytes: number }
  ibutton?: { connected: boolean; lastId: string; driver: string }
  rfid?: { connected: boolean; lastCard: string }
  audio?: { connected: boolean; level: string }
  speaker?: { connected: boolean; volume: number }
  display?: { connected: boolean; resolution: string }
  storage?: { connected: boolean; total: string; used: string; free: string }
  mqtt?: { connected: boolean; published: number; received: number; lastPublish: string }
  https?: { connected: boolean; requests: number; failures: number }
  system?: { uptime: string; cpu: number; memory: number; temp: number; firmware: string }
}

export function useDeviceStatus() {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({})

  useEffect(() => {
    const updateStatus = () => {
      setDeviceStatus({
        gnss: { connected: true, satellites: 12, fix: "3D", lat: "37.7749", lng: "-122.4194", hdop: "0.9" },
        cellular: { connected: true, signal: 85, network: "5G", carrier: "T-Mobile", ip: "10.0.0.45" },
        wifi: { connected: true, clients: 2, ssid: "EdgeGateway-001", ip: "192.168.4.1" },
        bluetooth: { connected: true, devices: 1, name: "VehicleGateway" },
        canbus: { connected: true, messages: 1247, errors: 0, busLoad: "34%" },
        obdii: { connected: true, rpm: 2400, speed: 65, temp: 92, fuel: 72 },
        j1939: { connected: true, pgns: 45, spns: 128 },
        imu: {
          connected: true,
          accelX: "0.02",
          accelY: "-0.01",
          accelZ: "0.98",
          gyroX: "0.5",
          gyroY: "-0.3",
          gyroZ: "0.1",
        },
        camera: { connected: true, recording: true, storage: "45%", events: 23 },
        dms: { connected: true, driver: "Alert", attention: 95, drowsiness: "None" },
        radar: { connected: true, objects: 3, closestDistance: "45m" },
        ultrasonic: { connected: true, sensors: 8, active: 8 },
        fuel: { connected: true, level: 72, temp: 28, volume: "43.2L" },
        temperature: { connected: true, sensors: ["22°C", "89°C", "18°C", "24°C"] },
        tpms: {
          connected: true,
          fl: 32,
          fr: 33,
          rl: 31,
          rr: 32,
          flTemp: 28,
          frTemp: 29,
          rlTemp: 27,
          rrTemp: 28,
        },
        digitalInputs: { ignition: true, door: false, seatbelt: true, pto: false },
        digitalOutputs: { relay1: false, relay2: false },
        serial: { connected: true, rxBytes: 45230, txBytes: 12450 },
        ibutton: { connected: true, lastId: "01-234567890ABC", driver: "John Smith" },
        rfid: { connected: true, lastCard: "A1B2C3D4" },
        audio: { connected: true, level: "-32dB" },
        speaker: { connected: true, volume: 80 },
        display: { connected: true, resolution: "1920x1080" },
        storage: { connected: true, total: "64GB", used: "28.8GB", free: "35.2GB" },
        mqtt: { connected: true, published: 5420, received: 128, lastPublish: "2s ago" },
        https: { connected: true, requests: 342, failures: 2 },
        system: { uptime: "14d 6h 23m", cpu: 34, memory: 52, temp: 48, firmware: "v2.4.1" },
      })
    }
    updateStatus()
    const interval = setInterval(updateStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  return deviceStatus
}
