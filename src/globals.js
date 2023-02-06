import dotenv from 'dotenv'
import {Client, GatewayIntentBits} from 'discord.js'
import { Octokit } from '@octokit/core';
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

var channel;
var repo = {'Owner' : '', 'Name' : ''};

const octokit = new Octokit({
    auth: process.env.REPO_TOKEN
  });

client.on('ready', () => {
    client.channels.fetch(process.env.CHANNEL_ID).then(channelResponse => channel = channelResponse);
  });

function changeChannel(channelID) {
    client.channels.fetch(channelID).then(channelResponse => channel = channelResponse);
}

function changeRepo(repoOwner, repoName) {
    repo['Owner'] = repoOwner;
    repo['Name'] = repoName;
}

client.login(process.env.DISCORD_TOKEN);

export {client, channel, repo, octokit, changeChannel, changeRepo};