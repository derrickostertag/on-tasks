// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Install ScaleIO base',
    injectableName: 'Task.Base.Install.ScaleIo',
    runJob: 'Job.Install.ScaleIo',
    optionsSchema: {
        "properties": {
            "command": {
                "string": [
                    'sshpass -p "onrack" scp EMC-ScaleIO-mdm-2.0-12000.122.el7.x86_64.rpm root@172.31.128.120:/tmp/.'
                ]
            }
        }
    },
    requiredProperties: {},
    properties: {}
};
