"use client"

import { ConfigSection, FormField, LiveDataPanel } from "./shared"
import { Badge } from "@/components/ui/badge"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface DigitalInputsConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function DigitalInputsConfig({ configData, deviceStatus, onConfigChange }: DigitalInputsConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <ConfigSection title="GPIO Configuration">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="GPIO 1 Label"
              type="text"
              value={configData.digitalInputs.gpio1Label}
              onChange={(v) => onConfigChange("digitalInputs", "gpio1Label", v)}
            />
            <FormField
              label="GPIO 1 Type"
              type="select"
              value={configData.digitalInputs.gpio1Type}
              onChange={(v) => onConfigChange("digitalInputs", "gpio1Type", v)}
              options={["Active High", "Active Low"]}
            />
            <FormField
              label="GPIO 2 Label"
              type="text"
              value={configData.digitalInputs.gpio2Label}
              onChange={(v) => onConfigChange("digitalInputs", "gpio2Label", v)}
            />
            <FormField
              label="GPIO 2 Type"
              type="select"
              value={configData.digitalInputs.gpio2Type}
              onChange={(v) => onConfigChange("digitalInputs", "gpio2Type", v)}
              options={["Active High", "Active Low"]}
            />
            <FormField
              label="GPIO 3 Label"
              type="text"
              value={configData.digitalInputs.gpio3Label}
              onChange={(v) => onConfigChange("digitalInputs", "gpio3Label", v)}
            />
            <FormField
              label="GPIO 3 Type"
              type="select"
              value={configData.digitalInputs.gpio3Type}
              onChange={(v) => onConfigChange("digitalInputs", "gpio3Type", v)}
              options={["Active High", "Active Low"]}
            />
            <FormField
              label="GPIO 4 Label"
              type="text"
              value={configData.digitalInputs.gpio4Label}
              onChange={(v) => onConfigChange("digitalInputs", "gpio4Label", v)}
            />
            <FormField
              label="GPIO 4 Type"
              type="select"
              value={configData.digitalInputs.gpio4Type}
              onChange={(v) => onConfigChange("digitalInputs", "gpio4Type", v)}
              options={["Active High", "Active Low"]}
            />
          </div>
        </ConfigSection>
        <ConfigSection title="Settings">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Debounce"
              type="select"
              value={configData.digitalInputs.debounce}
              onChange={(v) => onConfigChange("digitalInputs", "debounce", v)}
              options={["50ms", "100ms", "200ms"]}
            />
            <FormField
              label="Alert On Change"
              type="toggle"
              value={configData.digitalInputs.alertOnChange}
              onChange={(v) => onConfigChange("digitalInputs", "alertOnChange", v)}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Status">
          <LiveDataPanel title="Digital Inputs" connected={true}>
            <div className="space-y-3">
              {[
                { label: configData.digitalInputs.gpio1Label, value: deviceStatus.digitalInputs?.ignition },
                { label: configData.digitalInputs.gpio2Label, value: deviceStatus.digitalInputs?.door },
                { label: configData.digitalInputs.gpio3Label, value: deviceStatus.digitalInputs?.seatbelt },
                { label: configData.digitalInputs.gpio4Label, value: deviceStatus.digitalInputs?.pto },
              ].map((input, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{input.label}</span>
                  <Badge variant={input.value ? "default" : "secondary"}>{input.value ? "ON" : "OFF"}</Badge>
                </div>
              ))}
            </div>
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
