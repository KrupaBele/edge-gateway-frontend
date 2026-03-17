"use client"

import { ConfigSection, FormField, LiveDataPanel } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface TPMSConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function TPMSConfig({ configData, deviceStatus, onConfigChange }: TPMSConfigProps) {
  const tires = [
    { label: "Front Left", pressure: deviceStatus.tpms?.fl, temp: deviceStatus.tpms?.flTemp },
    { label: "Front Right", pressure: deviceStatus.tpms?.fr, temp: deviceStatus.tpms?.frTemp },
    { label: "Rear Left", pressure: deviceStatus.tpms?.rl, temp: deviceStatus.tpms?.rlTemp },
    { label: "Rear Right", pressure: deviceStatus.tpms?.rr, temp: deviceStatus.tpms?.rrTemp },
  ]

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Sensor Settings">
            <div className="space-y-4">
              <FormField
                label="Interface"
                type="select"
                value={configData.tpms.interface}
                onChange={(v) => onConfigChange("tpms", "interface", v)}
                options={["RF 433MHz", "BLE", "CAN"]}
              />
              <FormField
                label="Pressure Unit"
                type="select"
                value={configData.tpms.pressureUnit}
                onChange={(v) => onConfigChange("tpms", "pressureUnit", v)}
                options={["PSI", "kPa", "Bar"]}
              />
              <FormField
                label="Temperature Unit"
                type="select"
                value={configData.tpms.tempUnit}
                onChange={(v) => onConfigChange("tpms", "tempUnit", v)}
                options={["°C", "°F"]}
              />
              <FormField
                label="Push Interval"
                type="select"
                value={configData.tpms.pushInterval}
                onChange={(v) => onConfigChange("tpms", "pushInterval", v)}
                options={["60s", "300s", "600s"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Thresholds">
            <div className="space-y-4">
              <FormField
                label="Low Pressure (PSI)"
                type="text"
                value={configData.tpms.lowPressure}
                onChange={(v) => onConfigChange("tpms", "lowPressure", v)}
              />
              <FormField
                label="High Pressure (PSI)"
                type="text"
                value={configData.tpms.highPressure}
                onChange={(v) => onConfigChange("tpms", "highPressure", v)}
              />
              <FormField
                label="High Temperature (°C)"
                type="text"
                value={configData.tpms.highTemp}
                onChange={(v) => onConfigChange("tpms", "highTemp", v)}
              />
            </div>
          </ConfigSection>
        </div>
      </div>
      <div>
        <ConfigSection title="Tire Pressures">
          <LiveDataPanel title="TPMS Status" connected={deviceStatus.tpms?.connected}>
            <div className="grid grid-cols-2 gap-3">
              {tires.map((tire, i) => (
                <div key={i} className="text-center p-4 bg-background rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1 uppercase">{tire.label}</div>
                  <div className="text-2xl font-bold text-primary font-mono">{tire.pressure}</div>
                  <div className="text-xs text-muted-foreground">PSI</div>
                  <div className="text-xs text-muted-foreground mt-1">{tire.temp}°C</div>
                </div>
              ))}
            </div>
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
