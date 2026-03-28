const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const chalk = require("chalk");

// Configuração dos sites com seletores validados manualmente via análise de HTML
const sitesConfig = [
    { 
        name: "birtakipci", 
        baseUrl: "https://birtakipci.com", 
        loginUrl: "https://birtakipci.com/member", 
        sendFollowerUrl: "https://birtakipci.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "takipcimax", 
        baseUrl: "https://takipcimax.com", 
        loginUrl: "https://takipcimax.com/login", 
        sendFollowerUrl: "https://takipcimax.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "takipciking", 
        baseUrl: "https://takipciking.net", 
        loginUrl: "https://takipciking.net/login", 
        sendFollowerUrl: "https://takipciking.net/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "takipcizen", 
        baseUrl: "https://takipcizen.com", 
        loginUrl: "https://takipcizen.com/login", 
        sendFollowerUrl: "https://takipcizen.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "hepsitakipci", 
        baseUrl: "https://www.hepsitakipci.com", 
        loginUrl: "https://www.hepsitakipci.com/member", 
        sendFollowerUrl: "https://www.hepsitakipci.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "instamoda", 
        baseUrl: "https://instamoda.org", 
        loginUrl: "https://instamoda.org/login", 
        sendFollowerUrl: "https://instamoda.org/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "fastfollow", 
        baseUrl: "https://fastfollow.in", 
        loginUrl: "https://fastfollow.in/member", 
        sendFollowerUrl: "https://fastfollow.in/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "takipcikrali", 
        baseUrl: "https://takipcikrali.com", 
        loginUrl: "https://takipcikrali.com/login", 
        sendFollowerUrl: "https://takipcikrali.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "takipcitime", 
        baseUrl: "https://takipcitime.com", 
        loginUrl: "https://takipcitime.com/login", 
        sendFollowerUrl: "https://takipcitime.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "medyahizmeti", 
        baseUrl: "https://medyahizmeti.com", 
        loginUrl: "https://medyahizmeti.com/member", 
        sendFollowerUrl: "https://medyahizmeti.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "takipcikutusu", 
        baseUrl: "https://takipcikutusu.com", 
        loginUrl: "https://takipcikutusu.com/member", 
        sendFollowerUrl: "https://takipcikutusu.com/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Giriş yap",
        findUserButtonText: "Kullanıcıyı Bul",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    { 
        name: "takipcim", 
        baseUrl: "https://takipcim.com.tr", 
        loginUrl: "https://takipcim.com.tr/login", 
        sendFollowerUrl: "https://takipcim.com.tr/tools/send-follower",
        selectors: {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="count"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    }
];

class Logger {
    static info(site, message) {
           console.log(chalk.blue(`[${new Date().toLocaleTimeString()}]`) + chalk.cyan(` [${site}] `) + chalk.white(message));
    }
    
    static success(site, message) {
        console.log(chalk.blue(`[${new Date().toLocaleTimeString()}]`) + chalk.green(` [${site}] ✓ `) + chalk.white(message));
    }
    
    static error(site, message) {
        console.log(chalk.blue(`[${new Date().toLocaleTimeString()}]`) + chalk.red(` [${site}] ✗ `) + chalk.white(message));
    }
    
    static warning(site, message) {
        console.log(chalk.blue(`[${new Date().toLocaleTimeString()}]`) + chalk.yellow(` [${site}] ⚠ `) + chalk.white(message));
    }
    
    static header(message) {
        console.log(chalk.keyword("magenta").bold("\n" + "=".repeat(60)));
        console.log(chalk.hex("#FF00FF").bold(message));
        console.log(chalk.hex("#FF00FF")("=".repeat(60) + "\n"));
    }
    
    static stats(stats) {
        console.log(chalk.keyword("magenta").bold("\n" + "=".repeat(60)));
        console.log(chalk.hex("#FF00FF").bold("ESTATÍSTICAS FINAIS"));
        console.log(chalk.hex("#FF00FF").bold("=".repeat(60)));
        console.log(chalk.green(`✓ Sites com sucesso: ${stats.success}`));
        console.log(chalk.red(`✗ Sites com erro: ${stats.error}`));
        console.log(chalk.yellow(`⚠ Sites pulados: ${stats.skipped}`));
        console.log(chalk.blue(`📊 Total de sites: ${stats.total}`));
        console.log(chalk.cyan(`📈 Taxa de sucesso: ${((stats.success / stats.total) * 100).toFixed(1)}%`));
        console.log(chalk.hex("#FF00FF")("=".repeat(60) + "\n"));
    }
}

class MultiSiteAutomation {
    constructor(username, password) {
        this.credentials = {
            username: username,
            password: password
        };
        this.browser = null;
        this.page = null;
        this.currentSiteIndex = 0;
        this.sitesConfig = sitesConfig;
        this.stats = {
            success: 0,
            error: 0,
            skipped: 0,
            total: 0
        };
    }

    async initBrowser() {
        const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;
        
        let browserOptions;
        
        if (isProduction) {
            browserOptions = {
                args: [
                    ...chromium.args,
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--disable-gpu',
                    '--window-size=1920,1080'
                ],
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            };
        } else {
            browserOptions = {
                headless: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
            };
        }

        this.browser = await puppeteer.launch(browserOptions);
        this.page = await this.browser.newPage();
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    }

    async login(siteConfig) {
        try {
            Logger.info(siteConfig.name, `Acessando página de login: ${siteConfig.loginUrl}`);
            await this.page.goto(siteConfig.loginUrl, { waitUntil: 'networkidle2', timeout: 60000 });

            Logger.info(siteConfig.name, "Preenchendo credenciais...");
            await this.page.waitForSelector(siteConfig.selectors.username, { timeout: 15000 });
            await this.page.type(siteConfig.selectors.username, this.credentials.username, { delay: 100 });
            await this.page.type(siteConfig.selectors.password, this.credentials.password, { delay: 100 });

            Logger.info(siteConfig.name, "Clicando no botão de login...");
            const loginButton = await this.page.evaluateHandle((text) => {
                const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], a.btn'));
                return buttons.find(b => (b.innerText || b.value || "").toLowerCase().includes(text.toLowerCase()));
            }, siteConfig.loginButtonText);

            if (loginButton.asElement()) {
                await loginButton.click();
            } else {
                await this.page.click('button[type="submit"], input[type="submit"]');
            }

            await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
            
            const currentUrl = this.page.url();
            if (currentUrl.includes('login') || currentUrl.includes('member')) {
                Logger.warning(siteConfig.name, "Ainda na página de login. Verificando se há erros...");
            }

            Logger.success(siteConfig.name, "Login processado.");
            return true;
        } catch (error) {
            Logger.error(siteConfig.name, `Erro no login: ${error.message}`);
            return false;
        }
    }

    async getFollowerCredits(siteConfig) {
        try {
            await this.page.goto(siteConfig.baseUrl, { waitUntil: 'networkidle2' });
            const credits = await this.page.evaluate((selector) => {
                const el = document.querySelector(selector);
                return el ? el.innerText.trim() : "0";
            }, siteConfig.selectors.credit);
            Logger.info(siteConfig.name, `Créditos de seguidores: ${credits}`);
            return credits;
        } catch (error) {
            Logger.warning(siteConfig.name, "Não foi possível ler os créditos.");
            return "0";
        }
    }

    async sendFollowers(siteConfig, targetUsername, count) {
        try {
            Logger.info(siteConfig.name, `Acessando ferramenta de seguidores: ${siteConfig.sendFollowerUrl}`);
            await this.page.goto(siteConfig.sendFollowerUrl, { waitUntil: 'networkidle2' });

            Logger.info(siteConfig.name, `Inserindo usuário alvo: ${targetUsername}`);
            await this.page.waitForSelector(siteConfig.selectors.targetUsername, { timeout: 10000 });
            await this.page.type(siteConfig.selectors.targetUsername, targetUsername, { delay: 50 });

            const findButton = await this.page.evaluateHandle((text) => {
                const buttons = Array.from(document.querySelectorAll('button, input[type="submit"]'));
                return buttons.find(b => (b.innerText || b.value || "").toLowerCase().includes(text.toLowerCase()));
            }, siteConfig.findUserButtonText);

            if (findButton.asElement()) {
                await findButton.click();
            } else {
                await this.page.click('button[type="submit"]');
            }

            await new Promise(resolve => setTimeout(resolve, 5000)); // Aguardar carregar o perfil

            Logger.info(siteConfig.name, `Inserindo quantidade: ${count}`);
            await this.page.waitForSelector(siteConfig.selectors.followerCount, { timeout: 10000 });
            await this.page.focus(siteConfig.selectors.followerCount);
            await this.page.keyboard.down('Control');
            await this.page.keyboard.press('A');
            await this.page.keyboard.up('Control');
            await this.page.keyboard.press('Backspace');
            await this.page.type(siteConfig.selectors.followerCount, count.toString());

            const startButton = await this.page.evaluateHandle((texts) => {
                const buttons = Array.from(document.querySelectorAll('button, input[type="submit"]'));
                return buttons.find(b => texts.some(t => (b.innerText || b.value || "").toLowerCase().includes(t.toLowerCase())));
            }, siteConfig.startButtonText);

            if (startButton.asElement()) {
                await startButton.click();
                Logger.success(siteConfig.name, "Envio iniciado com sucesso!");
                await new Promise(resolve => setTimeout(resolve, 10000));
                return true;
            } else {
                Logger.error(siteConfig.name, "Botão de iniciar não encontrado.");
                return false;
            }
        } catch (error) {
            Logger.error(siteConfig.name, `Erro ao enviar seguidores: ${error.message}`);
            return false;
        }
    }

    async processSite(siteConfig, targetUsername, followerCount) {
        this.stats.total++;
        
        try {
            Logger.header(`PROCESSANDO SITE: ${siteConfig.name.toUpperCase()}`);
            
            const loginSuccess = await this.login(siteConfig);
            if (!loginSuccess) {
                this.stats.error++;
                return false;
            }

            await this.sendFollowers(siteConfig, targetUsername, followerCount);
            this.stats.success++;
            return true;

        } catch (error) {
            Logger.error(siteConfig.name, `Erro geral: ${error.message}`);
            this.stats.error++;
            return false;
        }
    }

    async runOneCycle(targetUsername, followerCount) {
        Logger.header(`AUTOMAÇÃO MULTI-SITE (${this.credentials.username}) INICIADA`);
        Logger.info("SISTEMA", `Usuário alvo: ${targetUsername}`);
        Logger.info("SISTEMA", `Seguidores por site: ${followerCount}`);
        Logger.info("SISTEMA", `Total de sites: ${this.sitesConfig.length}`);

        for (let i = 0; i < this.sitesConfig.length; i++) {
            const siteConfig = this.sitesConfig[i];
            await this.processSite(siteConfig, targetUsername, followerCount);

            if (i < this.sitesConfig.length - 1) {
                Logger.info("SISTEMA", "Aguardando 1 minuto antes do próximo site...");
                await new Promise(resolve => setTimeout(resolve, 60000));
            }
        }

        Logger.stats(this.stats);
        this.stats = { success: 0, error: 0, skipped: 0, total: 0 };
    }
}

// Configuração automática conforme solicitado
const automation = new MultiSiteAutomation("comeprimas0000151", "LUANLEVY17");
automation.initBrowser().then(() => automation.runOneCycle("comedor_di_primas", 50));

module.exports = MultiSiteAutomation;
