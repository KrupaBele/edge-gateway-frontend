"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Terminal, Trash2, Pause, Play, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | "SUCCESS"

interface LogEntry {
  id: number
  timestamp: string
  level: LogLevel
  source: string
  message: string
}

const LOG_SOURCES = [
  "CELLULAR",
  "GNSS",
  "CAN_BUS",
  "MQTT",
  "SYSTEM",
  "WIFI",
  "OBD2",
  "DMS",
  "STORAGE",
  "IMU",
  "TPMS",
  "J1939",
  "BLUETOOTH",
  "RADAR",
  "CAMERA",
  "FUEL_SENSOR",
]

const LOG_MESSAGES: Record<string, { level: LogLevel; messages: string[] }[]> = {
  CELLULAR: [
    {
      level: "INFO",
      messages: ["Network registration successful", "Signal strength updated: -65dBm", "Data session established"],
    },
    {
      level: "WARN",
      messages: ["Signal degradation detected", "Switching to 3G fallback", "High latency detected: 450ms"],
    },
    { level: "ERROR", messages: ["Network connection lost", "SIM card read error", "APN authentication failed"] },
    {
      level: "SUCCESS",
      messages: ["Connected to LTE network", "Roaming enabled successfully", "SMS gateway connected"],
    },
  ],
  GNSS: [
    { level: "INFO", messages: ["Position fix acquired: 3D", "Satellites in view: 12", "HDOP: 0.8"] },
    { level: "WARN", messages: ["Low satellite count", "Position accuracy degraded", "Entering tunnel mode"] },
    { level: "DEBUG", messages: ["Raw NMEA: $GPGGA,123519", "Ephemeris data updated", "Almanac sync complete"] },
    { level: "SUCCESS", messages: ["RTK fix achieved", "Dead reckoning calibrated", "Geofence boundary set"] },
  ],
  CAN_BUS: [
    { level: "INFO", messages: ["Bus load: 45%", "Message ID 0x7DF received", "Filter mask updated"] },
    { level: "WARN", messages: ["Bus load high: 78%", "Error frame detected", "Retransmission required"] },
    { level: "ERROR", messages: ["Bus-off state entered", "CRC error on frame", "Arbitration lost"] },
    { level: "DEBUG", messages: ["DBC file loaded: vehicle.dbc", "Signal decoded: EngineRPM", "Timestamp sync: 1ms"] },
  ],
  MQTT: [
    { level: "INFO", messages: ["Publishing to topic: /telemetry", "Message QoS: 1", "Keep-alive sent"] },
    { level: "WARN", messages: ["Broker connection unstable", "Message queue building up", "Retry attempt #3"] },
    { level: "ERROR", messages: ["Connection refused", "Certificate validation failed", "Topic subscription failed"] },
    { level: "SUCCESS", messages: ["Connected to broker", "All messages delivered", "Session restored"] },
  ],
  SYSTEM: [
    { level: "INFO", messages: ["CPU usage: 34%", "Memory available: 512MB", "Uptime: 24h 15m"] },
    { level: "WARN", messages: ["Temperature rising: 68°C", "Memory usage high: 85%", "Storage nearly full"] },
    { level: "ERROR", messages: ["Watchdog timeout", "Process crashed: dms_service", "Kernel panic avoided"] },
    {
      level: "SUCCESS",
      messages: ["Firmware update complete", "Service restarted successfully", "Health check passed"],
    },
  ],
  WIFI: [
    { level: "INFO", messages: ["Client connected: AA:BB:CC:DD:EE:FF", "DHCP lease granted", "Channel switched to 6"] },
    { level: "WARN", messages: ["Interference detected", "Client disconnected unexpectedly", "Weak signal from AP"] },
    { level: "DEBUG", messages: ["Beacon interval: 100ms", "RSSI: -45dBm", "PHY rate: 72Mbps"] },
    { level: "SUCCESS", messages: ["AP mode enabled", "WPA3 handshake complete", "Mesh network joined"] },
  ],
  OBD2: [
    { level: "INFO", messages: ["PID 0x0C: RPM=2400", "PID 0x0D: Speed=65km/h", "Protocol: ISO 15765-4"] },
    { level: "WARN", messages: ["DTC pending: P0420", "Slow response from ECU", "MIL status: ON"] },
    { level: "ERROR", messages: ["No response from ECU", "Protocol detection failed", "Bus initialization error"] },
    { level: "SUCCESS", messages: ["ECU connected successfully", "DTCs cleared", "Freeze frame captured"] },
  ],
  DMS: [
    { level: "INFO", messages: ["Driver detected: ID#1234", "Attention score: 85%", "Face landmarks tracked"] },
    { level: "WARN", messages: ["Drowsiness detected", "Eyes closed > 2s", "Phone usage detected"] },
    { level: "ERROR", messages: ["Camera initialization failed", "IR illuminator fault", "Model inference timeout"] },
    { level: "SUCCESS", messages: ["Driver authenticated", "Alert acknowledged", "Calibration complete"] },
  ],
  STORAGE: [
    { level: "INFO", messages: ["Write speed: 45MB/s", "Free space: 12.5GB", "Log rotation complete"] },
    { level: "WARN", messages: ["Storage 90% full", "Write buffer filling up", "Slow write detected"] },
    { level: "ERROR", messages: ["Write failed: disk full", "Filesystem corruption detected", "Mount failed"] },
    { level: "DEBUG", messages: ["Block erase cycle: 1024", "TRIM command sent", "Journal sync complete"] },
  ],
  IMU: [
    { level: "INFO", messages: ["Accel: X=0.02g Y=-0.01g Z=1.00g", "Gyro calibrated", "Temperature: 32°C"] },
    { level: "WARN", messages: ["High vibration detected", "Gyro drift detected", "Clipping on Z-axis"] },
    { level: "DEBUG", messages: ["Sample rate: 100Hz", "Filter cutoff: 50Hz", "Bias compensation applied"] },
    { level: "SUCCESS", messages: ["Motion detected", "Orientation locked", "Dead reckoning active"] },
  ],
  TPMS: [
    { level: "INFO", messages: ["FL: 32 PSI @ 28°C", "All tires within range", "Sensor battery: OK"] },
    { level: "WARN", messages: ["FR pressure low: 24 PSI", "Temperature rising: RL=45°C", "Sensor signal weak"] },
    { level: "ERROR", messages: ["Sensor not responding: RR", "Pressure critical: 18 PSI", "TPMS fault detected"] },
    { level: "SUCCESS", messages: ["All sensors paired", "Pressure normalized", "Learning mode complete"] },
  ],
  J1939: [
    { level: "INFO", messages: ["PGN 61444: Engine RPM", "Source address: 0x00", "Network discovered"] },
    { level: "WARN", messages: ["DM1 active fault", "Transport protocol timeout", "Address claim conflict"] },
    { level: "DEBUG", messages: ["BAM session started", "SPN 190: 2400 rpm", "Multi-packet complete"] },
    { level: "SUCCESS", messages: ["ECU responded to request", "Parameter group received", "Network stable"] },
  ],
  BLUETOOTH: [
    { level: "INFO", messages: ["Device paired: OBD-II Dongle", "RSSI: -55dBm", "MTU negotiated: 512"] },
    { level: "WARN", messages: ["Connection interrupted", "Pairing timeout", "Interference detected"] },
    { level: "ERROR", messages: ["Pairing failed", "BLE stack error", "Service discovery failed"] },
    { level: "SUCCESS", messages: ["Device connected", "GATT services discovered", "Notifications enabled"] },
  ],
  RADAR: [
    { level: "INFO", messages: ["Objects detected: 3", "Closest: 15.2m", "Velocity: -5km/h relative"] },
    { level: "WARN", messages: ["Collision warning triggered", "Object in blind spot", "Radar calibration needed"] },
    { level: "ERROR", messages: ["Radar sensor fault", "No objects detected", "Signal processing error"] },
    { level: "SUCCESS", messages: ["Radar initialized", "Self-test passed", "Tracking stable"] },
  ],
  CAMERA: [
    { level: "INFO", messages: ["Recording started", "Frame rate: 30fps", "Codec: H.265"] },
    { level: "WARN", messages: ["Low light condition", "Storage buffer 80%", "Bitrate reduced"] },
    { level: "ERROR", messages: ["Encoder error", "Frame dropped", "Camera disconnected"] },
    { level: "SUCCESS", messages: ["Event recorded", "Snapshot saved", "Stream started"] },
  ],
  FUEL_SENSOR: [
    { level: "INFO", messages: ["Level: 65%", "Volume: 45.5L", "Temperature: 24°C"] },
    { level: "WARN", messages: ["Fuel level low: 15%", "Sudden drop detected", "Sensor drift"] },
    { level: "ERROR", messages: ["Sensor disconnected", "Invalid reading", "Calibration required"] },
    { level: "SUCCESS", messages: ["Refuel detected: +30L", "Calibration complete", "Sensor validated"] },
  ],
}

