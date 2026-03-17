"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface DisplayConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function DisplayConfig({ configData, deviceStatus, onConfigChange }: DisplayConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Display Output Configuration"
        description="Configure external display output for HMI screens and driver information displays"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Display Settings">
              <div className="space-y-4">
                <FormField
                  label="Output Port"
                  type="select"
                  value={configData.display.port}
                  onChange={(v) => onConfigChange("display", "port", v)}
                  options={["HDMI", "LVDS", "MIPI DSI", "VGA"]}
                />
                <FormField
                  label="Resolution"
                  type="select"
                  value={configData.display.resolution}
                  onChange={(v) => onConfigChange("display", "resolution", v)}
                  options={["800x480", "1024x600", "1280x720", "1920x1080"]}
                />
                <FormField
                  label="Orientation"
                  type="select"
                  value={configData.display.orientation}
                  onChange={(v) => onConfigChange("display", "orientation", v)}
                  options={["Landscape", "Portrait", "Landscape Inverted", "Portrait Inverted"]}
                />
                <FormField
                  label="Brightness"
                  type="text"
                  value={configData.display.brightness}
                  onChange={(v) => onConfigChange("display", "brightness", v)}
                  unit="%"
                />
                <FormField
                  label="Screen Timeout"
                  type="select"
                  value={configData.display.timeout}
                  onChange={(v) => onConfigChange("display", "timeout", v)}
                  options={["Never", "1min", "5min", "10min", "30min"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Interface Settings">
              <div className="space-y-4">
                <FormField
                  label="Touch Enable"
                  type="toggle"
                  value={configData.display.touchEnable}
                  onChange={(v) => onConfigChange("display", "touchEnable", v)}
                />
                <FormField
                  label="Splash Screen"
                  type="select"
                  value={configData.display.splashScreen}
                  onChange={(v) => onConfigChange("display", "splashScreen", v)}
                  options={["Default", "Custom", "None"]}
                />
                <FormField
                  label="Status Bar"
                  type="toggle"
                  value={configData.display.statusBar}
                  onChange={(v) => onConfigChange("display", "statusBar", v)}
                  tooltip="Show system status bar on display"
                />
                <FormField
                  label="Alert Popups"
                  type="toggle"
                  value={configData.display.alertPopups}
                  onChange={(v) => onConfigChange("display", "alertPopups", v)}
                  tooltip="Show alert notifications on screen"
                />
              </div>
            </ConfigSection>
          </div>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="Display Status" connected={deviceStatus.display?.connected}>
              <LiveDataRow label="Resolution" value={deviceStatus.display?.resolution} />
              <LiveDataRow label="Status" value={deviceStatus.display?.connected ? "Active" : "No Display"} />
            </LiveDataPanel>
          </ConfigSection>
        </div>
      </div>
    </div>
  )
}
