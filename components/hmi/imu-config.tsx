"use client"

import { ConfigSection, FormField, LiveDataPanel } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface IMUConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function IMUConfig({ configData, deviceStatus, onConfigChange }: IMUConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Hardware Settings">
            <div className="space-y-4">
              <FormField
                label="Port"
                type="select"
                value={configData.imu.port}
                onChange={(v) => onConfigChange("imu", "port", v)}
                options={["I2C", "SPI", "UART"]}
              />
              <FormField
                label="I2C Address"
                type="select"
                value={configData.imu.i2cAddress}
                onChange={(v) => onConfigChange("imu", "i2cAddress", v)}
                options={["0x68", "0x69"]}
              />
              <FormField
                label="Sample Rate"
                type="select"
                value={configData.imu.sampleRate}
                onChange={(v) => onConfigChange("imu", "sampleRate", v)}
                options={["10Hz", "50Hz", "100Hz", "200Hz"]}
              />
              <FormField
                label="Accelerometer Range"
                type="select"
                value={configData.imu.accelRange}
                onChange={(v) => onConfigChange("imu", "accelRange", v)}
                options={["±2g", "±4g", "±8g", "±16g"]}
              />
              <FormField
                label="Gyroscope Range"
                type="select"
                value={configData.imu.gyroRange}
                onChange={(v) => onConfigChange("imu", "gyroRange", v)}
                options={["±250 dps", "±500 dps", "±1000 dps", "±2000 dps"]}
              />
              <FormField
                label="Filter"
                type="select"
                value={configData.imu.filter}
                onChange={(v) => onConfigChange("imu", "filter", v)}
                options={["Low Pass", "Kalman", "Complementary"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Event Detection">
            <div className="space-y-4">
              <FormField
                label="Harsh Event Threshold (g)"
                type="text"
                value={configData.imu.harshThreshold}
                onChange={(v) => onConfigChange("imu", "harshThreshold", v)}
              />
              <FormField
                label="Harsh Event Types"
                type="text"
                value={configData.imu.harshTypes}
                onChange={(v) => onConfigChange("imu", "harshTypes", v)}
                placeholder="Accel,Brake,Turn,Impact"
              />
              <FormField
                label="Push Mode"
                type="select"
                value={configData.imu.pushMode}
                onChange={(v) => onConfigChange("imu", "pushMode", v)}
                options={["Continuous", "Event Only"]}
              />
            </div>
          </ConfigSection>
        </div>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="IMU Status" connected={deviceStatus.imu?.connected}>
            <div className="mb-4">
              <div className="text-xs text-muted-foreground mb-2">ACCELEROMETER (g)</div>
              <div className="grid grid-cols-3 gap-2">
                {["X", "Y", "Z"].map((axis) => (
                  <div key={axis} className="text-center p-2 bg-background rounded">
                    <div className="text-xs text-muted-foreground">{axis}</div>
                    <div className="text-base font-mono text-primary">
                      {deviceStatus.imu?.[`accel${axis}` as keyof typeof deviceStatus.imu]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">GYROSCOPE (deg/s)</div>
              <div className="grid grid-cols-3 gap-2">
                {["X", "Y", "Z"].map((axis) => (
                  <div key={axis} className="text-center p-2 bg-background rounded">
                    <div className="text-xs text-muted-foreground">{axis}</div>
                    <div className="text-base font-mono text-primary">
                      {deviceStatus.imu?.[`gyro${axis}` as keyof typeof deviceStatus.imu]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
