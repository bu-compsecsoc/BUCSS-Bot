type InteractionName =
    "sendAnnouncement" |
    "previewAnnouncement" |
    "memberVerify";

export function encodeCustomId(name: InteractionName, data: any | null = null) {
    let json = JSON.stringify(data);
    let b64_data = Buffer.from(json).toString("base64")
    return `${name}|${b64_data}`;
}

export function decodeCustomId(id: string): { interaction_name: string, data: any }{
    let [name, data] = id.split("|");
    if (data !== undefined) {
        let b64_decoded_data = Buffer.from(data, "base64").toString();
        data = JSON.parse(b64_decoded_data);
    }
    return {
        interaction_name: name,
        data,
    }
};
