'use strict';

class task {
    constructor(callback, delay) {
        this.function  = callback;
        this.cycle_num = Math.round(delay / 60);
    }
}

module.exports = task;
