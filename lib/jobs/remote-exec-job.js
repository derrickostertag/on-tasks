// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = remoteExecJobFactory;
var di = require('di');

di.annotate(remoteExecJobFactory, new di.Provide('Job.Remote.Exec'));
di.annotate(remoteExecJobFactory, new di.Inject(
    'Job.Base',
    'Util',
    'Logger',
    'Assert',
    'Services.Waterline',
    '_',
    'Promise'
    )
);

function remoteExecJobFactory (
        BaseJob,
        util,
        Logger,
        assert,
        waterline,
        _,
        Promise
) {
    var logger = Logger.initialize(remoteExecJobFactory);

    function RemoteExecConfigJob(options, context, taskId) {
        RemoteExecConfigJob.super_.call(this, logger, options, context, taskId);
        this.options = options;
        this.nodeId = context.target;
    }
    util.inherits(RemoteExecConfigJob, BaseJob);

    /**
     * @memberOf RemoteExecConfigJob
     */
    RemoteExecConfigJob.prototype._run = function run() {
        var self = this;
        var command = self.options.command;
        var host = self.options.host;
        var username = self.options.username;
        var password = self.options.password;

        var client = require('ssh2').Client;
        var conn = new client();

        conn.on('ready', function() {
            logger.info('Remote Command: ' + command);
            conn.exec(command, function(error, stream) {
//                if (error) throw error;
                stream.on('close', function(code, signal) {
                    logger.info('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', function(data) {
                    logger.info('STDOUT: ' + data);
                }).on('end', function(data) {
                    self._done();
                }).stderr.on('data', function(data) {
                    self._done(data);
                });
            });
        }).connect({
            host: host,
            username: username,
            password: password 
        });
    };
    return RemoteExecConfigJob;
}
