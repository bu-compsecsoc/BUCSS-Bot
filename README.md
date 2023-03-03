# BUCSS-Bot

This is the bot used to manage the [BUCSS](https://bucss.net) Discord server.

---

## Commands

### Announce

`/announce`

Brings up a modal with a box to type in. You can then preview it with the button that pops up. If you are happy with it, you can send it to the server. This will send the message to the specified channel in the Environment Variables.

### Ping

`/ping`

This will send a message to the channel you are in with the message "Pong!".

### Status

`/status {status}`

This will change the status of the bot to the status you specify.
Can be:

- `online`
- `idle`
- `dnd`
- `invisible`

### Activity

`/activity {activity}`

This will change the activity of the bot to the activity you specify.

---

## Setup

Change the .env.template to .env and fill in the entires

TOKEN
> The bot token, avaliable at the [Discord Developer Portal](https://discord.com/developers/applications)

CLIENT_ID
> The bot's client ID, avaliable at the [Discord Developer Portal](https://discord.com/developers/applications)

ANNOUNCEMENT_CHANNEL
> The id of the channel that announcements will be sent in
