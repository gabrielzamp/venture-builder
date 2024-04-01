import puppeteer from "puppeteer";

export default async function startApplication() {
    
    const browser = await puppeteer.launch({ headless: false }); // Configuração para visualização
    const page = await browser.newPage();

    // Define a visualização para simular desktop
    await page.setViewport({
        width: 1280,
        height: 800,
    });

    // Navega para a página desejada
    await page.goto(
        "https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/estado-sc/florianopolis-e-regiao?cf=1&me=80000&ms=5000&rs=63",
        { waitUntil: "networkidle2" }
    );
    
    const listButton = await page.$('button[aria-label*="Ativar visualização em lista"]');
    console.log(listButton);
    await listButton.click();


    // Espera pelo seletor dos anúncios para garantir que eles foram carregados
    await page.waitForSelector(".olx-ad-card.olx-ad-card--horizontal", {
        visible: true,
        timeout: 60000, // Aumenta o tempo limite para 60 segundos
    });

    // Coleta os dados dos anúncios na página utilizando as regras fornecidas
    const dadosAnuncios = await page.evaluate(() => {
        const elementosAnuncio = document.querySelectorAll(
        ".olx-ad-card.olx-ad-card--horizontal"
        );
        const dadosAnuncios = Array.from(elementosAnuncio).map((anuncio) => {
        const quilometragemTexto =
            anuncio
            .querySelector(".olx-ad-card__labels-item span svg")
            ?.parentNode.textContent.trim() || "N/A";
        const precoTexto =
            anuncio
            .querySelector(
                ".olx-text.olx-text--body-large.olx-text--block.olx-text--semibold.olx-ad-card__price"
            )
            ?.textContent.trim() || "N/A";

        const quilometragemNumeros = quilometragemTexto.replace(/\D/g, "");
        const precoNumeros = precoTexto.replace(/\D/g, "");

        return {
            link: anuncio.querySelector(".olx-ad-card__title-link")?.href || "N/A",
            tituloCompleto:
            anuncio
                .querySelector(
                ".olx-text.olx-text--title-small.olx-text--block.olx-ad-card__title.olx-ad-card__title--horizontal"
                )
                ?.textContent.trim() || "",
            quilometragem: quilometragemNumeros,
            localizacaoEData:
            anuncio
                .querySelector(".olx-ad-card__location-date-container")
                ?.textContent.trim() || "",
            preco: precoNumeros,
        };
        });

        return dadosAnuncios;
    });

    // Log dos resultados coletados
    console.log(dadosAnuncios);

    // Fechar o navegador
    await browser.close();
}