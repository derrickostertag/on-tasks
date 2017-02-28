// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Install ScaleIO base',
    injectableName: 'Task.Base.Install.ScaleIo',
    runJob: 'Job.Install.ScaleIo',
    optionsSchema: {
        "properties": {
            "action": {
                "enum": [
                    "clearSEL",
                    "identifyOff",
                    "identifyOn",
                    "identifyBlink",
                    "mcResetCold",
                    "NMI",
                    "powerButton",
                    "powerOff",
                    "powerOn",
                    "powerStatus",
                    "reboot",
                    "reset",
                    "setBootPxe",
                    "softReset"
                ]
            },
            "obmService": {
                "enum": [
                    "amt-obm-service",
                    "apc-obm-service",
                    "ipmi-obm-service",
                    "noop-obm-service",
                    "panduit-obm-service",
                    "raritan-obm-service",
                    "redfish-obm-service",
                    "servertech-obm-service",
                    "vbox-obm-service",
                    "vmrun-obm-service"
                ]
            },
        },
        "required": ["action"]
    },
    requiredProperties: {},
    properties: {
        power: {}
    }
};
