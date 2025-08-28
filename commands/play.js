import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export async function play(message, client) {
  const remoteJid = message.key.remoteJid;

  const messageBody = (
    message.message?.extendedTextMessage?.text ||
    message.message?.conversation ||
    ''
  ).toLowerCase();

  try {
    const title = getArg(messageBody);

    if (!title) {
      await client.sendMessage(remoteJid, {
        text: '❌ Please provide a video title.'
      });
      return;
    }

    console.log(`🎯 Searching and downloading: ${title}`);

    await client.sendMessage(remoteJid, {
      text: `> _*Processing download for: ${title}*_`,
      quoted: message
    });

    const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(title)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.result || !data.result.download_url) {
      throw new Error('Video not found or no download URL available.');
    }

    const video = data.result;

    // Send thumbnail and info
    await client.sendMessage(remoteJid, {
      image: { url: video.thumbnail },
      caption: `> 🎵 *${video.title}*\n\n> 🔗 ${video.video_url}\n> ⏱️ ${video.duration} | 👁️ ${video.views} views\n\n> 📥 Downloading audio...\n\n> Powered By Senku Tech`,
      quoted: message
    });

    // Send the audio directly from download_url
    await client.sendMessage(remoteJid, {
      audio: { url: video.download_url },
      mimetype: 'audio/mp4',
      ptt: false,
      quoted: message
    });

    console.log(`✅ Audio sent: ${video.download_url}`);

  } catch (err) {
    console.error('❌ Error in play command:', err);

    await client.sendMessage(remoteJid, {
      text: `❌ Failed to play: ${err.message}`
    });
  }
}

// Extract video title from the user's message
function getArg(body) {
  const parts = body.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(1).join(' ') : null;
}

export default play;
