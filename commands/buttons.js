
import jimp from 'jimp'

async function test(message, client) {

     const jid = message.key.remoteJid;

       // Example non header media
     await client.sendMessage(jid,

         {
             text: "Description Of Messages", //Additional information

             title: "Title Of Messages",

             subtitle: "Subtitle Message",

             footer: "Footer Messages",

             interactiveButtons: [

                  {
                     name: "quick_reply",

                     buttonParamsJson: JSON.stringify({

                          display_text: "Display Button",

                          id: "ID"
                     })
                  },

                  {
                     name: "cta_url",

                     buttonParamsJson: JSON.stringify({

                          display_text: "Display Button",

                          url: "https://www.example.com"
                     })
                  }
             ]
         },
       {
         quoted : message
       }
     )

// Example with media
await client.sendMessage(

    jid,

    {
        image: { url : "3.png" }, // Can buffer

        caption: "Description Of Messages", //Additional information

        title: "Title Of Messages",

        subtitle: "Subtile Message",

        footer: "Footer Messages",

        media: true,

        interactiveButtons: [
             {
                name: "quick_reply",

                buttonParamsJson: JSON.stringify({

                     display_text: "Display Button",

                     id: "ID"
                })
             },
             {
                name: "cta_url",

                buttonParamsJson: JSON.stringify({

                     display_text: "Display Button",

                     url: "https://www.example.com"
                })
             }
        ]
    },
  {
    quoted : message
  }
)

// Example with header product
await client.sendMessage(jid,

    {
        product: {

            productImage: { url: "2.png" },

            productImageCount: 1,

            title: "Title Product",

            description: "Description Product",

            priceAmount1000: 20000 * 1000,

            currencyCode: "IDR",

            retailerId: "Retail",

            url: "https://example.com",            
        },
        businessOwnerJid: "1234@s.whatsapp.net",

        caption: "Description Of Messages", //Additional information

        title: "Title Of Messages",

        footer: "Footer Messages",

        media: true,

        interactiveButtons: [

             {
                name: "quick_reply",

                buttonParamsJson: JSON.stringify({

                     display_text: "Display Button",

                     id: "ID"
                })
             },
             {
                name: "cta_url",

                buttonParamsJson: JSON.stringify({

                     display_text: "Display Button",

                     url: "https://www.example.com"
                })
             }
        ]
    },
  {
    quoted : message
  }
)

 }
export default test;
