// CÓDIGO CRIADO POR PEDROZZ MODDZ VULGO PAIAÇO 🧑‍💻

const fs = require('fs');
const path = require('path');

const UserFile = path.resolve("./files/json/usuarios.json");

function carregarDadosUsuario() {
if (!fs.existsSync(UserFile)) return {};
try {
const data = fs.readFileSync(UserFile, 'utf8');
return JSON.parse(data);
} catch (err) {
console.error('Erro ao carregar os dados dos usuários:', err);
return {};
}
}

function salvarUsuario(data) {
try {
fs.writeFileSync(UserFile, JSON.stringify(data, null, 2));
} catch (err) {
console.error('Erro ao salvar os dados dos usuários:', err);
}
}

function encontrarUsuarioPorJidOuLid(chave) {
const userData = carregarDadosUsuario();

if (userData[chave]) return chave;

for (const [key, user] of Object.entries(userData)) {
if (user.jid === chave || user.lid === chave) {
return key;
}
}
return null;
}

function registrarUsuario(jid, lid, nome, saldo, vip) {
const userData = carregarDadosUsuario();
const existingKey = encontrarUsuarioPorJidOuLid(jid) || encontrarUsuarioPorJidOuLid(lid);
const sender = existingKey || jid;

userData[sender] = {
nome,
jid,
lid,
saldo,
xp: 0,
nivel: 1,
xpNecessario: 200,
ft: null,
banner: null,
bio: null,
vip,
banido: false
};
salvarUsuario(userData);
}

function infoUser1(chave) {
const userData = carregarDadosUsuario();
const realKey = encontrarUsuarioPorJidOuLid(chave);
if (!realKey) return null;

const user = userData[realKey];
// Atualiza o XP necessário sempre que consultar
user.xpNecessario = 200 + (user.nivel - 1) * 50;
return user;
}

function modificarsaldo(chave, quantidade) {
const userData = carregarDadosUsuario();
const realKey = encontrarUsuarioPorJidOuLid(chave);
if (!realKey || !userData[realKey]) return;

const user = userData[realKey];
user.saldo = (parseInt(user.saldo) || 0) + parseInt(quantidade);
salvarUsuario(userData);
}

function modificarUsuario(chave, valor, tipo) {
const userData = carregarDadosUsuario();
const realKey = encontrarUsuarioPorJidOuLid(chave);
if (!realKey || !userData[realKey]) return;

const user = userData[realKey];

if (tipo === 'saldo') {
user.saldo = ((parseInt(user.saldo) || 0) + parseInt(valor)).toString();
} else {
user[tipo] = valor;
}

salvarUsuario(userData);
}

function carregarDadosUsuarios() {
return carregarDadosUsuario();
}

// ----------------- SISTEMA DE XP POR MENSAGEM -----------------

const cooldowns = {};

async function ganharXP(chave, alma, from, sender2) {
try {
const userData = carregarDadosUsuario();
const realKey = encontrarUsuarioPorJidOuLid(chave);
if (!realKey || !userData[realKey]) return;

const perfil = userData[realKey];
const now = Date.now();
if (cooldowns[realKey] && now - cooldowns[realKey] < 5000) return;
cooldowns[realKey] = now;

const xpNecessario = nivel => 200 + (nivel - 1) * 50;
const ganhoXP = Math.floor(Math.random() * 10) + 5;

perfil.xp += ganhoXP;
perfil.xpNecessario = xpNecessario(perfil.nivel);

let subiuNivel = false;
while (perfil.xp >= xpNecessario(perfil.nivel)) {
perfil.xp -= xpNecessario(perfil.nivel);
perfil.nivel++;
perfil.saldo = (parseFloat(perfil.saldo) + 10);
perfil.xpNecessario = xpNecessario(perfil.nivel);
subiuNivel = true;
}

salvarUsuario(userData);

if (subiuNivel && alma && from && sender2) {
await alma.sendMessage(from, {text: `⌬ ALMA SYSTEM
▻ Usuário: @${sender2.split('@')[0]}
▻ Nível atual: ${perfil.nivel}
▻ Recompensa: +10 almaCoins
▻ XP: ${perfil.xp}/${perfil.xpNecessario}

💠 Operação concluída com sucesso.`, mentions: [sender2] });
}
} catch (err) {
console.error('[ERRO AO DAR XP]', err);
}
}

// ----------------- EXPORTAÇÃO -----------------

module.exports = {
registrarUsuario,
infoUser1,
modificarUsuario,
modificarsaldo,
salvarUsuario,
carregarDadosUsuarios,
ganharXP
};

// ----------------- ATUALIZAÇÕES AUTOMÁTICAS -----------------
const file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(`Eii você já tá mexendo? 😑\nAs alterações foram salvas - '${__filename}'`);
delete require.cache[file];
require(file);
});