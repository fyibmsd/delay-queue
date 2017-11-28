'use strict';

const net    = require('net');
const fs     = require('fs');
const logger = require('./logger');
const task   = require('./task');

class Queue {
    constructor() {
        this.current_slot = 0;
        this.slots        = new Array(60);

        this.server = net.createServer(client => {
            logger('client connected');

            client.on('data', (data) => {
                let time = (new Date()).toTimeString();
                data     = JSON.parse(data);

                let item  = new task(() => logger(`single task add at ${time}`), data['delay']);
                let index = data['delay'] % 60 + this.current_slot;

                this.slots[index] = item;

                logger(`add new task delay execute ${data['delay']}s`);

                client.end();
            });


            client.on('end', () => logger('client disconnected'));
        });

        this.server.on('close', () => logger('server closed'));
    }

    static exec() {
        let task = queue.slots[queue.current_slot];
        queue.current_slot++;

        if (task !== undefined) {
            if (task.cycle_num !== 0)
                task.cycle_num--;
            else
                return task.function();
        }

        logger('No task');
    }

    run(sock) {
        setInterval(Queue.exec, 1000);

        this.server.listen(sock);
    }

}

const queue = new Queue();

queue.run('/tmp/queue.sock');