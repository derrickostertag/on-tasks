// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Install ScaleIO',
    injectableName: 'Task.Install.ScaleIo',
    implementsTask: 'Task.Base.Install.ScaleIo',
    options: {
        action: 'powerOn'
    },
    properties: {
        power: {}
    }
};
