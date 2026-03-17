"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import { Progress } from "@/components/ui/progress"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface FuelConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function FuelConfig({ configData, deviceStatus, onConfigChange }: FuelConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Hardware Settings">
            <div className="space-y-4">
              <FormField
                label="Port"
                type="select"
                value={configData.fuel.port}
                onChange={(v) => onConfigChange("fuel", "port", v)}
                options={["Analog", "RS485", "CAN"]}
              />
              <FormField
                label="Sensor Type"
                type="select"
                value={configData.fuel.sensorType}
                onChange={(v) => onConfigChange("fuel", "sensorType", v)}
                options={["Resistive", "Capacitive", "Ultrasonic"]}
              />
              <FormField
                label="RS485 Address"
                type="text"
                value={configData.fuel.rs485Address}
                onChange={(v) => onConfigChange("fuel", "rs485Address", v)}
              />
              <FormField
                label="RS485 Baud"
                type="select"
                value={configData.fuel.rs485Baud}
                onChange={(v) => onConfigChange("fuel", "rs485Baud", v)}
                options={["9600", "19200", "38400"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Tank Configuration">
            <div className="space-y-4">
              <FormField
                label="Tank Capacity (Liters)"
                type="text"
                value={configData.fuel.tankCapacity}
                onChange={(v) => onConfigChange("fuel", "tankCapacity", v)}
              />
              <FormField
                label="Smoothing"
                type="select"
                value={configData.fuel.smoothing}
                onChange={(v) => onConfigChange("fuel", "smoothing", v)}
                options={["OFF", "Low", "Medium", "High"]}
              />
              <FormField
                label="Theft Threshold (%)"
                type="text"
                value={configData.fuel.theftThreshold}
                onChange={(v) => onConfigChange("fuel", "theftThreshold", v)}
              />
              <FormField
                label="Refuel Threshold (%)"
                type="text"
                value={configData.fuel.refuelThreshold}
                onChange={(v) => onConfigChange("fuel", "refuelThreshold", v)}
              />
            </div>
          </ConfigSection>
        </div>
        <ConfigSection title="Cloud Configuration">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Push Mode"
              type="select"
              value={configData.fuel.pushMode}
              onChange={(v) => onConfigChange("fuel", "pushMode", v)}
              options={["On Change", "Interval"]}
            />
            <FormField
              label="Push Interval"
              type="select"
              value={configData.fuel.pushInterval}
              onChange={(v) => onConfigChange("fuel", "pushInterval", v)}
              options={["30s", "60s", "300s"]}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="Fuel Sensor Status" connected={deviceStatus.fuel?.connected}>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-muted-foreground">Fuel Level</span>
                <span className="text-sm font-mono text-primary">{deviceStatus.fuel?.level}%</span>
              </div>
              <Progress value={deviceStatus.fuel?.level || 0} className="h-2" />
            </div>
            <LiveDataRow label="Volume" value={deviceStatus.fuel?.volume} highlight />
            <LiveDataRow label="Temperature" value={`${deviceStatus.fuel?.temp}°C`} />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
