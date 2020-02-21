async function getBuyBox(ASIN) {
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
    await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 20000, script: 5000 })
    await driver.get(`https://www.amazon.com/dp/${ASIN}`);
    await driver.sleep(1000)
    try {
      var buyboxseller = await driver.findElement(By.id("merchant-info")).getText();
    } catch (e) {
      var seller = await driver.findElement(By.xpath("//p[@class='a-spacing-none']")).getText();
      var shipment = await driver.findElement(By.xpath("//p[@class='a-spacing-small']")).getText();
      var buyboxseller = `${seller}, ${shipment}`
    }
    await driver.wait(until.elementLocated(By.id('add-to-cart-button'))).click();
    await driver.sleep(2000)

    try {
      await driver.findElement(By.id("attachSiNoCoverage-announce")).click();
      try {
        await driver.findElement(By.id("siNoCoverage-announce")).click();
      } catch (Exception) {
        var existed = await driver.findElement(By.id("hlb-view-cart-announce")).then(function () {
          driver.wait(until.elementLocated(By.id('hlb-view-cart-announce'))).click();
          return true;
        }, async function (err) {
          await driver.wait(until.elementLocated(By.xpath("(//input[@class='a-button-input'])[1]"))).click();
          return false;
        });
        await driver.sleep(1000)

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
          var buyboxqty = await driver.findElement(By.xpath("(//span[@class='a-size-base'])[5]")).getText();
        } catch (Exception) {
          var buyboxqty = "This seller has 999+ available."
        }
        let buyboxprice = await driver.findElement(By.xpath("(//span[contains(@class,'a-size-medium a-color-price')])[2]")).getText();
        console.log("----------------------------------")
        console.log('Buy Box Data Below')
        console.log(`Sold by: ${buyboxseller}`)
        console.log(`Price: ${buyboxprice}`)
        console.log(`Qty: ${buyboxqty}`)
        console.log("----------------------------------")
        return { buyboxseller, buyboxprice, buyboxqty }
      }
    }
    catch (Exception) {
      var existed = await driver.findElement(By.id("hlb-view-cart-announce")).then(function () {
        driver.wait(until.elementLocated(By.id('hlb-view-cart-announce'))).click();
        return true;
      }, async function (err) {
        await driver.wait(until.elementLocated(By.xpath("(//input[@class='a-button-input'])[1]"))).click();
        return false;
      });
      await driver.sleep(1000)

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
        var buyboxqty = await driver.findElement(By.xpath("(//span[@class='a-size-base'])[5]")).getText();
      } catch (Exception) {
        var buyboxqty = "This seller has 999+ available."
      }
      let buyboxprice = await driver.findElement(By.xpath("(//span[contains(@class,'a-size-medium a-color-price')])[2]")).getText();
      console.log("----------------------------------")
      console.log('Buy Box Data Below')
      console.log(`Sold by: ${buyboxseller}`)
      console.log(`Price: ${buyboxprice}`)
      console.log(`Qty: ${buyboxqty}`)
      console.log("----------------------------------")
      return { buyboxseller, buyboxprice, buyboxqty }
    }

    var existed = await driver.findElement(By.id("hlb-view-cart-announce")).then(function () {
      driver.wait(until.elementLocated(By.id('hlb-view-cart-announce'))).click();
      return true;
    }, async function (err) {
      await driver.wait(until.elementLocated(By.xpath("(//input[@class='a-button-input'])[1]"))).click();
      return false;
    });
    await driver.sleep(1000)

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
      var buyboxqty = await driver.findElement(By.xpath("(//span[@class='a-size-base'])[5]")).getText();
    } catch (Exception) {
      var buyboxqty = "This seller has 999+ available."
    }
    let buyboxprice = await driver.findElement(By.xpath("(//span[contains(@class,'a-size-medium a-color-price')])[2]")).getText();
    console.log("----------------------------------")
    console.log('Buy Box Data Below')
    console.log(`Sold by: ${buyboxseller}`)
    console.log(`Price: ${buyboxprice}`)
    console.log(`Qty: ${buyboxqty}`)
    console.log("----------------------------------")
    return { buyboxseller, buyboxprice, buyboxqty }
  } catch (e) {
    console.log(e)
  }
  finally {
    await driver.quit()
  }
}

module.exports = getBuyBox;