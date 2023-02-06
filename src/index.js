import { Collection } from 'discord.js';
import * as fs from 'fs';
import {client, channel, repo, octokit} from './globals.js'

var commandList = new Collection();
var previousCommit = '';
const prefix = '!';

async function fillCommandList() {
  for (const file of fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'))) {
    const command = await import(`./commands/${file}`);
    commandList.set(command.name, command);
    // TODO: setBranch ...
  }
}

function initializeCommands() {
  client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot)
      return;

    const parse = message.content.split(' ');
    const command = parse[0].substring(1);
    const args = parse.slice(1);

    try {
      commandList.get(command).execute(message, args);
    } catch (err) {
      console.log(`Unknown command: ${command}!`);
    }
  })
}

async function getLatestCommit() {
  try {
  const response = await octokit.request(`GET /repos/${repo['Owner']}/${repo['Name']}/commits`, {
    owner: repo['Owner'],
    repo: repo['Name']
  });
  if (response.status === 404 || previousCommit === response.data[0]['html_url'])
    return;
  channel.send(`New commit:\n${response.data[0]['commit']['message']}\n${response.data[0]['html_url']}`);
  previousCommit = response.data[0]['html_url'];
  } catch (err) {
    console.log(err);
  }
}

function main() {
  fillCommandList();
  initializeCommands();
  setInterval(getLatestCommit, 60000);
}

main();