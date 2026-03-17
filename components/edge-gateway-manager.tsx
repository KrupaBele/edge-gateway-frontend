"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { Dashboard } from "@/components/hmi/dashboard"
import { GNSSConfig } from "@/components/hmi/gnss-config"
import { CellularConfig } from "@/components/hmi/cellular-config"
import { WiFiConfig } from "@/components/hmi/wifi-config"
import { BluetoothConfig } from "@/components/hmi/bluetooth-config"
import { CANBusConfig } from "@/components/hmi/canbus-config"
import { OBDConfig } from "@/components/hmi/obd-config"
import { IMUConfig } from "@/components/hmi/imu-config"
import { FuelConfig } from "@/components/hmi/fuel-config"
import { TPMSConfig } from "@/components/hmi/tpms-config"
import { MQTTConfig } from "@/components/hmi/mqtt-config"
import { StorageConfig } from "@/components/hmi/storage-config"
import { SystemConfig } from "@/components/hmi/system-config"
import { J1939Config } from "@/components/hmi/j1939-config"
import { CameraConfig } from "@/components/hmi/camera-config"
import { DMSConfig } from "@/components/hmi/dms-config"
import { RadarConfig } from "@/components/hmi/radar-config"
import { DigitalInputsConfig } from "@/components/hmi/digital-inputs-config"
import { DigitalOutputsConfig } from "@/components/hmi/digital-outputs-config"
import { HTTPSConfig } from "@/components/hmi/https-config"
import { SecurityConfig } from "@/components/hmi/security-config"
import { IButtonConfig } from "@/components/hmi/ibutton-config"
import { RFIDConfig } from "@/components/hmi/rfid-config"
import { AudioConfig } from "@/components/hmi/audio-config"
import { SerialConfig } from "@/components/hmi/serial-config"
import { TemperatureConfig } from "@/components/hmi/temperature-config"
import { UltrasonicConfig } from "@/components/hmi/ultrasonic-config"
import { DisplayConfig } from "@/components/hmi/display-config"
import { useDeviceStatus } from "@/hooks/use-device-status"
import { useConfigData, type ConfigData } from "@/hooks/use-config-data"
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wifi,
  Signal,
  Satellite,
  Gauge,
  Cpu,
  HardDrive,
  Thermometer,
  Settings,
  Radio,
  Camera,
  Eye,
  Radar,
  Fuel,
  CircleDot,
  Server,
  Cloud,
  Shield,
  Activity,
  LayoutDashboard,
  Network,
  MapPin,
  Car,
  Layers,
  MonitorSpeaker,
  Key,
  CreditCard,
  Speaker,
  Usb,
  Power,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react"

