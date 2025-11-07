//=========CRÉDITOS=============\\
/*
CRÉDITOS: PEDROZZ MODS

Essa base foi criada por Pedrozz Mods, então se você for divulgar, repostar ou compartilhar em qualquer lugar, dá aquela moral e mantém os créditos, fechou? 😅

Ela é totalmente **gratuita**, ou seja, se algum espertinho aí tiver vendendo, já sabe que tá feio hein... 👀
*/
//⊰᯽⊱┈──╌❊ BAILEYS ❊╌──┈⊰᯽⊱\\
const { 
default: makeWASocket, downloadContentFromMessage,emitGroupParticipantsUpdate,emitGroupUpdate,makeInMemoryStore,prepareWAMessageMedia, MediaType,WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions,useMultiFileAuthState, BufferJSON,WAMessageProto,MessageOptions, PHONENUMBER_MCC, WAFlag,WANode,	 WAMetric, ChatModification,MessageTypeProto,WALocationMessage, ReconnectMode,WAContextInfo,proto,	 WAGroupMetadata,ProxyAgent, waChatKey,MimetypeMap,MediaPathMap,WAContactMessage,WAContactsArrayMessage,WAGroupInviteMessage,WATextMessage,WAMessageContent,WAMessage,BaileysError,WA_MESSAGE_STATUS_TYPE,MediaConnInfo, generateWAMessageContent, URL_REGEX,Contact, WAUrlInfo,WA_DEFAULT_EPHEMERAL,WAMediaUpload,mentionedJid,processTime, Browser, makeCacheableSignalKeyStore ,MessageType,Presence,WA_MESSAGE_STUB_TYPES,Mimetype,relayWAMessage, Browsers,GroupSettingChange,delay,DisconnectReason,WASocket,getStream,WAProto,isBaileys,AnyMessageContent,generateWAMessageFromContent, fetchLatestBaileysVersion,processMessage,processingMutex
} = require('baileys-mod');
const baileys = require("baileys-mod");
//⊰᯽⊱┈──╌❊ MÓDULOS ❊╌──┈⊰᯽⊱\\
let pino = require('pino')
const fs = require('fs')
const axios = require('axios');
const chalk = require('chalk')
const Pino = require('pino');
const path = require('path');
const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')


let phoneNumber = "557792142954"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./files/js/lib/exif.js')
const { imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2 } = require('./files/js/lib/exif2.js')
//⊰᯽⊱┈──╌❊ CONFIGURAÇÃO ❊╌──┈⊰᯽⊱\\
const { prefix, botName, emoji, BaseApiDark, DARK_USERNAME, DARK_APIKEY, donoName, donoLid, donoJid, verMsg, isBotao } = require("./dono/config.json");
const config = JSON.parse(fs.readFileSync("./dono/config.json"))
const fotomenu = "./files/imagem/menu.png"
const d = "`";

//⊰᯽⊱┈──╌❊ INÍCIO ❊╌──┈⊰᯽⊱\\
async function IniciarProcessoDoBot() {
const { state, saveCreds } = await useMultiFileAuthState('./dono/Alma-Conexão')
const { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetryCounterCache = new NodeCache()
//⊰᯽⊱┈──╌❊ CONEXÃO ❊╌──┈⊰᯽⊱\\
const alma = makeWASocket({
version: [2, 3000, 1029037448],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
},
logger: pino({ level: 'fatal' }),
printQRInTerminal: !process.argv.includes("--code"),
mobile: false,
browser: Browsers.macOS('Safari'),
generateHighQualityLinkPreview: false,
msgRetryCounterCache,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 10000,
keepAliveIntervalMs: 30000,
markOnlineOnConnect: false,
fireInitQueries: false,
transactionOpts: {
maxCommitRetries: 10,
delayBetweenTriesMs: 3000
},
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
if (requiresPatch) {
return {
viewOnceMessage: {
message: {
...message,
messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
},
},
},
};
}
return message;
},
});

//⊰᯽⊱┈──╌❊ CONEXÃO POR CÓDIGO ❊╌──┈⊰᯽⊱\\
if (!alma.authState.creds.registered) {
console.clear();
console.log(chalk.hex('#ff6b3d')('\n> [Alma-chan v1.0] Iniciando protocolo de pareamento...'));
console.log(chalk.hex('#ffaa80')('> Status: Interface neural ativa, aguardando entrada do operador.\n'));

console.log(chalk.hex('#ff914d')('> Digite o número do bot (exemplo: +5511XXXXXXXX):'));
const phoneNumber = await question(chalk.hex('#ff4d00')('> Entrada → '));

if (!phoneNumber) {
console.log(chalk.hex('#ff4d00')('\n> Erro: O número deve incluir o código do país (ex: +55...)'));
console.log(chalk.hex('#ff6b3d')('> Reiniciando sequência de inicialização...\n'));
process.exit(1);
}

const NumeroLimpo = phoneNumber.replace(/[^0-9]/g, '');
console.log(chalk.hex('#ffaa80')('\n> Processando número... enviando requisição segura...'));
let code = await alma.requestPairingCode(NumeroLimpo);

code = code?.match(/.{1,4}/g)?.join('-') || code;
console.log(chalk.hex('#ff4500')('\n> Código de emparelhamento gerado: ') + chalk.bold.hex('#ff6b3d')(code));
console.log(chalk.hex('#ffaa80')('> Aguardando autenticação no aplicativo WhatsApp...\n'));
}
//⊰᯽⊱┈──╌❊ CLIENTES ❊╌──┈⊰᯽⊱\\
var client = alma;
var astaroth = alma;
var laura = alma;
var suc = alma;
//*==================*\\
alma.ev.on('chats.set', () => { console.log('setando conversas...'); })
alma.ev.on('contacts.set', () => { console.log('setando contatos...'); })
alma.ev.on('creds.update', saveCreds)

let statusReset = { executado: false, id: null };

async function inicial() {
try { if (fs.existsSync('status.json')) { statusReset = JSON.parse(fs.readFileSync('status.json', 'utf8')); }
} catch (err) {
}
if (statusReset.executado && statusReset.id) {
try {
await alma.sendMessage(statusReset.id, {text: `- *Reator emocional em nível seguro. Protocolos de rede sincronizados. Unidade Alma-chan operacional e aguardando comandos.*`});
fs.unlinkSync("status.json")
} catch (err) {
console.error("Erro ao enviar mensagem pós-reset:", err);
}}}

function statusApi(apiDarkInfo) {
if (!apiDarkInfo.status) {
return {status: false, mensagem: `Você ainda não possui uma conta na API. Crie uma e registre seu ${d}username${d} e ${d}apikey${d} no arquivo ${d}config.js${d}, dentro da pasta ${d}dono${d}.`}
} else if (apiDarkInfo.request <= 0) {
return {status: false, mensagem: `Você não possui ${d}requests${d} disponíveis e seu saldo está abaixo de ${d}0${d}. Aguarde até o próximo dia ou adquira um plano na API para evitar esse aviso.`}
} else {
return {status: true, mensagem: null}
}
}

const metadataCacheGp = new Map();
const METADATA_CACHE_TIME = 5 * 60 * 1000; 
setInterval(() => {
const now = Date.now();
for (const [jid, { expiry }] of metadataCacheGp.entries()) {
if (now > expiry) {
metadataCacheGp.delete(jid);
}
}
}, 100);

async function getGroupMetadata(alma, jid) {
const cached = metadataCacheGp.get(jid);
if (cached && Date.now() < cached.expiry) {
return cached.data;
}

try {
const metadata = await alma.groupMetadata(jid);
metadataCacheGp.set(jid, {
data: metadata,
expiry: Date.now() + METADATA_CACHE_TIME
});
return metadata;
} catch (err) {
console.error(`[ERRO] Falha ao buscar metadata: ${jid}`, err);
throw err;
}
}

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

const getGroupAdmins = (participants = []) => {
if (!Array.isArray(participants)) return [];
return participants
.filter(p => p.admin)
.map(p => p.phoneNumber || p.jid || p.id || p.lid);
};

const isAdmin2 = (userId, participants = []) => {
const admins = getGroupAdmins(participants);
const normalize = id => id?.split('@')[0];
return admins.some(admin => normalize(admin) === normalize(userId));
};
//⊰᯽⊱┈──╌❊ BEM VINDO ❊╌──┈⊰᯽⊱\\
//TUTORIAL: https://youtu.be/xceuIs6tpZo

