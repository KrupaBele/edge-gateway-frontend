"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface OBDConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function OBDConfig({ configData, deviceStatus, onConfigChange }: OBDConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <ConfigSection title="Connection Settings">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField
              label="Port"
              type="select"
              value={configData.obdii.port}
              onChange={(v) => onConfigChange("obdii", "port", v)}
              options={["OBD", "CAN0"]}
            />
            <FormField
              label="Protocol"
              type="select"
              value={configData.obdii.protocol}
              onChange={(v) => onConfigChange("obdii", "protocol", v)}
              options={["Auto", "ISO 15765", "ISO 14230", "J1850"]}
            />
            <FormField
              label="Baud Rate"
              type="select"
              value={configData.obdii.baudRate}
              onChange={(v) => onConfigChange("obdii", "baudRate", v)}
              options={["Auto", "500K", "250K"]}
            />
            <FormField
              label="Poll Interval"
              type="select"
              value={configData.obdii.pollInterval}
              onChange={(v) => onConfigChange("obdii", "pollInterval", v)}
              options={["100ms", "500ms", "1s"]}
            />
            <FormField
              label="VIN Read"
              type="select"
              value={configData.obdii.vinRead}
              onChange={(v) => onConfigChange("obdii", "vinRead", v)}
              options={["Auto", "Manual"]}
            />
            <FormField
              label="Data Format"
              type="select"
              value={configData.obdii.dataFormat}
              onChange={(v) => onConfigChange("obdii", "dataFormat", v)}
              options={["JSON", "OBD-II Standard"]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="DTC Read"
              type="toggle"
              value={configData.obdii.dtcRead}
              onChange={(v) => onConfigChange("obdii", "dtcRead", v)}
            />
            <FormField
              label="DTC Clear (Manual)"
              type="toggle"
              value={configData.obdii.dtcClear}
              onChange={(v) => onConfigChange("obdii", "dtcClear", v)}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Vehicle Data">
          <LiveDataPanel title="OBD-II Status" connected={deviceStatus.obdii?.connected}>
            <div className="text-center py-4 border-b border-border">
              <div className="text-xs text-muted-foreground mb-1">ENGINE RPM</div>
              <div className="text-4xl font-bold text-primary font-mono">{deviceStatus.obdii?.rpm}</div>
            </div>
            <LiveDataRow label="Speed" value={`${deviceStatus.obdii?.speed} km/h`} highlight />
            <LiveDataRow label="Coolant Temp" value={`${deviceStatus.obdii?.temp}°C`} />
            <LiveDataRow label="Fuel Level" value={`${deviceStatus.obdii?.fuel}%`} />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
