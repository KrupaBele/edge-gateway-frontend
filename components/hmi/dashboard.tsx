"use client"

import type React from "react"

import { StatCard, GaugeDisplay, BinaryIndicator, PageHeader } from "./shared"
import { StatusBadge } from "@/components/edge-gateway-manager"
import { SystemConsole } from "./system-console"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"
import { cn } from "@/lib/utils"
import {
  Signal,
  Wifi,
  Satellite,
  Gauge,
  Cpu,
  Radio,
  Camera,
  Eye,
  Radar,
  Fuel,
  CircleDot,
  Server,
  Activity,
  Clock,
  Zap,
  Car,
} from "lucide-react"

interface DashboardProps {
  deviceStatus: DeviceStatus
  configData: ConfigData
}

export function Dashboard({ deviceStatus, configData }: DashboardProps) {
  const connectivityStatus = [
    {
      id: "cellular",
      label: "Cellular",
      icon: Signal,
      status: deviceStatus.cellular,
      info: `${deviceStatus.cellular?.network} | ${deviceStatus.cellular?.signal}%`,
      highlight: `${deviceStatus.cellular?.signal}%`,
    },
    {
      id: "wifi",
      label: "Wi-Fi",
      icon: Wifi,
      status: deviceStatus.wifi,
      info: `${deviceStatus.wifi?.clients} clients`,
      highlight: deviceStatus.wifi?.ssid,
    },
    {
      id: "bluetooth",
      label: "Bluetooth",
      icon: Radio,
      status: deviceStatus.bluetooth,
      info: `${deviceStatus.bluetooth?.devices} devices`,
      highlight: deviceStatus.bluetooth?.name,
    },
  ]

  const positioningStatus = [
    {
      id: "gnss",
      label: "GNSS/GPS",
      icon: Satellite,
      status: deviceStatus.gnss,
      info: `${deviceStatus.gnss?.satellites} sats | ${deviceStatus.gnss?.fix}`,
      highlight: deviceStatus.gnss?.fix,
    },
    {
      id: "imu",
      label: "IMU",
      icon: Gauge,
      status: deviceStatus.imu,
      info: `Z: ${deviceStatus.imu?.accelZ}g`,
      highlight: `${deviceStatus.imu?.accelZ}g`,
    },
  ]

  const vehicleStatus = [
    {
      id: "canbus",
      label: "CAN Bus",
      icon: Server,
      status: deviceStatus.canbus,
      info: `${deviceStatus.canbus?.messages} msgs | ${deviceStatus.canbus?.busLoad}`,
      highlight: deviceStatus.canbus?.busLoad,
    },
    {
      id: "obdii",
      label: "OBD-II",
      icon: Car,
      status: deviceStatus.obdii,
      info: `${deviceStatus.obdii?.rpm} RPM | ${deviceStatus.obdii?.speed} km/h`,
      highlight: `${deviceStatus.obdii?.speed} km/h`,
    },
    {
      id: "j1939",
      label: "J1939",
      icon: Server,
      status: deviceStatus.j1939,
      info: `${deviceStatus.j1939?.pgns} PGNs`,
      highlight: deviceStatus.j1939?.pgns,
    },
  ]

  const visionStatus = [
    {
      id: "camera",
      label: "Dashcam",
      icon: Camera,
      status: deviceStatus.camera,
      info: deviceStatus.camera?.recording ? "Recording" : "Idle",
      highlight: deviceStatus.camera?.recording ? "REC" : "IDLE",
    },
    {
      id: "dms",
      label: "Driver Monitor",
      icon: Eye,
      status: deviceStatus.dms,
      info: `${deviceStatus.dms?.attention}% attention`,
      highlight: deviceStatus.dms?.driver,
    },
    {
      id: "radar",
      label: "Radar",
      icon: Radar,
      status: deviceStatus.radar,
      info: `${deviceStatus.radar?.objects} objects`,
      highlight: deviceStatus.radar?.closestDistance,
    },
  ]

  const sensorStatus = [
    {
      id: "fuel",
      label: "Fuel Sensor",
      icon: Fuel,
      status: deviceStatus.fuel,
      info: `${deviceStatus.fuel?.level}% | ${deviceStatus.fuel?.volume}`,
      highlight: `${deviceStatus.fuel?.level}%`,
    },
    {
      id: "tpms",
      label: "TPMS",
      icon: CircleDot,
      status: deviceStatus.tpms,
      info: `FL:${deviceStatus.tpms?.fl} FR:${deviceStatus.tpms?.fr}`,
      highlight: "OK",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Dashboard"
        description={`${configData.system.deviceId} | ${configData.system.deviceName}`}
      />

      <div className="grid grid-cols-5 gap-4">
        <StatCard label="Uptime" value={deviceStatus.system?.uptime || "--"} icon={Clock} status="success" />
        <GaugeDisplay
          label="CPU Usage"
          value={deviceStatus.system?.cpu || 0}
          min={0}
          max={100}
          unit="%"
          thresholds={{ warning: 70, danger: 90 }}
        />
        <GaugeDisplay
          label="Memory"
          value={deviceStatus.system?.memory || 0}
          min={0}
          max={100}
          unit="%"
          thresholds={{ warning: 75, danger: 90 }}
        />
        <GaugeDisplay
          label="Temperature"
          value={deviceStatus.system?.temp || 0}
          min={0}
          max={100}
          unit="°C"
          thresholds={{ warning: 60, danger: 75 }}
        />
        <StatCard
          label="Firmware"
          value={deviceStatus.system?.firmware || "--"}
          icon={Cpu}
          subValue="Up to date"
          status="info"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Connectivity */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Signal className="w-3.5 h-3.5" />
            Connectivity
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {connectivityStatus.map((item) => (
              <SubsystemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Positioning */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Satellite className="w-3.5 h-3.5" />
            Positioning
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {positioningStatus.map((item) => (
              <SubsystemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Vehicle Bus */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Car className="w-3.5 h-3.5" />
            Vehicle Bus
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {vehicleStatus.map((item) => (
              <SubsystemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Vision Systems */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" />
            Vision Systems
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {visionStatus.map((item) => (
              <SubsystemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" />
          Sensors
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {sensorStatus.map((item) => (
            <SubsystemCard key={item.id} item={item} />
          ))}
          {/* Fuel gauge */}
          <GaugeDisplay
            label="Fuel Level"
            value={deviceStatus.fuel?.level || 0}
            min={0}
            max={100}
            unit="%"
            thresholds={{ warning: 30, danger: 15 }}
          />
          {/* Storage gauge */}
          <GaugeDisplay
            label="Storage Used"
            value={Number.parseInt(deviceStatus.storage?.used || "0")}
            min={0}
            max={64}
            unit="GB"
            thresholds={{ warning: 50, danger: 58 }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" />
          Digital I/O
        </h2>
        <div className="grid grid-cols-6 gap-2">
          <BinaryIndicator label="Ignition" active={deviceStatus.digitalInputs?.ignition || false} />
          <BinaryIndicator label="Door" active={deviceStatus.digitalInputs?.door || false} />
          <BinaryIndicator label="Seatbelt" active={deviceStatus.digitalInputs?.seatbelt || false} />
          <BinaryIndicator label="PTO" active={deviceStatus.digitalInputs?.pto || false} />
          <BinaryIndicator label="Relay 1" active={deviceStatus.digitalOutputs?.relay1 || false} />
          <BinaryIndicator label="Relay 2" active={deviceStatus.digitalOutputs?.relay2 || false} />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <CircleDot className="w-3.5 h-3.5" />
          Tire Pressure Monitoring
        </h2>
        <div className="hmi-panel p-4">
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <TirePressureCard label="Front Left" pressure={deviceStatus.tpms?.fl} temp={deviceStatus.tpms?.flTemp} />
            <TirePressureCard label="Front Right" pressure={deviceStatus.tpms?.fr} temp={deviceStatus.tpms?.frTemp} />
            <TirePressureCard label="Rear Left" pressure={deviceStatus.tpms?.rl} temp={deviceStatus.tpms?.rlTemp} />
            <TirePressureCard label="Rear Right" pressure={deviceStatus.tpms?.rr} temp={deviceStatus.tpms?.rrTemp} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Server className="w-3.5 h-3.5" />
          Cloud Services
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="hmi-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium">MQTT Broker</span>
              <StatusBadge connected={deviceStatus.mqtt?.connected} size="sm" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-mono font-bold text-primary">{deviceStatus.mqtt?.published || 0}</div>
                <div className="text-xs text-muted-foreground uppercase">Published</div>
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-foreground">{deviceStatus.mqtt?.received || 0}</div>
                <div className="text-xs text-muted-foreground uppercase">Received</div>
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground">{deviceStatus.mqtt?.lastPublish || "--"}</div>
                <div className="text-xs text-muted-foreground uppercase">Last Publish</div>
              </div>
            </div>
          </div>
          <div className="hmi-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium">HTTPS API</span>
              <StatusBadge connected={deviceStatus.https?.connected} size="sm" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-mono font-bold text-primary">{deviceStatus.https?.requests || 0}</div>
                <div className="text-xs text-muted-foreground uppercase">Requests</div>
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-danger">{deviceStatus.https?.failures || 0}</div>
                <div className="text-xs text-muted-foreground uppercase">Failures</div>
              </div>
              <div>
                <div className="text-xs font-mono text-success">
                  {deviceStatus.https?.requests
                    ? `${(((deviceStatus.https.requests - (deviceStatus.https?.failures || 0)) / deviceStatus.https.requests) * 100).toFixed(1)}%`
                    : "--"}
                </div>
                <div className="text-xs text-muted-foreground uppercase">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SystemConsole />
      </div>
    </div>
  )
}

function SubsystemCard({
  item,
}: {
  item: {
    id: string
    label: string
    icon: React.ElementType
    status?: { connected?: boolean }
    info: string
    highlight: string | undefined
  }
}) {
  const Icon = item.icon
  return (
    <div className="hmi-panel p-3 flex items-center justify-between hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded flex items-center justify-center",
            item.status?.connected ? "bg-success/10" : "bg-muted",
          )}
        >
          <Icon className={cn("w-4 h-4", item.status?.connected ? "text-success" : "text-muted-foreground")} />
        </div>
        <div>
          <div className="text-xs font-medium text-foreground">{item.label}</div>
          <div className="text-xs text-muted-foreground font-mono">{item.info}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-sm font-mono font-bold",
            item.status?.connected ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.highlight || "--"}
        </span>
        <StatusBadge connected={item.status?.connected} size="sm" />
      </div>
    </div>
  )
}

function TirePressureCard({ label, pressure, temp }: { label: string; pressure?: number; temp?: number }) {
  const isLow = pressure !== undefined && pressure < 28
  const isHigh = pressure !== undefined && pressure > 38

  return (
    <div
      className={cn("bg-muted rounded p-3 text-center", isLow && "ring-1 ring-warning", isHigh && "ring-1 ring-danger")}
    >
      <div className="text-xs text-muted-foreground uppercase mb-1">{label}</div>
      <div
        className={cn(
          "text-xl font-mono font-bold",
          isLow ? "text-warning" : isHigh ? "text-danger" : "text-foreground",
        )}
      >
        {pressure ?? "--"}
        <span className="text-xs text-muted-foreground ml-0.5">PSI</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">{temp ?? "--"}°C</div>
    </div>
  )
}
