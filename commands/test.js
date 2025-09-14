async function test(message, client) {

  const remoteJid = message.key.remoteJid;

  const quotedMessage = message.message.extendedTextMessage.contextInfo.quotedMessage;

  const msg = message.message;

  await client.sendMessage(remoteJid, {text:quotedMessage})
}

export default test;
