type InteractionName =
    "sendAnnouncement" |
    "confirmAnnouncement" |
    "memberVerify" |
    "memberReject";

export function encodeCustomId(name: InteractionName, data: any | null = null) {
    let json = JSON.stringify(data);
    let b64_data = Buffer.from(json).toString("base64")
    const id = `${name}|${b64_data}`;
    if (id.length > 100) {
        throw new Error("Custom ID is too long, send less data")
    } else {
        return id
    }

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
