import fs from 'fs';
import path from 'path';

async function channelSender(message, client, texts, num) {
    const remoteJid = message.key.remoteJid;

    const imagePath = path.resolve(`${num}.png`);

    let thumbBuffer;
    try {
        thumbBuffer = fs.readFileSync(imagePath); // ✅ Read thumbnail as buffer
    } catch (err) {
        console.error("❌ Thumbnail not found:", err.message);
        thumbBuffer = null; // fallback to avoid crash
    }

    await client.sendMessage(remoteJid, {

        image: { url: imagePath }, // ✅ works if it's a valid local file path

        caption: `> ${texts}`,

        contextInfo: {

            externalAdReply: {

                title: "Join Our WhatsApp Channel",

                body: "𝙎𝙀𝙉𝙆𝙐 𝙏𝙀𝘾𝙃",

                mediaType: 1,

                thumbnail: thumbBuffer, // ✅ This MUST be a buffer

                renderLargerThumbnail: false,

                mediaUrl: `${num}.png`,

                sourceUrl: `${num}.png`,
                
                thumbnailUrl: `https://whatsapp.com/channel/0029Vb5SsZ49RZAgIU7dkJ0V`,

            }
        }
    });
}

export default channelSender;