//⊰᯽⊱┈──╌❊ ATUALIZAÇÃO DE MSG ❊╌──┈⊰᯽⊱\\
alma.ev.on('messages.upsert', async ({ messages }) => {
try {
const info = messages[0];
//console.log(JSON.stringify(info, null, 2)) //DESCOMENTE ISSO CASO QUEIRA VER OS LOGS DE DAIDA DAS MENSAGENS
if (info.key.fromMe) return; //COMENTE ISSO CASO QUEIRA QUE O BOT RESPONDE ELE MESMO
if (!info.key.participant) return; //COMENTE ISSO CASO QUEIRA QUE O BOT RESPONDE PV

//PARA VIZUALIZAR AS MENSAGENS ENVIADAS AO BOT
if(verMsg) {
await alma.readMessages([info.key]);
} else {
if(info.key.remoteJid == "status@broadcast") return;
}
const type = baileys.getContentType(info.message);

const from = info.key.remoteJid;

const bodyofc = type === "conversation" ? info.message.conversation : type === "viewOnceMessageV2" ? info.message.viewOnceMessageV2.message.imageMessage ? info.message.viewOnceMessageV2.message.imageMessage.caption : info.message.viewOnceMessageV2.message.videoMessage.caption : type === "imageMessage" ? info.message.imageMessage.caption : type === "videoMessage" ? info.message.videoMessage.caption : type === "extendedTextMessage" ? info.message.extendedTextMessage.text : type === "viewOnceMessage" ? info.message.viewOnceMessage.message.videoMessage ? info.message.viewOnceMessage.message.videoMessage.caption : info.message.viewOnceMessage.message.imageMessage.caption : type === "documentWithCaptionMessage" ? info.message.documentWithCaptionMessage.message.documentMessage.caption : type === "buttonsMessage" ? info.message.buttonsMessage.imageMessage.caption : type === "buttonsResponseMessage" ? info.message.buttonsResponseMessage.selectedButtonId : type === "listResponseMessage" ? info.message.listResponseMessage.singleSelectReply.selectedRowId : type === "templateButtonReplyMessage" ? info.message.templateButtonReplyMessage.selectedId : type === "groupInviteMessage" ? info.message.groupInviteMessage.caption : type === "pollCreationMessageV3" ? info.message.pollCreationMessageV3 : type === "interactiveResponseMessage" ? JSON.parse(info.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : type === "text" ? info.text : ""

const safeBody = typeof bodyofc === "string" ? bodyofc.trim() : "";
const body = safeBody;
const dono = [`${donoJid}@s.whatsapp.net`, `${donoLid}@lid`]
const numeroBot = alma.user.id.split(":")[0]+"@s.whatsapp.net"
const isDono = dono.includes(info.key.participant);
const isGroup = from.endsWith('@g.us');
const isCmd = body.startsWith(prefix)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const sendere2 = info.key.participant?.includes('@lid') ? info.key.participant : info.key.participantAlt;
const sendere = info.key.participantAlt?.includes('@s.whatsapp.net') ? info.key.participantAlt : info.key.participant;
const sender2 = sendere2 || from; //Sender puxando o Lid
const sender = sendere || from; //Sender puxando o Jid
const pushname = info.pushName ? info.pushName : ""
const args = safeBody.split(/ +/).slice(1);
const q = args.join(' ')
const groupMetadata = isGroup ? await getGroupMetadata(alma, from) : "";
const isBot = info.key.fromMe ? true : false
const participants = isGroup ? await groupMetadata.participants : '';
const groupName = isGroup? groupMetadata.subject: "";
const groupDesc = isGroup ? groupMetadata.desc : '';
const groupMembers = isGroup ? groupMetadata.participants : '';
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
const isAdmBot = isGroup ? isAdmin2(numeroBot, participants) || false : '';
const isAdm = isGroup ? isAdmin2(info.key.participant, participants) : '';
var texto_exato = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
const texto = texto_exato.slice(0).trim().split(/ +/).shift().toLowerCase()

const menc = isGroup ? ( info.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || info.message?.extendedTextMessage?.contextInfo?.participant || null ) : null;
//SIMULA ESCRITA
async function escrever (texto) {
await alma.sendPresenceUpdate('composing', from) 
await esperar(1000) 
alma.sendMessage(from, { text: texto }, {quoted: info})
}
//ENVIA UMA MENSAGEM 
const enviar = (texto) => {
alma.sendMessage(from, { text: texto }, {quoted: info})
}

//ENVIA IMAGEM 
const enviarImg = async (link, foo = "-> 𝐀𝐥𝐦𝐚 𝐂𝐡𝐚𝐧") => {if (isBotao) {
var fotin = await prepareWAMessageMedia({ image: {url: link} }, { upload: alma.waUploadToServer })
await await alma.relayMessage(
from,{ interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage
},body: { text: null },
footer : { "text": foo },
nativeFlowMessage: {
},messageParamsJson: "", },},{});
} else {await alma.sendMessage(from, {image: {url: link}})}}

const enviarImg2 = async (link, texto, foo = "-> 𝐀𝐥𝐦𝐚 𝐂𝐡𝐚𝐧") => {if (isBotao) {var fotin = await prepareWAMessageMedia({ image: {url: link} }, { upload: alma.waUploadToServer })
await await alma.relayMessage(
from,{ interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage
},body: { text: texto },
footer : { "text": foo },
nativeFlowMessage: {
},messageParamsJson: "", },},{});
} else {await alma.sendMessage(from, {image: {url: link}, caption: texto})}}

//ENVIA VÍDEO 
const enviarVd = async (link) => {await alma.sendMessage(from, {video: {url: link }, mimetype: "video/mp4", fileName: "play.mp4"}, {quoted: info})}

const enviarVd2 = async (link, texto) => {await alma.sendMessage(from, {video: {url: link }, caption: texto, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})}

//ENVIA UM GIF SIMPLES 
const enviarGif = async (link) => {await alma.sendMessage(from, { video: {url: link}, gifPlayback: true}, { quoted: info })}

const enviarGif2 = async (link, texto) => {await alma.sendMessage(from, { video: {url: link}, caption: texto, gifPlayback: true}, { quoted: info })}
//ENVIA UM AUDIO
const enviarAd = async (link) => {alma.sendPresenceUpdate('recording', from);
await esperar(1000);
await alma.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg"}, {quoted: info})}

const enviarAd2 = async (link) => {await alma.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg"}, {quoted: info})}

//CAUSA UM DELAY ENTRE FUNÇÃO 
const esperar = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo));
}
//REAGE A UMA MENSAGEM
const reagir = (reassao) => {
alma.sendMessage(from, {react: {text: reassao, key: info.key}})}
//⊰᯽⊱┈──╌❊ FAZER STICKER ❊╌──┈⊰᯽⊱\\
const sendImageAsSticker = async (alma, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options);
} else {
buffer = await imageToWebp(buff);
}

await alma.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker = async (alma, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options);
} else {
buffer = await videoToWebp(buff);
}

await alma.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}

const sendImageAsSticker2 = async (alma, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg2(buff, options);
} else {
buffer = await imageToWebp2(buff);
}

await alma.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker2 = async (alma, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid2(buff, options);
} else {
buffer = await videoToWebp2(buff);
}

await alma.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}
//⊰᯽⊱┈──╌❊ BOTÕES ❊╌──┈⊰᯽⊱\\
async function botaoNormal(alma, id, texto, link, botoes, foo = "-> 𝐀𝐥𝐦𝐚 𝐂𝐡𝐚𝐧") {
try {
var fotin = await prepareWAMessageMedia({ image: {url: link} }, { upload: alma.waUploadToServer })
await await alma.relayMessage(
id,{ interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage
},body: { text: texto },
footer : { "text": foo },
nativeFlowMessage: {
buttons: botoes.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
} catch (e) {
console.log(e);
enviarPonto(`Deu erro ao enviar o botão...`)
}
}

async function botaoLista(alma, id, texto, url, titulo, titulo2, rows, foo = "-> 𝐀𝐥𝐦𝐚 𝐂𝐡𝐚𝐧"){
try {
const fotin = await prepareWAMessageMedia( { image: { url: url } }, { upload: alma.waUploadToServer } );
const msgLista = { interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: texto }, footer: { text: foo }, nativeFlowMessage: { buttons: [{ name: "single_select", buttonParamsJson: JSON.stringify({ title: titulo, sections: [{ title: titulo2, highlight_label: botName, rows }]})}],messageParamsJson: ""}}};
await alma.relayMessage(id, msgLista, {});
} catch (e) {
console.log(e);
enviarPonto(`Deu erro ao enviar o botão...`)
}
}

