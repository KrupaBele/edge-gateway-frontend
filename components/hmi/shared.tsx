"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/edge-gateway-manager"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface FormFieldProps {
  label: string
  type?: "text" | "password" | "select" | "toggle" | "number"
  value: string | boolean | number
  onChange: (value: string | boolean) => void
  options?: string[]
  placeholder?: string
  disabled?: boolean
  tooltip?: string
  unit?: string
}

export function FormField({
  label,
  type = "text",
  value,
  onChange,
  options = [],
  placeholder,
  disabled,
  tooltip,
  unit,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide">{label}</Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-48">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {type === "select" ? (
        <Select value={value as string} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger className="h-8 font-mono text-xs bg-input border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt} className="text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === "toggle" ? (
        <div className="pt-0.5">
          <Switch checked={value as boolean} onCheckedChange={onChange} disabled={disabled} />
        </div>
      ) : (
        <div className="relative">
          <Input
            type={type === "number" ? "number" : type}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn("h-8 font-mono text-xs bg-input border-border", unit && "pr-10")}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{unit}</span>
          )}
        </div>
      )}
    </div>
  )
}

export function ConfigSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="hmi-panel p-4 space-y-4">
      <div className="border-b border-border pb-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export function StatCard({
  label,
  value,
  unit,
  subValue,
  progress,
  status,
  icon: Icon,
}: {
  label: string
  value: string | number
  unit?: string
  subValue?: string
  progress?: number
  status?: "success" | "warning" | "danger" | "info"
  icon?: React.ElementType
}) {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    info: "text-info",
  }

  return (
    <div className="hmi-panel p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        {Icon && <Icon className={cn("w-4 h-4", status ? statusColors[status] : "text-muted-foreground")} />}
      </div>
      <div className={cn("font-mono text-lg font-bold text-primary tabular-nums", status && statusColors[status])}>
        {value}
        {unit && <span className="text-xs text-muted-foreground ml-1">{unit}</span>}
      </div>
      {subValue && <div className="text-xs text-muted-foreground mt-1">{subValue}</div>}
      {progress !== undefined && (
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              progress > 80 ? "bg-danger" : progress > 60 ? "bg-warning" : "bg-success",
            )}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}
    </div>
  )
}

export function LiveDataRow({
  label,
  value,
  highlight,
  status,
  unit,
}: {
  label: string
  value: string | number | undefined
  highlight?: boolean
  status?: "success" | "warning" | "danger"
  unit?: string
}) {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  }

  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "text-xs font-mono tabular-nums",
            status ? statusColors[status] : highlight ? "text-primary" : "text-foreground",
          )}
        >
          {value ?? "--"}
        </span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  )
}

export function LiveDataPanel({
  title,
  connected,
  children,
  action,
}: {
  title: string
  connected?: boolean
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="hmi-panel p-4">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-border">
        <span className="text-xs font-medium text-foreground">{title}</span>
        <div className="flex items-center gap-2">
          {action}
          <StatusBadge connected={connected} size="sm" />
        </div>
      </div>
      {children}
    </div>
  )
}

export function GaugeDisplay({
  label,
  value,
  min,
  max,
  unit,
  thresholds,
}: {
  label: string
  value: number
  min: number
  max: number
  unit?: string
  thresholds?: { warning: number; danger: number }
}) {
  const percentage = ((value - min) / (max - min)) * 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  let status: "success" | "warning" | "danger" = "success"
  if (thresholds) {
    if (value >= thresholds.danger) status = "danger"
    else if (value >= thresholds.warning) status = "warning"
  }

  const statusColors = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  }

  return (
    <div className="hmi-panel p-4">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        <span
          className={cn("text-lg font-mono font-bold tabular-nums", {
            "text-success": status === "success",
            "text-warning": status === "warning",
            "text-danger": status === "danger",
          })}
        >
          {value}
          {unit && <span className="text-xs text-muted-foreground ml-0.5">{unit}</span>}
        </span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-300", statusColors[status])}
          style={{ width: `${clampedPercentage}%` }}
        />
        {thresholds && (
          <>
            <div
              className="absolute top-0 h-full w-px bg-warning/50"
              style={{ left: `${((thresholds.warning - min) / (max - min)) * 100}%` }}
            />
            <div
              className="absolute top-0 h-full w-px bg-danger/50"
              style={{ left: `${((thresholds.danger - min) / (max - min)) * 100}%` }}
            />
          </>
        )}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">
          {min}
          {unit}
        </span>
        <span className="text-xs text-muted-foreground">
          {max}
          {unit}
        </span>
      </div>
    </div>
  )
}

export function BinaryIndicator({
  label,
  active,
  activeLabel = "ON",
  inactiveLabel = "OFF",
}: {
  label: string
  active: boolean
  activeLabel?: string
  inactiveLabel?: string
}) {
  return (
    <div className="hmi-panel p-3 flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div
        className={cn(
          "flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold uppercase",
          active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground",
        )}
      >
        <div
          className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-success animate-pulse-slow" : "bg-muted-foreground")}
        />
        {active ? activeLabel : inactiveLabel}
      </div>
    </div>
  )
}

export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="mb-6">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  )
}
