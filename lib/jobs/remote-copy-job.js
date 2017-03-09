// Copyright 2017, DELL EMC, Inc.

'use strict';

module.exports = remoteCopyJobFactory;
var di = require('di');

di.annotate(remoteCopyJobFactory, new di.Provide('Job.Remote.Copy'));
di.annotate(remoteCopyJobFactory, new di.Inject(
    'Job.Base',
    'Util',
    'Logger',
    'Assert',
    'Services.Waterline',
    '_',
    'Promise'
    )
);

function remoteCopyJobFactory (
        BaseJob,
        util,
        Logger,
        assert,
        waterline,
        _,
        Promise
) {
    var logger = Logger.initialize(remoteCopyJobFactory);

    function RemoteCopyConfigJob(options, context, taskId) {
        RemoteCopyConfigJob.super_.call(this, logger, options, context, taskId);
        this.options = options;
        this.nodeId = context.target;
    }
    util.inherits(RemoteCopyConfigJob, BaseJob);

    /**
     * @memberOf RemoteCopyConfigJob
     */
    RemoteCopyConfigJob.prototype._run = function run() {
        var self = this;
        var file = self.options.file;

        var vals = {
            host: self.options.host,
            username: self.options.username,
            password: self.options.password,
            path: self.options.path 
         };

        var client = require('scp2');

        client.scp(file, vals, function(error) {
            if (error) {
                self._done(error);
            } else {
                self._done();
            }
        });
    };
    return RemoteCopyConfigJob;
}
