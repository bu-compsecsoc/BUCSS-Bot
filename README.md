# BUCSS-Bot

This is the bot used to manage the [BUCSS](https://bucss.net) Discord server.

---

## Commands

### Poll

Create a poll that will be sent in the **Poll Channel** with the results being sent to the **Admin Channel**.

### Status

See the bots status with uptime stats

## Setup

### .env

Change the .env.template to .env and fill in the entires

TOKEN
> The bot token, avaliable at the [Discord Developer Portal](https://discord.com/developers/applications)

CLIENT_ID
> The bot's client ID, avaliable at the [Discord Developer Portal](https://discord.com/developers/applications)

SUBU_AUTH
> The auth cookie for the SUBU login

GUILD_ID
> The Id of the BUCSS Server

POLL_CHANNEL_ID
> The id of the channel that polls with be sent in

ADMIN_CHANNEL
> The id of the channel to send admin messages


### Deploying

Run the follow commands

> npm install
> npm start
