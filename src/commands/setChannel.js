import {client, changeChannel} from './../globals.js'

const name = 'setChannel';
const description = 'Sets the channel to post in';
function execute(message, args) {
    try {
        client.channels.fetch(args[0]).then(channelResponse => changeChannel(channelResponse))
        message.channel.send(`Set channel ID on: ${args[0]}!`);
    } catch (err) {
        console.log(`Unknown channel ID: ${args[0]}!`);
    }
}

export {name, description, execute}