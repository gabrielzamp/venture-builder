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

console.log(dadosAnuncios);