async function botaoUrl(alma, id, foto, titulo, botoes, foo = "-> 𝐀𝐥𝐦𝐚 𝐂𝐡𝐚𝐧") {
try {
const fotin = await prepareWAMessageMedia({ image: { url: foto } },{ upload: alma.waUploadToServer });
await alma.relayMessage(id, { interactiveMessage: { header: { hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: titulo }, footer: { text: foo }, nativeFlowMessage: { buttons: botoes.map(botao => ({ name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: botao.name, url: botao.url, merchant_url: botao.url }) })) }, messageParamsJson: "" } }, {});
} catch (e) {
console.log(e);
enviarPonto(`Deu erro ao enviar o botão...`)
}
}

async function botaoCopia(alma, id, foto, titulo, botoes, foo = "-> 𝐀𝐥𝐦𝐚 𝐂𝐡𝐚𝐧") {
try {
const fotin = await prepareWAMessageMedia({ image: { url: foto } }, { upload: alma.waUploadToServer });
await alma.relayMessage(id, { interactiveMessage: { header: { hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: titulo }, footer: { text: foo }, nativeFlowMessage: { buttons: botoes.map(botao => ({ name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: botao.name, id: botao.id, copy_code: botao.copy }) })) }, messageParamsJson: ""}}, {});
} catch (e) {
console.log(e);
enviarPonto(`Deu erro ao enviar o botão...`)
}
}

async function botaoCopia2(alma, id, foto, titulo, botoes, foo = "-> 𝐀𝐥𝐦𝐚 𝐂𝐡𝐚𝐧") {
try {
const fotin = await prepareWAMessageMedia({ image: foto }, { upload: alma.waUploadToServer });
await alma.relayMessage(id, { interactiveMessage: { header: { hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: titulo }, footer: { text: foo }, nativeFlowMessage: { buttons: botoes.map(botao => ({ name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: botao.name, id: botao.id, copy_code: botao.copy }) })) }, messageParamsJson: ""}}, {});
} catch (e) {
console.log(e);
enviarPonto(`Deu erro ao enviar o botão...`)
}
}
//======FUNÇÕES=====\\
async function fetchJson (url) {try {
link = await fetch(url); json = await link.json(); return json; } catch (err) {return err}
}
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

const msg = {
  dono: "- *Hm...? Esse comando parece estar reservado para meu dono. Desculpe, acesso negado.*",
  adm: "- *Desculpe... mas esse comando só pode ser executado por administradores autorizados do grupo.*",
  espere: "- *Processando... por favor, aguarde um momento. Alma-chan está preparando tudo direitinho pra você.*",
  vip: "- *Identificando nível de acesso... ah, esse recurso é exclusivo para usuários do setor VIP. ✨*",
  grupo: "- *Este comando foi projetado para funcionar apenas em grupos. Aqui no privado, não consigo executá-lo...*",
  pv: "- *Este protocolo só pode ser iniciado em conversa direta comigo, certo?*",
  botAdm: "- *Sistema informa: Alma-chan precisa de privilégios de administradora para realizar essa ação.*",
  query: "- *Hm... parece que faltou um parâmetro de entrada. Poderia especificar o assunto, por favor?*",
  error: "- *Ocorreu uma falha inesperada... mas não se preocupe, estou registrando no log para correção futura.*",
  desativado: "- *Comando desativado com sucesso. Módulo correspondente foi colocado em modo de repouso.*",
  ativado: "- *Função ativada! Todos os sistemas estão prontos e operacionais.*"
}
//⊰᯽⊱┈──╌❊ DB USUÁRIO ❊╌──┈⊰᯽⊱\\
const { registrarUsuario, infoUser1, ganharXP, modificarUsuario, modificarsaldo, salvarUsuario, carregarDadosUsuarios } = require("./files/js/usuario.js");
const infoUser = infoUser1(sender)
const perfil = infoUser;
const isPremium = infoUser1(sender)?.vip === true;

if (!infoUser) {
let saldoU; let vipU;
if (isDono) { saldoU = "10000000"; vipU = true; } else { saldoU = "500"; vipU = false; }
registrarUsuario(sender, sender2, pushname, saldoU, vipU);
}

//⊰᯽⊱┈──╌❊ DB GRUPO ❊╌──┈⊰᯽⊱\\
const PastaDeGrupos = `./files/json/grupos/${from}.json`;
const DefaultGrupo = {
name: groupName,
//objets
//Arrays
//Ativos
antilink: false, antilinkHard: false, autoResposta: false
}

function mergeDefaults(obj, defaults) {
for (const key in defaults) {
if (!(key in obj)) {
obj[key] = defaults[key]
} else if (
typeof defaults[key] === "object" &&
!Array.isArray(defaults[key]) &&
obj[key] !== null ) { mergeDefaults(obj[key], defaults[key]) }}
return obj
}

let ArquivosDosGrupos

if (isGroup) {
let data
if (!fs.existsSync(PastaDeGrupos)) {
data = [DefaultGrupo]
} else {
try {
data = JSON.parse(fs.readFileSync(PastaDeGrupos))
} catch { data = [DefaultGrupo] }
data = data.map((g) => mergeDefaults(g, DefaultGrupo)) }
fs.writeFileSync(PastaDeGrupos, JSON.stringify(data, null, 2) + "\n")
ArquivosDosGrupos = data
}

function ModificaGrupo(index) {
  fs.writeFileSync(PastaDeGrupos, JSON.stringify(index, null, 2) + "\n")
}

//⊰᯽⊱┈──╌❊ FUNC GP ❊╌──┈⊰᯽⊱\\
const isAntiLink = isGroup ? ArquivosDosGrupos[0].antilink : undefined
const isAntiLinkHard = isGroup ? ArquivosDosGrupos[0].antilinkHard : undefined
const isResposta = isGroup ? ArquivosDosGrupos[0].autoResposta : undefined
//⊰᯽⊱┈──╌❊ SECURITY ❊╌──┈⊰᯽⊱\\
if (!isGroup && isAntiLink) {
const UrlLinks = ["https://chat.whatsapp.com"];
for (let link of UrlLinks) {
if (body.includes(link)) {
if (isAdm) return reagir("✅");
reagir('❌')
await alma.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
await alma.groupParticipantsUpdate(from, [sender], 'remove').catch((e) => {
enviar(`*ERROR:* ${e}`);
})
}} 
}

if (isAntiLinkHard) {
const UrlLinks = ["https://", "wa.me", "http://"];
for (let link of UrlLinks) {
if (body.includes(link)) {
if(comando == "tiktok" && comando == "facebook" && comando == "instagram" && comando == "tiktok" && comando == "twitter" && comando == "ytmp3" && comando == "ytmp4" && comando == "play" && comando == "insta") return
if (!isGroup) return;
if (isAdmin2(sender, participants)) {
return reagir("✅")
}
enviar(`*_Links não são permitidos aqui, receba seu ban_*`); 
await alma.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
await alma.groupParticipantsUpdate(from, [sender], 'remove')
}} 
}
//⊰᯽⊱┈──╌❊ LOGS ❊╌──┈⊰᯽⊱\\
const corPrimaria = chalk.hex('#00C8FF');
const corSecundaria = chalk.hex('#243C6E');
const corDetalhe= chalk.hex('#FFD84C');
const corNeutra = chalk.hex('#C7C7D3');

const tipoMensagem = type === 'audioMessage' ? 'Áudio' : type === 'stickerMessage'? 'Figurinha' : type === 'imageMessage' ? 'Imagem' : type === 'videoMessage' ? 'Vídeo' : type === 'documentMessage' ? 'Documento' : type === 'contactMessage' ? 'Contato' : type === "interactiveResponseMessage" ? 'Botão' : type === 'locationMessage' ? 'Localização' : 'Texto';

let nomeChat = chalk.hex('#00A8E8')('[Privado]');
if (isGroup) { 
try { 
nomeChat = chalk.hex('#00A8E8')(`[Grupo: ${groupName}]`); 
} catch { nomeChat = chalk.hex('#00A8E8')('[Grupo: Desconhecido]'); } } else if (!isGroup) { nomeChat = chalk.hex('#4C6085')(`[Pv: ${pushname}]`); }

