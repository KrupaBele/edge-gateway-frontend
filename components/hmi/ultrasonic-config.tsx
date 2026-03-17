"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface UltrasonicConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function UltrasonicConfig({ configData, deviceStatus, onConfigChange }: UltrasonicConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ultrasonic Sensor Configuration"
        description="Configure ultrasonic distance sensors for obstacle detection and parking assistance"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Hardware Settings">
              <div className="space-y-4">
                <FormField
                  label="Port"
                  type="select"
                  value={configData.ultrasonic.port}
                  onChange={(v) => onConfigChange("ultrasonic", "port", v)}
                  options={["GPIO", "I2C", "UART"]}
                />
                <FormField
                  label="Sensor Count"
                  type="select"
                  value={configData.ultrasonic.sensorCount}
                  onChange={(v) => onConfigChange("ultrasonic", "sensorCount", v)}
                  options={["1", "2", "4", "6", "8"]}
                />
                <FormField
                  label="Measure Mode"
                  type="select"
                  value={configData.ultrasonic.measureMode}
                  onChange={(v) => onConfigChange("ultrasonic", "measureMode", v)}
                  options={["Sequential", "Parallel", "Alternating"]}
                />
                <FormField
                  label="Update Rate"
                  type="select"
                  value={configData.ultrasonic.updateRate}
                  onChange={(v) => onConfigChange("ultrasonic", "updateRate", v)}
                  options={["50ms", "100ms", "200ms", "500ms"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Detection Range">
              <div className="space-y-4">
                <FormField
                  label="Minimum Range"
                  type="text"
                  value={configData.ultrasonic.rangeMin}
                  onChange={(v) => onConfigChange("ultrasonic", "rangeMin", v)}
                  unit="cm"
                />
                <FormField
                  label="Maximum Range"
                  type="text"
                  value={configData.ultrasonic.rangeMax}
                  onChange={(v) => onConfigChange("ultrasonic", "rangeMax", v)}
                  unit="cm"
                />
                <FormField
                  label="Resolution"
                  type="select"
                  value={configData.ultrasonic.resolution}
                  onChange={(v) => onConfigChange("ultrasonic", "resolution", v)}
                  options={["1", "5", "10"]}
                  unit="cm"
                />
                <FormField
                  label="Temp Compensation"
                  type="toggle"
                  value={configData.ultrasonic.temperatureComp}
                  onChange={(v) => onConfigChange("ultrasonic", "temperatureComp", v)}
                  tooltip="Compensate distance readings based on temperature"
                />
              </div>
            </ConfigSection>
          </div>

          <ConfigSection title="Alert Settings">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Obstacle Alert"
                type="toggle"
                value={configData.ultrasonic.obstacleAlert}
                onChange={(v) => onConfigChange("ultrasonic", "obstacleAlert", v)}
              />
              <FormField
                label="Alert Distance"
                type="text"
                value={configData.ultrasonic.alertDistance}
                onChange={(v) => onConfigChange("ultrasonic", "alertDistance", v)}
                unit="cm"
              />
            </div>
          </ConfigSection>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="Ultrasonic Status" connected={deviceStatus.ultrasonic?.connected}>
              <LiveDataRow label="Total Sensors" value={deviceStatus.ultrasonic?.sensors} />
              <LiveDataRow label="Active" value={deviceStatus.ultrasonic?.active} highlight />
              <LiveDataRow label="Status" value={deviceStatus.ultrasonic?.connected ? "Scanning" : "Idle"} />
            </LiveDataPanel>
          </ConfigSection>
        </div>
      </div>
    </div>
  )
}
