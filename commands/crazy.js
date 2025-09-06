// some fun and utils commands ya :)
import config from 'api.jsonfig.js';
import fs from 'fs';

export async function Tinyurl(message, client) {
    const axios = require('axios');
    const url = message.body.slice(8).trim();
    if (!url) {
        return client.sendMessage(message.from, 'Please provide a URL to shorten. Usage: !tinyurl <URL>');
    }
    try {
        const response = await axios.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        const shortUrl = response.data;
        client.sendMessage(message.from, `Here is your shortened URL: ${shortUrl}`);
    } catch (error) {
        console.error('Error shortening URL:', error);
        client.sendMessage(message.from, 'Sorry, there was an error shortening the URL. Please try again later.');
    }
}

export async function Uptime(message, client, startTime) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeMessage = `Bot Uptime: ${hours}h ${minutes}m ${seconds}s`;
    client.sendMessage(message.from, uptimeMessage);
}

export async function Ping(message, client) {
    const start = Date.now();
    await client.sendMessage(message.from, 'Pong!');
    const latency = Date.now() - start;
    client.sendMessage(message.from, `Latency: ${latency}ms`);
}

export async function Quote(message, client) {
    const axios = require('axios');
    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quoteData = response.data;
        const quoteMessage = `"${quoteData.content}" - ${quoteData.author}`;
        client.sendMessage(message.from, quoteMessage);
    } catch (error) {
        console.error('Error fetching quote:', error);
        client.sendMessage(message.from, 'Sorry, there was an error fetching a quote. Please try again later.');
    }

}

export async function Meme(message, client) {
    const axios = require('axios');
    try {
        const response = await axios.get('https://meme-api.herokuapp.com/gimme');
        const memeData = response.data;
        const memeMessage = `Title: ${memeData.title}\nSubreddit: ${memeData.subreddit}\n\n${memeData.url}`;
        client.sendMessage(message.from, memeMessage);
    } catch (error) {
        console.error('Error fetching meme:', error);
        client.sendMessage(message.from, 'Sorry, there was an error fetching a meme. Please try again later.');
    }
}
export async function Jokes(message, client) {
    const axios = require('axios');
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const jokeData = response.data;
        const jokeMessage = `${jokeData.setup}\n\n${jokeData.punchline}`;
        client.sendMessage(message.from, jokeMessage);
    } catch (error) {
        console.error('Error fetching joke:', error);
        client.sendMessage(message.from, 'Sorry, there was an error fetching a joke. Please try again later.');
    }
}

export async function Fact(message, client) {
    const axios = require('axios');
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        const factData = response.data;
        const factMessage = `Did you know?\n\n${factData.text}`;
        client.sendMessage(message.from, factMessage);
    } catch (error) {
        console.error('Error fetching fact:', error);
        client.sendMessage(message.from, 'Sorry, there was an error fetching a fact. Please try again later.');
    }
}

export async function Covid(message, client) {
    const axios = require('axios');
    const country = message.body.slice(7).trim();
    if (!country) {
        return client.sendMessage(message.from, 'Please provide a country name. Usage: !covid <country>');
    }
    try {
        const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}`);
        const covidData = response.data;
        const covidMessage = `COVID-19 Stats for ${covidData.country}:\n\nCases: ${covidData.cases}\nDeaths: ${covidData.deaths}\nRecovered: ${covidData.recovered}\nActive: ${covidData.active}\nCritical: ${covidData.critical}\nTests: ${covidData.tests}`;
        client.sendMessage(message.from, covidMessage);
    } catch (error) {
        console.error('Error fetching COVID-19 data:', error);
        client.sendMessage(message.from, 'Sorry, there was an error fetching COVID-19 data. Please ensure the country name is correct and try again later.');
    }
}

/*export async function ReportNumber(message, client) {

}
*/
export async function ListPlugIncommandFolder(message, client) {
    const fs = require('fs');
    const path = require('path');
    const pluginDir = path.join(__dirname, 'commands');
    fs.readdir(pluginDir, (err, files) => {
        if (err) {
            console.error('Error reading plugin directory:', err);
            return client.sendMessage(message.from, 'Sorry, there was an error listing the plugins. Please try again later.');
        }
        const pluginList = files.filter(file => file.endsWith('.js')).map(file => file.replace('.js', '')).join('\n');
        const listMessage = `Available Plugins:\n\n${pluginList}`;
        client.sendMessage(message.from, listMessage);
    });
}

export async function Shell(message, client) {
    const { exec } = require('child_process');
    const command = message.body.slice(6).trim();
    if (!command) {
        return client.sendMessage(message.from, 'Please provide a shell command to execute. Usage: !shell <command>');
    }
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing command:', error);
            return client.sendMessage(message.from, `Error executing command: ${error.message}`);
        }
        if (stderr) {
            console.error('Command stderr:', stderr);
            return client.sendMessage(message.from, `Command stderr: ${stderr}`);
        }
        const output = stdout || 'Command executed successfully with no output.';
        client.sendMessage(message.from, `Command output:\n\n${output}`);
    });
}

export async function CrazyDev(message, client) {
    const crazyDevInfo = `
*Crazy Dev* - The Helper.
` 
const img = '../img/crazy.jpg';
   client.sendMessage(message.from, 
    { caption: crazyDevInfo,
         image: img 
        });
}
export async function Screenshoot(message, client) {
    const axios = require('axios');
    const url = message.body.slice(11).trim();
    if (!url) {
        return client.sendMessage(message.from, 'Please provide a URL to screenshot. Usage: !screenshot <URL>');
    }
    try {
        const response = await axios.get(`https://api.screenshotmachine.com?key=${config.API_KEY}&url=${encodeURIComponent(url)}&dimension=1024x768`);
        const screenshotUrl = response.request.res.responseUrl;
        client.sendMessage(message.from, `Here is your screenshot: ${screenshotUrl}`);
    } catch (error) {
        console.error('Error taking screenshot:', error);
        client.sendMessage(message.from, 'Sorry, there was an error taking the screenshot. Please try again later.');
    }
}
export async function SenkuXmdScript(message, client) {
    const senkuInfo = `
*Senku Xmd Script* - The original script on which this bot is based.
    `;
    const img = '../img/senku.jpg';
    client.sendMessage(message.from,
        {
            caption: senkuInfo,
            image: img
        });
}

export async function Donate(message, client) {
    const donateInfo = `
*Support the Development* - If you find this bot useful, consider supporting its development.
You can donate via the following methods:
- PayPal: paypal.me/CrazyNotDev
- Patreon: patreon.com/Crazy241
Thank you for your support!
    `;
    const img = '../img/donate.jpg';
    client.sendMessage(message.from,
        {
            caption: donateInfo,
            image: img
        });
}

export default  { Tinyurl, Uptime, Ping, Quote, Meme, Jokes, Fact, Covid, ListPlugIncommandFolder, Shell, CrazyDev, Screenshoot, SenkuXmdScript, Donate };