if (isCmd) {
console.log( `==> ${corDetalhe.bold(pushname)} ` + `${corNeutra('executou')} ` + chalk.bgHex('#00C8FF').black(` ${comando} `) + ` ${corNeutra('em')} ${nomeChat}`
);
} 
else if (tipoMensagem === 'Imagem') {console.log(`==> ${corDetalhe.bold(pushname)} ${corNeutra('enviou uma Imagem em')} ${nomeChat}`);
} 
else if (tipoMensagem === 'Áudio') {console.log(`==> ${corDetalhe.bold(pushname)} ${corNeutra('enviou um Áudio em')} ${nomeChat}`);
} 
else if (tipoMensagem === 'Vídeo') {console.log(`==> ${corDetalhe.bold(pushname)} ${corNeutra('enviou um Vídeo em')} ${nomeChat}`);
}
else if (tipoMensagem === 'Figurinha') {console.log(`==> ${corDetalhe.bold(pushname)} ${corNeutra('enviou uma Figurinha em')} ${nomeChat}`);
}
else if (tipoMensagem === 'Botão') {console.log(`==> ${corDetalhe.bold(pushname)} ${corNeutra('usou um botão em')} ${nomeChat}`);
}
else if (isGroup) {console.log(`==> ${corDetalhe.bold(pushname)} ${corNeutra('enviou uma Mensagem em')} ${nomeChat}` + chalk.dim(` → "${body?.slice(0, 50) || '...'}"`));
}
else { console.log(`==> ${corDetalhe.bold(pushname)} ${corNeutra('enviou uma Mensagem em')} ${nomeChat}` + chalk.dim(` → "${body?.slice(0, 50) || '...'}"`));
}

const logFilePath = path.join(__dirname, 'dono', 'logs.json');

function salvarComandoDb(comando) {
try {
let logs = {};
if (fs.existsSync(logFilePath)) { const data = fs.readFileSync(logFilePath, 'utf8'); logs = data ? JSON.parse(data) : {}; }
logs[comando] = (logs[comando] || 0) + 1;
fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf8');
} catch (err) {
console.error('Erro ao salvar comando:', err);
}}

function comandoMaisUsado() {
try {
const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
const [comando, usos] = Object.entries(logs).sort((a, b) => b[1] - a[1])[0];
return {comando, usos}
} catch (err) {
console.error('Erro ao carregar logs:', err);
}}

async function configSet(index){
fs.writeFileSync('./dono/config.json', JSON.stringify(index, null, 2) + '\n')}

if (isCmd){ salvarComandoDb(comando || "comandoErrado")}
apiDarkInfo = await fetchJson(`${BaseApiDark}/infoMy?username=${DARK_USERNAME}`);

