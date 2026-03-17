"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface IButtonConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function IButtonConfig({ configData, deviceStatus, onConfigChange }: IButtonConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="iButton Configuration"
        description="Configure 1-Wire iButton reader for driver identification"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Hardware Settings">
              <div className="space-y-4">
                <FormField
                  label="Port"
                  type="select"
                  value={configData.ibutton.port}
                  onChange={(v) => onConfigChange("ibutton", "port", v)}
                  options={["1-Wire", "GPIO", "USB"]}
                  tooltip="Physical connection interface for iButton reader"
                />
                <FormField
                  label="Protocol"
                  type="select"
                  value={configData.ibutton.protocol}
                  onChange={(v) => onConfigChange("ibutton", "protocol", v)}
                  options={["Dallas", "Maxim"]}
                />
                <FormField
                  label="Read Mode"
                  type="select"
                  value={configData.ibutton.readMode}
                  onChange={(v) => onConfigChange("ibutton", "readMode", v)}
                  options={["Continuous", "On Ignition", "Manual"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Driver Authentication">
              <div className="space-y-4">
                <FormField
                  label="Driver ID Required"
                  type="toggle"
                  value={configData.ibutton.driverIdRequired}
                  onChange={(v) => onConfigChange("ibutton", "driverIdRequired", v)}
                  tooltip="Require driver to present iButton before vehicle operation"
                />
                <FormField
                  label="Auth Timeout"
                  type="select"
                  value={configData.ibutton.authTimeout}
                  onChange={(v) => onConfigChange("ibutton", "authTimeout", v)}
                  options={["15s", "30s", "60s", "120s"]}
                />
                <FormField
                  label="Immobilizer Link"
                  type="toggle"
                  value={configData.ibutton.immobilizerLink}
                  onChange={(v) => onConfigChange("ibutton", "immobilizerLink", v)}
                  tooltip="Link iButton authentication to vehicle immobilizer"
                />
                <FormField
                  label="Cloud Sync"
                  type="toggle"
                  value={configData.ibutton.cloudSync}
                  onChange={(v) => onConfigChange("ibutton", "cloudSync", v)}
                />
              </div>
            </ConfigSection>
          </div>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="iButton Status" connected={deviceStatus.ibutton?.connected}>
              <LiveDataRow label="Last ID" value={deviceStatus.ibutton?.lastId} highlight />
              <LiveDataRow label="Driver" value={deviceStatus.ibutton?.driver} highlight />
              <LiveDataRow label="Status" value={deviceStatus.ibutton?.connected ? "Ready" : "No Key"} />
            </LiveDataPanel>
          </ConfigSection>
        </div>
      </div>
    </div>
  )
}
