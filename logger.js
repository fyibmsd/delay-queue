'use strict';

module.exports = function (msg) {
    let time = (new Date()).toTimeString();

    console.info(`[${time}] ${msg}`);
};