await ganharXP(info.key.participant, alma, from, sender2)
switch(comando) {
case 'log':
try {
if (!fs.existsSync(logFilePath)) return console.log('⚠️ Nenhum log encontrado.');
const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
if (!Object.keys(logs).length) return console.log('📂 O arquivo de logs está vazio.');
const ranking = Object.entries(logs).sort((a, b) => b[1] - a[1]).map(([cmd, usos], i) => `${String(i + 1).padStart(2, '0')} ⋟ ${cmd.padEnd(15)} — ${usos} usos`).join('\n│ ');
const msg = `╭═══════════════════════════⪩
│ 📜 RANKING DE COMANDOS
│ ${ranking}
╰═══════════════════════════⪨`;
enviar(msg.trim());
} catch (err) {
console.error('Erro ao carregar logs:', err);
}
break;
//⊰᯽⊱┈──╌❊ COMANDOS ❊╌──┈⊰᯽⊱\\
//BOTÕES 
case 'hdgshsn':
//Botão lista -- Envia uma mensagem de botão interativo no formato lista.
botaoLista(alma, from, "Bom dia", fotomenu, "titulo", "titulo2", [{ header: "nome", title: "titulo", description: "", id: `${prefix}menu`}])
//Botão normal -- Envia uma mensagem de botão interativo no formato normal kk.
botaoNormal (alma, from, "oi", fotomenu, [{ display_text: "Menu", id: `${prefix}menu` }])
//Botão cópia -- Envia uma mensagem de botão interativo no formato copia (o usuário consegue copiar oq ta no botão).
botaoCopia(alma, from, fotomenu, "Texto principal aqui",
[{name: "Copiar", id: "texto", copy: "texto" }]);
//Botão link -- Envia uma mensagem de botão interativo no formato link (O usuyvai direto para o link que tiver no botão).
botaoUrl(alma, from, fotomenu, "Clique no botão abaixo para acessar o site:", [{name: "Visitar Site", url: "link"},]);
break
//MENUS
case 'menu': {
cm = await comandoMaisUsado();
await reagir(emoji);
if (isBotao) {
menuTxt = `╭──❀・INFORMAÇÕES・❀──╮
│ *${isGroup ? `👥 ${groupName}` : "👤 Privado"}*
│ 🩷 Nome: *${pushname}*
│ 🤖 Bot: *${botName}*
│ 📱 Número: *${sender.split("@")[0]}*
│ 🧑‍💻 Comando mais usado: *${cm.comando}*
│ 🩵 Status: *Online 🟢*
╰───────────────────╯`;
await botaoLista(alma, from, menuTxt, fotomenu, "Comandos", "Escolha o seu comando", [{ header: emoji + ` Menu Completo`, title: "• menucompleto", description: "", id: `${prefix}menucompleto`}, { header: emoji + ` Menu Adm`, title: "• menuadm", description: "", id: `${prefix}menuadm`},{ header: emoji + ` Menu Dono`, title: "• menudono", description: "", id: `${prefix}menudono`}, { header: emoji + ` Menu Jogos`, title: "• menujogos", description: "", id: `${prefix}menujogos`}])
} else {
menuTxt = `╭──❀・INFORMAÇÕES・❀──╮
│ *${isGroup ? `👥 ${groupName}` : "👤 Privado"}*
│ 🩷 Nome: *${pushname}*
│ 🤖 Bot: *${botName}*
│ 📱 Número: *${sender.split("@")[0]}*
│ 🧑‍💻 Comando mais usado: *${cm.comando}*
│ 🩵 Status: *Online 🟢*
╰───────────────────╯
╭──❀・MENU・❀──╮
│ ${emoji} | ${d}menuadm${d} - *menu adm*
│ ${emoji} | ${d}menujogos${d} - *menu jogos*
│ ${emoji} | ${d}menudono${d} - *menu dono*
│ ${emoji} | ${d}menufig${d} - *menu de figurinhas*
╰──────────────╯`;
await alma.sendMessage(from, {image: {url: fotomenu}, caption: menuTxt, mentions: [sender]}, {quoted: info});
}
}
break

case 'menucompleto': {
await reagir(emoji);
menuTxt = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ${emoji}  ${botName.toUpperCase()} - SISTEMA PRINCIPAL  ${emoji}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
    ✧･ﾟ: *✧･ﾟ:* 🌙 *:･ﾟ✧*:･ﾟ✧
╭──❀・INFORMAÇÕES・❀──╮
│ ${isGroup ? `👥 ${groupName}` : "👤 Privado"}
│ 🩷 Nome: ${pushname}
│ 🤖 Bot: ${botName}
│ 📱 Número: ${sender.split("@")[0]}
│ 🩵 Status: Online 🟢
╰────────────────────╯
╭──❀・MENU・❀──╮
│ ${emoji} | ${d}menuadm${d} - *menu adm*
│ ${emoji} | ${d}menujogos${d} - *menu jogos*
│ ${emoji} | ${d}menudono${d} - *menu dono*
│ ${emoji} | ${d}menufig${d} - *menu de figurinhas*
╰──────────────╯
╭──❀・Download・❀──╮
│ ${emoji} | ${d}play${d} - *baixar via name*
│ ${emoji} | ${d}playvd${d} - *baixar via name*
│ ${emoji} | ${d}insta${d} - *baixar via url*
╰───────────────╯
╭──❀・Pesquisas・❀──╮
│ ${emoji} | ${d} COMANDO${d} - *DEC*
╰───────────────╯
╭──❀・OUTROS・❀──╮
│ ${emoji} | ${d}log${d} - *Logs de cms*
╰──────────────╯
╭──❀・FIGURINHA・❀──╮
│ ${emoji} | ${d}s${d} - *(Fazer Sticker)*
│ ${emoji} |  ${d}Attp${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp4${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp5${d} *(Figurinha de texto)*
╰────────────────╯
╭──❀・CMDS AI・❀──╮
│ ${emoji} |  ${d}llama${d} *(Txt)*
│ ${emoji} |  ${d}llama2${d} *(Txt)*
│ ${emoji} |  ${d}sqlcode${d} *(Txt)*
│ ${emoji} |  ${d}mistral${d} *(Txt)*
│ ${emoji} |  ${d}deepseek${d} *(Txt)*
│ ${emoji} |  ${d}deepseek-code${d} *(Txt)*
│ ${emoji} |  ${d}dalle${d} *(Img)*
│ ${emoji} |  ${d}dallev2${d} *(Img)*
│ ${emoji} |  ${d}3d${d} *(Img)*
│ ${emoji} |  ${d}tattoo${d} *(Img)*
│ ${emoji} |  ${d}cartoon${d} *(Img)*
│ ${emoji} |  ${d}ghibli${d} *(Img)*
│ ${emoji} |  ${d}fantasia${d} *(Img)*
│ ${emoji} |  ${d}imagine-ia${d} *(Img)*
╰────────────────╯`;
if (isBotao) {
botaoLista(alma, from, menuTxt, fotomenu, "Comandos", "Escolha o seu comando", [{ header: emoji + ` Menu Adm`, title: "• menuadm", description: "", id: `${prefix}menuadm`},{ header: emoji + ` Menu Dono`, title: "• menudono", description: "", id: `${prefix}menudono`}, { header: emoji + ` Menu Jogos`, title: "• menujogos", description: "", id: `${prefix}menujogos`}])
} else {
await alma.sendMessage(from, {image: {url: fotomenu}, caption: menuTxt, mentions: [sender]}, {quoted: info});
}
}
break

case 'menudono': {
await reagir(emoji);
if(!isDono) return enviar(msg.dono);
menuTxt = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ${emoji}  ${botName.toUpperCase()} - SISTEMA PRINCIPAL  ${emoji}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
    ✧･ﾟ: *✧･ﾟ:* 🌙 *:･ﾟ✧*:･ﾟ✧
╭──❀・INFORMAÇÕES・❀──╮
│ ${isGroup ? `👥 ${groupName}` : "👤 Privado"}
│ 🩷 Nome: ${pushname}
│ 🤖 Bot: ${botName}
│ 📱 Número: ${sender.split("@")[0]}
│ 🩵 Status: Online 🟢
╰────────────────────╯
╭──❀・MENU DONO・❀──╮
│ ${emoji} | ${d}reset${d} - *Reiniciar Sistema*
│ ${emoji} | ${d}setapikey${d} - *Config dono*
│ ${emoji} | ${d}setdononame${d} - *Config dono*
│ ${emoji} | ${d}setusername${d} - *Config dono*
│ ${emoji} | ${d}setemoji${d} - *Config dono*
│ ${emoji} | ${d}setlid${d} - *Config dono*
│ ${emoji} | ${d}setjid${d} - *Config dono*
│ ${emoji} | ${d}setprefix${d} - *Config dono*
│ ${emoji} | ${d}setbotao${d} - *Config dono*
│ ${emoji} | ${d}setmsg${d} - *Config dono*
│ ${emoji} | ${d}COMANDO${d} - *DESC*
╰──────────────────╯`;
if (isBotao) {
botaoLista(alma, from, menuTxt, fotomenu, "Comandos", "Escolha o seu comando", [{ header: emoji + ` Menu Completo`, title: "• menucompleto", description: "", id: `${prefix}menucompleto`}, { header: emoji + ` Menu Adm`, title: "• menuadm", description: "", id: `${prefix}menuadm`}, { header: emoji + ` Menu Jogos`, title: "• menujogos", description: "", id: `${prefix}menujogos`}])
} else {
await alma.sendMessage(from, {image: {url: fotomenu}, caption: menuTxt, mentions: [sender]}, {quoted: info});
}
}
break

case 'menuadm': {
if (!isAdm) return enviar(msg.adm);
await reagir(emoji);
menuTxt = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ${emoji}  ${botName.toUpperCase()} - SISTEMA PRINCIPAL  ${emoji}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
    ✧･ﾟ: *✧･ﾟ:* 🌙 *:･ﾟ✧*:･ﾟ✧
╭──❀・INFORMAÇÕES・❀──╮
│ ${isGroup ? `👥 ${groupName}` : "👤 Privado"}
│ 🩷 Nome: ${pushname}
│ 🤖 Bot: ${botName}
│ 📱 Número: ${sender.split("@")[0]}
│ 🩵 Status: Online 🟢
╰────────────────────╯
╭──❀・MENU ADM・❀──╮
│ ${emoji} | ${d}antilink${d} - *1/0*
│ ${emoji} | ${d}antilinkhard${d} - *1/0*
│ ${emoji} | ${d}autoresposta${d} - *1/0*
│ ${emoji} | ${d}ban/kick${d} - *@*
│ ${emoji} | ${d}d/apagar/delet${d} - *Marca msg*
╰─────────────────╯`;
if (isBotao) {
botaoLista(alma, from, menuTxt, fotomenu, "Comandos", "Escolha o seu comando", [{ header: emoji + ` Menu Completo`, title: "• menucompleto", description: "", id: `${prefix}menucompleto`},{ header: emoji + ` Menu Dono`, title: "• menudono", description: "", id: `${prefix}menudono`}, { header: emoji + ` Menu Jogos`, title: "• menujogos", description: "", id: `${prefix}menujogos`}])
} else {
await alma.sendMessage(from, {image: {url: fotomenu}, caption: menuTxt, mentions: [sender]}, {quoted: info});
}
}
break

case 'menufig': case 'menusticker': case 'stickers': {
await reagir(emoji);
menuTxt = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ${emoji}  ${botName.toUpperCase()} - SISTEMA PRINCIPAL  ${emoji}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
    ✧･ﾟ: *✧･ﾟ:* 🌙 *:･ﾟ✧*:･ﾟ✧
╭──❀・INFORMAÇÕES・❀──╮
│ ${isGroup ? `👥 ${groupName}` : "👤 Privado"}
│ 🩷 Nome: ${pushname}
│ 🤖 Bot: ${botName}
│ 📱 Número: ${sender.split("@")[0]}
│ 🩵 Status: Online 🟢
╰────────────────────╯
╭──❀・MENU FIGURINHA・❀──╮
│ ${emoji} |  ${d}s${d} *(Fazer figurinhas)*
│ ${emoji} |  ${d}Attp${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp4${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp5${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp6${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp7${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp8${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp9${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp2-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp3-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp4-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp5-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp6-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp7-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp8-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp9-v2${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp2-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp3-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp4-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp5-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp6-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp7-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp8-v3${d} *(Figurinha de texto)*
│ ${emoji} |  ${d}Attp9-v3${d} *(Figurinha de texto)*
╰─────────────────────╯`;
if (isBotao) {
botaoLista(alma, from, menuTxt, fotomenu, "Comandos", "Escolha o seu comando", [{ header: emoji + ` Menu Completo`, title: "• menucompleto", description: "", id: `${prefix}menucompleto`}, { header: emoji + ` Menu Adm`, title: "• menuadm", description: "", id: `${prefix}menuadm`}, { header: emoji + ` Menu Jogos`, title: "• menujogos", description: "", id: `${prefix}menujogos`}])
} else {
await alma.sendMessage(from, {image: {url: fotomenu}, caption: menuTxt, mentions: [sender]}, {quoted: info});
}
}
break

case 'menujogos': case 'jogos': case 'brincadeiras': {
await reagir(emoji);
menuTxt = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ${emoji}  ${botName.toUpperCase()} - SISTEMA PRINCIPAL  ${emoji}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
    ✧･ﾟ: *✧･ﾟ:* 🌙 *:･ﾟ✧*:･ﾟ✧
╭──❀・INFORMAÇÕES・❀──╮
│ ${isGroup ? `👥 ${groupName}` : "👤 Privado"}
│ 🩷 Nome: ${pushname}
│ 🤖 Bot: ${botName}
│ 📱 Número: ${sender.split("@")[0]}
│ 🩵 Status: Online 🟢
╰────────────────────╯
╭──❀・MENU JOGOS・❀──╮
│ ${emoji} | ${d}perfil${d} - *Suas info*
│ ${emoji} | ${d}gay${d} - *Porcentagem*
│ ${emoji} | ${d}lindo${d} - *Porcentagem*
│ ${emoji} | ${d}feio${d} - *Porcentagem*
│ ${emoji} | ${d}lesbico${d} - *Porcentagem*
│ ${emoji} | ${d}lesbica${d} - *Porcentagem*
│ ${emoji} | ${d}gostosa${d} - *Porcentagem*
│ ${emoji} | ${d}gostoso${d} - *Porcentagem*
│ ${emoji} | ${d}podre${d} - *Porcentagem*
│ ${emoji} | ${d}atraente${d} - *Porcentagem*
│ ${emoji} | ${d}fiel${d} - *Porcentagem*
│ ${emoji} | ${d}gado${d} - *Porcentagem*
│ ${emoji} | ${d}gada${d} - *Porcentagem*
╰──────────────────╯`;
if (isBotao) {
botaoLista(alma, from, menuTxt, fotomenu, "Comandos", "Escolha o seu comando", [{ header: emoji + ` Menu Completo`, title: "• menucompleto", description: "", id: `${prefix}menucompleto`}, { header: emoji + ` Menu Adm`, title: "• menuadm", description: "", id: `${prefix}menuadm`}, { header: emoji + ` Menu Dono`, title: "• menudono", description: "", id: `${prefix}menudono`}])
} else {
await alma.sendMessage(from, {image: {url: fotomenu}, caption: menuTxt, mentions: [sender]}, {quoted: info});
}
}
break
//COMANDOS DONO
case 'reset': case 'rt':
if(!isDono) return enviar(msg.dono);
alma.sendMessage(from,{text: `- *O processo foi pausado por segurança. Sincronização em andamento.*`}, {quoted: info})
await esperar(1000)
statusReset = { executado: true, id: from };
fs.writeFileSync('status.json', JSON.stringify(statusReset));
setTimeout(() => { process.exit(0) }, 1000);
break;

case 'setapikey':
case 'setdononame':
case 'setusername':
case 'setemoji':
case 'setlid':
case 'setjid':
case 'setprefix':
case 'setbotao':
case 'setmsg': {
if(!isDono) return enviar(msg.dono);
switch (comando) {
case "setapikey":
config.DARK_APIKEY = q;
await configSet(config);
await enviar("🔐 A chave da API foi atualizada com sucesso. O sistema já reconheceu a nova credencial.");
break;
case "setdononame":
config.donoName = q;
await configSet(config);
await enviar("👤 O nome do dono foi configurado corretamente. As próximas mensagens usarão o novo identificador.");
break;
case "setusername":
config.DARK_USERNAME = q;
await configSet(config);
await enviar("🧩 O nome de usuário da API foi atualizado. Comunicação com o servidor restabelecida com sucesso.");
break;
case "setemoji":
config.emoji = q;
await configSet(config);
await enviar("💠 O emoji padrão foi modificado. As respostas terão um toque mais personalizado agora.");
break;
case "setlid":
config.donoLid = q || sender2;
await configSet(config);
await enviar("🛰️ O LID do dono foi definido corretamente. Canal de autenticação atualizado.");
break;
case "setjid":
config.donoJid = q || sender;
await configSet(config);
await enviar("📡 O JID do dono foi registrado. Comunicação direta estabelecida com sucesso.");
break;
case "setprefix":
config.prefix = q;
await configSet(config);
await enviar(`⚙️ O prefixo de comandos foi alterado para "${q}". Todos os comandos seguirão esse formato.`);
break;
case "setbotao":
if (Number(q[0]) === 1) {
config.isBotao = true;
await configSet(config);
await enviar("🧠 O sistema de botões foi ativado. Interações aprimoradas habilitadas.");
} else if (Number(q[0]) === 0) {
config.isBotao = false;
await configSet(config);
await enviar("🔇 O sistema de botões foi desativado. Interface reduzida ao modo direto.");
}
break;
case "setmsg":
if (Number(q[0]) === 1) {
config.verMsg = true;
await configSet(config);
await enviar("📬 A visualização de mensagens foi ativada. Monitoramento em tempo real iniciado.");
} else if (Number(q[0]) === 0) {
config.verMsg = false;
await configSet(config);
await enviar("📭 A visualização de mensagens foi desativada. Modo discreto ativo.");
}
break;
}
}
break;

//COMANDOS ADM
//ativos
case 'antilink':
if (!isGroup) return enviar(msg.grupo);
if (!isAdmBot) return enviar(msg.botAdm);
if (!isAdm && !isDono) return enviar(msg.adm)
if(args.length < 1) return enviar(`_Use o comando assim_\n> *_Exemplo:_* ${prefix + comando} 1 para ativar, 0 para desativar.`)
if(Number(args[0]) === 1) {
if(isAntiLink) return enviar('- *O antilink já está ativado nesse grupo*')
ArquivosDosGrupos[0].antilink = true
ModificaGrupo(ArquivosDosGrupos)
enviar(msg.ativado)
} else if(Number(args[0]) === 0) {
if(!isAntiLink) return enviar('- *O antilink já está desativado nesse grupo*')
ArquivosDosGrupos[0].antilink = false
ModificaGrupo(ArquivosDosGrupos)
enviar(msg.desativado)
}
break

case 'antilinkhard':
if (!isGroup) return enviar(msg.grupo);
if (!isAdmBot) return enviar(msg.botAdm);
if (!isAdm && !isDono) return enviar(msg.adm)
if(args.length < 1) return enviar(`_Use o comando assim_\n> *_Exemplo:_* ${prefix + comando} 1 para ativar, 0 para desativar.`)
if(Number(args[0]) === 1) {
if(isAntiLinkHard) return enviar('- *O antilinkhard já está ativado nesse grupo*')
ArquivosDosGrupos[0].antilinkHard = true
ModificaGrupo(ArquivosDosGrupos)
enviar(msg.ativado)
} else if(Number(args[0]) === 0) {
if(!isAntiLinkHard) return enviar('- *O antilinkhard já está desativado nesse grupo*')
ArquivosDosGrupos[0].antilinkHard = false
ModificaGrupo(ArquivosDosGrupos)
enviar(msg.desativado)
}
break

case 'autoresposta':
if (!isGroup) return enviar(msg.grupo);
if (!isAdmBot) return enviar(msg.botAdm);
if (!isAdm && !isDono) return enviar(msg.adm)
if(args.length < 1) return enviar(`_Use o comando assim_\n> *_Exemplo:_* ${prefix + comando} 1 para ativar, 0 para desativar.`)
if(Number(args[0]) === 1) {
if(ArquivosDosGrupos[0].autoResposta) return enviar('- *O autoresposta já está ativado nesse grupo*')
ArquivosDosGrupos[0].autoResposta = true
ModificaGrupo(ArquivosDosGrupos)
enviar(msg.ativado)
} else if(Number(args[0]) === 0) {
if(!ArquivosDosGrupos[0].autoResposta) return enviar('- *O autoresposta já está desativado nesse grupo*')
ArquivosDosGrupos[0].autoResposta = false
ModificaGrupo(ArquivosDosGrupos)
enviar(msg.desativado)
}
break

case 'ban': case 'kick':
if (!isGroup) return enviar(msg.grupo);
if (!isAdmBot) return enviar(msg.botAdm);
if (!isAdm && !isDono) return enviar(msg.adm)
try {
if(!menc) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if (!menc) return enviar("Este usuário já foi removido do grupo ou saiu do grupo.")
if(numeroBot.includes(menc)) return enviar('Não sou tão besta assim né 😑')
if(dono.includes(menc)) return enviar('pq voce ta tentando dar ban no meu dono?😑')
await alma.sendMessage(from, {text: `*Sistema em operação.*
*Hmm… sinais indicam que alguém vai receber um ban hoje.*
*Nada pessoal, apenas… manutenção de ordem.*`, mentions: [menc]})
reagir("✅")
await alma.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: menc}})
await alma.groupParticipantsUpdate(from, [info.message?.extendedTextMessage?.contextInfo?.mentionedJid[0]], "remove")
} catch (e) {
console.log(e)
}
break

case 'd': case 'delet': case 'apagar':{
if (!isGroup) return enviar(msg.grupo);
if (!isAdmBot) return enviar(msg.botAdm);
if (!isAdm && !isDono) return enviar(msg.adm)
if(!menc) return enviar("Marque a mensagem do usuário que deseja apagar..")
await alma.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: menc}})
reagir("🗑️")
};
break
//COMANDOS JOGOS
case 'perfil': {
await enviar(`- *👻 Processando informações do banco de dados... estou montando seu perfil....*`)
try { slaw = await alma.profilePictureUrl(sender, 'image'); shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${slaw}`); ppimg = shortpc.data; } catch(e) { ppimg = 'https://uploads.speedhosting.cloud/uploads/I2jc3Zx2iK.jpg'; };
const random = (max) => Math.floor(Math.random() * max);
const sorte = random(100); 
const valor = random(5000);
const gos = random(100);
textoPerfil = `     ┈━═☆ *My Profile* ☆═━┈
*⛃ ${emoji} | Nome: ${perfil.nome}*
*⛃ ${emoji} | AlmaCoins: ${perfil.saldo}*
*⛃ ${emoji} | Vip: ${perfil.vip ? "Sim" : "Não"}*
*⛃ ${emoji} | Banido: ${perfil.banido ? "Sim" : "Não"}*
*⛃ ${emoji} | Nivel: ${perfil.nivel}*
*⛃ ${emoji} | Xp: ${perfil.xp}*
*⛃ ${emoji} | Xp Nescessário: ${perfil.xp}/${perfil.xpNecessario}*
*⛃ ${emoji} | Bio: ${perfil.bio || "Sem"}*
*⛃ ${emoji} | Sorte: ${sorte}%*
*⛃ ${emoji} | Valor Progama: ${valor}$*
*⛃ ${emoji} | Gostoso(a): ${gos}%*`;
fotoPerfil = `${BaseApiDark}/api/canvaPdz/digital-id?name=${perfil.nome || pushname}&avatar=${perfil.foto || ppimg}&id=${random(1000000)}&clearance=LEVEL+${perfil.nivel}&department=${isDono ? "Developer" : "Member"}&status=ATIVO&expiration=12/2025&apikey=${DARK_APIKEY}` || ppimg;
if (isBotao) {
await botaoCopia(alma, from, fotoPerfil, textoPerfil, [{name: "Copiar", id: textoPerfil, copy: textoPerfil }]);
} else {
enviarImg2(fotoPerfil, textoPerfil)
}
}
break

case 'gay':
case 'lindo':
case 'feio':
case 'lesbico':
case 'lesbica':
case 'gostosa':
case 'gostoso':
case 'podre':
case 'atraente':
case 'fiel':
case 'gado':
case 'gada': {
let randinM
if (isDono) { randinM = randinM = Math.floor(80 + Math.random() * 100).toString(); } else { randinM = randinM = Math.floor(1 + Math.random() * 100).toString(); }
reagir("🧐")
if (menc) {
let { key } = await alma.sendMessage(from, {text: `*Aguarde em quanto eu verifico a porcentagem dele(a) de ${comando}...*`},{quoted: info})
await esperar(2000)
await alma.sendMessage(from, {text: `A porcentagem de ${comando} do usuário @${menc.split("@")[0]} é de ${randinM}%`, mentions: [menc], edit: key },{quoted: info});
} else {
let { key } = await alma.sendMessage(from, {text: `*Aguarde em quanto eu verifico sua porcentagem de ${comando}...*`},{quoted: info})
await esperar(2000)
await alma.sendMessage(from, {text: `Sua porcentagem de ${comando} é de ${randinM}%`, edit: key },{quoted: info});
}
}
break
//COMANDOS COM API
//download
case 'play': {
reagir("🕓")
const api2 = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`)
api = api2.resultado[0];
await enviar(`- *Baixando "${api.title}", aguarde alguns segundos.*..`)
textoPlay = `*⌬「🎧 MUSIC MODULE 🎶」⌬*

*◈ ${emoji} | Resultados localizados:* _${api2.resultado.length}_  
*◈ ${emoji} | Título:* _${api.title}_  
*◈ ${emoji} | Duração:* _${api.timestamp}_  
*◈ ${emoji} | Canal:* _${api.author.name}_  
*◈ ${emoji} | Descrição:* _${api.description}_  

*◈ ${emoji} | Operador:* _${donoName}_  
〰〰〰〰〰〰〰〰〰〰〰〰〰  
*💠 Sistema de áudio inicializado. Preparando stream...*`
fotoPlay = `https://dksapis.online/api/canvaPdz/album-cover?avatar=${api.image}&artist=${api.author.name}&album=${api.title.slice(0, 30)}&time=${api.timestamp}&apikey=${DARK_APIKEY}` || api.image;
await enviarImg2(fotoPlay, textoPlay)
await enviarAd(`${BaseApiDark}/api/download/youtube-audio?url=${api.url}&apikey=${DARK_APIKEY}`)
}
break

case 'playvd': {
reagir("🕓")
const api2 = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`)
api = api2.resultado[0];
await enviar(`- *Baixando "${api.title}", aguarde alguns segundos.*..`)
textoPlay = `*⌬「🎧 MUSIC MODULE 🎶」⌬*

*◈ ${emoji} | Resultados localizados:* _${api2.resultado.length}_  
*◈ ${emoji} | Título:* _${api.title}_  
*◈ ${emoji} | Duração:* _${api.timestamp}_  
*◈ ${emoji} | Canal:* _${api.author.name}_  
*◈ ${emoji} | Descrição:* _${api.description}_  

*◈ ${emoji} | Operador:* _${donoName}_  
〰〰〰〰〰〰〰〰〰〰〰〰〰  
*💠 Sistema de áudio inicializado. Preparando stream...*`
fotoPlay = api.image;
await enviarImg2(fotoPlay, textoPlay)
await enviarVd(`${BaseApiDark}/api/download/youtube-video?url=${api.url}&apikey=${DARK_APIKEY}`)
}
break

case 'insta': case 'ig': case 'instagram': {
try {
if(!q) return enviar(`Exemplo: ${prefix + comando} https://www.instagram.com/reel/DAJ1fawB1Rs/?igsh=d2dsbno5ZXB6YnRw=`);
enviar(msg.espere);
api = await fetchJson(`${BaseApiDark}/api/download/instagram?url=${q}&apikey=${DARK_APIKEY}`);
reagir('🟢');    
let Resultt = api.resultado.type
var DarkSs = Resultt === "mp4" ? "video/mp4" : Resultt === "jpg" ? "image/jpeg" : Resultt === "mp3" ? "audio/mpeg" : "video/mp4"
alma.sendMessage(from, {[DarkSs.split("/")[0]]: {url: api.resultado.link}, mimetype: DarkSs}, {quoted: info}).catch(e => {
console.log(e);
return enviar("Erro ao enviar o vídeo.");
})
} catch (e) {
console.log(e);
return enviar(msg.error);
}
}
break
//COMANDOS DE STICKER:
case 's': case 'sticker': case 'fig': {
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
const numeroBot = alma.user.id.split(":")[0]+"@s.whatsapp.net";
let author23;
let packin;
if (isDono) {
packin = `-> ${botName}` 
author23 = `-> Pedrozz Mods`
} else {
packin = q ? `Coleção: ${q.split("/")[0].trim()}」` : `Bot: ${botName}\nNumero: ${numeroBot.split('@')[0]}`;
author23 = q ? q.split("/")[1] ? `𝐂𝐫𝐢𝐚𝐝𝐨 𝐩𝐨𝐫: ${q.split("/")[1].trim()}` : `𝐀𝐮𝐭𝐨𝐫: 𝐃𝐞𝐬𝐜𝐨𝐧𝐡𝐞𝐜𝐢𝐝𝐨` : `\n\n𝐏𝐞𝐝𝐢𝐝𝐨 𝐝𝐞: ${pushname}\nPedrozz Mods`;
}
if(boij2){
reagir('⌛')
enviar(msg.espere)
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(alma, from, owgi, info, { packname:packin, author:author23})
await fs.unlinkSync(encmediaa)
} else if(boij && boij.seconds < 11){
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(alma, from, owgi, info, { packname:packin, author:author23})
await fs.unlinkSync(encmedia)
reagir(emoji)
} else {
return enviar(`- *Marque uma foto ou o vídeo para fazer sua figurinha com o comando: ${prefix + comando}*`)
}
}
break

