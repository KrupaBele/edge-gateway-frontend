"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface RadarConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function RadarConfig({ configData, deviceStatus, onConfigChange }: RadarConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Hardware Settings">
            <div className="space-y-4">
              <FormField
                label="Port"
                type="select"
                value={configData.radar.port}
                onChange={(v) => onConfigChange("radar", "port", v)}
                options={["CAN", "UART", "Ethernet"]}
              />
              <FormField
                label="CAN Baud Rate"
                type="select"
                value={configData.radar.canBaud}
                onChange={(v) => onConfigChange("radar", "canBaud", v)}
                options={["250K", "500K", "1M"]}
              />
              <FormField
                label="Detection Range"
                type="select"
                value={configData.radar.detectionRange}
                onChange={(v) => onConfigChange("radar", "detectionRange", v)}
                options={["Short", "Medium", "Long"]}
              />
              <FormField
                label="Object Filter"
                type="select"
                value={configData.radar.objectFilter}
                onChange={(v) => onConfigChange("radar", "objectFilter", v)}
                options={["All", "Vehicles Only", "Pedestrians Only"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="ADAS Settings">
            <div className="space-y-4">
              <FormField
                label="Tracking Mode"
                type="toggle"
                value={configData.radar.trackingMode}
                onChange={(v) => onConfigChange("radar", "trackingMode", v)}
              />
              <FormField
                label="FCW Enable"
                type="toggle"
                value={configData.radar.fcwEnable}
                onChange={(v) => onConfigChange("radar", "fcwEnable", v)}
              />
              <FormField
                label="FCW Threshold (TTC)"
                type="select"
                value={configData.radar.fcwThreshold}
                onChange={(v) => onConfigChange("radar", "fcwThreshold", v)}
                options={["1s", "1.5s", "2s", "2.5s"]}
              />
              <FormField
                label="Output Format"
                type="select"
                value={configData.radar.outputFormat}
                onChange={(v) => onConfigChange("radar", "outputFormat", v)}
                options={["Raw Objects", "Processed Alerts"]}
              />
              <FormField
                label="Push Mode"
                type="select"
                value={configData.radar.pushMode}
                onChange={(v) => onConfigChange("radar", "pushMode", v)}
                options={["Continuous", "Event Only"]}
              />
            </div>
          </ConfigSection>
        </div>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="Radar Status" connected={deviceStatus.radar?.connected}>
            <LiveDataRow label="Objects Detected" value={deviceStatus.radar?.objects} highlight />
            <LiveDataRow label="Closest Object" value={deviceStatus.radar?.closestDistance} highlight />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
