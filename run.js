const MultiSiteAutomation = require('./script.js');
const express = require('express');
const fs = require('fs').promises;
const axios = require('axios');

const targetUsername = 'comedor_di_primas';
const followerCount = 500;
const accountsFilePath = './accounts.txt';

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
    console.log(`Servidor rodando na porta ${PORT}`);
});
