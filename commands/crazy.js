














/*

// some fun and utils commands ya :)

//import config from 'api.jsonfig.js';

import fs from 'fs';

import axios from 'axios'


export async function quote(message, client) {

    const remoteJid = message.key.remoteJid;

    try {

        const response = await axios.get('https://api.quotable.io/random');

        const quoteData = response.data;

        const quoteMessage = `"${quoteData.content}" - ${quoteData.author}`;

        client.sendMessage(remoteJid, quoteMessage);

    } catch (error) {

        console.error('Error fetching quote:', error);

        client.sendMessage(remoteJid, 'Sorry, there was an error fetching a quote. Please try again later.');
    }

}

export async function meme(message, client) {

    const remoteJid = message.key.remoteJid;

    try {

        const response = await axios.get('https://meme-api.herokuapp.com/gimme');

        const memeData = response.data;

        const memeMessage = `Title: ${memeData.title}\nSubreddit: ${memeData.subreddit}\n\n${memeData.url}`;

        client.sendMessage(remoteJid, memeMessage);

    } catch (error) {

        console.error('Error fetching meme:', error);

        client.sendMessage(remoteJid, 'Sorry, there was an error fetching a meme. Please try again later.');
    }

}

export async function jokes(message, client) {

    const remoteJid = message.key.remoteJid;

    try {

        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');

        const jokeData = response.data;

        const jokeMessage = `${jokeData.setup}\n\n${jokeData.punchline}`;

        client.sendMessage(remoteJid, jokeMessage);

    } catch (error) {

        console.error('Error fetching joke:', error);

        client.sendMessage(remoteJid, 'Sorry, there was an error fetching a joke. Please try again later.');
    }
}

export async function fact(message, client) {

    const remoteJid = message.key.remoteJid;

    try {

        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');

        const factData = response.data;

        const factMessage = `Did you know?\n\n${factData.text}`;

        client.sendMessage(remoteJid, factMessage);

    } catch (error) {

        console.error('Error fetching fact:', error);

        client.sendMessage(remoteJid, 'Sorry, there was an error fetching a fact. Please try again later.');
    }
}


export default  { quote, meme, jokes, fact };

*/