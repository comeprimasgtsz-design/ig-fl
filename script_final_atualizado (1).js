const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const chalk = require("chalk");

// Configuração dos sites com seletores validados
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
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    // Site 'takipcimax' foi pulado devido à solicitação de código de verificação por e-mail.
    // { 
    //     name: "takipcimax", 
    //     baseUrl: "https://takipcimax.com", 
    //     loginUrl: "https://takipcimax.com/login", 
    //     sendFollowerUrl: "https://takipcimax.com/tools/send-follower",
    //     selectors: {
    //         username: 'input[id="username"]',
    //         password: 'input[type="password"]
    //         credit: 'a[href*="follower"] span',
    //         targetUsername: 'input[name="username"]
    //         followerCount: 'input[name="count"]
    //     },
    //     loginButtonText: "Login",
    //     findUserButtonText: "Find User",
    //     startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    // },
    {
        name: "takipciking",
        baseUrl: "https://takipciking.net",
        loginUrl: "https://takipciking.net/login",
        sendFollowerUrl: "https://takipciking.net/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
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
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
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
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
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
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
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
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    {
        name: "takipcikrali",
        baseUrl: "https://takipcikrali.com",
        loginUrl: "https://takipcikrali.com/member",
        sendFollowerUrl: "https://takipcikrali.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    },
    {
        name: "takipcitime",
        baseUrl: "https://takipcitime.com",
        loginUrl: "https://takipcitime.com/member",
        sendFollowerUrl: "https://takipcitime.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
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
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
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
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[placeholder="fatihh"]',
            followerCount: 'input[placeholder="50"]',
        },
        loginButtonText: "Giriş yap", // Atualizado para o texto correto
        findUserButtonText: "Giriş yap", // Atualizado para o texto correto
        startButtonText: ["Giriş yap", "Gönderimi Başlat", "Start"] // Atualizado para o texto correto
    }
    // Site 'takipcim.com.tr' foi removido devido à página de login retornar erro 404.
    // { 
    //     name: "takipcim", 
    //     baseUrl: "https://takipcim.com.tr", 
    //     loginUrl: "https://takipcim.com.tr/login", 
    //     sendFollowerUrl: "https://takipcim.com.tr/tools/send-follower",
    //     selectors: {
    //         username: 'input[id="username"]',
    //         password: 'input[type="password"]
    //         credit: 'a[href*="follower"] span',
    //         targetUsername: 'input[name="username"]
    //         followerCount: 'input[name="count"]
    //     },
    //     loginButtonText: "Login",
    //     findUserButtonText: "Find User",
    //     startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"]
    // }
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
                    '--no-zygote',
                    '--disable-gl-drawing-for-tests',
                    '--enable-webgl-image-chromium',
                    '--single-process',
                    '--hide-scrollbars',
                    '--mute-audio',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list',
                    '--enable-features=NetworkService,NetworkServiceInProcess',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--disk-cache-size=33553333',
                    '--media-cache-size=33553333',
                    '--aggressive-cache-discard',
                    '--disable-cache',
                    '--disable-application-cache',
                    '--disable-offline-load-stale-cache',
                    '--disable-gpu-shader-disk-cache',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--disable-gpu',
                    '--no-zygote',
                    '--disable-gl-drawing-for-tests',
                    '--enable-webgl-image-chromium',
                    '--single-process',
                    '--hide-scrollbars',
                    '--mute-audio',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list',
                    '--enable-features=NetworkService,NetworkServiceInProcess',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--disk-cache-size=33553333',
                    '--media-cache-size=33553333',
                    '--aggressive-cache-discard',
                    '--disable-cache',
                    '--disable-application-cache',
                    '--disable-offline-load-stale-cache',
                    '--disable-gpu-shader-disk-cache'
                ],
                executablePath: await chromium.executablePath,
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            };
        } else {
            browserOptions = {
                headless: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-notifications',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-zygote',
                    '--disable-gl-drawing-for-tests',
                    '--enable-webgl-image-chromium',
                    '--single-process',
                    '--hide-scrollbars',
                    '--mute-audio',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list',
                    '--enable-features=NetworkService,NetworkServiceInProcess',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--disk-cache-size=33553333',
                    '--media-cache-size=33553333',
                    '--aggressive-cache-discard',
                    '--disable-cache',
                    '--disable-application-cache',
                    '--disable-offline-load-stale-cache',
                    '--disable-gpu-shader-disk-cache'
                ]
            };
        }

        this.browser = await puppeteer.launch(browserOptions);
        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1366, height: 768 });
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async login(siteConfig) {
        Logger.info(siteConfig.name, `Navegando para a página de login: ${siteConfig.loginUrl}`);
        await this.page.goto(siteConfig.loginUrl, { waitUntil: 'networkidle2' });

        Logger.info(siteConfig.name, `Preenchendo credenciais para ${this.credentials.username}`);
        await this.page.type(siteConfig.selectors.username, this.credentials.username, { delay: 50 });
        await this.page.type(siteConfig.selectors.password, this.credentials.password, { delay: 50 });

        Logger.info(siteConfig.name, `Clicando no botão de login: ${siteConfig.loginButtonText}`);
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
            this.page.click(siteConfig.loginButtonText.includes('Login') || siteConfig.loginButtonText.includes('Giriş yap') ? 'button[type="submit"]' : `button:contains("${siteConfig.loginButtonText}")`)
        ]);

        const currentUrl = this.page.url();
        if (currentUrl.includes('tools') || currentUrl.includes('send-follower')) {
            Logger.success(siteConfig.name, 'Login bem-sucedido!');
            return true;
        } else {
            Logger.error(siteConfig.name, 'Falha no login ou redirecionamento inesperado.');
            return false;
        }
    }

    async sendFollowers(siteConfig, targetUsername) {
        Logger.info(siteConfig.name, `Navegando para a página de envio de seguidores: ${siteConfig.sendFollowerUrl}`);
        await this.page.goto(siteConfig.sendFollowerUrl, { waitUntil: 'networkidle2' });

        Logger.info(siteConfig.name, `Inserindo nome de usuário alvo: ${targetUsername}`);
        await this.page.type(siteConfig.selectors.targetUsername, targetUsername, { delay: 50 });

        Logger.info(siteConfig.name, `Clicando no botão de encontrar usuário: ${siteConfig.findUserButtonText}`);
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
            this.page.click(siteConfig.findUserButtonText.includes('Find User') || siteConfig.findUserButtonText.includes('FİND USER') ? 'button[type="submit"]' : `button:contains("${siteConfig.findUserButtonText}")`)
        ]);

        // Verificar se há créditos disponíveis (exemplo, pode variar por site)
        const creditText = await this.page.$eval(siteConfig.selectors.credit, el => el.textContent);
        const availableCredits = parseInt(creditText.match(/\d+/)[0]);
        Logger.info(siteConfig.name, `Créditos disponíveis: ${availableCredits}`);

        if (availableCredits > 0) {
            const followersToSend = Math.min(availableCredits, 50); // Enviar no máximo 50 ou o que tiver de crédito
            Logger.info(siteConfig.name, `Enviando ${followersToSend} seguidores.`);
            await this.page.type(siteConfig.selectors.followerCount, followersToSend.toString(), { delay: 50 });

            Logger.info(siteConfig.name, `Clicando no botão de iniciar envio: ${siteConfig.startButtonText[0]}`);
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
                this.page.click(siteConfig.startButtonText[0].includes('Start') || siteConfig.startButtonText[0].includes('Başlat') ? 'button[type="submit"]' : `button:contains("${siteConfig.startButtonText[0]}")`)
            ]);
            Logger.success(siteConfig.name, `Envio de ${followersToSend} seguidores iniciado com sucesso!`);
            return true;
        } else {
            Logger.warning(siteConfig.name, 'Sem créditos de seguidores disponíveis para envio.');
            return false;
        }
    }

    async processSite(siteConfig, targetUsername) {
        this.stats.total++;
        Logger.header(`Processando site: ${siteConfig.name}`);
        try {
            if (await this.login(siteConfig)) {
                if (await this.sendFollowers(siteConfig, targetUsername)) {
                    this.stats.success++;
                } else {
                    this.stats.skipped++;
                }
            } else {
                this.stats.error++;
            }
        } catch (error) {
            Logger.error(siteConfig.name, `Erro durante o processamento: ${error.message}`);
            this.stats.error++;
        }
    }

    async run(targetUsername) {
        await this.initBrowser();
        for (const siteConfig of this.sitesConfig) {
            await this.processSite(siteConfig, targetUsername);
        }
        await this.closeBrowser();
        Logger.stats(this.stats);
    }
}

// Exemplo de uso
// const automation = new MultiSiteAutomation("seu_usuario", "sua_senha");
// automation.run("usuario_alvo");
