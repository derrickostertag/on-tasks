// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Remote Execute',
    injectableName: 'Task.Remote.Exec',
    implementsTask: 'Task.Base.Remote.Exec',
    optionsSchema: 'remote-exec.json',
    options: {
      'command': null,
      'username': null,
      'password': null,
      'host': null 
    },
    properties: {}
};
