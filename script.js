const puppeteer = require("puppeteer-core");
const chalk = require("chalk");

const sitesConfig = [
    { name: "birtakipci", baseUrl: "https://birtakipci.com", loginUrl: "https://birtakipci.com/member", sendFollowerUrl: "https://birtakipci.com/tools/send-follower" },
    { name: "takipcimax", baseUrl: "https://takipcimax.com", loginUrl: "https://takipcimax.com/login", sendFollowerUrl: "https://takipcimax.com/tools/send-follower" },
    { name: "takipciking_net", baseUrl: "https://takipciking.net", loginUrl: "https://takipciking.net/login", sendFollowerUrl: "https://takipciking.net/tools/send-follower" },
    { name: "takipcizen", baseUrl: "https://takipcizen.com", loginUrl: "https://takipcizen.com/login", sendFollowerUrl: "https://takipcizen.com/tools/send-follower" },
    { name: "hepsitakipci", baseUrl: "https://www.hepsitakipci.com", loginUrl: "https://www.hepsitakipci.com/member", sendFollowerUrl: "https://www.hepsitakipci.com/tools/send-follower" },
    { name: "instamoda", baseUrl: "https://instamoda.org", loginUrl: "https://instamoda.org/login", sendFollowerUrl: "https://instamoda.org/tools/send-follower" },
    { name: "fastfollow", baseUrl: "https://fastfollow.in", loginUrl: "https://fastfollow.in/member", sendFollowerUrl: "https://fastfollow.in/tools/send-follower" },
    { name: "takipcikrali", baseUrl: "https://takipcikrali.com", loginUrl: "https://takipcikrali.com/login", sendFollowerUrl: "https://takipcikrali.com/tools/send-follower" },
    { name: "takipcitime", baseUrl: "https://takipcitime.com", loginUrl: "https://takipcitime.com/login", sendFollowerUrl: "https://takipcitime.com/tools/send-follower" },
    { name: "medyahizmeti", baseUrl: "https://medyahizmeti.com", loginUrl: "https://medyahizmeti.com/member", sendFollowerUrl: "https://medyahizmeti.com/tools/send-follower" },
    { name: "mixtakip", baseUrl: "https://mixtakip.com", loginUrl: "https://mixtakip.com/login", sendFollowerUrl: "https://mixtakip.com/tools/send-follower" },
    { name: "takipcigir", baseUrl: "https://takipcigir.com", loginUrl: "https://takipcigir.com/login", sendFollowerUrl: "https://takipcigir.com/tools/send-follower" },
    { name: "canlitakipci", baseUrl: "https://canlitakipci.com", loginUrl: "https://canlitakipci.com/login", sendFollowerUrl: "https://canlitakipci.com/tools/send-follower" },
    { name: "takipciking_com", baseUrl: "https://www.takipciking.com", loginUrl: "https://www.takipciking.com/member", sendFollowerUrl: "https://www.takipciking.com/tools/send-follower" },
    { name: "takipcivar", baseUrl: "https://takipcivar.net", loginUrl: "https://takipcivar.net/login", sendFollowerUrl: "https://takipcivar.net/tools/send-follower" }
];

class Logger {
    static log(site, msg, color = 'white') { console.log(chalk.blue(`[${new Date().toLocaleTimeString()}]`) + chalk.cyan(` [${site}] `) + chalk[color](msg)); }
    static info(site, msg) { this.log(site, msg, 'cyan'); }
    static success(site, msg) { this.log(site, `✓ ${msg}`, 'green'); }
    static error(site, msg) { this.log(site, `✗ ${msg}`, 'red'); }
    static warning(site, msg) { this.log(site, `⚠ ${msg}`, 'yellow'); }
}

class MultiSiteAutomation {
    constructor(username, password) {
        this.credentials = { username, password };
        this.browser = null;
        this.page = null;
        this.sitesConfig = sitesConfig; // Disponibilizar para o run.js
        this.stats = { success: 0, error: 0, total: sitesConfig.length };
    }

