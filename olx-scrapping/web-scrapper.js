const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navega até a URL onde os dados dos anúncios serão coletados
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

      const quilometragemNumeros = quilometragemTexto.replace(/\D/g, "");
      const precoNumeros = precoTexto.replace(/\D/g, "");

      anuncios.push({
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
      });
    });

    return anuncios;
  });

  // Navegar até o link de cada anúncio para coletar informações adicionais
  for (let anuncio of dadosAnuncios) {
    if (anuncio.link !== "N/A") {
      await page.goto(anuncio.link, { waitUntil: "networkidle2" });
      const category = await page.evaluate(() => {
        const elem = document.querySelector(
          ".olx-link.olx-link--medium.olx-link--main"
        );
        return elem ? elem.textContent.trim() : "N/A";
      });
      anuncio.category = category;
    } else {
      anuncio.category = "N/A";
    }
  }

  console.log(dadosAnuncios);

  await browser.close();
})();
