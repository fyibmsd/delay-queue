'use strict';

const net    = require('net');
const logger = require('./logger');

class client {
    constructor() {
        this.client = net.createConnection('/tmp/queue.sock', () => logger('connected to server!'));
    }

    addTask(delay) {
        this.client.write(JSON.stringify({delay: delay}));

        logger(`add new task delay execute ${delay}s`);
    }
}

let delay = 12; // 延迟12秒执行

(new client()).addTask(delay);
