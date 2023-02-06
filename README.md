# RepoNotifier

Simple Discord bot that notifies the latest commit on the main branch.

## Install (Node.js)

### Packages

- npm i discord.js
- npm i dotenv
- npm i octokit

### .env

- DISCORD_TOKEN: bot's token [here](https://discord.com/developers/applications)
- REPO_TOKEN: in case of private repos [here](https://github.com/settings/tokens)
- CHANNEL_ID: or with !setChannel command

### Permissions

- Set the necessary read/write permissions including PRESENCE INTENT, SERVER MEMBERS INTENT and MESSAGE CONTENT INTENT in the Discord Developer Portal.
- Set the necessary read/write permissions of the Github Token (in case of private repository).

## Commands

- !setChannel #channelID: sets the channel to send in
- !setRepo #repoOwner #repoName: sets the repository to listen to