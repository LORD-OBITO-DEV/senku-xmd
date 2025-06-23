

async function spam(message, client) {

  const remoteJid = message.key.remoteJid;

  await client.spam(remoteJid);

}  
 

export default spam;