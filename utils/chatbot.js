import 'tmi.js';

const tmi = require('tmi.js');

export default class ChatBot {
    constructor(username, token) {
        this.client = null;
        this.params = {
            identity: {
                username: username,
                password: token
            },
            channels: []
        }
    }

    // Triggers when user joins a channel
    onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }

    join(channel) {
        this.params.channels[0] = channel;
        this.client = new tmi.client(this.params);
        this.client.on('connected', this.onConnectedHandler);
        this.client.connect().catch(() => {
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
        if (this.client) {
            this.client.say(this.params.channels[0], message);
        } else {
            console.error("Please join a channel before sending a message");
        }
    }
}