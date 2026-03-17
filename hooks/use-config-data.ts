"use client"

import { useState } from "react"

export interface ConfigData {
  gnss: {
    port: string
    baudRate: string
    protocol: string
    updateRate: string
    sentenceFilter: string
    sbasEnable: boolean
    geofence: boolean
    cloudEndpoint: string
    pushInterval: string
    dataFormat: string
    antenna: string
    deadReckoning: boolean
    altitudeMode: string
    speedFilter: string
    headingMode: string
  }
  cellular: {
    simSlot: string
    apn: string
    username: string
    password: string
    authType: string
    networkMode: string
    roaming: boolean
    dataLimit: string
    fallbackSim: boolean
    reportInterval: string
    band: string
    mtu: string
    pdpType: string
    keepAlive: string
    smsEnable: boolean
    smsCenter: string
  }
  wifi: {
    mode: string
    ssid: string
    password: string
    security: string
    channel: string
    maxClients: string
    autoReconnect: boolean
    bandwidth: string
    hiddenSsid: boolean
    country: string
    txPower: string
    dhcpStart: string
    dhcpEnd: string
  }
  bluetooth: {
    mode: string
    deviceName: string
    discoverable: boolean
    pairingMode: string
    pinCode: string
    autoConnect: boolean
    scanInterval: string
    beaconParsing: string
    txPower: string
    advInterval: string
    connInterval: string
    mtu: string
  }
  canbus: {
    port: string
    protocol: string
    baudRate: string
    fdDataRate: string
    termination: boolean
    listenOnly: boolean
    filterMode: string
    messageIds: string
    dbcFile: string
    parsing: string
    pushMode: string
    pushInterval: string
    errorHandling: string
    busOffRecovery: string
    timestamping: boolean
  }
  obdii: {
    port: string
    protocol: string
    baudRate: string
    pollInterval: string
    dtcRead: boolean
    dtcClear: boolean
    vinRead: string
    dataFormat: string
    pidList: string
    freezeFrame: boolean
    oxygenSensor: boolean
    mode6Support: boolean
  }
  j1939: {
    port: string
    baudRate: string
    sourceAddress: string
    pgnFilter: string
    spnParsing: boolean
    fmsStandard: boolean
    pushInterval: string
    addressClaim: boolean
    dmMessages: boolean
    requestPgns: string
  }
  imu: {
    port: string
    i2cAddress: string
    sampleRate: string
    accelRange: string
    gyroRange: string
    filter: string
    harshThreshold: string
    harshTypes: string
    pushMode: string
    orientation: string
    magnetometer: boolean
    tempCompensation: boolean
    calibrationMode: string
  }
  camera: {
    port: string
    resolution: string
    frameRate: string
    encoding: string
    bitrate: string
    recordingMode: string
    preEventBuffer: string
    postEventBuffer: string
    eventTriggers: string
    storagePath: string
    snapshotInterval: string
    nightMode: string
    wdr: boolean
    rotation: string
    overlay: boolean
    overlayText: string
    audioRecord: boolean
  }
  dms: {
    port: string
    resolution: string
    irIllumination: string
    detectionMode: string
    drowsinessThreshold: string
    distractionThreshold: string
    phoneDetection: boolean
    smokingDetection: boolean
    seatbeltDetection: boolean
    alertType: string
    eventUpload: string
    faceRecognition: boolean
    driverIdRequired: boolean
    yawnDetection: boolean
    eyeClosureTime: string
    headPoseThreshold: string
  }
  radar: {
    port: string
    canBaud: string
    detectionRange: string
    objectFilter: string
    trackingMode: boolean
    fcwEnable: boolean
    fcwThreshold: string
    outputFormat: string
    pushMode: string
    ldwEnable: boolean
    hmwEnable: boolean
    sensitivity: string
    audioAlert: boolean
  }
  fuel: {
    port: string
    sensorType: string
    rs485Address: string
    rs485Baud: string
    tankCapacity: string
    smoothing: string
    theftThreshold: string
    refuelThreshold: string
    pushMode: string
    pushInterval: string
    calibrationTable: string
    tempCompensation: boolean
    multiTank: boolean
    tankCount: string
  }
  tpms: {
    interface: string
    pressureUnit: string
    tempUnit: string
    lowPressure: string
    highPressure: string
    highTemp: string
    pushInterval: string
    sensorCount: string
    axleConfig: string
    leakDetection: boolean
    rapidLossThreshold: string
  }
  digitalInputs: {
    gpio1Label: string
    gpio1Type: string
    gpio2Label: string
    gpio2Type: string
    gpio3Label: string
    gpio3Type: string
    gpio4Label: string
    gpio4Type: string
    debounce: string
    alertOnChange: boolean
    gpio5Label: string
    gpio5Type: string
    gpio6Label: string
    gpio6Type: string
    pulseCount: boolean
    analogInput: boolean
  }
  digitalOutputs: {
    relay1Label: string
    relay1Default: string
    relay1Source: string
    relay2Label: string
    relay2Default: string
    relay2Source: string
    pulseMode: string
    safetyInterlock: string
    relay3Label: string
    relay3Default: string
    relay4Label: string
    relay4Default: string
    pwmOutput: boolean
    pwmFrequency: string
  }
  storage: {
    storageDevice: string
    fileSystem: string
    autoMount: boolean
    encryption: string
    maxUsage: string
    overwriteMode: string
    logRotation: string
    logMaxSize: string
    cloudSync: boolean
    syncSchedule: string
    healthMonitor: boolean
    badBlockCheck: boolean
    wearLeveling: boolean
    readOnly: boolean
  }
  mqtt: {
    protocol: string
    brokerUrl: string
    clientId: string
    username: string
    password: string
    tlsEnable: boolean
    tlsCertificate: string
    qosLevel: string
    keepAlive: string
    cleanSession: boolean
    lastWillTopic: string
    lastWillMessage: string
    baseTopic: string
    heartbeatInterval: string
    reconnectInterval: string
    maxRetries: string
    bufferSize: string
    compression: boolean
  }
  https: {
    endpointUrl: string
    method: string
    authType: string
    apiKeyHeader: string
    apiKeyValue: string
    contentType: string
    retryCount: string
    retryInterval: string
    timeout: string
    batchMode: string
    batchSize: string
    compression: boolean
    verifySSL: boolean
    customHeaders: string
    proxy: string
  }
  system: {
    deviceId: string
    deviceName: string
    timezone: string
    ntpServer: string
    autoTimeSync: boolean
    logLevel: string
    debugMode: string
    hostname: string
    locale: string
    autoReboot: boolean
    rebootSchedule: string
    watchdog: boolean
    powerSave: string
  }
  security: {
    adminPassword: string
    sessionTimeout: string
    firewallEnable: boolean
    allowedIps: string
    vpn: string
    vpnConfig: string
    sshEnable: boolean
    sshPort: string
    telnetEnable: boolean
    httpAuth: boolean
    certificatePath: string
    privateKeyPath: string
  }
  ibutton: {
    port: string
    protocol: string
    readMode: string
    driverIdRequired: boolean
    authTimeout: string
    immobilizerLink: boolean
    cloudSync: boolean
  }
  rfid: {
    port: string
    frequency: string
    protocol: string
    readPower: string
    readMode: string
    tagFilter: string
    cloudSync: boolean
  }
  audio: {
    inputPort: string
    outputPort: string
    sampleRate: string
    bitDepth: string
    channels: string
    volume: string
    micGain: string
    alertSounds: boolean
    voicePrompts: boolean
    handsFree: boolean
  }
  serial: {
    port1Mode: string
    port1Baud: string
    port1Parity: string
    port1StopBits: string
    port1FlowControl: string
    port2Mode: string
    port2Baud: string
    port2Parity: string
    port2StopBits: string
    port2FlowControl: string
    rs485Enable: boolean
    rs485Address: string
  }
  temperature: {
    sensor1Type: string
    sensor1Label: string
    sensor1Offset: string
    sensor2Type: string
    sensor2Label: string
    sensor2Offset: string
    sensor3Type: string
    sensor3Label: string
    sensor3Offset: string
    sensor4Type: string
    sensor4Label: string
    sensor4Offset: string
    highAlarm: string
    lowAlarm: string
    pushInterval: string
  }
  ultrasonic: {
    port: string
    sensorCount: string
    measureMode: string
    rangeMin: string
    rangeMax: string
    resolution: string
    updateRate: string
    temperatureComp: boolean
    obstacleAlert: boolean
    alertDistance: string
  }
  display: {
    port: string
    resolution: string
    orientation: string
    brightness: string
    timeout: string
    touchEnable: boolean
    splashScreen: string
    statusBar: boolean
    alertPopups: boolean
  }
}

