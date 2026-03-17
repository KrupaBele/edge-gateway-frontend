"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader, GaugeDisplay } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface TemperatureConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function TemperatureConfig({ configData, deviceStatus, onConfigChange }: TemperatureConfigProps) {
  const sensors = deviceStatus.temperature?.sensors || []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Temperature Sensors"
        description="Configure temperature monitoring sensors for ambient, engine, and cargo monitoring"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Sensor 1 - Ambient">
              <div className="space-y-4">
                <FormField
                  label="Sensor Type"
                  type="select"
                  value={configData.temperature.sensor1Type}
                  onChange={(v) => onConfigChange("temperature", "sensor1Type", v)}
                  options={["NTC", "PTC", "K-Type", "PT100", "Digital"]}
                />
                <FormField
                  label="Label"
                  type="text"
                  value={configData.temperature.sensor1Label}
                  onChange={(v) => onConfigChange("temperature", "sensor1Label", v)}
                />
                <FormField
                  label="Offset"
                  type="text"
                  value={configData.temperature.sensor1Offset}
                  onChange={(v) => onConfigChange("temperature", "sensor1Offset", v)}
                  unit="°C"
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Sensor 2 - Engine">
              <div className="space-y-4">
                <FormField
                  label="Sensor Type"
                  type="select"
                  value={configData.temperature.sensor2Type}
                  onChange={(v) => onConfigChange("temperature", "sensor2Type", v)}
                  options={["NTC", "PTC", "K-Type", "PT100", "Digital"]}
                />
                <FormField
                  label="Label"
                  type="text"
                  value={configData.temperature.sensor2Label}
                  onChange={(v) => onConfigChange("temperature", "sensor2Label", v)}
                />
                <FormField
                  label="Offset"
                  type="text"
                  value={configData.temperature.sensor2Offset}
                  onChange={(v) => onConfigChange("temperature", "sensor2Offset", v)}
                  unit="°C"
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Sensor 3 - Cargo">
              <div className="space-y-4">
                <FormField
                  label="Sensor Type"
                  type="select"
                  value={configData.temperature.sensor3Type}
                  onChange={(v) => onConfigChange("temperature", "sensor3Type", v)}
                  options={["NTC", "PTC", "K-Type", "PT100", "Digital"]}
                />
                <FormField
                  label="Label"
                  type="text"
                  value={configData.temperature.sensor3Label}
                  onChange={(v) => onConfigChange("temperature", "sensor3Label", v)}
                />
                <FormField
                  label="Offset"
                  type="text"
                  value={configData.temperature.sensor3Offset}
                  onChange={(v) => onConfigChange("temperature", "sensor3Offset", v)}
                  unit="°C"
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Sensor 4 - Coolant">
              <div className="space-y-4">
                <FormField
                  label="Sensor Type"
                  type="select"
                  value={configData.temperature.sensor4Type}
                  onChange={(v) => onConfigChange("temperature", "sensor4Type", v)}
                  options={["NTC", "PTC", "K-Type", "PT100", "Digital"]}
                />
                <FormField
                  label="Label"
                  type="text"
                  value={configData.temperature.sensor4Label}
                  onChange={(v) => onConfigChange("temperature", "sensor4Label", v)}
                />
                <FormField
                  label="Offset"
                  type="text"
                  value={configData.temperature.sensor4Offset}
                  onChange={(v) => onConfigChange("temperature", "sensor4Offset", v)}
                  unit="°C"
                />
              </div>
            </ConfigSection>
          </div>

          <ConfigSection title="Alarm Settings">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                label="High Alarm"
                type="text"
                value={configData.temperature.highAlarm}
                onChange={(v) => onConfigChange("temperature", "highAlarm", v)}
                unit="°C"
              />
              <FormField
                label="Low Alarm"
                type="text"
                value={configData.temperature.lowAlarm}
                onChange={(v) => onConfigChange("temperature", "lowAlarm", v)}
                unit="°C"
              />
              <FormField
                label="Push Interval"
                type="select"
                value={configData.temperature.pushInterval}
                onChange={(v) => onConfigChange("temperature", "pushInterval", v)}
                options={["30s", "60s", "120s", "300s"]}
              />
            </div>
          </ConfigSection>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="Temperature Readings" connected={deviceStatus.temperature?.connected}>
              {sensors.map((temp, index) => (
                <LiveDataRow key={index} label={`Sensor ${index + 1}`} value={temp} highlight />
              ))}
            </LiveDataPanel>
          </ConfigSection>

          {sensors[0] && (
            <GaugeDisplay
              label="Ambient Temp"
              value={Number.parseInt(sensors[0]) || 0}
              min={-20}
              max={60}
              unit="°C"
              thresholds={{ warning: 40, danger: 50 }}
            />
          )}

          {sensors[1] && (
            <GaugeDisplay
              label="Engine Temp"
              value={Number.parseInt(sensors[1]) || 0}
              min={0}
              max={120}
              unit="°C"
              thresholds={{ warning: 95, danger: 105 }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
