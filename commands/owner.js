
export async function owner(message, client) {

    const remoteJid = message.key.remoteJid;

    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN: DEV SENKU\n' // full name
            + 'ORG: Senku Tech;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=237689360833:+237689360833\n' // WhatsApp ID + phone number
            + 'END:VCARD'

    await client.sendMessage(remoteJid,

        { 
            contacts: { 

                displayName: '_*DEV SENKU*_', 

                contacts: [{ vcard }] 
            }
        }
    );

}

export default owner;