const initialConfigData: ConfigData = {
  gnss: {
    port: "UART1",
    baudRate: "115200",
    protocol: "NMEA 0183",
    updateRate: "10Hz",
    sentenceFilter: "GGA,RMC,GSV",
    sbasEnable: true,
    geofence: false,
    cloudEndpoint: "mqtt://broker.example.com/vehicle/gps",
    pushInterval: "5s",
    dataFormat: "JSON",
    antenna: "Internal",
    deadReckoning: true,
    altitudeMode: "MSL",
    speedFilter: "Moving Average",
    headingMode: "True North",
  },
  cellular: {
    simSlot: "SIM1",
    apn: "internet.provider.com",
    username: "",
    password: "",
    authType: "None",
    networkMode: "Auto",
    roaming: false,
    dataLimit: "1000",
    fallbackSim: true,
    reportInterval: "60s",
    band: "Auto",
    mtu: "1500",
    pdpType: "IPv4",
    keepAlive: "60s",
    smsEnable: true,
    smsCenter: "",
  },
  wifi: {
    mode: "Access Point",
    ssid: "EdgeGateway-001",
    password: "********",
    security: "WPA3",
    channel: "Auto",
    maxClients: "5",
    autoReconnect: true,
    bandwidth: "20MHz",
    hiddenSsid: false,
    country: "US",
    txPower: "High",
    dhcpStart: "192.168.4.100",
    dhcpEnd: "192.168.4.200",
  },
  bluetooth: {
    mode: "BLE",
    deviceName: "VehicleGateway",
    discoverable: true,
    pairingMode: "PIN",
    pinCode: "1234",
    autoConnect: true,
    scanInterval: "5s",
    beaconParsing: "iBeacon",
    txPower: "0dBm",
    advInterval: "100ms",
    connInterval: "30ms",
    mtu: "247",
  },
  canbus: {
    port: "CAN0",
    protocol: "CAN 2.0B",
    baudRate: "500K",
    fdDataRate: "2M",
    termination: true,
    listenOnly: false,
    filterMode: "Accept All",
    messageIds: "",
    dbcFile: "vehicle_oem.dbc",
    parsing: "DBC Decoded",
    pushMode: "On Change",
    pushInterval: "500ms",
    errorHandling: "Auto Recovery",
    busOffRecovery: "Auto",
    timestamping: true,
  },
  obdii: {
    port: "OBD",
    protocol: "Auto",
    baudRate: "Auto",
    pollInterval: "500ms",
    dtcRead: true,
    dtcClear: false,
    vinRead: "Auto",
    dataFormat: "JSON",
    pidList: "Standard",
    freezeFrame: true,
    oxygenSensor: true,
    mode6Support: false,
  },
  j1939: {
    port: "CAN1",
    baudRate: "250K",
    sourceAddress: "0xF9",
    pgnFilter: "All",
    spnParsing: true,
    fmsStandard: true,
    pushInterval: "5s",
    addressClaim: true,
    dmMessages: true,
    requestPgns: "",
  },
  imu: {
    port: "I2C",
    i2cAddress: "0x68",
    sampleRate: "100Hz",
    accelRange: "±8g",
    gyroRange: "±1000 dps",
    filter: "Kalman",
    harshThreshold: "0.4",
    harshTypes: "Accel,Brake,Turn,Impact",
    pushMode: "Event Only",
    orientation: "X-Forward",
    magnetometer: true,
    tempCompensation: true,
    calibrationMode: "Auto",
  },
  camera: {
    port: "MIPI CSI",
    resolution: "1080p",
    frameRate: "30fps",
    encoding: "H.265",
    bitrate: "4Mbps",
    recordingMode: "Event",
    preEventBuffer: "30s",
    postEventBuffer: "30s",
    eventTriggers: "Impact,Harsh,Geofence",
    storagePath: "SD Card",
    snapshotInterval: "OFF",
    nightMode: "Auto",
    wdr: true,
    rotation: "0°",
    overlay: true,
    overlayText: "%DATE% %TIME% %SPEED%",
    audioRecord: true,
  },
  dms: {
    port: "USB",
    resolution: "720p",
    irIllumination: "Auto",
    detectionMode: "Both",
    drowsinessThreshold: "Medium",
    distractionThreshold: "3s",
    phoneDetection: true,
    smokingDetection: true,
    seatbeltDetection: true,
    alertType: "Both",
    eventUpload: "Photo",
    faceRecognition: true,
    driverIdRequired: true,
    yawnDetection: true,
    eyeClosureTime: "2s",
    headPoseThreshold: "30°",
  },
  radar: {
    port: "CAN",
    canBaud: "500K",
    detectionRange: "Long",
    objectFilter: "All",
    trackingMode: true,
    fcwEnable: true,
    fcwThreshold: "2s",
    outputFormat: "Processed Alerts",
    pushMode: "Event Only",
    ldwEnable: true,
    hmwEnable: true,
    sensitivity: "Medium",
    audioAlert: true,
  },
  fuel: {
    port: "RS485",
    sensorType: "Capacitive",
    rs485Address: "1",
    rs485Baud: "9600",
    tankCapacity: "60",
    smoothing: "Medium",
    theftThreshold: "5",
    refuelThreshold: "10",
    pushMode: "On Change",
    pushInterval: "60s",
    calibrationTable: "Linear",
    tempCompensation: true,
    multiTank: false,
    tankCount: "1",
  },
  tpms: {
    interface: "BLE",
    pressureUnit: "PSI",
    tempUnit: "°C",
    lowPressure: "28",
    highPressure: "38",
    highTemp: "70",
    pushInterval: "300s",
    sensorCount: "4",
    axleConfig: "2x2",
    leakDetection: true,
    rapidLossThreshold: "3",
  },
  digitalInputs: {
    gpio1Label: "Ignition",
    gpio1Type: "Active High",
    gpio2Label: "Door",
    gpio2Type: "Active Low",
    gpio3Label: "Seatbelt",
    gpio3Type: "Active Low",
    gpio4Label: "PTO",
    gpio4Type: "Active High",
    debounce: "100ms",
    alertOnChange: true,
    gpio5Label: "Panic",
    gpio5Type: "Active Low",
    gpio6Label: "Trailer",
    gpio6Type: "Active High",
    pulseCount: true,
    analogInput: true,
  },
  digitalOutputs: {
    relay1Label: "Immobilizer",
    relay1Default: "OFF",
    relay1Source: "Cloud",
    relay2Label: "Buzzer",
    relay2Default: "OFF",
    relay2Source: "Local",
    pulseMode: "Latched",
    safetyInterlock: "Speed < 5kmph",
    relay3Label: "LED",
    relay3Default: "OFF",
    relay4Label: "Aux",
    relay4Default: "OFF",
    pwmOutput: true,
    pwmFrequency: "1kHz",
  },
  storage: {
    storageDevice: "SD Card",
    fileSystem: "exFAT",
    autoMount: true,
    encryption: "AES-256",
    maxUsage: "90",
    overwriteMode: "FIFO",
    logRotation: "Daily",
    logMaxSize: "100",
    cloudSync: true,
    syncSchedule: "On Wi-Fi",
    healthMonitor: true,
    badBlockCheck: true,
    wearLeveling: true,
    readOnly: false,
  },
  mqtt: {
    protocol: "MQTTS",
    brokerUrl: "broker.example.com:8883",
    clientId: "edge-gateway-001",
    username: "device001",
    password: "********",
    tlsEnable: true,
    tlsCertificate: "",
    qosLevel: "1",
    keepAlive: "60s",
    cleanSession: false,
    lastWillTopic: "vehicles/001/status",
    lastWillMessage: "offline",
    baseTopic: "vehicles/001",
    heartbeatInterval: "60s",
    reconnectInterval: "10s",
    maxRetries: "5",
    bufferSize: "1000",
    compression: true,
  },
  https: {
    endpointUrl: "https://api.example.com/telemetry",
    method: "POST",
    authType: "Bearer Token",
    apiKeyHeader: "Authorization",
    apiKeyValue: "",
    contentType: "application/json",
    retryCount: "3",
    retryInterval: "10s",
    timeout: "30s",
    batchMode: "Batch",
    batchSize: "50",
    compression: true,
    verifySSL: true,
    customHeaders: "",
    proxy: "",
  },
  system: {
    deviceId: "EG-2024-001",
    deviceName: "Fleet Vehicle 001",
    timezone: "UTC",
    ntpServer: "pool.ntp.org",
    autoTimeSync: true,
    logLevel: "Info",
    debugMode: "OFF",
    hostname: "edge-gateway",
    locale: "en-US",
    autoReboot: false,
    rebootSchedule: "03:00",
    watchdog: true,
    powerSave: "Off",
  },
  security: {
    adminPassword: "********",
    sessionTimeout: "15min",
    firewallEnable: true,
    allowedIps: "",
    vpn: "OFF",
    vpnConfig: "",
    sshEnable: true,
    sshPort: "22",
    telnetEnable: false,
    httpAuth: true,
    certificatePath: "",
    privateKeyPath: "",
  },
  ibutton: {
    port: "1-Wire",
    protocol: "Dallas",
    readMode: "Continuous",
    driverIdRequired: true,
    authTimeout: "30s",
    immobilizerLink: true,
    cloudSync: true,
  },
  rfid: {
    port: "UART2",
    frequency: "13.56MHz",
    protocol: "ISO 14443A",
    readPower: "Medium",
    readMode: "Continuous",
    tagFilter: "All",
    cloudSync: true,
  },
  audio: {
    inputPort: "MIC",
    outputPort: "Speaker",
    sampleRate: "44100",
    bitDepth: "16",
    channels: "Mono",
    volume: "80",
    micGain: "50",
    alertSounds: true,
    voicePrompts: true,
    handsFree: true,
  },
  serial: {
    port1Mode: "RS232",
    port1Baud: "115200",
    port1Parity: "None",
    port1StopBits: "1",
    port1FlowControl: "None",
    port2Mode: "RS485",
    port2Baud: "9600",
    port2Parity: "None",
    port2StopBits: "1",
    port2FlowControl: "None",
    rs485Enable: true,
    rs485Address: "1",
  },
  temperature: {
    sensor1Type: "NTC",
    sensor1Label: "Ambient",
    sensor1Offset: "0",
    sensor2Type: "K-Type",
    sensor2Label: "Engine",
    sensor2Offset: "0",
    sensor3Type: "NTC",
    sensor3Label: "Cargo",
    sensor3Offset: "0",
    sensor4Type: "Digital",
    sensor4Label: "Coolant",
    sensor4Offset: "0",
    highAlarm: "80",
    lowAlarm: "-20",
    pushInterval: "60s",
  },
  ultrasonic: {
    port: "GPIO",
    sensorCount: "4",
    measureMode: "Sequential",
    rangeMin: "20",
    rangeMax: "400",
    resolution: "1",
    updateRate: "100ms",
    temperatureComp: true,
    obstacleAlert: true,
    alertDistance: "50",
  },
  display: {
    port: "HDMI",
    resolution: "1920x1080",
    orientation: "Landscape",
    brightness: "80",
    timeout: "5min",
    touchEnable: true,
    splashScreen: "Default",
    statusBar: true,
    alertPopups: true,
  },
}

export function useConfigData() {
  const [configData, setConfigData] = useState<ConfigData>(initialConfigData)

  const updateConfig = (device: keyof ConfigData, field: string, value: string | boolean | number) => {
    setConfigData((prev) => ({
      ...prev,
      [device]: { ...prev[device], [field]: value },
    }))
  }

  return { configData, updateConfig }
}
