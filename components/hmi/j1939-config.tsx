"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface J1939ConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function J1939Config({ configData, deviceStatus, onConfigChange }: J1939ConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <ConfigSection title="J1939 Settings">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField
              label="Port"
              type="select"
              value={configData.j1939.port}
              onChange={(v) => onConfigChange("j1939", "port", v)}
              options={["CAN0", "CAN1"]}
            />
            <FormField
              label="Baud Rate"
              type="select"
              value={configData.j1939.baudRate}
              onChange={(v) => onConfigChange("j1939", "baudRate", v)}
              options={["250K", "500K"]}
            />
            <FormField
              label="Source Address"
              type="text"
              value={configData.j1939.sourceAddress}
              onChange={(v) => onConfigChange("j1939", "sourceAddress", v)}
            />
            <FormField
              label="PGN Filter"
              type="select"
              value={configData.j1939.pgnFilter}
              onChange={(v) => onConfigChange("j1939", "pgnFilter", v)}
              options={["All", "Custom"]}
            />
            <FormField
              label="Push Interval"
              type="select"
              value={configData.j1939.pushInterval}
              onChange={(v) => onConfigChange("j1939", "pushInterval", v)}
              options={["1s", "5s", "10s"]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="SPN Parsing"
              type="toggle"
              value={configData.j1939.spnParsing}
              onChange={(v) => onConfigChange("j1939", "spnParsing", v)}
            />
            <FormField
              label="FMS Standard"
              type="toggle"
              value={configData.j1939.fmsStandard}
              onChange={(v) => onConfigChange("j1939", "fmsStandard", v)}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="J1939 Status" connected={deviceStatus.j1939?.connected}>
            <LiveDataRow label="PGNs Received" value={deviceStatus.j1939?.pgns} highlight />
            <LiveDataRow label="SPNs Decoded" value={deviceStatus.j1939?.spns} highlight />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
