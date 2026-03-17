"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface RFIDConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function RFIDConfig({ configData, deviceStatus, onConfigChange }: RFIDConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader title="RFID Configuration" description="Configure RFID/NFC reader for contactless identification" />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Hardware Settings">
              <div className="space-y-4">
                <FormField
                  label="Port"
                  type="select"
                  value={configData.rfid.port}
                  onChange={(v) => onConfigChange("rfid", "port", v)}
                  options={["UART1", "UART2", "USB", "SPI"]}
                />
                <FormField
                  label="Frequency"
                  type="select"
                  value={configData.rfid.frequency}
                  onChange={(v) => onConfigChange("rfid", "frequency", v)}
                  options={["125kHz", "13.56MHz", "UHF 860-960MHz"]}
                />
                <FormField
                  label="Protocol"
                  type="select"
                  value={configData.rfid.protocol}
                  onChange={(v) => onConfigChange("rfid", "protocol", v)}
                  options={["ISO 14443A", "ISO 14443B", "ISO 15693", "EM4100"]}
                />
                <FormField
                  label="Read Power"
                  type="select"
                  value={configData.rfid.readPower}
                  onChange={(v) => onConfigChange("rfid", "readPower", v)}
                  options={["Low", "Medium", "High"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Operation">
              <div className="space-y-4">
                <FormField
                  label="Read Mode"
                  type="select"
                  value={configData.rfid.readMode}
                  onChange={(v) => onConfigChange("rfid", "readMode", v)}
                  options={["Continuous", "On Demand", "Triggered"]}
                />
                <FormField
                  label="Tag Filter"
                  type="select"
                  value={configData.rfid.tagFilter}
                  onChange={(v) => onConfigChange("rfid", "tagFilter", v)}
                  options={["All", "Whitelist", "Registered Only"]}
                />
                <FormField
                  label="Cloud Sync"
                  type="toggle"
                  value={configData.rfid.cloudSync}
                  onChange={(v) => onConfigChange("rfid", "cloudSync", v)}
                />
              </div>
            </ConfigSection>
          </div>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="RFID Status" connected={deviceStatus.rfid?.connected}>
              <LiveDataRow label="Last Card" value={deviceStatus.rfid?.lastCard} highlight />
              <LiveDataRow label="Status" value={deviceStatus.rfid?.connected ? "Ready" : "Offline"} />
            </LiveDataPanel>
          </ConfigSection>
        </div>
      </div>
    </div>
  )
}
