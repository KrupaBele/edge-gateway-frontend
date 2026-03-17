"use client"

import { ConfigSection, FormField, LiveDataPanel } from "./shared"
import { Badge } from "@/components/ui/badge"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface DigitalOutputsConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function DigitalOutputsConfig({ configData, deviceStatus, onConfigChange }: DigitalOutputsConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <ConfigSection title="Relay Configuration">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Relay 1 Label"
              type="text"
              value={configData.digitalOutputs.relay1Label}
              onChange={(v) => onConfigChange("digitalOutputs", "relay1Label", v)}
            />
            <FormField
              label="Relay 1 Default"
              type="select"
              value={configData.digitalOutputs.relay1Default}
              onChange={(v) => onConfigChange("digitalOutputs", "relay1Default", v)}
              options={["ON", "OFF"]}
            />
            <FormField
              label="Relay 1 Source"
              type="select"
              value={configData.digitalOutputs.relay1Source}
              onChange={(v) => onConfigChange("digitalOutputs", "relay1Source", v)}
              options={["Cloud", "Local", "Both"]}
            />
            <FormField
              label="Relay 2 Label"
              type="text"
              value={configData.digitalOutputs.relay2Label}
              onChange={(v) => onConfigChange("digitalOutputs", "relay2Label", v)}
            />
            <FormField
              label="Relay 2 Default"
              type="select"
              value={configData.digitalOutputs.relay2Default}
              onChange={(v) => onConfigChange("digitalOutputs", "relay2Default", v)}
              options={["ON", "OFF"]}
            />
            <FormField
              label="Relay 2 Source"
              type="select"
              value={configData.digitalOutputs.relay2Source}
              onChange={(v) => onConfigChange("digitalOutputs", "relay2Source", v)}
              options={["Cloud", "Local", "Both"]}
            />
          </div>
        </ConfigSection>
        <ConfigSection title="Settings">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Pulse Mode"
              type="select"
              value={configData.digitalOutputs.pulseMode}
              onChange={(v) => onConfigChange("digitalOutputs", "pulseMode", v)}
              options={["Latched", "Pulse"]}
            />
            <FormField
              label="Safety Interlock"
              type="text"
              value={configData.digitalOutputs.safetyInterlock}
              onChange={(v) => onConfigChange("digitalOutputs", "safetyInterlock", v)}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Status">
          <LiveDataPanel title="Digital Outputs" connected={true}>
            <div className="space-y-3">
              {[
                { label: configData.digitalOutputs.relay1Label, value: deviceStatus.digitalOutputs?.relay1 },
                { label: configData.digitalOutputs.relay2Label, value: deviceStatus.digitalOutputs?.relay2 },
              ].map((output, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{output.label}</span>
                  <Badge variant={output.value ? "default" : "secondary"}>{output.value ? "ON" : "OFF"}</Badge>
                </div>
              ))}
            </div>
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
