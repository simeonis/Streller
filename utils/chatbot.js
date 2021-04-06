import 'tmi.js';

const tmi = require('tmi.js');

export default class ChatBot {
    constructor(username, token, handler) {
        this.client = null;
        this.handler = handler;
        this.params = {
            identity: {
                username: username,
                password: token
            },
            channels: []
        }
    }

    // Event Handlers
    onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }

    onDisconnectedHandler(reason) {
        console.log(`* Disconnected: ${reason}`);
    }

    // Functions
    join(channel) {
        this.params.channels[0] = channel;
        this.client = new tmi.client(this.params);

        // Event Handler Setup
        this.client.on('connected', this.onConnectedHandler);
        this.client.on('disconnected', this.onDisconnectedHandler);
        this.client.on('notice', this.handler);

        this.client.connect()
        .catch(() => {
            console.error(`Failed to join channel "${channel}"`);
        });
    }

    leave() {
        if (this.client) {
            console.log(`Successfully disconnected from channel "${this.params.channels[0]}"`);
            this.params.channels = [];
            this.client = null;
        }
    }

    send(message) {
        if (this.client && message.length > 0) {
            this.client.say(this.params.channels[0], message);
        } else {
            console.error("Please join a channel before sending a message");
        }
    }
}