const navigationGroups = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    color: "cyan",
    items: [{ id: "dashboard", label: "Dashboard", icon: Activity }],
  },
  {
    id: "connectivity",
    label: "Connectivity",
    icon: Network,
    color: "blue",
    items: [
      { id: "cellular", label: "Cellular", icon: Signal },
      { id: "wifi", label: "Wi-Fi", icon: Wifi },
      { id: "bluetooth", label: "Bluetooth", icon: Radio },
      { id: "serial", label: "Serial", icon: Usb },
    ],
  },
  {
    id: "positioning",
    label: "Position",
    icon: MapPin,
    color: "green",
    items: [
      { id: "gnss", label: "GNSS/GPS", icon: Satellite },
      { id: "imu", label: "IMU", icon: Gauge },
    ],
  },
  {
    id: "vehicle",
    label: "Vehicle",
    icon: Car,
    color: "orange",
    items: [
      { id: "canbus", label: "CAN Bus", icon: Network },
      { id: "obdii", label: "OBD-II", icon: Gauge },
      { id: "j1939", label: "J1939", icon: Server },
    ],
  },
  {
    id: "sensors",
    label: "Sensors",
    icon: Layers,
    color: "purple",
    items: [
      { id: "fuel", label: "Fuel", icon: Fuel },
      { id: "tpms", label: "TPMS", icon: CircleDot },
      { id: "temperature", label: "Temp", icon: Thermometer },
      { id: "ultrasonic", label: "Ultrasonic", icon: Radar },
      { id: "digitalInputs", label: "DI", icon: CircleDot },
      { id: "digitalOutputs", label: "DO", icon: Power },
    ],
  },
  {
    id: "vision",
    label: "Vision",
    icon: Camera,
    color: "pink",
    items: [
      { id: "camera", label: "Dashcam", icon: Camera },
      { id: "dms", label: "DMS", icon: Eye },
      { id: "radar", label: "Radar", icon: Radar },
    ],
  },
  {
    id: "identification",
    label: "ID",
    icon: Key,
    color: "yellow",
    items: [
      { id: "ibutton", label: "iButton", icon: Key },
      { id: "rfid", label: "RFID", icon: CreditCard },
    ],
  },
  {
    id: "io",
    label: "A/V",
    icon: MonitorSpeaker,
    color: "teal",
    items: [
      { id: "audio", label: "Audio", icon: Speaker },
      { id: "display", label: "Display", icon: MonitorSpeaker },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: Cloud,
    color: "indigo",
    items: [
      { id: "mqtt", label: "MQTT", icon: Server },
      { id: "https", label: "HTTPS", icon: Cloud },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: Settings,
    color: "slate",
    items: [
      { id: "storageConfig", label: "Storage", icon: HardDrive },
      { id: "systemGeneral", label: "General", icon: Cpu },
      { id: "security", label: "Security", icon: Shield },
    ],
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/30", accent: "bg-cyan-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30", accent: "bg-blue-500" },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/30",
    accent: "bg-emerald-500",
  },
  orange: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/30", accent: "bg-orange-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/30", accent: "bg-purple-500" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-500", border: "border-pink-500/30", accent: "bg-pink-500" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/30", accent: "bg-yellow-500" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-500", border: "border-teal-500/30", accent: "bg-teal-500" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-500", border: "border-indigo-500/30", accent: "bg-indigo-500" },
  slate: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border-slate-500/30", accent: "bg-slate-500" },
}

export function EdgeGatewayManager() {
  const [activeView, setActiveView] = useState("dashboard")
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [showSaveNotification, setShowSaveNotification] = useState(false)
  const deviceStatus = useDeviceStatus()
  const { configData, updateConfig } = useConfigData()
  const { theme, toggleTheme } = useTheme()

  const handleSave = () => {
    setShowSaveNotification(true)
    setTimeout(() => setShowSaveNotification(false), 3000)
  }

  const handleConfigChange = (device: keyof ConfigData, field: string, value: string | boolean | number) => {
    updateConfig(device, field, value)
  }

  const getSystemHealth = () => {
    const connectedCount = Object.values(deviceStatus).filter((s) => s?.connected).length
    const totalSystems = Object.keys(deviceStatus).length
    return { connected: connectedCount, total: totalSystems }
  }

  const getAlarmCount = () => {
    let warnings = 0
    let errors = 0
    if (deviceStatus.system?.temp && deviceStatus.system.temp > 70) errors++
    if (deviceStatus.system?.cpu && deviceStatus.system.cpu > 80) warnings++
    if (deviceStatus.system?.memory && deviceStatus.system.memory > 85) warnings++
    if (deviceStatus.fuel?.level && deviceStatus.fuel.level < 20) warnings++
    return { warnings, errors }
  }

  const systemHealth = getSystemHealth()
  const alarms = getAlarmCount()

  const getCurrentGroup = () => {
    for (const group of navigationGroups) {
      if (group.items.some((item) => item.id === activeView)) {
        return group
      }
    }
    return navigationGroups[0]
  }

  const currentGroup = getCurrentGroup()

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard deviceStatus={deviceStatus} configData={configData} />
      case "gnss":
        return <GNSSConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "cellular":
        return (
          <CellularConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
        )
      case "wifi":
        return <WiFiConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "bluetooth":
        return (
          <BluetoothConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
        )
      case "canbus":
        return <CANBusConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "obdii":
        return <OBDConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "j1939":
        return <J1939Config configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "imu":
        return <IMUConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "fuel":
        return <FuelConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "tpms":
        return <TPMSConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "digitalInputs":
        return (
          <DigitalInputsConfig
            configData={configData}
            deviceStatus={deviceStatus}
            onConfigChange={handleConfigChange}
          />
        )
      case "digitalOutputs":
        return (
          <DigitalOutputsConfig
            configData={configData}
            deviceStatus={deviceStatus}
            onConfigChange={handleConfigChange}
          />
        )
      case "camera":
        return <CameraConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "dms":
        return <DMSConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "radar":
        return <RadarConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "mqtt":
        return <MQTTConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "https":
        return <HTTPSConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "storageConfig":
        return <StorageConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "systemGeneral":
        return <SystemConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "security":
        return (
          <SecurityConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
        )
      case "ibutton":
        return <IButtonConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "rfid":
        return <RFIDConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "audio":
        return <AudioConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "serial":
        return <SerialConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      case "temperature":
        return (
          <TemperatureConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
        )
      case "ultrasonic":
        return (
          <UltrasonicConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
        )
      case "display":
        return <DisplayConfig configData={configData} deviceStatus={deviceStatus} onConfigChange={handleConfigChange} />
      default:
        return <div className="text-muted-foreground p-10 text-center">Select a configuration section</div>
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background font-sans text-foreground overflow-hidden">
      <header className="h-10 bg-header-bg border-b border-border flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold">Edge Gateway HMI</span>
            <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/10">
              v2.4.1
            </Badge>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">ID:</span>
            <span className="font-mono">{configData.system.deviceId}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* System metrics */}
          <div className="flex items-center gap-4 text-xs">
            <SystemMetric
              icon={Cpu}
              label="CPU"
              value={deviceStatus.system?.cpu}
              unit="%"
              warning={deviceStatus.system?.cpu && deviceStatus.system.cpu > 80}
            />
            <SystemMetric
              icon={HardDrive}
              label="MEM"
              value={deviceStatus.system?.memory}
              unit="%"
              warning={deviceStatus.system?.memory && deviceStatus.system.memory > 85}
            />
            <SystemMetric
              icon={Thermometer}
              label="TEMP"
              value={deviceStatus.system?.temp}
              unit="°C"
              danger={deviceStatus.system?.temp && deviceStatus.system.temp > 70}
            />
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Alarms */}
          <div className="flex items-center gap-2">
            {alarms.errors > 0 && (
              <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-500 gap-1 text-xs">
                <XCircle className="w-3 h-3" />
                {alarms.errors}
              </Badge>
            )}
            {alarms.warnings > 0 && (
              <Badge variant="outline" className="border-yellow-500/50 bg-yellow-500/10 text-yellow-500 gap-1 text-xs">
                <AlertTriangle className="w-3 h-3" />
                {alarms.warnings}
              </Badge>
            )}
            {alarms.errors === 0 && alarms.warnings === 0 && (
              <Badge
                variant="outline"
                className="border-emerald-500/50 bg-emerald-500/10 text-emerald-500 gap-1 text-xs"
              >
                <CheckCircle2 className="w-3 h-3" />
                OK
              </Badge>
            )}
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Connection indicators */}
          <div className="flex items-center gap-3">
            <StatusBadge connected={deviceStatus.mqtt?.connected} label="MQTT" />
            <StatusBadge connected={deviceStatus.cellular?.connected} label="LTE" />
            <StatusBadge connected={deviceStatus.wifi?.connected} label="WiFi" />
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Online systems */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-muted-foreground">Systems:</span>
            <span className="font-mono text-emerald-500">{systemHealth.connected}</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono text-muted-foreground">{systemHealth.total}</span>
          </div>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-accent transition-colors text-xs"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-primary" />
            )}
          </button>
        </div>
      </header>

      <nav className="bg-nav-bg border-b border-border flex-shrink-0">
        <div className="flex items-center px-2">
          {navigationGroups.map((group) => {
            const colors = colorMap[group.color]
            const isActive = currentGroup.id === group.id
            const isHovered = activeGroup === group.id

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setActiveGroup(group.id)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <button
                  onClick={() => setActiveView(group.items[0].id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-all border-b-2",
                    isActive
                      ? `${colors.text} ${colors.border} border-b-current`
                      : "text-muted-foreground border-transparent hover:text-foreground",
                  )}
                >
                  <group.icon className={cn("w-3.5 h-3.5", isActive && colors.text)} />
                  <span>{group.label}</span>
                  {group.items.length > 1 && (
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isHovered && "rotate-180")} />
                  )}
                </button>

                {/* Dropdown for sub-items */}
                {isHovered && group.items.length > 1 && (
                  <div className="absolute top-full left-0 z-50 min-w-40 bg-popover border border-border rounded-b shadow-xl">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveView(item.id)
                          setActiveGroup(null)
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors",
                          activeView === item.id
                            ? `${colors.bg} ${colors.text}`
                            : "text-popover-foreground hover:bg-nav-hover",
                        )}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                        {activeView === item.id && (
                          <div className={cn("w-1.5 h-1.5 rounded-full ml-auto", colors.accent)} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {currentGroup.items.length > 1 && (
        <div
          className={cn(
            "border-b flex items-center gap-1 px-4 py-1",
            colorMap[currentGroup.color].bg,
            colorMap[currentGroup.color].border,
          )}
        >
          <span className={cn("text-xs font-medium mr-2", colorMap[currentGroup.color].text)}>
            {currentGroup.label}:
          </span>
          {currentGroup.items.map((item) => {
            const colors = colorMap[currentGroup.color]
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all",
                  activeView === item.id ? `${colors.accent} text-white` : `text-foreground hover:bg-nav-hover`,
                )}
              >
                <item.icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      )}

      <main className="flex-1 overflow-auto p-6">{renderContent()}</main>

      <footer className="h-8 bg-card border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground flex-shrink-0">
        <div className="flex items-center gap-4">
          <span>Edge Gateway Manager v2.4.1</span>
          <span>|</span>
          <span>Uptime: {deviceStatus.system?.uptime}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Last sync: {new Date().toLocaleTimeString()}</span>
          {showSaveNotification && <span className="text-emerald-500">Configuration saved</span>}
        </div>
      </footer>
    </div>
  )
}

export function SystemMetric({
  icon: Icon,
  label,
  value,
  unit,
  warning,
  danger,
}: {
  icon: React.ElementType
  label: string
  value?: number
  unit: string
  warning?: boolean
  danger?: boolean
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon
        className={cn("w-3 h-3", danger ? "text-red-500" : warning ? "text-yellow-500" : "text-muted-foreground")}
      />
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-mono", danger ? "text-red-500" : warning ? "text-yellow-500" : "text-foreground")}>
        {value ?? "--"}
        {unit}
      </span>
    </div>
  )
}

export function StatusBadge({
  connected,
  size = "default",
  label,
}: { connected?: boolean; size?: "sm" | "default"; label?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1",
        size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-1",
        connected
          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
          : "border-red-500/50 bg-red-500/10 text-red-500",
      )}
    >
      <div className={cn("w-1.5 h-1.5 rounded-full", connected ? "bg-emerald-500" : "bg-red-500")} />
      {label || (connected ? "Online" : "Offline")}
    </Badge>
  )
}

function ConnectionIndicator({ connected, label }: { connected?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className={cn("w-1.5 h-1.5 rounded-full", connected ? "bg-emerald-500" : "bg-red-500")} />
      <span className={cn("text-xs", connected ? "text-emerald-500" : "text-red-500")}>{label}</span>
    </div>
  )
}
