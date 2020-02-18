async function getOffer(ASIN, offerNum) {
  const { Builder, By, until, Key } = require('selenium-webdriver');
  const firefox = require('selenium-webdriver/firefox');

  var op = new firefox.Options()
  // op.addArguments("--headless");
  op.addArguments("--window-size=1920,1080")

  const driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(op)
    .build();

  try {

    offerNumMinusOne = (offerNum - 1)
    offerNum = parseInt(offerNum)
    offerNumPlusOne = (offerNum + 1)

    console.log(offerNumMinusOne, offerNum, offerNumPlusOne)

    await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 20000, script: 5000 })
    await driver.get(`https://www.amazon.com/dp/${ASIN}`);
    await driver.sleep(1000)
    await driver.manage().deleteAllCookies();
    await driver.sleep(1000)
    try {
      await driver.findElement(By.className("olp-text-box")).click();
    } catch (Exception) {
      await driver.findElement(By.xpath('//*[@id="mbc-upd-olp-link"]')).click();
    }

    await driver.sleep(2000)
    try {
      await driver.findElement(By.id("aod-sort-details-string"))
    } catch (Exception) {
      await driver.get(`https://www.amazon.com/dp/${ASIN}`);
      await driver.sleep(3000)
      await driver.findElement(By.xpath("(//a[contains(@class,'a-touch-link a-box')]//div)[1]")).click();
      await driver.sleep(1000)

      try {
        await driver.findElement(By.id("aod-sort-details-string"))
      } catch (Exception) {
        await driver.get(`https://www.amazon.com/dp/${ASIN}`);
        await driver.sleep(3000)
        await driver.findElement(By.xpath("(//a[contains(@class,'a-touch-link a-box')]//div)[1]")).click();
        await driver.sleep(1000)
      }
    }

    var storename = await driver.findElement(By.xpath(`(//a[@role='link'])[${offerNum}]`)).getText();

    if (storename.length === 0) {
      var storename = await driver.findElement(By.xpath(`(//a[@role='link'])[${offerNumPlusOne}]`)).getText();
    }

    try {
      await driver.sleep(1000)
      await driver.findElement(By.xpath(`(//div[@id='aod-offer-heading']//h5)[${offerNumPlusOne}]`))
      var condition = await driver.findElement(By.xpath(`(//div[@id='aod-offer-heading']//h5)[${offerNum}]`)).getText()
    } catch (Exception) {
      // await driver.get(`https://www.amazon.com/dp/${ASIN}`);
      // await driver.sleep(3000)
      // await driver.findElement(By.className("olp-text-box")).click();
      // driver.sleep(3000)
      // var condition = await driver.findElement(By.xpath(`(//div[@id='aod-offer-heading']//h5)[${offerNum}]`)).getText();
      var condition = "Not Available"
    }

    await driver.sleep(1000)
    await driver.findElement(By.xpath(`(//span[@id='a-autoid-2'])[${offerNum}]`)).click();

    driver.wait(until.elementLocated(By.id('hlb-view-cart-announce'))).click();
    await driver.sleep(3000)
    await driver.wait(until.elementLocated(By.className('a-dropdown-container'))).click();
    driver.wait(until.elementLocated(By.id("dropdown1_10"))).click();
    let input = await driver.findElement(By.xpath("//input[contains(@class,'a-input-text a-width-small')]"))
    await driver.sleep(500)
    input.sendKeys(Key.BACK_SPACE)
    await driver.sleep(500)
    input.sendKeys('999')
    await driver.sleep(500)
    input.sendKeys(Key.RETURN)
    await driver.sleep(1000)
    try {
      var sellerqty = await driver.findElement(By.xpath("(//span[@class='a-size-base'])[5]")).getText();
    } catch (Exception) {
      var sellerqty = "This seller has 999+ available."
    }
    await driver.sleep(1000)
    let price = await driver.findElement(By.xpath("(//span[contains(@class,'a-size-medium a-color-price')])[2]")).getText();
    console.log("----------------------------------")
    console.log(`Sold by: ${storename}`)
    console.log(`Price: ${price}`)
    console.log(`Condition: ${condition}`)
    console.log(sellerqty)
    console.log("----------------------------------")
    return { storename, price, condition, sellerqty }

  } catch (e) {
    console.log(e)
  }
  finally {
    await driver.quit()
  }
}

module.exports = getOffer;