function generateRandomLog(id: number): LogEntry {
  const source = LOG_SOURCES[Math.floor(Math.random() * LOG_SOURCES.length)]
  const sourceMessages = LOG_MESSAGES[source]
  const levelGroup = sourceMessages[Math.floor(Math.random() * sourceMessages.length)]
  const message = levelGroup.messages[Math.floor(Math.random() * levelGroup.messages.length)]

  const now = new Date()
  const timestamp = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0")

  return {
    id,
    timestamp,
    level: levelGroup.level,
    source,
    message,
  }
}

const levelColors: Record<LogLevel, string> = {
  INFO: "text-info",
  WARN: "text-warning",
  ERROR: "text-danger",
  DEBUG: "text-muted-foreground",
  SUCCESS: "text-success",
}

const levelBgColors: Record<LogLevel, string> = {
  INFO: "bg-info/20",
  WARN: "bg-warning/20",
  ERROR: "bg-danger/20",
  DEBUG: "bg-muted",
  SUCCESS: "bg-success/20",
}

export function SystemConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [filter, setFilter] = useState<LogLevel | "ALL">("ALL")
  const scrollRef = useRef<HTMLDivElement>(null)
  const logIdRef = useRef(0)

  useEffect(() => {
    // Generate initial logs
    const initialLogs: LogEntry[] = []
    for (let i = 0; i < 20; i++) {
      initialLogs.push(generateRandomLog(logIdRef.current++))
    }
    setLogs(initialLogs)
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(
      () => {
        setLogs((prev) => {
          const newLogs = [...prev, generateRandomLog(logIdRef.current++)]
          // Keep max 100 logs
          if (newLogs.length > 100) {
            return newLogs.slice(-100)
          }
          return newLogs
        })
      },
      800 + Math.random() * 1200,
    )

    return () => clearInterval(interval)
  }, [isPaused])

  useEffect(() => {
    if (!isPaused && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, isPaused])

  const filteredLogs = filter === "ALL" ? logs : logs.filter((log) => log.level === filter)

  const clearLogs = () => {
    setLogs([])
    logIdRef.current = 0
  }

  const exportLogs = () => {
    const content = logs.map((log) => `[${log.timestamp}] [${log.level}] [${log.source}] ${log.message}`).join("\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `edge-gateway-logs-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const logCounts = logs.reduce(
    (acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1
      return acc
    },
    {} as Record<LogLevel, number>,
  )

  return (
    <div className="hmi-panel flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider">System Console</span>
          <div className="flex items-center gap-1 ml-4">
            {(["INFO", "WARN", "ERROR", "SUCCESS", "DEBUG"] as LogLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(filter === level ? "ALL" : level)}
                className={cn(
                  "px-2 py-0.5 rounded text-xs font-mono transition-colors",
                  filter === level
                    ? levelBgColors[level] + " " + levelColors[level]
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {level}
                <span className="ml-1 opacity-60">{logCounts[level] || 0}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2" onClick={exportLogs}>
            <Download className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-danger hover:text-danger" onClick={clearLogs}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Log output */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto font-mono text-xs bg-background/50 p-2 space-y-0.5">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className={cn(
              "flex items-start gap-2 px-2 py-1 rounded hover:bg-muted/50 transition-colors",
              log.level === "ERROR" && "bg-danger/5",
            )}
          >
            <span className="text-muted-foreground shrink-0 tabular-nums">{log.timestamp}</span>
            <span
              className={cn(
                "shrink-0 px-1.5 py-0.5 rounded text-xs font-semibold uppercase",
                levelBgColors[log.level],
                levelColors[log.level],
              )}
            >
              {log.level.padEnd(7)}
            </span>
            <span className="text-primary shrink-0 w-24 truncate">[{log.source}]</span>
            <span className="text-foreground">{log.message}</span>
          </div>
        ))}
        {filteredLogs.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">No logs to display</div>
        )}
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Total: {logs.length} entries</span>
          <span className="text-danger">Errors: {logCounts.ERROR || 0}</span>
          <span className="text-warning">Warnings: {logCounts.WARN || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          {isPaused ? (
            <span className="text-warning flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-warning" />
              PAUSED
            </span>
          ) : (
            <span className="text-success flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              LIVE
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