    async initBrowser() {
        this.browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', headless: "new", args: ['--no-sandbox'] });
        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1280, height: 800 });
    }

    async closeBrowser() { if (this.browser) await this.browser.close(); }

    async login(site) {
        try {
            Logger.info(site.name, "Iniciando login...");
            await this.page.goto(site.loginUrl, { waitUntil: "networkidle2", timeout: 30000 });
            
            const needsRedirect = await this.page.evaluate(() => document.title.includes("404") || document.body.innerText.includes("404") || !document.querySelector("#username"));
            if (needsRedirect) {
                await this.page.evaluate(() => {
                    const btn = Array.from(document.querySelectorAll('a')).find(a => a.innerText.includes('LOGIN') || a.href.includes('login'));
                    if (btn) btn.click();
                });
                await this.page.waitForNavigation({ waitUntil: "networkidle2", timeout: 15000 }).catch(() => {});
            }

            await this.page.waitForSelector("#username", { timeout: 10000 });
            await this.page.type("#username", this.credentials.username);
            await this.page.type("input[type='password']", this.credentials.password);
            
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 }).catch(() => {}),
                this.page.click("#login_insta")
            ]);

            await new Promise(r => setTimeout(r, 5000));
            if (await this.page.evaluate(() => !document.querySelector("#username"))) {
                Logger.success(site.name, "Login OK!");
                return true;
            }
            throw new Error("Falha no login.");
        } catch (e) {
            Logger.error(site.name, `Erro login: ${e.message}`);
            return false;
        }
    }

    async sendFollowers(site, target, count) {
        try {
            Logger.info(site.name, "Acessando ferramenta...");
            await this.page.goto(site.sendFollowerUrl, { waitUntil: "networkidle2", timeout: 30000 });
            
            await this.page.waitForSelector("input[name='username']", { timeout: 10000 });
            await this.page.type("input[name='username']", target);
            await this.page.click("button[type='submit']");
            
            let qtySel = null;
            for (let i = 0; i < 6; i++) {
                await new Promise(r => setTimeout(r, 5000));
                qtySel = await this.page.evaluate(() => {
                    const i = document.querySelector('input[name="adet"]') || document.querySelector('input[type="number"]');
                    return i ? (i.id ? '#' + i.id : 'input[name="' + i.name + '"]') : null;
                });
                if (qtySel) break;
                Logger.warning(site.name, `Aguardando campo (tentativa ${i+1}/6)...`);
                // Tentar clicar no botão de busca novamente caso o AJAX tenha falhado
                await this.page.evaluate(() => {
                    const btn = document.querySelector('button[type="submit"]') || document.querySelector('button.btn-primary');
                    if (btn) btn.click();
                });
            }

            if (!qtySel) throw new Error("Campo não encontrado.");

            await this.page.click(qtySel, { clickCount: 3 });
            await this.page.keyboard.press('Backspace');
            await this.page.type(qtySel, count.toString());
            
            await this.page.click("button#send_follower_button, button.btn-success, button[type='button']");
            await new Promise(r => setTimeout(r, 10000));
            Logger.success(site.name, "Envio disparado!");
            return true;
        } catch (e) {
            Logger.error(site.name, `Erro envio: ${e.message}`);
            return false;
        }
    }

    async runOneCycle(target, count) {
        for (const site of this.sitesConfig) {
            if (await this.login(site)) {
                if (await this.sendFollowers(site, target, count)) this.stats.success++;
                else this.stats.error++;
            } else this.stats.error++;
        }
        console.log(chalk.magenta.bold("\n--- ESTATÍSTICAS ---"));
        console.log(chalk.green(`Sucesso: ${this.stats.success}`));
        console.log(chalk.red(`Erro: ${this.stats.error}`));
    }
}

module.exports = MultiSiteAutomation;
