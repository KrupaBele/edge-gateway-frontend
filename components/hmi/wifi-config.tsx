"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface WiFiConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function WiFiConfig({ configData, deviceStatus, onConfigChange }: WiFiConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <ConfigSection title="Access Point Settings">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField
              label="Mode"
              type="select"
              value={configData.wifi.mode}
              onChange={(v) => onConfigChange("wifi", "mode", v)}
              options={["Client", "Access Point", "Dual"]}
            />
            <FormField
              label="SSID"
              type="text"
              value={configData.wifi.ssid}
              onChange={(v) => onConfigChange("wifi", "ssid", v)}
            />
            <FormField
              label="Password"
              type="password"
              value={configData.wifi.password}
              onChange={(v) => onConfigChange("wifi", "password", v)}
            />
            <FormField
              label="Security"
              type="select"
              value={configData.wifi.security}
              onChange={(v) => onConfigChange("wifi", "security", v)}
              options={["WPA2", "WPA3"]}
            />
            <FormField
              label="Channel"
              type="select"
              value={configData.wifi.channel}
              onChange={(v) => onConfigChange("wifi", "channel", v)}
              options={["Auto", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]}
            />
            <FormField
              label="Max Clients"
              type="select"
              value={configData.wifi.maxClients}
              onChange={(v) => onConfigChange("wifi", "maxClients", v)}
              options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            />
          </div>
          <FormField
            label="Auto Reconnect"
            type="toggle"
            value={configData.wifi.autoReconnect}
            onChange={(v) => onConfigChange("wifi", "autoReconnect", v)}
          />
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="Wi-Fi Status" connected={deviceStatus.wifi?.connected}>
            <LiveDataRow label="SSID" value={deviceStatus.wifi?.ssid} />
            <LiveDataRow label="Connected Clients" value={deviceStatus.wifi?.clients} highlight />
            <LiveDataRow label="IP Address" value={deviceStatus.wifi?.ip} />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
