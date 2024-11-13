const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0d0d01aUFIwVGt5d2REb09valF2WHYxY0xpOHhNcStSY0dPaTZUaWQyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzF0SGlaUXBaOG5vL0Y5K0xHK1RoMmlSYXhDTng2Y1lXczlmT1RuQml4Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrT1g4cnlKM3F0Y3Z2Qms3Q3RHWFM4NFdYSnpjKzR1TXlaY1Fqd0JqVzNFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjaEt4Z3pCTXdtU3l2L0Y5a0hnc1o1RjYxckpvRENLZTRjbVFKbkY0QkdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNLOGt1QkVHZlFzaHAzUG9wSERrdmt2bHZMejF0dXEwbGJYd0VmR05uWEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iks4UU5UMmdnemVxZ3BtajE5T0RibDZ6YlNzM1BrWmFuTnZVUWNQNThIMzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0dac1kyaHcyZUNVbmUyTWJ1M0JqVUtrSW1RVFk0Ti9rVU5qUTJlMWhGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmd6R2o0YWpBZjRsZGVIa0RhS2Z6ampQcHhVbStLditadGVPU1N4azhTND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZoOVFOVksyT0RJYlBDTUdoMFJOSG9xT2V4WXJueS9jckFPVGl6SGYydTFsWVdzSmFaL0V0SmFLOEFJN0dIME9qejdUdnREaVpnZVNyYm1iSDFGQWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJtaCtzR0xLYlVIVUYvcjlnY2lUcytHOWFDdzd5aXNzN3hjaTlNQUJxOVNvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ1azlmVXVjdlR3dVgzOTRLSVd2OGxBIiwicGhvbmVJZCI6IjBmYzBmOWMzLTVjNDMtNGNmYi05NzcyLTQzMWE1ZGZiYTAwOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqaitNbXNyd1pMVGpSMExySk1vZVJDQlEyaGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1AzU21CWWNXMzd0M3VvN0pScUkyZEcrVUw0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikc2RkhOUllLIiwibWUiOnsiaWQiOiIyNjM3Nzc3NTYxODQ6NDVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSm9zaHVhbWFtYm8xIEVjb3VuQmFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJV044cWdGRUpQdzA3a0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJuODdUbHpmRUNxQm8xWkFIYlhTNEx4Q1FGcVJReGRRa3JORmIyNmpzNjJZPSIsImFjY291bnRTaWduYXR1cmUiOiJlMnJVUlRCL1lGNmFSSHNOYng1clBralZ6Um5EcHFobnYvQXFlalZlTTFwT3Q5MFVYK0VNVlBEdFhmTmlYaUtCcEtmdytKNkZKQk83T0xCUm5JWG9EUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoieFBEeVByS2t4ZlpkSW95NU1CaDZ5ZS9Wbmt3SklpVHc2Y0lUZXRMSlZnQ1R0cGkvcXQyNFAvSzdZMTJ0WDY1cU1aNWJ3UkYwRHU3T090TU1xQ3J0aEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3Nzc3NTYxODQ6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWi9PMDVjM3hBcWdhTldRQjIxMHVDOFFrQmFrVU1YVUpLelJXOXVvN090bSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTUyNDY0MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDYWEifQ==',
    PREFIXE: process.env.PREFIX || "+",
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
