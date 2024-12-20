const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0MveXNsemlta0Jkb3RBcHRNeDFTcURmcDhKa3pPS21tcmhFeDFBVEUyaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieExRVjEzYS9zdm1Fa1BvWlA2UTZvQ0QxcHJta3ZUcVVrVWFZM09kNk5sbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSXZjbHQ5TGtxaGl0elVPVHhzY1Y0aHdxTjdsNlZSdlFOOFo4azZlY1hnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0bms3K0JmNW9oN1ZIaElZZng0MlNSdDEzRW5Zc0JER2UxSmhZTlNXbUdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9CWWtqTHBlMU43TDV3dCtVdGEzbnZKMlQ0a1FtUjRXS2plUjJjM0JhRms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxOcXdVL3RHL1NZMVRpZDhlczJuK3diOVNzb3MzMTlIQk4waHlPRG0yWFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU92cHo4UGJVaDF2SjlSL2RrNEM4STNSOUVzQTR3NWpHVkJkZzJ1blAwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiei84Vm9LYXE2VkIrcUtodG5Bb3N4TVNQdWZNVVNmYzJOQnJ3M3VIRFBBTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFRYkxJa3hRVCtkQkdCZFlqeGFMN2toWDcyMGU0anJSSjdrWW43TEhJblZMcFdzL2JFTy9UVnc4cCtOWUVKZkJZQ1cybjlNaUtvN3hBTk5PbFhzMmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiI1VFhmcm1xQzhXcWMxaEczOHUvcTB6ejFzb1ZZYjVmV3U4RWRnOVY4aVc0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfWms4S25iU1RJZXVxYUltMGZSS3F3IiwicGhvbmVJZCI6ImY5ZWJhNjAzLTQzMTMtNDIwNi1iM2ZkLWM0YTZkOGI0YmM3NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNVm1Pby9jbjIvcWJUUDg1S0tobW5YRUxzc0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWNOb0hFUTRXSE1SeEdRaHE4NlI3WVZJM3N3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVRUVpMWjZSIiwibWUiOnsiaWQiOiIyNjM3Nzc3NTYxODQ6NDZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSm9zaHVhbWFtYm8xIEVjb3VuQmFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJV044cWdGRVBPODlMa0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJuODdUbHpmRUNxQm8xWkFIYlhTNEx4Q1FGcVJReGRRa3JORmIyNmpzNjJZPSIsImFjY291bnRTaWduYXR1cmUiOiJ0S3dPUXpjdDRTSDRHTWg3M0t5bVhxVGxRQnZnRXZIZElKQnBJV3N1VjlQdWhJM0RKN05SUUJ3MUR0eEY5emdMbktUdFB0MnlpUkgxeEhuc3JRL0JEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibUNxNnpGYXFlTDVNZWt6SXpMaVphV1FPSC9odG1KZDFBdm1oSk4wcjhoRGE1OUNXVGxSanZvTURVM1F6Q2JVL1JsRlpGR250MmdUN01tcGNQM3FJZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3Nzc3NTYxODQ6NDZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWi9PMDVjM3hBcWdhTldRQjIxMHVDOFFrQmFrVU1YVUpLelJXOXVvN090bSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMjA1ODc1MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDYWEifQ==',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "Joshuamambo1",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263777756184",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'MidKing01',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'online',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
