"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface BluetoothConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function BluetoothConfig({ configData, deviceStatus, onConfigChange }: BluetoothConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <ConfigSection title="Bluetooth Settings">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField
              label="Mode"
              type="select"
              value={configData.bluetooth.mode}
              onChange={(v) => onConfigChange("bluetooth", "mode", v)}
              options={["Classic", "BLE", "Dual"]}
            />
            <FormField
              label="Device Name"
              type="text"
              value={configData.bluetooth.deviceName}
              onChange={(v) => onConfigChange("bluetooth", "deviceName", v)}
            />
            <FormField
              label="Pairing Mode"
              type="select"
              value={configData.bluetooth.pairingMode}
              onChange={(v) => onConfigChange("bluetooth", "pairingMode", v)}
              options={["PIN", "Just Works", "OOB"]}
            />
            <FormField
              label="PIN Code"
              type="text"
              value={configData.bluetooth.pinCode}
              onChange={(v) => onConfigChange("bluetooth", "pinCode", v)}
            />
            <FormField
              label="BLE Scan Interval"
              type="select"
              value={configData.bluetooth.scanInterval}
              onChange={(v) => onConfigChange("bluetooth", "scanInterval", v)}
              options={["1s", "5s", "10s"]}
            />
            <FormField
              label="Beacon Parsing"
              type="select"
              value={configData.bluetooth.beaconParsing}
              onChange={(v) => onConfigChange("bluetooth", "beaconParsing", v)}
              options={["iBeacon", "Eddystone", "Custom"]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Discoverable"
              type="toggle"
              value={configData.bluetooth.discoverable}
              onChange={(v) => onConfigChange("bluetooth", "discoverable", v)}
            />
            <FormField
              label="Auto Connect"
              type="toggle"
              value={configData.bluetooth.autoConnect}
              onChange={(v) => onConfigChange("bluetooth", "autoConnect", v)}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="Bluetooth Status" connected={deviceStatus.bluetooth?.connected}>
            <LiveDataRow label="Device Name" value={deviceStatus.bluetooth?.name} />
            <LiveDataRow label="Paired Devices" value={deviceStatus.bluetooth?.devices} highlight />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
