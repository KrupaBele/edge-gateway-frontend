"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface DMSConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function DMSConfig({ configData, deviceStatus, onConfigChange }: DMSConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Camera Settings">
            <div className="space-y-4">
              <FormField
                label="Port"
                type="select"
                value={configData.dms.port}
                onChange={(v) => onConfigChange("dms", "port", v)}
                options={["USB", "MIPI CSI", "IP"]}
              />
              <FormField
                label="Resolution"
                type="select"
                value={configData.dms.resolution}
                onChange={(v) => onConfigChange("dms", "resolution", v)}
                options={["480p", "720p", "1080p"]}
              />
              <FormField
                label="IR Illumination"
                type="select"
                value={configData.dms.irIllumination}
                onChange={(v) => onConfigChange("dms", "irIllumination", v)}
                options={["OFF", "Auto", "ON"]}
              />
              <FormField
                label="Detection Mode"
                type="select"
                value={configData.dms.detectionMode}
                onChange={(v) => onConfigChange("dms", "detectionMode", v)}
                options={["Drowsiness", "Distraction", "Both"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Detection Settings">
            <div className="space-y-4">
              <FormField
                label="Drowsiness Threshold"
                type="select"
                value={configData.dms.drowsinessThreshold}
                onChange={(v) => onConfigChange("dms", "drowsinessThreshold", v)}
                options={["Low", "Medium", "High"]}
              />
              <FormField
                label="Distraction Threshold"
                type="select"
                value={configData.dms.distractionThreshold}
                onChange={(v) => onConfigChange("dms", "distractionThreshold", v)}
                options={["1s", "2s", "3s", "5s"]}
              />
              <FormField
                label="Phone Detection"
                type="toggle"
                value={configData.dms.phoneDetection}
                onChange={(v) => onConfigChange("dms", "phoneDetection", v)}
              />
              <FormField
                label="Smoking Detection"
                type="toggle"
                value={configData.dms.smokingDetection}
                onChange={(v) => onConfigChange("dms", "smokingDetection", v)}
              />
              <FormField
                label="Seatbelt Detection"
                type="toggle"
                value={configData.dms.seatbeltDetection}
                onChange={(v) => onConfigChange("dms", "seatbeltDetection", v)}
              />
            </div>
          </ConfigSection>
        </div>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="DMS Status" connected={deviceStatus.dms?.connected}>
            <LiveDataRow label="Driver State" value={deviceStatus.dms?.driver} highlight />
            <LiveDataRow label="Attention Score" value={`${deviceStatus.dms?.attention}%`} highlight />
            <LiveDataRow label="Drowsiness" value={deviceStatus.dms?.drowsiness} />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
