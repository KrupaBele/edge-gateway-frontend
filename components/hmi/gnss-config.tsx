"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface GNSSConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function GNSSConfig({ configData, deviceStatus, onConfigChange }: GNSSConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="GNSS / GPS Configuration"
        description="Configure satellite positioning system for location tracking and navigation"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Hardware Settings">
              <div className="space-y-4">
                <FormField
                  label="Port"
                  type="select"
                  value={configData.gnss.port}
                  onChange={(v) => onConfigChange("gnss", "port", v)}
                  options={["UART1", "UART2", "USB"]}
                  tooltip="Physical connection to GNSS module"
                />
                <FormField
                  label="Baud Rate"
                  type="select"
                  value={configData.gnss.baudRate}
                  onChange={(v) => onConfigChange("gnss", "baudRate", v)}
                  options={["4800", "9600", "38400", "115200"]}
                />
                <FormField
                  label="Protocol"
                  type="select"
                  value={configData.gnss.protocol}
                  onChange={(v) => onConfigChange("gnss", "protocol", v)}
                  options={["NMEA 0183", "UBX", "RTCM"]}
                />
                <FormField
                  label="Update Rate"
                  type="select"
                  value={configData.gnss.updateRate}
                  onChange={(v) => onConfigChange("gnss", "updateRate", v)}
                  options={["1Hz", "5Hz", "10Hz"]}
                />
                <FormField
                  label="Antenna"
                  type="select"
                  value={configData.gnss.antenna}
                  onChange={(v) => onConfigChange("gnss", "antenna", v)}
                  options={["Internal", "External Active", "External Passive"]}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="NMEA Settings">
              <div className="space-y-4">
                <FormField
                  label="Sentence Filter"
                  type="text"
                  value={configData.gnss.sentenceFilter}
                  onChange={(v) => onConfigChange("gnss", "sentenceFilter", v)}
                  placeholder="GGA,RMC,GSV,GSA,VTG"
                  tooltip="Comma-separated NMEA sentences to parse"
                />
                <FormField
                  label="Altitude Mode"
                  type="select"
                  value={configData.gnss.altitudeMode}
                  onChange={(v) => onConfigChange("gnss", "altitudeMode", v)}
                  options={["MSL", "WGS84", "EGM96"]}
                />
                <FormField
                  label="Heading Mode"
                  type="select"
                  value={configData.gnss.headingMode}
                  onChange={(v) => onConfigChange("gnss", "headingMode", v)}
                  options={["True North", "Magnetic North"]}
                />
                <FormField
                  label="Speed Filter"
                  type="select"
                  value={configData.gnss.speedFilter}
                  onChange={(v) => onConfigChange("gnss", "speedFilter", v)}
                  options={["None", "Moving Average", "Kalman"]}
                />
              </div>
            </ConfigSection>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Features">
              <div className="space-y-4">
                <FormField
                  label="SBAS Enable"
                  type="toggle"
                  value={configData.gnss.sbasEnable}
                  onChange={(v) => onConfigChange("gnss", "sbasEnable", v)}
                  tooltip="Satellite-Based Augmentation System for improved accuracy"
                />
                <FormField
                  label="Dead Reckoning"
                  type="toggle"
                  value={configData.gnss.deadReckoning}
                  onChange={(v) => onConfigChange("gnss", "deadReckoning", v)}
                  tooltip="Continue position estimation during GNSS signal loss"
                />
                <FormField
                  label="Geofence"
                  type="toggle"
                  value={configData.gnss.geofence}
                  onChange={(v) => onConfigChange("gnss", "geofence", v)}
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Cloud Configuration">
              <div className="space-y-4">
                <FormField
                  label="Cloud Endpoint"
                  type="text"
                  value={configData.gnss.cloudEndpoint}
                  onChange={(v) => onConfigChange("gnss", "cloudEndpoint", v)}
                />
                <FormField
                  label="Push Interval"
                  type="select"
                  value={configData.gnss.pushInterval}
                  onChange={(v) => onConfigChange("gnss", "pushInterval", v)}
                  options={["1s", "5s", "10s", "30s", "60s"]}
                />
                <FormField
                  label="Data Format"
                  type="select"
                  value={configData.gnss.dataFormat}
                  onChange={(v) => onConfigChange("gnss", "dataFormat", v)}
                  options={["JSON", "Protobuf", "CSV"]}
                />
              </div>
            </ConfigSection>
          </div>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="GNSS Status" connected={deviceStatus.gnss?.connected}>
              <LiveDataRow
                label="Fix Type"
                value={deviceStatus.gnss?.fix}
                highlight
                status={deviceStatus.gnss?.fix === "3D" ? "success" : "warning"}
              />
              <LiveDataRow label="Satellites" value={deviceStatus.gnss?.satellites} highlight />
              <LiveDataRow label="HDOP" value={deviceStatus.gnss?.hdop} />
              <LiveDataRow label="Latitude" value={deviceStatus.gnss?.lat} highlight />
              <LiveDataRow label="Longitude" value={deviceStatus.gnss?.lng} highlight />
            </LiveDataPanel>
          </ConfigSection>

          {/* Mini map placeholder */}
          <div className="hmi-panel p-4">
            <div className="text-xs font-medium text-foreground mb-2">Position Map</div>
            <div className="aspect-video bg-muted rounded flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Current Position</div>
                <div className="font-mono text-sm text-primary">
                  {deviceStatus.gnss?.lat}, {deviceStatus.gnss?.lng}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
