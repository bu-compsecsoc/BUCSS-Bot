require("dotenv").config()

export const token = attempt_get_env("TOKEN", "bot token");
export const client_id = attempt_get_env("CLIENT_ID", "bot client id");
export const annoucnment_channel_id = attempt_get_env("ANNOUNCEMENT_CHANNEL", "annoucnment channel id");
export const member_role_id = attempt_get_env("MEMBER_ROLE_ID", "member role id", { required: false });
export const member_view_channel = attempt_get_env("MEMBER_VIEW_CHANNEL", "member view channel id", { required: false });

function attempt_get_env(
        env_name: string,
        description: string,
        { required } = { required: false }
        ): any {
    const has_empty_value = !(env_name in process.env) || process.env[env_name] === "";
    if (required && has_empty_value) {
        console.warn(`
        Configuration Warning:
        You haven't set a ${description}.
        Try setting the ${env_name} var in the .env file
        `)
        process.exit()
    } else {
        return process.env[env_name]
    }
}
