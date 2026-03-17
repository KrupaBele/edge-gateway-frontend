"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface CANBusConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function CANBusConfig({ configData, deviceStatus, onConfigChange }: CANBusConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Hardware Settings">
            <div className="space-y-4">
              <FormField
                label="Port"
                type="select"
                value={configData.canbus.port}
                onChange={(v) => onConfigChange("canbus", "port", v)}
                options={["CAN0", "CAN1", "CAN2"]}
              />
              <FormField
                label="Protocol"
                type="select"
                value={configData.canbus.protocol}
                onChange={(v) => onConfigChange("canbus", "protocol", v)}
                options={["CAN 2.0A", "CAN 2.0B", "CAN FD"]}
              />
              <FormField
                label="Baud Rate"
                type="select"
                value={configData.canbus.baudRate}
                onChange={(v) => onConfigChange("canbus", "baudRate", v)}
                options={["125K", "250K", "500K", "1M"]}
              />
              <FormField
                label="FD Data Rate"
                type="select"
                value={configData.canbus.fdDataRate}
                onChange={(v) => onConfigChange("canbus", "fdDataRate", v)}
                options={["2M", "5M", "8M"]}
              />
              <FormField
                label="Termination"
                type="toggle"
                value={configData.canbus.termination}
                onChange={(v) => onConfigChange("canbus", "termination", v)}
              />
              <FormField
                label="Listen Only"
                type="toggle"
                value={configData.canbus.listenOnly}
                onChange={(v) => onConfigChange("canbus", "listenOnly", v)}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Filtering and Parsing">
            <div className="space-y-4">
              <FormField
                label="Filter Mode"
                type="select"
                value={configData.canbus.filterMode}
                onChange={(v) => onConfigChange("canbus", "filterMode", v)}
                options={["Accept All", "Whitelist", "Blacklist"]}
              />
              <FormField
                label="Message IDs (Hex)"
                type="text"
                value={configData.canbus.messageIds}
                onChange={(v) => onConfigChange("canbus", "messageIds", v)}
                placeholder="0x100,0x200,0x300"
              />
              <FormField
                label="DBC File"
                type="text"
                value={configData.canbus.dbcFile}
                onChange={(v) => onConfigChange("canbus", "dbcFile", v)}
              />
              <FormField
                label="Parsing"
                type="select"
                value={configData.canbus.parsing}
                onChange={(v) => onConfigChange("canbus", "parsing", v)}
                options={["Raw", "DBC Decoded"]}
              />
            </div>
          </ConfigSection>
        </div>
        <ConfigSection title="Cloud Configuration">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Push Mode"
              type="select"
              value={configData.canbus.pushMode}
              onChange={(v) => onConfigChange("canbus", "pushMode", v)}
              options={["On Change", "Interval"]}
            />
            <FormField
              label="Push Interval"
              type="select"
              value={configData.canbus.pushInterval}
              onChange={(v) => onConfigChange("canbus", "pushInterval", v)}
              options={["100ms", "500ms", "1s", "5s"]}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="CAN Bus Status" connected={deviceStatus.canbus?.connected}>
            <LiveDataRow label="Messages" value={deviceStatus.canbus?.messages} highlight />
            <LiveDataRow label="Errors" value={deviceStatus.canbus?.errors} />
            <LiveDataRow label="Bus Load" value={deviceStatus.canbus?.busLoad} highlight />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
