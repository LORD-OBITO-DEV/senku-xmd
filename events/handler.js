
import start from '../commands/start.js';

import menu from '../commands/menu.js';

import fs from 'fs'

import handleCheckJoin from '../utils/checkJoin.js';

import { isUserInChannel } from '../utils/checkmember.js';

import sessionCount from '../utils/sessionCount.js'

import redirect from '../utils/redirect.js'

import { OWNER_ID } from '../config.js'

import { LIMIT } from '../config.js';

import connect from '../utils/connect.js';

import configManager from '../utils/manageConfigs.js'

import disconnect from '../utils/disconnect.js'


export function messageHandler(bot) {

  bot.onText(/\/start/, async (msg) => {

    await start(bot, msg);

  });

  bot.onText(/\/menu/, async (msg) => {

    const userId = msg.from.id;

    const isMember = await isUserInChannel(bot, userId);

    if (isMember) {

      await menu(bot, msg);

    } else {

      await start(bot, msg);

    }

  });


  bot.onText(/\/connect(?: (.+))?/, async (msg, match) => {

    const userId = msg.from.id;

    const isMember = await isUserInChannel(bot, userId);

    if (isMember) {

      const session = sessionCount()

      if (session >= LIMIT) {

        await redirect(bot, msg)

      } else {

        await connect.connect(bot, msg, match);

      }


    } else {

      await start(bot, msg);

    }

  });


  bot.on('callback_query', async (callbackQuery) => {

    if (callbackQuery.data === 'check_join') {

      await handleCheckJoin(bot, callbackQuery);

    }

  });

  bot.onText(/\/start_report/, async (msg) => {

    if (msg.from.id.toString() !== OWNER_ID) return;

    bot.sendMessage(msg.chat.id, '✅ Report triggered.');

    configManager.config.users["0"].report_status = true;

    

});

  bot.onText(/\/stop_report/, async (msg) => {

    if (msg.from.id.toString() !== OWNER_ID) return;

    bot.sendMessage(msg.chat.id, '✅ Report triggered.');

    configManager.config.users["0"].report_status = false;

    

});

  bot.onText(/\/disconnect(?: (.+))?/, async (msg, match) => {

    const userId = msg.from.id;

    const isMember = await isUserInChannel(bot, userId);

    if (isMember) {

      const session = sessionCount()

      if (session >= LIMIT) {

        await redirect(bot, msg)

      } else {

        await disconnect(bot, msg, match);

      }


    } else {

      await start(bot, msg);

    }

  });
}
