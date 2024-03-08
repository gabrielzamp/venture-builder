const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Habilitar interceptação de requisição para bloquear tipos de recursos indesejados
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    // Lista de tipos de recursos que desejamos bloquear para melhorar a performance
    const blockedResourceTypes = ["image", "stylesheet", "font", "script"];

    if (blockedResourceTypes.includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    // Navega até a URL desejada
    await page.goto(
      "https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/estado-sc/florianopolis-e-regiao?cf=1&me=80000&ms=5000&rs=63",
      { waitUntil: "networkidle2" }
    );

    // Coleta os dados dos anúncios na página
    const dadosAnuncios = await page.evaluate(() => {
      const anuncios = [];
      const elementosAnuncio = document.querySelectorAll(
        ".olx-ad-card.olx-ad-card--horizontal"
      );

      elementosAnuncio.forEach((anuncio) => {
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

        // Extrair somente os números para quilometragem e preço
        const quilometragemNumeros = quilometragemTexto.replace(/\D/g, "");
        const precoNumeros = precoTexto.replace(/\D/g, "");

        anuncios.push({
          link:
            anuncio.querySelector(".olx-ad-card__title-link")?.href || "N/A",
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
        });
      });

      return anuncios;
    });

    // Navegar até o link de cada anúncio para coletar informações adicionais
    for (let anuncio of dadosAnuncios) {
      if (anuncio.link !== "N/A") {
        try {
          await page.goto(anuncio.link, { waitUntil: "networkidle2" });
          const category = await page.evaluate(() => {
            const elem = document.querySelector(
              ".olx-link.olx-link--medium.olx-link--main"
            );
            return elem ? elem.textContent.trim() : "N/A";
          });
          anuncio.category = category;
        } catch (error) {
          console.error(`Erro ao acessar ${anuncio.link}: ${error}`);
          anuncio.category = "Erro na navegação";
        }
      } else {
        anuncio.category = "N/A";
      }
    }

    console.log(dadosAnuncios);
  } catch (error) {
    console.error(`Erro durante a navegação: ${error}`);
  }

  await browser.close();
})();
