// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = scaleioJobFactory;
var di = require('di');

di.annotate(scaleioJobFactory, new di.Provide('Job.Install.ScaleIo'));
di.annotate(scaleioJobFactory, new di.Inject(
    'Job.Base',
    'Util',
    'Logger',
    'Assert',
    'Services.Waterline',
    '_',
    'Promise'
    )
);

function scaleioJobFactory (
        BaseJob,
        util,
        Logger,
        assert,
        waterline,
        _,
        Promise
) {
    var logger = Logger.initialize(scaleioJobFactory);

    function ScaleIoConfigJob(options, context, taskId) {
        ScaleIoConfigJob.super_.call(this, logger, options, context, taskId);
        this.options = options;
        this.nodeId = context.target;
    }
    util.inherits(ScaleIoConfigJob, BaseJob);

    /**
     * @memberOf ScaleIoConfigJob
     */
    ScaleIoConfigJob.prototype._run = function run() {
        var self = this;
        var command = self.options.command;
        var client = require('scp2');

        client.scp('/home/onrack/files/EMC-ScaleIO-mdm-2.0-12000.122.el7.x86_64.rpm', 'onrack:onrack@172.31.128.120:EMC-ScaleIO-mdm-2.0-12000.122.el7.x86_64.rpm', function(error) {
            if (error) {
                console.error('scp error');
                console.error(`scp error: ${error}`);
            } else {
                console.error('scp ok');
            }
        });


        var Client = require('ssh2').Client;

        console.error('ssh2 atttempt');

        var conn = new Client();
        conn.on('ready', function() {
          console.error('ssh2 connetction ready');
          console.error('Client :: ready');
          conn.exec('rpm -qip "/home/onrack/EMC-ScaleIO-mdm-2.0-12000.122.el7.x86_64.rpm"', function(err, stream) {
            console.error('ssh2 pre-throw');

            if (err) throw err;
            stream.on('close', function(code, signal) {
              console.error('Stream :: close :: code: ' + code + ', signal: ' + signal);
              conn.end();
            }).on('data', function(data) {
              console.error('STDOUT: ' + data);
            }).stderr.on('data', function(data) {
              console.error('STDERR: ' + data);
            });
          });
        }).connect({
          host: '172.31.128.120',
          username: 'onrack',
          password: 'onrack'
        });


        const exec = require('child_process').exec;
        exec(command, {cwd:__dirname},
            (error, stdout, stderr) => {
            if (error) {
                console.error('ScaleIO deply error');
                console.error(`exec error: ${error}`);
                console.error(`stderr: ${stderr}`);
//                logger.error(`stderr: ${stderr}`);
                self._done(error);
            } else {
                console.error('ScaleIO deply ok');
                console.info(`stdout: ${stdout}`);
//                logger.info(`stdout: ${stdout}`);
                self._done();
            }
        });
    };

    return ScaleIoConfigJob;
}
