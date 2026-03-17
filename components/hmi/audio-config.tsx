"use client"

import { ConfigSection, FormField, LiveDataPanel, LiveDataRow, PageHeader, GaugeDisplay } from "./shared"
import type { DeviceStatus } from "@/hooks/use-device-status"
import type { ConfigData } from "@/hooks/use-config-data"

interface AudioConfigProps {
  configData: ConfigData
  deviceStatus: DeviceStatus
  onConfigChange: (device: keyof ConfigData, field: string, value: string | boolean) => void
}

export function AudioConfig({ configData, deviceStatus, onConfigChange }: AudioConfigProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Audio Configuration"
        description="Configure speaker and microphone settings for alerts and hands-free communication"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ConfigSection title="Audio Input">
              <div className="space-y-4">
                <FormField
                  label="Input Port"
                  type="select"
                  value={configData.audio.inputPort}
                  onChange={(v) => onConfigChange("audio", "inputPort", v)}
                  options={["MIC", "Line In", "USB Audio"]}
                />
                <FormField
                  label="Sample Rate"
                  type="select"
                  value={configData.audio.sampleRate}
                  onChange={(v) => onConfigChange("audio", "sampleRate", v)}
                  options={["8000", "16000", "22050", "44100", "48000"]}
                  unit="Hz"
                />
                <FormField
                  label="Bit Depth"
                  type="select"
                  value={configData.audio.bitDepth}
                  onChange={(v) => onConfigChange("audio", "bitDepth", v)}
                  options={["8", "16", "24"]}
                  unit="bit"
                />
                <FormField
                  label="Channels"
                  type="select"
                  value={configData.audio.channels}
                  onChange={(v) => onConfigChange("audio", "channels", v)}
                  options={["Mono", "Stereo"]}
                />
                <FormField
                  label="Mic Gain"
                  type="text"
                  value={configData.audio.micGain}
                  onChange={(v) => onConfigChange("audio", "micGain", v)}
                  unit="%"
                />
              </div>
            </ConfigSection>

            <ConfigSection title="Audio Output">
              <div className="space-y-4">
                <FormField
                  label="Output Port"
                  type="select"
                  value={configData.audio.outputPort}
                  onChange={(v) => onConfigChange("audio", "outputPort", v)}
                  options={["Speaker", "Line Out", "HDMI", "USB Audio"]}
                />
                <FormField
                  label="Volume"
                  type="text"
                  value={configData.audio.volume}
                  onChange={(v) => onConfigChange("audio", "volume", v)}
                  unit="%"
                />
                <FormField
                  label="Alert Sounds"
                  type="toggle"
                  value={configData.audio.alertSounds}
                  onChange={(v) => onConfigChange("audio", "alertSounds", v)}
                  tooltip="Play audio alerts for events and warnings"
                />
                <FormField
                  label="Voice Prompts"
                  type="toggle"
                  value={configData.audio.voicePrompts}
                  onChange={(v) => onConfigChange("audio", "voicePrompts", v)}
                  tooltip="Enable text-to-speech voice prompts"
                />
                <FormField
                  label="Hands-Free Mode"
                  type="toggle"
                  value={configData.audio.handsFree}
                  onChange={(v) => onConfigChange("audio", "handsFree", v)}
                  tooltip="Enable hands-free calling via Bluetooth"
                />
              </div>
            </ConfigSection>
          </div>
        </div>

        <div className="space-y-6">
          <ConfigSection title="Live Data">
            <LiveDataPanel title="Audio Status" connected={deviceStatus.audio?.connected}>
              <LiveDataRow label="Input Level" value={deviceStatus.audio?.level} />
              <LiveDataRow label="Speaker" value={deviceStatus.speaker?.connected ? "Active" : "Muted"} />
              <LiveDataRow label="Volume" value={`${deviceStatus.speaker?.volume}%`} highlight />
            </LiveDataPanel>
          </ConfigSection>

          <GaugeDisplay label="Speaker Volume" value={deviceStatus.speaker?.volume || 0} min={0} max={100} unit="%" />
        </div>
      </div>
    </div>
  )
}
