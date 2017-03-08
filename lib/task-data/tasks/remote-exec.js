// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Remote Execute',
    injectableName: 'Task.Remote.Exec',
    implementsTask: 'Task.Base.Remote.Exec',
//    schemaRef: 'install-scaleio.json',
    options: {
      'command': null,
//      'path': null,
      'username': null,
      'password': null,
      'host': null 
    },
    properties: {}
};
