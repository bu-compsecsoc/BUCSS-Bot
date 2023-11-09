import { Client, GatewayIntentBits, Events } from "discord.js"
import {
    runButtonInteraction,
    runModalSubmitInteraction,
    registerSlashCommands,
    runAutocompleteInteraction,
    runCommandInteraction,
 } from "./discord"
import {
    statusCommand,
    pollCommand,
    setAdminChannelCommand,
    setGuildCommand,
    setPollChannelCommand,
    setSubuLoginCommand,
} from "./commands"
import { TOKEN } from "./config";


(async () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] })

    client.once(Events.ClientReady, (client) => {
        const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands`
        console.log(`Ready! Logged in as ${client.user.tag}!`)
        console.log(`Add using: ${inviteUrl}`)
    })

    client.on(Events.InteractionCreate, (interation) => {
        if (interation.isButton()) runButtonInteraction(interation)
        if (interation.isChatInputCommand()) runCommandInteraction(interation)
        if (interation.isAutocomplete()) runAutocompleteInteraction(interation)
        if (interation.isModalSubmit()) runModalSubmitInteraction(interation)
    })

    await registerSlashCommands(
        statusCommand,
        pollCommand,
        setAdminChannelCommand,
        setGuildCommand,
        setPollChannelCommand,
        setSubuLoginCommand
    )
    client.login(TOKEN)
})()
