"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface MQTTConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function MQTTConfig({ configData, deviceStatus, onConfigChange }: MQTTConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <ConfigSection title="Broker Settings">
            <div className="space-y-4">
              <FormField
                label="Protocol"
                type="select"
                value={configData.mqtt.protocol}
                onChange={(v) => onConfigChange("mqtt", "protocol", v)}
                options={["MQTT", "MQTTS", "WebSocket"]}
              />
              <FormField
                label="Broker URL (host:port)"
                type="text"
                value={configData.mqtt.brokerUrl}
                onChange={(v) => onConfigChange("mqtt", "brokerUrl", v)}
              />
              <FormField
                label="Client ID"
                type="text"
                value={configData.mqtt.clientId}
                onChange={(v) => onConfigChange("mqtt", "clientId", v)}
              />
              <FormField
                label="Username"
                type="text"
                value={configData.mqtt.username}
                onChange={(v) => onConfigChange("mqtt", "username", v)}
              />
              <FormField
                label="Password"
                type="password"
                value={configData.mqtt.password}
                onChange={(v) => onConfigChange("mqtt", "password", v)}
              />
              <FormField
                label="TLS Enable"
                type="toggle"
                value={configData.mqtt.tlsEnable}
                onChange={(v) => onConfigChange("mqtt", "tlsEnable", v)}
              />
            </div>
          </ConfigSection>
          <ConfigSection title="Connection Settings">
            <div className="space-y-4">
              <FormField
                label="QoS Level"
                type="select"
                value={configData.mqtt.qosLevel}
                onChange={(v) => onConfigChange("mqtt", "qosLevel", v)}
                options={["0", "1", "2"]}
              />
              <FormField
                label="Keep Alive"
                type="select"
                value={configData.mqtt.keepAlive}
                onChange={(v) => onConfigChange("mqtt", "keepAlive", v)}
                options={["30s", "60s", "120s"]}
              />
              <FormField
                label="Clean Session"
                type="toggle"
                value={configData.mqtt.cleanSession}
                onChange={(v) => onConfigChange("mqtt", "cleanSession", v)}
              />
              <FormField
                label="Base Topic"
                type="text"
                value={configData.mqtt.baseTopic}
                onChange={(v) => onConfigChange("mqtt", "baseTopic", v)}
              />
              <FormField
                label="Last Will Topic"
                type="text"
                value={configData.mqtt.lastWillTopic}
                onChange={(v) => onConfigChange("mqtt", "lastWillTopic", v)}
              />
              <FormField
                label="Heartbeat Interval"
                type="select"
                value={configData.mqtt.heartbeatInterval}
                onChange={(v) => onConfigChange("mqtt", "heartbeatInterval", v)}
                options={["30s", "60s", "300s"]}
              />
            </div>
          </ConfigSection>
        </div>
      </div>
      <div>
        <ConfigSection title="Live Data">
          <LiveDataPanel title="MQTT Status" connected={deviceStatus.mqtt?.connected}>
            <LiveDataRow label="Published" value={deviceStatus.mqtt?.published} highlight />
            <LiveDataRow label="Received" value={deviceStatus.mqtt?.received} />
            <LiveDataRow label="Last Publish" value={deviceStatus.mqtt?.lastPublish} />
          </LiveDataPanel>
        </ConfigSection>
      </div>
    </div>
  )
}
