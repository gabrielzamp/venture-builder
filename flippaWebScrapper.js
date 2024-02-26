// https://flippa.com/search?search_template=most_relevant&filter%5Bage%5D%5Bmax%5D=60&sort_alias=highest_price&page%5Bsize%5D=1000&filter%5Bsale_method%5D=auction,classified&filter%5Bstatus%5D=won&filter%5Bproperty_type%5D=website&filter%5Bsitetype%5D=blog,directory,review&filter%5Brevenue_generating%5D=T,F

var items = document.querySelectorAll("div[id^=listing].listing-card");

var result = [];

items.forEach((item) => {
  companyName = item.querySelector("a.card-title").innerText;

  linkId = item.querySelector("a.card-title").getAttribute("href");

  description = item.querySelector("p.card-text").innerText;

  price = item.querySelector("h5.m-0.ng-binding").innerText;

  country = item.querySelector(
    "span.text-nowrap.text-dark-gray.ng-binding.ng-scope"
  ).innerText;

  type = item.querySelector(
    "div.pr-3 > div.font-weight-bold.text-truncate.ng-binding"
  ).innerText;

  industry = item.querySelector(
    "div.d-none.d-xl-block.px-3 > div.font-weight-bold.text-truncate.ng-binding"
  ).innerText;

  monetizationType = item.querySelector(
    "div.pl-3 > div.font-weight-bold.text-truncate.ng-binding"
  ).innerText;

  siteAge = item.querySelector(
    "div.d-inline-flex.justify-content-start.mt-2 > div.pr-3 > div.font-weight-bold.text-truncate.ng-binding"
  ).innerText;

  monthlyNetProfit = item.querySelector(
    "div.d-inline-flex.justify-content-start.mt-2 > div.pl-3 > div.font-weight-bold.text-truncate"
  ).innerText;

  // profitMultiplier = item.querySelector(
  //   "div.d-lg-none.d-xl-flex.badge.p-0.float-right.text-neutral-gray.ng-scope > span.border-right-0"
  // ).innerText;

  // revenueMultiplier = item.querySelector(
  //   "div.d-lg-none.d-xl-flex.badge.p-0.float-right.text-neutral-gray.ng-scope > span.border-right-pill"
  // ).innerText;

  result.push({
    companyName,
    linkId,
    description,
    price,
    country,
    type,
    industry,
    monetizationType,
    siteAge,
    monthlyNetProfit,
    // profitMultiplier,
    // revenueMultiplier,
  });
});

console.log(result);


https://flippa.com/search?search_template=most_relevant&filter%5Bage%5D%5Bmax%5D=60&sort_alias=highest_price&page%5Bsize%5D=100&filter%5Bsale_method%5D=auction,classified&filter%5Bstatus%5D=won&filter%5Bproperty_type%5D=website&filter%5Bsitetype%5D=blog,directory,review&filter%5Brevenue_generating%5D=T,F

https://flippa.com/search?search_template=most_relevant&filter%5Bage%5D%5Bmax%5D=60&sort_alias=highest_price&page%5Bsize%5D=100&filter%5Bsale_method%5D=auction,classified&filter%5Bstatus%5D=won&filter%5Bproperty_type%5D=website&filter%5Bsitetype%5D=blog,directory,review&filter%5Brevenue_generating%5D=T,F&page%5Bnumber%5D=2