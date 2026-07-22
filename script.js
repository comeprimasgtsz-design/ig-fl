const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const chalk = require("chalk");

// Configuração dos 15 sites com seletores validados
const sitesConfig = [
    { 
        name: "birtakipci", 
        baseUrl: "https://birtakipci.com", 
        loginUrl: "https://birtakipci.com/member",
        sendFollowerUrl: "https://birtakipci.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcimax", 
        baseUrl: "https://takipcimax.com", 
        loginUrl: "https://takipcimax.com/login",
        sendFollowerUrl: "https://takipcimax.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipciking", 
        baseUrl: "https://takipciking.net", 
        loginUrl: "https://takipciking.net/login",
        sendFollowerUrl: "https://takipciking.net/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcizen", 
        baseUrl: "https://takipcizen.com", 
        loginUrl: "https://takipcizen.com/login",
        sendFollowerUrl: "https://takipcizen.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "hepsitakipci", 
        baseUrl: "https://hepsitakipci.com", 
        loginUrl: "https://hepsitakipci.com/member",
        sendFollowerUrl: "https://hepsitakipci.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "instamoda", 
        baseUrl: "https://instamoda.org", 
        loginUrl: "https://instamoda.org/login",
        sendFollowerUrl: "https://instamoda.org/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "fastfollow", 
        baseUrl: "https://fastfollow.in", 
        loginUrl: "https://fastfollow.in/member",
        sendFollowerUrl: "https://fastfollow.in/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcikrali", 
        baseUrl: "https://takipcikrali.com", 
        loginUrl: "https://takipcikrali.com/login",
        sendFollowerUrl: "https://takipcikrali.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcitime", 
        baseUrl: "https://takipcitime.com", 
        loginUrl: "https://takipcitime.com/login",
        sendFollowerUrl: "https://takipcitime.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "medyahizmeti", 
        baseUrl: "https://medyahizmeti.com", 
        loginUrl: "https://medyahizmeti.com/member",
        sendFollowerUrl: "https://medyahizmeti.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcikutusu", 
        baseUrl: "https://takipcikutusu.com", 
        loginUrl: "https://takipcikutusu.com/member",
        sendFollowerUrl: "https://takipcikutusu.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonId: "login_insta",
        loginButtonText: "Giriş yap",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "ajax"
    },
    {
        name: "takipcitime_net",
        baseUrl: "https://takipcitime.net",
        loginUrl: "https://takipcitime.net/login",
        sendFollowerUrl: "https://takipcitime.net/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    {
        name: "followersize",
        baseUrl: "https://followersize.com",
        loginUrl: "https://followersize.com/member",
        sendFollowerUrl: "https://followersize.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    {
        name: "takipcivar",
        baseUrl: "https://takipcivar.net",
        loginUrl: "https://takipcivar.net/0a7165fd2e8df1041509358a779e5f325edd4d19",
        sendFollowerUrl: "https://takipcivar.net/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    {
        name: "takipcibase",
        baseUrl: "https://takipcibase.com",
        loginUrl: "https://takipcibase.com/login",
        sendFollowerUrl: "https://takipcibase.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "FİND USER",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
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
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ],
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            };
        } else {
            browserOptions = {
                headless: "new",
                executablePath: await chromium.executablePath(),
                args: [
                    ...chromium.args,
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ]
            };
        }

        this.browser = await puppeteer.launch({
            ...browserOptions,
            protocolTimeout: 120000
        });
        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1366, height: 768 });
        
        this.page.setDefaultTimeout(60000);
        this.page.setDefaultNavigationTimeout(0);
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async login(siteConfig) {
        try {
            Logger.info(siteConfig.name, "Iniciando processo de login...");

            Logger.info(siteConfig.name, `Navegando para: ${siteConfig.loginUrl}`);
            await this.page.goto(siteConfig.loginUrl, { waitUntil: "networkidle2" });
            Logger.success(siteConfig.name, "Página de login carregada");

            await this.page.waitForSelector(siteConfig.selectors.username, { visible: true, timeout: 15000 });
            
            await this.page.type(siteConfig.selectors.username, this.credentials.username, { delay: 50 });
            await this.page.type(siteConfig.selectors.password, this.credentials.password, { delay: 50 });

            Logger.info(siteConfig.name, "Credenciais preenchidas, submetendo formulário...");
            
            if (siteConfig.loginType === "ajax" || siteConfig.loginButtonId) {
                const btnId = siteConfig.loginButtonId || "login_insta";
                await this.page.click(`#${btnId}`);
            } else {
                const form = await this.page.$("form");
                if (form) {
                    await Promise.all([
                        this.page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
                        form.evaluate(f => f.submit())
                    ]);
                } else {
                    const loginButton = await this.page.evaluateHandle((text) => {
                        return Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes(text));
                    }, siteConfig.loginButtonText);

                    if (loginButton && loginButton.asElement()) {
                        await Promise.all([
                            this.page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
                            loginButton.asElement().click()
                        ]);
                    } else {
                        await this.page.keyboard.press('Enter');
                        await this.page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {});
                    }
                }
            }

            await new Promise(resolve => setTimeout(resolve, 8000));

            Logger.info(siteConfig.name, "Tentando acessar página de envio após login...");
            await this.page.goto(siteConfig.sendFollowerUrl, { waitUntil: "networkidle2", timeout: 30000 }).catch(() => {});
            
            const content = await this.page.content();
            if (content.includes("login") && !content.includes("username")) {
                 Logger.error(siteConfig.name, "Login não persistiu ou caiu em verificação.");
                 return false;
            }

            Logger.success(siteConfig.name, "Login e acesso à ferramenta confirmados!");
            return true;

        } catch (error) {
            Logger.error(siteConfig.name, `Erro durante o login: ${error.message}`);
            return false;
        }
    }

    async sendFollowers(siteConfig, targetUsername, followerCount = 500) {
        try {
            Logger.info(siteConfig.name, `Navegando para envio: ${siteConfig.sendFollowerUrl}`);
            await this.page.goto(siteConfig.sendFollowerUrl, { waitUntil: "networkidle2" });

            await this.page.waitForSelector(siteConfig.selectors.targetUsername, { visible: true, timeout: 15000 });
            await this.page.type(siteConfig.selectors.targetUsername, targetUsername, { delay: 50 });

            Logger.info(siteConfig.name, `Buscando usuário: ${targetUsername}`);
            
            const findUserBtn = await this.page.evaluateHandle((text) => {
                const buttons = Array.from(document.querySelectorAll("button"));
                return buttons.find(b => b.textContent.toUpperCase().includes(text.toUpperCase()));
            }, siteConfig.findUserButtonText);

            if (findUserBtn && findUserBtn.asElement()) {
                await Promise.all([
                    this.page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
                    findUserBtn.asElement().click()
                ]);
            } else {
                await this.page.keyboard.press('Enter');
                await this.page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {});
            }

            await this.page.waitForSelector(siteConfig.selectors.followerCount, { visible: true, timeout: 15000 });
            await this.page.evaluate((sel, count) => {
                const input = document.querySelector(sel);
                if (input) {
                    input.value = '';
                    input.value = count.toString();
                }
            }, siteConfig.selectors.followerCount, followerCount);

            Logger.info(siteConfig.name, `Iniciando envio de ${followerCount} seguidores...`);

            let startClicked = false;
            if (siteConfig.startButtonId) {
                const startBtn = await this.page.$(`#${siteConfig.startButtonId}`);
                if (startBtn) {
                    await startBtn.click();
                    startClicked = true;
                }
            }

            if (!startClicked) {
                const startBtnText = await this.page.evaluateHandle((texts) => {
                    const buttons = Array.from(document.querySelectorAll("button"));
                    return buttons.find(b => texts.some(t => b.textContent.toUpperCase().includes(t.toUpperCase())));
                }, siteConfig.startButtonText);

                if (startBtnText && startBtnText.asElement()) {
                    await startBtnText.asElement().click();
                    startClicked = true;
                }
            }

            if (startClicked) {
                Logger.success(siteConfig.name, "Envio iniciado com sucesso!");
                await new Promise(resolve => setTimeout(resolve, 15000)).catch(() => {});
                return true;
            } else {
                throw new Error("Não foi possível encontrar o botão de início de envio.");
            }

        } catch (error) {
            Logger.error(siteConfig.name, `Erro durante envio de seguidores: ${error.message}`);
            return false;
        }
    }

    async processSite(siteConfig, targetUsername, followerCount) {
        this.stats.total++;
        try {
            Logger.header(`SITE: ${siteConfig.name.toUpperCase()}`);
            const logged = await this.login(siteConfig);
            if (!logged) { this.stats.error++; return false; }
            
            const sent = await this.sendFollowers(siteConfig, targetUsername, followerCount);
            if (sent) { this.stats.success++; return true; }
            else { this.stats.error++; return false; }
        } catch (e) {
            this.stats.error++;
            return false;
        }
    }

    async runOneCycle(targetUsername, followerCount) {
        await this.initBrowser();
        for (const site of this.sitesConfig) {
            await this.processSite(site, targetUsername, followerCount);
            await new Promise(r => setTimeout(r, 5000));
        }
        Logger.stats(this.stats);
        await this.closeBrowser();
    }
}

module.exports = MultiSiteAutomation;