case "attp":
case "attp2":
case "attp3":
case "attp4":
case "attp5":
case "attp6":
case "attp7":
case "attp8":
case "attp9": {
staAp = statusApi(apiDarkInfo);
if (!staAp.status) return enviar(`- *${staAp.mensagem}*`)
if (!q) return enviar("Cade o texto para a sticker?")
try {
enviar("*Iniciando protocolo de renderização... figurinha animada em construção. Por favor, aguarde um momento.*")
alma.sendMessage(from, { sticker: { url: `${BaseApiDark}/api/sticker/canva/${comando}?texto=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`} })
} catch (e) {
console.log(e)
enviar("erro ao criar a figurinha")
}
}
break

case "attp-v2":
case "attp2-v2":
case "attp3-v2":
case "attp4-v2":
case "attp5-v2":
case "attp6-v2":
case "attp7-v2":
case "attp8-v2":
case "attp9": {
if (!q) return enviar("Cade o texto para a sticker?")
staAp = statusApi(apiDarkInfo);
if (!staAp.status) return enviar(`- *${staAp.mensagem}*`)
try {
enviar("*Iniciando protocolo de renderização... figurinha animada em construção. Por favor, aguarde um momento.*")
alma.sendMessage(from, { sticker: { url: `${BaseApiDark}/api/sticker/canva/v2/${comando.replace("-v2", "")}?texto=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`} })
} catch (e) {
console.log(e)
enviar("erro ao criar a figurinha")
}
}
break

