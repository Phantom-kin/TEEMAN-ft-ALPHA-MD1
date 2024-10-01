const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZkVjVhREQ0TWJFY3p4aUJraUY5Q0daZGZoRGdzZFUxZThhcjM1SitVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2dSNFVJZFBlcng0d1ZZSVBSYWdGQzJRWUpJYUtGTmU3akFPbG9scDJ3Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQ3hCOFB1UHd1TGxpUmYybW9YUXozZGxyK3FRUVlmSWltMzlFc3pxRkhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrSUI0cEM5SjM2NVFxakY4V1JBTWduTTBydndxMUNyQkY4KzlIcFhOSWtJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhJUkZwb3hQTjZtYTJtc2dnNmpvK1dSb1hvZ0lVUHJkbCs0SUNTZ1FtV0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllwbHpaejlsYWdPdXNmV2QwV214Ylh3Y21mR0VCejZ1VldaYWRKSkpnUlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0owSURRaG56ZUFhbis5QXFnVmdBN1Z4ZjNYZ3ZCd2gva0llTTNQSHlsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZmhEZ29ScTgvajl3V29qZFRBZ2p0S1FNYmtKZ2w4cW16R0YzZ0xmclMwZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpLWXp5QmZCenBUOEhCWmI2RTVIY0ZjUXlVMjl1ajBKczduaGp6UTE0dDcreDYybTRtSnFGNUdTdzJmeHI4NzFxb3QvRi9LRmxhZHpnWitpd2xhVWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA5LCJhZHZTZWNyZXRLZXkiOiJSMVFYeFV6K3ZsMnk2MGJKRmJPM3g3ZmZRUmU0SW1tZFlwamowc1lLdnVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTYlhVU1laY1MweVk1cTlhZVdhSXRBIiwicGhvbmVJZCI6IjdiYTdlMmQ0LWFhYmMtNGIzOC05YzBlLWQ1N2EzZjhlN2Y3NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2cll4UWFEdkRheXoxVzVNT3lJRGIzR3Fzb3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGdiOUpnbTZaSFNsR3E3dldGSXFxcTY3N3FNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlTRFpFR1BRIiwibWUiOnsiaWQiOiIyNjM3ODk2NjEwMTM6NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJUZWVtYW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09tdW14VVFqNEh1dHdZWUJTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InF2cEtPMXZNbWdVb0d4Zk5RNk5Pem94cklPalYwT0VPU0FnWmpTbmxwRms9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkZFMHRWcWxBNlNpSnZvTjNIYTNXQkNkZzkrK2NxWFZwUFIrcXlmd2J3TkVjOS9OOVhoR2FEQ0U0WHdMYXhROEFPUEEzVWREclFaQzQ3cTBxUlNyQ0N3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJHcWNESE82T3JhQ25OZDFtZmo0ZXU5YWNobnlXVXQ5SFlTL1YzdHBnODRHUmIweElnN1d6a2pqZXRaZnlYWHZNQVQzVkJKN0NybXgrQ0lUN2IvazZpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTY2MTAxMzo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFyNlNqdGJ6Sm9GS0JzWHpVT2pUczZNYXlEbzFkRGhEa2dJR1kwcDVhUloifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc3NTg0OTMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQW0vIn0=,
    PREFIXE: process.env.PREFIX || ".","×"
    OWNER_NAME: process.env.OWNER_NAME || "TEEMAN",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " TEEM.AN9",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SOCIAL TODAY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
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
