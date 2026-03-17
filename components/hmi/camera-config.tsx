"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface CameraConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function CameraConfig({ configData, deviceStatus, onConfigChange }: CameraConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Camera Settings">
            <div className="space-y-4">
              <FormField
                label="Port"
                type="select"
                value={configData.camera.port}
                onChange={(v) => onConfigChange("camera", "port", v)}
                options={["MIPI CSI", "USB", "IP"]}
              />
              <FormField
                label="Resolution"
                type="select"
                value={configData.camera.resolution}
                onChange={(v) => onConfigChange("camera", "resolution", v)}
                options={["720p", "1080p", "4K"]}
              />
              <FormField
                label="Frame Rate"
                type="select"
                value={configData.camera.frameRate}
                onChange={(v) => onConfigChange("camera", "frameRate", v)}
                options={["15fps", "30fps", "60fps"]}
              />
              <FormField
                label="Encoding"
                type="select"
                value={configData.camera.encoding}
                onChange={(v) => onConfigChange("camera", "encoding", v)}
                options={["H.264", "H.265", "MJPEG"]}
              />
              <FormField
                label="Bitrate"
                type="select"
                value={configData.camera.bitrate}
                onChange={(v) => onConfigChange("camera", "bitrate", v)}
                options={["2Mbps", "4Mbps", "8Mbps"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Recording Settings">
            <div className="space-y-4">
              <FormField
                label="Recording Mode"
                type="select"
                value={configData.camera.recordingMode}
                onChange={(v) => onConfigChange("camera", "recordingMode", v)}
                options={["Continuous", "Event", "Scheduled"]}
              />
              <FormField
                label="Pre-Event Buffer"
                type="select"
                value={configData.camera.preEventBuffer}
                onChange={(v) => onConfigChange("camera", "preEventBuffer", v)}
                options={["10s", "30s", "60s"]}
              />
              <FormField
                label="Post-Event Buffer"
                type="select"
                value={configData.camera.postEventBuffer}
                onChange={(v) => onConfigChange("camera", "postEventBuffer", v)}
                options={["10s", "30s", "60s"]}
              />
              <FormField
                label="Event Triggers"
                type="text"
                value={configData.camera.eventTriggers}
                onChange={(v) => onConfigChange("camera", "eventTriggers", v)}
              />
              <FormField
                label="Storage Path"
                type="select"
                value={configData.camera.storagePath}
                onChange={(v) => onConfigChange("camera", "storagePath", v)}
                options={["SD Card", "USB", "Cloud"]}
              />
            </div>
          </ConfigSection>
        </div>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="Camera Status" connected={deviceStatus.camera?.connected}>
            <LiveDataRow label="Recording" value={deviceStatus.camera?.recording ? "Active" : "Idle"} highlight />
            <LiveDataRow label="Storage Used" value={deviceStatus.camera?.storage} />
            <LiveDataRow label="Events" value={deviceStatus.camera?.events} highlight />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
