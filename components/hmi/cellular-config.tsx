"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader, GaugeDisplay } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface CellularConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function CellularConfig({ configData, deviceStatus, onConfigChange }: CellularConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cellular Modem Configuration"
        description="Configure LTE/5G cellular connectivity for cloud communication"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="SIM Configuration">
              <div className="space-y-4">
                <FormField
                  label="SIM Slot"
                  type="select"
                  value={configData.cellular.simSlot}
                  onChange={(v) => onConfigChange("cellular", "simSlot", v)}
                  options={["SIM1", "SIM2", "eSIM"]}
                />
                <FormField
                  label="APN"
                  type="text"
                  value={configData.cellular.apn}
                  onChange={(v) => onConfigChange("cellular", "apn", v)}
                  tooltip="Access Point Name from your carrier"
                />
                <FormField
                  label="Username"
                  type="text"
                  value={configData.cellular.username}
                  onChange={(v) => onConfigChange("cellular", "username", v)}
                />
                <FormField
                  label="Password"
                  type="password"
                  value={configData.cellular.password}
                  onChange={(v) => onConfigChange("cellular", "password", v)}
                />
                <FormField
                  label="Auth Type"
                  type="select"
                  value={configData.cellular.authType}
                  onChange={(v) => onConfigChange("cellular", "authType", v)}
                  options={["None", "PAP", "CHAP"]}
                />
                <FormField
                  label="PDP Type"
                  type="select"
                  value={configData.cellular.pdpType}
                  onChange={(v) => onConfigChange("cellular", "pdpType", v)}
                  options={["IPv4", "IPv6", "IPv4v6"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Network Settings">
              <div className="space-y-4">
                <FormField
                  label="Network Mode"
                  type="select"
                  value={configData.cellular.networkMode}
                  onChange={(v) => onConfigChange("cellular", "networkMode", v)}
                  options={["Auto", "4G Only", "5G Only", "3G Only"]}
                />
                <FormField
                  label="Band Selection"
                  type="select"
                  value={configData.cellular.band}
                  onChange={(v) => onConfigChange("cellular", "band", v)}
                  options={["Auto", "Band 2/4/12", "Band 7/20", "Custom"]}
                />
                <FormField
                  label="Roaming"
                  type="toggle"
                  value={configData.cellular.roaming}
                  onChange={(v) => onConfigChange("cellular", "roaming", v)}
                />
                <FormField
                  label="Data Limit"
                  type="text"
                  value={configData.cellular.dataLimit}
                  onChange={(v) => onConfigChange("cellular", "dataLimit", v)}
                  unit="MB/day"
                />
                <FormField
                  label="MTU"
                  type="text"
                  value={configData.cellular.mtu}
                  onChange={(v) => onConfigChange("cellular", "mtu", v)}
                />
                <FormField
                  label="Keep Alive"
                  type="select"
                  value={configData.cellular.keepAlive}
                  onChange={(v) => onConfigChange("cellular", "keepAlive", v)}
                  options={["30s", "60s", "120s", "300s"]}
                />
              </div>
            </ConfigSection>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Failover">
              <div className="space-y-4">
                <FormField
                  label="Fallback SIM"
                  type="toggle"
                  value={configData.cellular.fallbackSim}
                  onChange={(v) => onConfigChange("cellular", "fallbackSim", v)}
                  tooltip="Automatically switch to backup SIM on connection failure"
                />
                <FormField
                  label="Status Report Interval"
                  type="select"
                  value={configData.cellular.reportInterval}
                  onChange={(v) => onConfigChange("cellular", "reportInterval", v)}
                  options={["60s", "300s", "600s"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="SMS Settings">
              <div className="space-y-4">
                <FormField
                  label="SMS Enable"
                  type="toggle"
                  value={configData.cellular.smsEnable}
                  onChange={(v) => onConfigChange("cellular", "smsEnable", v)}
                />
                <FormField
                  label="SMS Center"
                  type="text"
                  value={configData.cellular.smsCenter}
                  onChange={(v) => onConfigChange("cellular", "smsCenter", v)}
                  placeholder="+1234567890"
                />
              </div>
            </ConfigSection>
          </div>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="Modem Status" connected={deviceStatus.cellular?.connected}>
              <LiveDataRow
                label="Signal Strength"
                value={`${deviceStatus.cellular?.signal}%`}
                highlight
                status={deviceStatus.cellular?.signal && deviceStatus.cellular.signal > 50 ? "success" : "warning"}
              />
              <LiveDataRow label="Network" value={deviceStatus.cellular?.network} highlight />
              <LiveDataRow label="Carrier" value={deviceStatus.cellular?.carrier} />
              <LiveDataRow label="IP Address" value={deviceStatus.cellular?.ip} />
            </LiveDataPanel>
          </ConfigSection>

          <GaugeDisplay
            label="Signal Strength"
            value={deviceStatus.cellular?.signal || 0}
            min={0}
            max={100}
            unit="%"
            thresholds={{ warning: 30, danger: 15 }}
          />
        </div>
      </div>
    </div>
  )
}
