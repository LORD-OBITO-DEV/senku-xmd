
import {getDevice}  from "bailey";

async function whois(message, client) {
	
	const remoteJid = message.key.remoteJid;

	const quotedUser = message.message?.extendedTextMessage?.contextInfo;

	if (!quotedUser) return await client.sendMessage(remoteJid, {text:"_You need to quote a messagefor this command._"})

	const quotedUserId = quotedUser?.key?.participant;

	const quotedNum = quotedUser?.key?.participantPn

	const username = quotedUser?.pushName;

	const msgId = quotedUser?.stanzaId;

    const system = getDevice(quotedNum);

	try {

    const url = await client.profilePictureUrl(quotedUserId, 'image');

    await client.sendMessage(remoteJid, {

      text: `[ User Informations ] \n\n *Username:* _${username}_\n*participant:*_${quotedUserId}\n*participant ID:* _${quotedNum}_\n*System:*_${system}_\n\n> Powered By Senku Tech 🥷🏾.`,

    });

  } catch (err) {

    console.error('❌ Error fetching profile picture:', err);

    await client.sendMessage(remoteJid, {

      text: `❌ Could not fetch profile picture for *@${quotedUserId.split('@')[0]}*.`,

    });

  }

}

export default whois;