case "attp-v3":
case "attp2-v3":
case "attp3-v3":
case "attp4-v3":
case "attp5-v3":
case "attp6-v3":
case "attp7-v3":
case "attp8-v3":
case "attp9": {
if (!q) return enviar("Cade o texto para a sticker?")
try {
staAp = statusApi(apiDarkInfo);
if (!staAp.status) return enviar(`- *${staAp.mensagem}*`)
enviar("*Iniciando protocolo de renderização... figurinha animada em construção. Por favor, aguarde um momento.*")
alma.sendMessage(from, { sticker: { url: `${BaseApiDark}/api/sticker/canva/v3/${comando.replace("-v2", "")}?texto=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`} })
} catch (e) {
console.log(e)
enviar("erro ao criar a figurinha")
}
}
break
//AIS
case 'llma':
case 'llama2':
case 'sqlcode':
case 'mistral':
case 'deepseek':
case 'deepseek-code':
staAp = statusApi(apiDarkInfo);
if (!staAp.status) return enviar(`- *${staAp.mensagem}*`)
if (!q) return enviar(msg.query)
try {
reagir(emoji)
api = await fetchJson(`${BaseApiDark}/api/ai/texto/${comando}?query=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`)
console.log(api)
alma.sendMessage(from, {text: api.resultado.resposta}, {quoted: info})
} catch (erro) {
reagir("❌")
console.log(erro)
enviar(msg.error)
}
break

