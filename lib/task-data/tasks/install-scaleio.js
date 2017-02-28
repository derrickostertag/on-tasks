// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Install ScaleIO',
    injectableName: 'Task.Install.ScaleIo',
    implementsTask: 'Task.Base.Install.ScaleIo',
    options: {
        'command': 'sshpass -p "onrack" scp EMC-ScaleIO-mdm-2.0-12000.122.el7.x86_64.rpm root@172.31.128.120:/tmp/.'
    },
    properties: {}
};
