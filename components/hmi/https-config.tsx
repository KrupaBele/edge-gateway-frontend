"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface HTTPSConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function HTTPSConfig({ configData, deviceStatus, onConfigChange }: HTTPSConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Endpoint Settings">
            <div className="space-y-4">
              <FormField
                label="Endpoint URL"
                type="text"
                value={configData.https.endpointUrl}
                onChange={(v) => onConfigChange("https", "endpointUrl", v)}
              />
              <FormField
                label="Method"
                type="select"
                value={configData.https.method}
                onChange={(v) => onConfigChange("https", "method", v)}
                options={["POST", "PUT", "PATCH"]}
              />
              <FormField
                label="Auth Type"
                type="select"
                value={configData.https.authType}
                onChange={(v) => onConfigChange("https", "authType", v)}
                options={["None", "Bearer Token", "API Key", "Basic"]}
              />
              <FormField
                label="API Key Header"
                type="text"
                value={configData.https.apiKeyHeader}
                onChange={(v) => onConfigChange("https", "apiKeyHeader", v)}
              />
              <FormField
                label="API Key Value"
                type="password"
                value={configData.https.apiKeyValue}
                onChange={(v) => onConfigChange("https", "apiKeyValue", v)}
              />
              <FormField
                label="Content Type"
                type="select"
                value={configData.https.contentType}
                onChange={(v) => onConfigChange("https", "contentType", v)}
                options={["application/json", "application/x-www-form-urlencoded"]}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Connection Settings">
            <div className="space-y-4">
              <FormField
                label="Retry Count"
                type="select"
                value={configData.https.retryCount}
                onChange={(v) => onConfigChange("https", "retryCount", v)}
                options={["0", "1", "2", "3", "5"]}
              />
              <FormField
                label="Retry Interval"
                type="select"
                value={configData.https.retryInterval}
                onChange={(v) => onConfigChange("https", "retryInterval", v)}
                options={["5s", "10s", "30s"]}
              />
              <FormField
                label="Timeout"
                type="select"
                value={configData.https.timeout}
                onChange={(v) => onConfigChange("https", "timeout", v)}
                options={["10s", "30s", "60s"]}
              />
              <FormField
                label="Batch Mode"
                type="select"
                value={configData.https.batchMode}
                onChange={(v) => onConfigChange("https", "batchMode", v)}
                options={["Single", "Batch"]}
              />
              <FormField
                label="Batch Size"
                type="select"
                value={configData.https.batchSize}
                onChange={(v) => onConfigChange("https", "batchSize", v)}
                options={["10", "25", "50", "100"]}
              />
            </div>
          </ConfigSection>
        </div>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="HTTPS Status" connected={deviceStatus.https?.connected}>
            <LiveDataRow label="Requests Sent" value={deviceStatus.https?.requests} highlight />
            <LiveDataRow label="Failures" value={deviceStatus.https?.failures} />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
