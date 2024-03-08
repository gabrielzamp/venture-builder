// https://flippa.com/search?search_template=most_relevant&filter%5Bage%5D%5Bmax%5D=60&sort_alias=highest_price&page%5Bsize%5D=1000&filter%5Bsale_method%5D=auction,classified&filter%5Bstatus%5D=won&filter%5Bproperty_type%5D=website&filter%5Bsitetype%5D=blog,directory,review&filter%5Brevenue_generating%5D=T,F

var items = document.querySelectorAll("div[id^=listing].listing-card");

var result = [];

items.forEach((item) => {
  var companyName = item.querySelector("a.card-title").innerText;
  var linkId = item.querySelector("a.card-title").getAttribute("href");
  var description = item.querySelector("p.card-text").innerText;
  
  // Extrair preço e moeda
  var priceText = item.querySelector("h5.m-0.ng-binding").innerText;
  var price = priceText.replace(/[^\d.-]/g, '');
  var priceCurrency = priceText.substring(0, 3);
  
  var country = item.querySelector("span.text-nowrap.text-dark-gray.ng-binding.ng-scope").innerText;
  
  var type = item.querySelector("div.pr-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  var industry = item.querySelector("div.d-none.d-xl-block.px-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  var monetizationType = item.querySelector("div.pl-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  var siteAge = item.querySelector("div.d-inline-flex.justify-content-start.mt-2 > div.pr-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  
  // Extrair lucro líquido mensal e moeda
  var monthlyNetProfitText = item.querySelector("div.d-inline-flex.justify-content-start.mt-2 > div.pl-3 > div.font-weight-bold.text-truncate").innerText;
  var monthlyNetProfit = monthlyNetProfitText.replace(/[^\d.-]/g, '');
  var monthlyNetProfitCurrency = monthlyNetProfitText.substring(0, 3);

  // Removido para simplificação
  // var profitMultiplier = item.querySelector("div.d-lg-none.d-xl-flex.badge.p-0.float-right.text-neutral-gray.ng-scope > span.border-right-0").innerText;
  // var revenueMultiplier = item.querySelector("div.d-lg-none.d-xl-flex.badge.p-0.float-right.text-neutral-gray.ng-scope > span.border-right-pill").innerText;

  result.push({
    companyName,
    linkId,
    description,
    price,
    priceCurrency,
    country,
    type,
    industry,
    monetizationType,
    siteAge,
    monthlyNetProfit,
    monthlyNetProfitCurrency,
    // profitMultiplier,
    // revenueMultiplier,
  });
});

console.log(result);

bugsnag-3.min.js:1 (471) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
undefined
var items = document.querySelectorAll("div[id^=listing].listing-card");

var result = [];

items.forEach((item) => {
  var companyName = item.querySelector("a.card-title").innerText;
  var linkId = item.querySelector("a.card-title").getAttribute("href");
  var description = item.querySelector("p.card-text").innerText;
  
  // Extrair preço e moeda
  var priceText = item.querySelector("h5.m-0.ng-binding").innerText;
  var price = priceText.replace(/[^\d.-]/g, '');
  var priceCurrency = priceText.substring(0, 3);
  
  var country = item.querySelector("span.text-nowrap.text-dark-gray.ng-binding.ng-scope").innerText;
  
  var type = item.querySelector("div.pr-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  var industry = item.querySelector("div.d-none.d-xl-block.px-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  var monetizationType = item.querySelector("div.pl-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  var siteAge = item.querySelector("div.d-inline-flex.justify-content-start.mt-2 > div.pr-3 > div.font-weight-bold.text-truncate.ng-binding").innerText;
  
  // Extrair lucro líquido mensal e moeda
  var monthlyNetProfitText = item.querySelector("div.d-inline-flex.justify-content-start.mt-2 > div.pl-3 > div.font-weight-bold.text-truncate").innerText;
  var monthlyNetProfit = monthlyNetProfitText.replace(/[^\d.-]/g, '');
  var monthlyNetProfitCurrency = monthlyNetProfitText.substring(0, 3);

  // Removido para simplificação
  // var profitMultiplier = item.querySelector("div.d-lg-none.d-xl-flex.badge.p-0.float-right.text-neutral-gray.ng-scope > span.border-right-0").innerText;
  // var revenueMultiplier = item.querySelector("div.d-lg-none.d-xl-flex.badge.p-0.float-right.text-neutral-gray.ng-scope > span.border-right-pill").innerText;

  result.push({
    companyName,
    linkId,
    description,
    price,
    priceCurrency,
    country,
    type,
    industry,
    monetizationType,
    siteAge,
    monthlyNetProfit,
    monthlyNetProfitCurrency,
    // profitMultiplier,
    // revenueMultiplier,
  });
});

console.log(result);

// Função para converter o array de objetos em CSV
function objectToCsv(data) {
    const csvRows = [];
    // Obter os cabeçalhos
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Loop pelos dados para obter os valores
    for(const row of data) {
        const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

// Função para exportar o CSV
function downloadCsv(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Converter para CSV e iniciar o download
const csvData = objectToCsv(result);
downloadCsv(csvData);


https://flippa.com/search?search_template=most_relevant&filter%5Bage%5D%5Bmax%5D=60&sort_alias=highest_price&page%5Bsize%5D=100&filter%5Bsale_method%5D=auction,classified&filter%5Bstatus%5D=won&filter%5Bproperty_type%5D=website&filter%5Bsitetype%5D=blog,directory,review&filter%5Brevenue_generating%5D=T,F

https://flippa.com/search?search_template=most_relevant&filter%5Bage%5D%5Bmax%5D=60&sort_alias=highest_price&page%5Bsize%5D=100&filter%5Bsale_method%5D=auction,classified&filter%5Bstatus%5D=won&filter%5Bproperty_type%5D=website&filter%5Bsitetype%5D=blog,directory,review&filter%5Brevenue_generating%5D=T,F&page%5Bnumber%5D=2