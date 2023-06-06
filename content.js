function clickButtonOrRefresh() {
  const buttonText = "BUY PUBLIC ON-SALE TICKETS";
  const xpathExpression = `//button[.//span[text()="${buttonText}"] and not(@disabled)]`;
  const result = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

  console.log('total=',result)

  if (result.singleNodeValue) {
    const button = result.singleNodeValue;
    button.click();
  } else {
    location.reload();
  }
}

clickButtonOrRefresh();

setInterval(clickButtonOrRefresh, 300);