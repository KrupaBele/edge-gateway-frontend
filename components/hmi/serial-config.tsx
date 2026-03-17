"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface SerialConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function SerialConfig({ configData, deviceStatus, onConfigChange }: SerialConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader title="Serial Port Configuration" description="Configure RS232/RS485 serial communication ports" />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Serial Port 1">
              <div className="space-y-4">
                <FormField
                  label="Mode"
                  type="select"
                  value={configData.serial.port1Mode}
                  onChange={(v) => onConfigChange("serial", "port1Mode", v)}
                  options={["RS232", "RS485", "TTL"]}
                />
                <FormField
                  label="Baud Rate"
                  type="select"
                  value={configData.serial.port1Baud}
                  onChange={(v) => onConfigChange("serial", "port1Baud", v)}
                  options={["2400", "4800", "9600", "19200", "38400", "57600", "115200"]}
                />
                <FormField
                  label="Parity"
                  type="select"
                  value={configData.serial.port1Parity}
                  onChange={(v) => onConfigChange("serial", "port1Parity", v)}
                  options={["None", "Odd", "Even"]}
                />
                <FormField
                  label="Stop Bits"
                  type="select"
                  value={configData.serial.port1StopBits}
                  onChange={(v) => onConfigChange("serial", "port1StopBits", v)}
                  options={["1", "2"]}
                />
                <FormField
                  label="Flow Control"
                  type="select"
                  value={configData.serial.port1FlowControl}
                  onChange={(v) => onConfigChange("serial", "port1FlowControl", v)}
                  options={["None", "RTS/CTS", "XON/XOFF"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Serial Port 2">
              <div className="space-y-4">
                <FormField
                  label="Mode"
                  type="select"
                  value={configData.serial.port2Mode}
                  onChange={(v) => onConfigChange("serial", "port2Mode", v)}
                  options={["RS232", "RS485", "TTL"]}
                />
                <FormField
                  label="Baud Rate"
                  type="select"
                  value={configData.serial.port2Baud}
                  onChange={(v) => onConfigChange("serial", "port2Baud", v)}
                  options={["2400", "4800", "9600", "19200", "38400", "57600", "115200"]}
                />
                <FormField
                  label="Parity"
                  type="select"
                  value={configData.serial.port2Parity}
                  onChange={(v) => onConfigChange("serial", "port2Parity", v)}
                  options={["None", "Odd", "Even"]}
                />
                <FormField
                  label="Stop Bits"
                  type="select"
                  value={configData.serial.port2StopBits}
                  onChange={(v) => onConfigChange("serial", "port2StopBits", v)}
                  options={["1", "2"]}
                />
                <FormField
                  label="Flow Control"
                  type="select"
                  value={configData.serial.port2FlowControl}
                  onChange={(v) => onConfigChange("serial", "port2FlowControl", v)}
                  options={["None", "RTS/CTS", "XON/XOFF"]}
                />
              </div>
            </ConfigSection>
          </div>

          <ConfigSection title="RS485 Settings">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="RS485 Enable"
                type="toggle"
                value={configData.serial.rs485Enable}
                onChange={(v) => onConfigChange("serial", "rs485Enable", v)}
              />
              <FormField
                label="RS485 Address"
                type="text"
                value={configData.serial.rs485Address}
                onChange={(v) => onConfigChange("serial", "rs485Address", v)}
                placeholder="1-247"
              />
            </div>
          </ConfigSection>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="Serial Status" connected={deviceStatus.serial?.connected}>
              <LiveDataRow label="RX Bytes" value={deviceStatus.serial?.rxBytes?.toLocaleString()} highlight />
              <LiveDataRow label="TX Bytes" value={deviceStatus.serial?.txBytes?.toLocaleString()} highlight />
              <LiveDataRow label="Status" value={deviceStatus.serial?.connected ? "Active" : "Idle"} />
            </LiveDataPanel>
          </ConfigSection>
        </div>
      </div>
    </div>
  )
}
