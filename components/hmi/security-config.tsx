"use client"

import { ConfigSection, FormField } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface SecurityConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function SecurityConfig({ configData, deviceStatus, onConfigChange }: SecurityConfigProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <ConfigSection title="Authentication">
        <div className="space-y-4">
          <FormField
            label="Admin Password"
            type="password"
            value={configData.security.adminPassword}
            onChange={(v) => onConfigChange("security", "adminPassword", v)}
          />
          <FormField
            label="Session Timeout"
            type="select"
            value={configData.security.sessionTimeout}
            onChange={(v) => onConfigChange("security", "sessionTimeout", v)}
            options={["5min", "15min", "30min", "60min"]}
          />
        </div>
      </ConfigSection>
      <ConfigSection title="Network Security">
        <div className="space-y-4">
          <FormField
            label="Firewall Enable"
            type="toggle"
            value={configData.security.firewallEnable}
            onChange={(v) => onConfigChange("security", "firewallEnable", v)}
          />
          <FormField
            label="Allowed IPs"
            type="text"
            value={configData.security.allowedIps}
            onChange={(v) => onConfigChange("security", "allowedIps", v)}
            placeholder="e.g., 192.168.1.0/24"
          />
          <FormField
            label="VPN"
            type="select"
            value={configData.security.vpn}
            onChange={(v) => onConfigChange("security", "vpn", v)}
            options={["OFF", "OpenVPN", "WireGuard"]}
          />
          <FormField
            label="VPN Config"
            type="text"
            value={configData.security.vpnConfig}
            onChange={(v) => onConfigChange("security", "vpnConfig", v)}
            placeholder="Path to VPN config file"
          />
        </div>
      </ConfigSection>
    </div>
  )
}
