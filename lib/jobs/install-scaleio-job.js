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
        const exec = require('child_process').exec;
        exec('sshpass -p "onrack" scp EMC-ScaleIO-mdm-2.0-12000.122.el7.x86_64.rpm root@172.31.128.120:/tmp/. ', {cwd:__dirname},
            (error, stdout, stderr) => {
            if (error) {
                logger.error(`stderr: ${stderr}`);
                self._done(error);
            } else {
                logger.info(`stdout: ${stdout}`);
                self._done();
            }
        });
    };

    return ScaleIoConfigJob;
}