case 'dalle':
case 'dallev2':
case '3d':
case 'tattoo':
case 'cartoon':
case 'ghibli':
case 'fantasia':
case 'imagine':
if (!q) return enviar("Me infome o prompt para a geração da imagem...")
if (comando === "imagine") {
try {
reagir("🤖")
api = await fetchJson(`${BaseApiDark}/api/ai/imagem/imagine?prompt=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`)
await enviar('*_Gerando imagem usando inteligência artificial_*')
if (isBotao) {
botaoNormal(alma, from, " ", api.resultado.imagemUrl, [{ display_text: `${emoji} ➮ 𝑩𝒂𝒊𝒙𝒂𝒓 𝑵𝒐𝒗𝒂𝒎𝒆𝒏𝒕𝒆 `, id: `${prefix + comando} ${q}` }], "Caso queira baixar novamente use o botão abaixo.")
} else {
await alma.sendMessage(from, {image: {url: api.resultado.imagemUrl}, caption: `> Caso queira baixar novamente use o mesmo comando ${prefix + comando} ${q}`, mentions: [sender]}, {quoted: info});
}
} catch (e) {
reagir("🔴");
console.log(e)
enviar(msg.error);
}
} else {
try {
reagir("🤖")
await enviar('*_Gerando imagem usando inteligência artificial_*')
if (isBotao) {
botaoNormal(alma, from, " ", `${BaseApiDark}/api/ai/imagem/${comando}?prompt=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`, [{ display_text: `${emoji} ➮ 𝑩𝒂𝒊𝒙𝒂𝒓 𝑵𝒐𝒗𝒂𝒎𝒆𝒏𝒕𝒆 `, id: `${prefix + comando} ${q}` }], "Caso queira baixar novamente use o botão abaixo.")
} else {
await alma.sendMessage(from, {image: {url: `${BaseApiDark}/api/ai/imagem/${comando}?prompt=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`}, caption: `> Caso queira baixar novamente use o mesmo comando ${prefix + comando} ${q}`, mentions: [sender]}, {quoted: info});
}
} catch (e) {
reagir("🔴");
console.log(e)
enviar(msg.error);
}
}
break
//⊰᯽⊱┈──╌❊ FIM COMANDO ❊╌──┈⊰᯽⊱\\
default:
if (isCmd) {
reagir("🔴")
cm = await comandoMaisUsado()
textoC = `╭──❀・COMANDO INEXISTENTE・❀──╮
│ ${emoji} | *_Comando usado_*: ${d}${comando || "Nenhum"}${d}
│ ${emoji} | *_Sugestão_*: ${d}${prefix}menu${d}
│ ${emoji} | *_Comando mais usado:_* ${d}${cm.comando}${d}
│ ${emoji} | *_Dica_*: ${d}Ultilize o ${prefix}menu${d}
│ ${emoji} | *_Dono_*: ${d}PedrozzMods${d}
╰─────────────────────────╯`
if (isBotao) {
botaoNormal(alma, from, textoC, "./files/imagem/menu.png", [{ display_text: `Menu `, id: `${prefix}menu` }], `Ultilize o ${prefix}menu para tirar suas dúvidas.`)
} else {
await alma.sendMessage(from, {image: {url: fotomenu}, caption: textoC, mentions: [sender]}, {quoted: info});
}
}
}
//⊰᯽⊱┈──╌❊ SEM PREFIXO ❊╌──┈⊰᯽⊱\\
if (isResposta) {
if (body.toLowerCase().includes("alma") || body.toLowerCase().includes("bot")) {
fig = `./files/figurinha/alma${Math.floor(Math.random() * 26)}.webp`;
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("sono") || body.toLowerCase().includes("dormir")  || body.toLowerCase().includes("noite")) {
fig = "./files/figurinha/alma4.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("o entendi")  || body.toLowerCase().includes("como?")) {
fig = "./files/figurinha/naoEntendi.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("feliz") || body.toLowerCase().includes("sim") || body.toLowerCase().includes("alegre") || body.toLowerCase().includes("eba")) {
fig = "./files/figurinha/alma12.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("serio") || body.toLowerCase().includes("nao") || body.toLowerCase().includes("não") || body.toLowerCase().includes("negativo")) {
fig = "./files/figurinha/alma6.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("money") || body.toLowerCase().includes("dinheir") || body.toLowerCase().includes("bufunfa") || body.toLowerCase().includes("cash")) {
fig = "./files/figurinha/alma14.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("fome") || body.toLowerCase().includes("comida") || body.toLowerCase().includes("almoço") || body.toLowerCase().includes("janta")) {
fig = "./files/figurinha/alma23.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("cachoro") || body.toLowerCase().includes("dog") || body.toLowerCase().includes("lambida") || body.toLowerCase().includes("pet")) {
fig = "./files/figurinha/alma15.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
if (body.toLowerCase().includes("beij") || body.toLowerCase().includes("bico") || body.toLowerCase().includes("bjs") || body.toLowerCase().includes("amo")) {
fig = "./files/figurinha/alma25.webp";
await alma.sendMessage(from, {sticker: {url: fig}}, {quoted: info});
}
}
//⊰᯽⊱┈──╌❊ ERROS ❊╌──┈⊰᯽⊱\\
} catch (erro) {
console.log(erro)
}})

//⊰᯽⊱┈──╌❊ CONEXÃO ❊╌──┈⊰᯽⊱\\
alma.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update;

if (connection === 'open') { // CONEXÃO ABERTA
console.log("[Sistema] → Canal neural sincronizado com sucesso!");
console.log("Conexão estabelecida! Uhu~ missão de comunicação concluída com êxito ✨");
inicial();
//BANNER AO INICIAR O BOT
//TUTORIAL: https://youtu.be/g0jzW3PFw9A
}

else if (connection === "connecting") { // TENTANDO CONECTAR
console.log("Processando... tentando se conectar ao sistema humano chamado 'WhatsApp'...");
console.log("Estabelecendo link neural... quase lá");
} 

else if (connection === 'close') { // CONEXÃO FECHADA
const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
if (shouldReconnect) {
console.log("Hmm... parece que o link caiu");
console.log("Reativando protocolos de reconexão... Alma não vai desistir!");
IniciarProcessoDoBot();
} else {
console.log("Conexão encerrada definitivamente...");
console.log("Entrando em modo de descanso. Até mais, operador ♡");
}
}
});
}
IniciarProcessoDoBot()

//⊰᯽⊱┈──╌❊ ATUALIZAÇÕES ❊╌──┈⊰᯽⊱\\
fs.watchFile(__filename, (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log('A index foi editada, irei reiniciar...');
process.exit()
}
})

fs.watchFile("./dono/config.json", (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log('A config foi editada, irei reiniciar...');
process.exit()
}
})
//⊰᯽⊱┈──╌❊ FIM ❊╌──┈⊰᯽⊱\\
