import fs from 'fs';

import path from 'path';

import configManager from './utils/manageConfigs.js';

import { execSync, spawn } from 'child_process';

const repoUrl = 'https://github.com/Danscot/senku-xmd'; // Replace

const tempCloneDir = path.join(process.cwd(), '.temp_bot_update');

const primary = configManager.config.users["root"].primary

const authFile = path.join(process.cwd(), `sessions/${primary}`, 'creds.json');

const mainEntry = path.join(process.cwd(), 'main.js');

function hasValidAuthFile() 
{
  try {

    if (!fs.existsSync(authFile)) return false;

    const content = fs.readFileSync(authFile, 'utf8');

    return content.trim().length > 0;

  } catch {

    return false;

  }

}

function copyFolderContents(src, dest) {

  if (!fs.existsSync(src)) return;

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {

    const srcPath = path.join(src, entry.name);

    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {

      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });

      copyFolderContents(srcPath, destPath);

    } else {

      fs.copyFileSync(srcPath, destPath);

    }
  }
}

function syncRepo() {

  try {

    if (fs.existsSync(tempCloneDir)) {

      console.log('🔄 Pulling latest code...');

      execSync(`git -C ${tempCloneDir} pull`, { stdio: 'inherit' });

    } else {

      console.log('📥 Cloning remote bot...');

      execSync(`git clone ${repoUrl} ${tempCloneDir}`, { stdio: 'inherit' });

    }
  } catch (err) {

    console.error('❌ Git sync failed:', err);

    process.exit(1);

  }
}

function launchMain() {

  const child = spawn('node', [mainEntry], { stdio: 'inherit' });

  child.on('exit', code => {

    console.log(`🛑 Bot exited with code ${code}`);

  });

}

(async () => {

  if (hasValidAuthFile()) {

  } else {

    console.log('⚠️  updating bot code...');

    syncRepo();

    console.log('🔁 Copying updated files to root...');

    copyFolderContents(tempCloneDir, process.cwd());

    fs.rmSync(tempCloneDir, { recursive: true, force: true });

  }

  launchMain();

})();
