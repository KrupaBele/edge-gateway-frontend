"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon } from "lucide-react"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface SystemConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function SystemConfig({ configData, deviceStatus, onConfigChange }: SystemConfigProps) {
  const { theme, toggleTheme } = useTheme()

  const systemActions = [
    { label: "Export Config", action: "export" },
    { label: "Import Config", action: "import" },
    { label: "Check Firmware", action: "firmware" },
    { label: "View Logs", action: "logs" },
    { label: "Reboot Device", action: "reboot" },
    { label: "Factory Reset", action: "reset", danger: true },
  ]

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <ConfigSection title="Device Identity">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField
              label="Device ID"
              type="text"
              value={configData.system.deviceId}
              onChange={(v) => onConfigChange("system", "deviceId", v)}
            />
            <FormField
              label="Device Name"
              type="text"
              value={configData.system.deviceName}
              onChange={(v) => onConfigChange("system", "deviceName", v)}
            />
            <FormField
              label="Timezone"
              type="select"
              value={configData.system.timezone}
              onChange={(v) => onConfigChange("system", "timezone", v)}
              options={["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Tokyo"]}
            />
            <FormField
              label="NTP Server"
              type="text"
              value={configData.system.ntpServer}
              onChange={(v) => onConfigChange("system", "ntpServer", v)}
            />
            <FormField
              label="Log Level"
              type="select"
              value={configData.system.logLevel}
              onChange={(v) => onConfigChange("system", "logLevel", v)}
              options={["Error", "Warn", "Info", "Debug"]}
            />
            <FormField
              label="Debug Mode"
              type="select"
              value={configData.system.debugMode}
              onChange={(v) => onConfigChange("system", "debugMode", v)}
              options={["OFF", "UART", "Network"]}
            />
          </div>
          <FormField
            label="Auto Time Sync"
            type="toggle"
            value={configData.system.autoTimeSync}
            onChange={(v) => onConfigChange("system", "autoTimeSync", v)}
          />
        </ConfigSection>

        <ConfigSection title="Interface Settings">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              <div>
                <Label className="text-sm font-medium">Interface Theme</Label>
                <p className="text-xs text-muted-foreground">
                  {theme === "dark" ? "Dark mode (Industrial)" : "Light mode"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Dark</span>
              <Switch
                checked={theme === "light"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-xs text-muted-foreground">Light</span>
            </div>
          </div>
        </ConfigSection>

        <ConfigSection title="System Actions">
          <div className="grid grid-cols-3 gap-3">
            {systemActions.map((btn) => (
              <Button key={btn.action} variant={btn.danger ? "destructive" : "outline"} className="justify-center">
                {btn.label}
              </Button>
            ))}
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="System Status">
          <LiveDataPanel title="System Status" connected={true}>
            <LiveDataRow label="Uptime" value={deviceStatus.system?.uptime} highlight />
            <LiveDataRow label="Firmware" value={deviceStatus.system?.firmware} />
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-muted-foreground">CPU</span>
                  <span className="text-sm font-mono text-primary">{deviceStatus.system?.cpu}%</span>
                </div>
                <Progress value={deviceStatus.system?.cpu || 0} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Memory</span>
                  <span className="text-sm font-mono text-primary">{deviceStatus.system?.memory}%</span>
                </div>
                <Progress value={deviceStatus.system?.memory || 0} className="h-1.5" />
              </div>
              <LiveDataRow label="Temperature" value={`${deviceStatus.system?.temp}°C`} />
            </div>
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
