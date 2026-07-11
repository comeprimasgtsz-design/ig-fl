const MultiSiteAutomation = require('./script.js');
const express = require('express');
const fs = require('fs').promises;
const axios = require('axios');
const { SocksProxyAgent } = require('socks-proxy-agent');

const targetUsername = 'dudaqtzy7';
const followerCount = 500;
const accountsFilePath = './accounts.txt';

const proxyData = {
list: []
};

// =====================
// GRUPODOZAP
// =====================

async function updateProxyList() {
try {
const response = await axios.get(
'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000'
);

    proxyData.list = response.data
        .split(/\r?\n/)
        .filter(p => p.trim());

    console.log(`✅ ${proxyData.list.length} proxies carregadas`);

} catch (e) {
    console.log('Erro ao atualizar proxies:', e.message);
}

}

async function runProxyAccess() {
try {

    if (proxyData.list.length < 10) {
        await updateProxyList();
    }

    if (!proxyData.list.length) return;

    const proxy =
        proxyData.list[
            Math.floor(Math.random() * proxyData.list.length)
        ];

    const agent = new SocksProxyAgent(`socks5://${proxy}`);

    await axios.get(
        'https://gruposwhats.app/group/1103423?ref=social',
        {
            httpAgent: agent,
            httpsAgent: agent,
            timeout: 5000,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0 Safari/537.36'
            }
        }
    );

    console.log(`✨ Proxy OK: ${proxy}`);

} catch (err) {
    console.log('❌ Proxy falhou');
}

}

async function startGrupoDoZap() {

console.log('🚀 GrupoDoZap iniciado');

await updateProxyList();

const interval = setInterval(async () => {
    await runProxyAccess();
}, 3000);

setTimeout(() => {
    clearInterval(interval);
    console.log('🛑 GrupoDoZap desligado após 10 minutos');
}, 10 * 60 * 1000);

}

// =====================
// CONTAS
// =====================

async function readAccounts(filePath) {
try {
const data = await fs.readFile(filePath, 'utf8');

    const lines = data
        .split('\n')
        .filter(line => line.trim() !== '');

    return lines.map(line => {
        const [username, password] = line.split(' ');
        return { username, password };
    });

} catch (error) {
    console.error(
        'Erro ao ler o arquivo de contas:',
        error.message
    );

    return [];
}

}

// =====================
// AUTOMAÇÃO
// =====================

async function startAutomation() {

while (true) {

    // Liga GrupoDoZap por 10 minutos
    startGrupoDoZap();

    // Aguarda os 10 minutos terminarem
    await new Promise(resolve =>
        setTimeout(resolve, 10 * 60 * 1000)
    );

    const accounts = await readAccounts(accountsFilePath);

    if (accounts.length === 0) {
        console.error(
            'Nenhuma conta encontrada no arquivo accounts.txt.'
        );

        await new Promise(resolve =>
            setTimeout(resolve, 60000)
        );

        continue;
    }

    for (let i = 0; i < accounts.length; i++) {

        const account = accounts[i];

        console.log(
            `Iniciando automação para a conta: ${account.username}`
        );

        try {

            const automation =
                new MultiSiteAutomation(
                    account.username,
                    account.password
                );

            await automation.initBrowser();

            await automation.runOneCycle(
                targetUsername,
                followerCount
            );

            await automation.closeBrowser();

        } catch (err) {

            console.log(
                `Erro na conta ${account.username}:`,
                err.message
            );
        }

        if (i < accounts.length - 1) {

            console.log(
                '⏳ Aguardando 5 minutos antes da próxima conta...'
            );

            await new Promise(resolve =>
                setTimeout(resolve, 5 * 60 * 1000)
            );
        }
    }

    console.log(
        '⏳ Todas as contas processadas. Aguardando 1h30min antes de reiniciar...'
    );

    await new Promise(resolve =>
        setTimeout(resolve, 90 * 60 * 1000)
    );
}

}

// =====================
// PROTEÇÃO CONTRA CRASH
// =====================

process.on('uncaughtException', err => {
console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', err => {
console.error('UNHANDLED REJECTION:', err);
});

// =====================
// DEPENDÊNCIAS
// =====================

async function installDependencies() {
try {
require.resolve('chalk');
} catch (e) {

    console.log('Instalando chalk...');

    const { exec } = require('child_process');

    await new Promise((resolve, reject) => {

        exec(
            'npm install chalk',
            (error, stdout, stderr) => {

                if (error) {
                    return reject(error);
                }

                console.log(stdout);
                console.error(stderr);

                resolve();
            }
        );
    });
}

}

installDependencies().then(() => {
startAutomation();
});

// =====================
// EXPRESS
// =====================

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
res.send('Automação de múltiplos sites está rodando!');
});

app.listen(PORT, () => {
console.log("Servidor rodando na porta ${PORT}");
});
