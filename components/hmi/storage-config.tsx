"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import { Progress } from "@/components/ui/progress"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface StorageConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function StorageConfig({ configData, deviceStatus, onConfigChange }: StorageConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Storage Device">
            <div className="space-y-4">
              <FormField
                label="Storage Device"
                type="select"
                value={configData.storage.storageDevice}
                onChange={(v) => onConfigChange("storage", "storageDevice", v)}
                options={["SD Card", "USB Drive", "eMMC"]}
              />
              <FormField
                label="File System"
                type="select"
                value={configData.storage.fileSystem}
                onChange={(v) => onConfigChange("storage", "fileSystem", v)}
                options={["FAT32", "exFAT", "ext4"]}
              />
              <FormField
                label="Auto Mount"
                type="toggle"
                value={configData.storage.autoMount}
                onChange={(v) => onConfigChange("storage", "autoMount", v)}
              />
              <FormField
                label="Encryption"
                type="select"
                value={configData.storage.encryption}
                onChange={(v) => onConfigChange("storage", "encryption", v)}
                options={["OFF", "AES-128", "AES-256"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Data Management">
            <div className="space-y-4">
              <FormField
                label="Max Usage (%)"
                type="text"
                value={configData.storage.maxUsage}
                onChange={(v) => onConfigChange("storage", "maxUsage", v)}
              />
              <FormField
                label="Overwrite Mode"
                type="select"
                value={configData.storage.overwriteMode}
                onChange={(v) => onConfigChange("storage", "overwriteMode", v)}
                options={["FIFO", "Stop When Full"]}
              />
              <FormField
                label="Log Rotation"
                type="select"
                value={configData.storage.logRotation}
                onChange={(v) => onConfigChange("storage", "logRotation", v)}
                options={["Daily", "Weekly", "Size Based"]}
              />
              <FormField
                label="Log Max Size (MB)"
                type="text"
                value={configData.storage.logMaxSize}
                onChange={(v) => onConfigChange("storage", "logMaxSize", v)}
              />
            </div>
          </ConfigSection>
        </div>
        <ConfigSection title="Cloud Sync">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Cloud Sync"
              type="toggle"
              value={configData.storage.cloudSync}
              onChange={(v) => onConfigChange("storage", "cloudSync", v)}
            />
            <FormField
              label="Sync Schedule"
              type="select"
              value={configData.storage.syncSchedule}
              onChange={(v) => onConfigChange("storage", "syncSchedule", v)}
              options={["Hourly", "Daily", "On Wi-Fi"]}
            />
          </div>
        </ConfigSection>
      </div>
      <div>
        <ConfigSection title="Storage Status">
          <LiveDataPanel title="Storage Status" connected={deviceStatus.storage?.connected}>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-muted-foreground">Usage</span>
                <span className="text-sm font-mono text-primary">
                  {deviceStatus.storage?.used} / {deviceStatus.storage?.total}
                </span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <LiveDataRow label="Total" value={deviceStatus.storage?.total} />
            <LiveDataRow label="Used" value={deviceStatus.storage?.used} />
            <LiveDataRow label="Free" value={deviceStatus.storage?.free} highlight />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
