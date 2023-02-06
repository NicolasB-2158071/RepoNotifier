import {changeRepo} from './../globals.js'

const name = 'setRepo';
const description = 'Sets the current repository to listen to.';
function execute(message, args) {
    changeRepo(args[0], args[1]);
    message.channel.send(`Set repository to: ${args[1]}!`);
}

export {name, description, execute}