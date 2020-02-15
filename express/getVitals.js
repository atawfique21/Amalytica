async function vitalsInfo(ASIN) {
  const { Builder, By } = require('selenium-webdriver');
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
    let title = await driver.findElement(By.id("productTitle")).getText()
    await driver.sleep(1000)
    let image = await driver.findElement(By.xpath(`//*[@id="landingImage"]`)).getAttribute("src");

    try {
      var buyboxprice = await driver.findElement(By.id("price_inside_buybox")).getText();
    } catch (e) {
      var buyboxprice = await driver.findElement(By.id("priceblock_ourprice")).getText();
    }

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
      await driver.sleep(2000)
      await driver.findElement(By.xpath("(//a[contains(@class,'a-touch-link a-box')]//div)[1]")).click();
      await driver.sleep(1000)

      try {
        await driver.findElement(By.id("aod-sort-details-string"))
      } catch (Exception) {
        await driver.get(`https://www.amazon.com/dp/${ASIN}`);
        await driver.sleep(2000)
        await driver.findElement(By.xpath("(//a[contains(@class,'a-touch-link a-box')]//div)[1]")).click();
        await driver.sleep(1000)
      }
    }
    let offers = await driver.findElements(By.xpath("//div[contains(@class, 'aod-offer')]"))

    if (offers.length > 3) {
      offers = [1, 1, 1]
    } else if (offers.length === 3) {
      offers = [1, 1, 1]
    } else if (offers.length === 2) {
      offers = [1, 1]
    }

    console.log("----------------------------------")
    console.log('Vitals')
    console.log(`Title: ${title}`)
    console.log(`Image: ${image}`)
    console.log(`Buy Box Price: ${buyboxprice}`)
    console.log(`Offers: ${offers}`)
    console.log("----------------------------------")
    return { title, image, buyboxprice, offers }
  } catch (e) {
    console.log(e)
  }
  finally {
    await driver.quit()
  }
}

module.exports = vitalsInfo;