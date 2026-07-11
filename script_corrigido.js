const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const chalk = require("chalk");

// Configuração dos sites com seletores validados
const sitesConfig = [
    { 
        name: "birtakipci", 
        baseUrl: "https://birtakipci.com", 
        loginUrl: "https://birtakipci.com/member",       // ✅ /member
        sendFollowerUrl: "https://birtakipci.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"                             // login padrão
    },
    { 
        name: "takipcimax", 
        baseUrl: "https://takipcimax.com", 
        loginUrl: "https://takipcimax.com/login",         // ✅ /login
        sendFollowerUrl: "https://takipcimax.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipciking", 
        baseUrl: "https://takipciking.net", 
        loginUrl: "https://takipciking.net/login",        // ✅ /login
        sendFollowerUrl: "https://takipciking.net/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcizen", 
        baseUrl: "https://takipcizen.com", 
        loginUrl: "https://takipcizen.com/login",         // ✅ /login
        sendFollowerUrl: "https://takipcizen.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "hepsitakipci", 
        baseUrl: "https://hepsitakipci.com", 
        loginUrl: "https://hepsitakipci.com/member",      // ✅ /member (sem www)
        sendFollowerUrl: "https://hepsitakipci.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "instamoda", 
        baseUrl: "https://instamoda.org", 
        loginUrl: "https://instamoda.org/login",          // ✅ /login
        sendFollowerUrl: "https://instamoda.org/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "fastfollow", 
        baseUrl: "https://fastfollow.in", 
        loginUrl: "https://fastfollow.in/member",         // ✅ /member
        sendFollowerUrl: "https://fastfollow.in/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcikrali", 
        baseUrl: "https://takipcikrali.com", 
        loginUrl: "https://takipcikrali.com/login",       // ✅ /login
        sendFollowerUrl: "https://takipcikrali.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcitime", 
        baseUrl: "https://takipcitime.com", 
        loginUrl: "https://takipcitime.com/login",        // ✅ /login
        sendFollowerUrl: "https://takipcitime.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "medyahizmeti", 
        baseUrl: "https://medyahizmeti.com", 
        loginUrl: "https://medyahizmeti.com/member",      // ✅ /member
        sendFollowerUrl: "https://medyahizmeti.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    { 
        name: "takipcikutusu", 
        baseUrl: "https://takipcikutusu.com", 
        loginUrl: "https://takipcikutusu.com/member",     // ✅ /member
        sendFollowerUrl: "https://takipcikutusu.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',             // ✅ id="username"
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonId: "login_insta",                     // ✅ CORRIGIDO: botão com id="login_insta"
        loginButtonText: "Giriş yap",                     // ✅ CORRIGIDO: texto em turco
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "ajax"                                  // ✅ CORRIGIDO: usa AJAX (onsubmit="return false;")
    },
    {
        name: "takipcitime_net",
        baseUrl: "https://takipcitime.net",
        loginUrl: "https://takipcitime.net/login",        // ✅ /login (mesmo template do takipcitime.com)
        sendFollowerUrl: "https://takipcitime.net/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    {
        name: "followersize",
        baseUrl: "https://followersize.com",
        loginUrl: "https://followersize.com/member",      // ✅ /member (validado)
        sendFollowerUrl: "https://followersize.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    {
        name: "takipcivar",
        baseUrl: "https://takipcivar.net",
        loginUrl: "https://takipcivar.net/0a7165fd2e8df1041509358a779e5f325edd4d19", // ✅ URL hash longa
        sendFollowerUrl: "https://takipcivar.net/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
        startButtonText: ["Takibi Başlat", "Gönderimi Başlat", "Start"],
        loginType: "standard"
    },
    {
        name: "takipcibase",
        baseUrl: "https://takipcibase.com",
        loginUrl: "https://takipcibase.com/login",        // ✅ /login
        sendFollowerUrl: "https://takipcibase.com/tools/send-follower",
        selectors: {
            username: 'input[id="username"]',
            password: 'input[type="password"]',
            credit: 'a[href*="follower"] span',
            targetUsername: 'input[name="username"]',
            followerCount: 'input[name="adet"]'
        },
        loginButtonText: "Login",
        findUserButtonText: "Find User",
        startButtonId: "formTakipSubmitButton",           // ✅ ID direto do botão
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
        try {
            Logger.info(siteConfig.name, "Iniciando processo de login...");

            Logger.info(siteConfig.name, `Navegando para: ${siteConfig.loginUrl}`);
            await this.page.goto(siteConfig.loginUrl, { waitUntil: "networkidle2", timeout: 30000 });
            Logger.success(siteConfig.name, "Página de login carregada");

            // Extrair antiForgeryToken se presente
            let antiForgeryToken = "";
            const antiForgeryElement = await this.page.$("input[name=\"antiForgeryToken\"]");
            if (antiForgeryElement) {
                antiForgeryToken = await antiForgeryElement.evaluate(el => el.value);
                Logger.info(siteConfig.name, `antiForgeryToken encontrado: ${antiForgeryToken}`);
            }

            await this.page.waitForSelector(siteConfig.selectors.username, { timeout: 10000 });
            await this.page.type(siteConfig.selectors.username, this.credentials.username);
            await this.page.type(siteConfig.selectors.password, this.credentials.password);

            Logger.info(siteConfig.name, "Credenciais preenchidas, submetendo formulário...");

            // ✅ CORRIGIDO: Tratamento especial para sites com login AJAX (ex: takipcikutusu)
            if (siteConfig.loginType === "ajax") {
                // Clicar no botão pelo ID específico e aguardar resposta AJAX
                const btnId = siteConfig.loginButtonId || "login_insta";
                await this.page.waitForSelector(`#${btnId}`, { timeout: 10000 });
                await this.page.click(`#${btnId}`);
                
                // Aguardar navegação ou timeout (AJAX pode redirecionar)
                try {
                    await this.page.waitForNavigation({ waitUntil: "networkidle2", timeout: 45000 });
                } catch (e) {
                    // Se não houve navegação, aguardar um pouco e verificar URL
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            } else {
                // Login padrão: submeter formulário
                const form = await this.page.$("form");
                if (form) {
                    await Promise.all([
                        this.page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 }).catch(() => {}),
                        form.evaluate(form => form.submit())
                    ]);
                } else {
                    // ✅ CORRIGIDO: Tentar pelo ID do botão primeiro, depois pelo texto
                    let loginButton = null;
                    
                    if (siteConfig.loginButtonId) {
                        loginButton = await this.page.$(`#${siteConfig.loginButtonId}`);
                    }
                    
                    if (!loginButton) {
                        loginButton = await this.page.evaluateHandle((buttonText) => {
                            const buttons = Array.from(document.querySelectorAll("button"));
                            return buttons.find(button => button.textContent.trim().includes(buttonText));
                        }, siteConfig.loginButtonText);
                    }

                    if (!loginButton) {
                        throw new Error("Botão de login ou formulário não encontrado.");
                    }

                    await Promise.all([
                        this.page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 }).catch(() => {}),
                        loginButton.click()
                    ]);
                }
            }

            // ✅ CORRIGIDO: Verificar se o login foi bem-sucedido checando a URL atual
            const currentUrl = this.page.url();
            if (currentUrl.includes("/tools") || currentUrl.includes("/dashboard") || currentUrl.includes("/panel")) {
                Logger.success(siteConfig.name, "Login realizado com sucesso!");
                return true;
            } else if (currentUrl.includes("/login") || currentUrl.includes("/member")) {
                Logger.error(siteConfig.name, "Login falhou - ainda na página de login");
                return false;
            } else {
                Logger.success(siteConfig.name, "Login realizado com sucesso!");
                return true;
            }

        } catch (error) {
            Logger.error(siteConfig.name, `Erro durante o login: ${error.message}`);
            return false;
        }
    }

   async getFollowerCredits(siteConfig) {
        try {
            Logger.info(siteConfig.name, `Navegando para: ${siteConfig.sendFollowerUrl}`);
            await this.page.goto(siteConfig.sendFollowerUrl, { waitUntil: "networkidle2", timeout: 30000 });
            Logger.success(siteConfig.name, "Página de envio de seguidores carregada");
            
            try {
                await this.page.waitForSelector(siteConfig.selectors.credit, { timeout: 10000 });
                const credits = await this.page.$eval(siteConfig.selectors.credit, el => parseInt(el.textContent.trim(), 10));
                Logger.info(siteConfig.name, `Créditos disponíveis: ${credits}`);
                return credits;
            } catch (error) {
                // Tentar seletores alternativos para créditos
                const alternativeSelectors = [
                    '.balance',
                    '.credit',
                    '.credits',
                    '[class*="credit"]',
                    '[class*="balance"]',
                    '[id*="credit"]',
                    '[id*="balance"]',
                    '.user-balance',
                    '.user-credit'
                ];
                
                for (const selector of alternativeSelectors) {
                    try {
                        await this.page.waitForSelector(selector, { timeout: 2000 });
                        const credits = await this.page.$eval(selector, el => parseInt(el.textContent.trim(), 10));
                        if (!isNaN(credits)) {
                            Logger.info(siteConfig.name, `Créditos disponíveis: ${credits}`);
                            return credits;
                        }
                    } catch (e) {
                        continue;
                    }
                }
                
                Logger.warning(siteConfig.name, "Créditos não encontrados, assumindo 0");
                return 0;
            }
        } catch (error) {
            Logger.error(siteConfig.name, `Erro ao obter créditos: ${error.message}`);
            return 0;
        }
    }

    async sendFollowers(siteConfig, targetUsername, followerCount = 500) {
        try {
            Logger.info(siteConfig.name, `Iniciando envio de ${followerCount} seguidores para ${targetUsername}...`);
            
            await this.page.goto(siteConfig.sendFollowerUrl, { waitUntil: "networkidle2", timeout: 30000 });
            Logger.success(siteConfig.name, "Página de envio carregada");

            // Aguardar e preencher o campo de usuário alvo
            await this.page.waitForSelector(siteConfig.selectors.targetUsername, { timeout: 10000 });
            await this.page.type(siteConfig.selectors.targetUsername, targetUsername);

            Logger.info(siteConfig.name, `Procurando usuário: ${targetUsername}`);
            
            // ✅ CORRIGIDO: Encontrar o botão "Find User" com busca mais robusta
            const findUserButton = await this.page.evaluateHandle((buttonText) => {
                const buttons = Array.from(document.querySelectorAll("button"));
                return buttons.find(button => button.textContent.trim().includes(buttonText));
            }, siteConfig.findUserButtonText);

            if (findUserButton) {
                await Promise.all([
                    this.page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 }).catch(() => {}),
                    findUserButton.click()
                ]);
                Logger.success(siteConfig.name, "Usuário encontrado");
            } else {
                throw new Error("Botão Find User não encontrado");
            }

            // Preencher quantidade de seguidores
            // ✅ CORRIGIDO: Aguardar a página recarregar após Find User antes de buscar o campo adet
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            try {
                await this.page.waitForSelector(siteConfig.selectors.followerCount, { timeout: 10000 });
                await this.page.evaluate((count, selector) => {
                    const input = document.querySelector(selector);
                    if (input) {
                        input.value = '';
                        input.value = count.toString();
                    }
                }, followerCount, siteConfig.selectors.followerCount);
            } catch (error) {
                // Tentar seletores alternativos para o campo de quantidade
                const alternativeSelectors = [
                    'input[type="number"]',
                    'input[name*="count"]',
                    'input[name*="amount"]',
                    'input[placeholder*="50"]',
                    'input[placeholder*="100"]',
                    'input[placeholder*="25"]'
                ];
                
                let found = false;
                for (const selector of alternativeSelectors) {
                    try {
                        await this.page.waitForSelector(selector, { timeout: 2000 });
                        await this.page.evaluate((count, sel) => {
                            const input = document.querySelector(sel);
                            if (input) {
                                input.value = '';
                                input.value = count.toString();
                            }
                        }, followerCount, selector);
                        found = true;
                        break;
                    } catch (e) {
                        continue;
                    }
                }
                
                if (!found) {
                    Logger.warning(siteConfig.name, "Campo de quantidade não encontrado, continuando sem definir quantidade específica");
                }
            }

            Logger.info(siteConfig.name, `Quantidade definida: ${followerCount} seguidores`);

            // ✅ CORRIGIDO: Encontrar botão Start pelo ID direto primeiro, depois pelo texto
            let startButton = null;
            
            if (siteConfig.startButtonId) {
                try {
                    await this.page.waitForSelector(`#${siteConfig.startButtonId}`, { timeout: 5000 });
                    startButton = await this.page.$(`#${siteConfig.startButtonId}`);
                } catch (e) {
                    // ID não encontrado, tentar pelo texto
                }
            }
            
            if (!startButton) {
                startButton = await this.page.evaluateHandle((buttonTexts) => {
                    const buttons = Array.from(document.querySelectorAll("button"));
                    return buttons.find(button => 
                        buttonTexts.some(text => button.textContent.trim().includes(text))
                    );
                }, siteConfig.startButtonText);
            }

            if (startButton) {
                await startButton.click();
                Logger.success(siteConfig.name, `Processo de envio iniciado! ${followerCount} seguidores enviados para ${targetUsername}`);
                return true;
            } else {
                throw new Error("Botão de início não encontrado");
            }

        } catch (error) {
            Logger.error(siteConfig.name, `Erro durante envio de seguidores: ${error.message}`);
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

            const credits = await this.getFollowerCredits(siteConfig);

            const sendSuccess = await this.sendFollowers(siteConfig, targetUsername, followerCount);
            if (sendSuccess) {
                this.stats.success++;
                return true;
            } else {
                this.stats.error++;
                return false;
            }

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

            // Aguardar 1 minuto (60 segundos) entre sites, exceto após o último
            if (i < this.sitesConfig.length - 1) {
                Logger.info("SISTEMA", "Aguardando 1 minuto antes do próximo site...");
                await new Promise(resolve => setTimeout(resolve, 60000));
            }
        }

        // Mostrar estatísticas depois de terminar os sites
        Logger.stats(this.stats);

        // Resetar estatísticas para o próximo ciclo
        this.stats = { success: 0, error: 0, skipped: 0, total: 0 };
    }
}

module.exports = MultiSiteAutomation;
