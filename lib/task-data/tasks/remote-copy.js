// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Remote Copy',
    injectableName: 'Task.Remote.Copy',
    implementsTask: 'Task.Base.Remote.Copy',
    optionsSchema: 'remote-copy.json',
    options: {
      'file': null,
      'path': null,
      'username': null,
      'password': null,
      'host': null
    },
    properties: {}
};
