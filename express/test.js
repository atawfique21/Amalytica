module.exports = function Scraper(ASIN) {
  const { Builder, By, Key, until } = require('selenium-webdriver');
  const firefox = require('selenium-webdriver/firefox');
  const fs = require('fs');


  (async function example() {
    // const binary = new firefox.binary()
    // binary.addArguments("--headless");

    // var options = new firefox.Options().setBinary(firefox.Channel.NIGHTLY);
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
      let buyboxSeller = await driver.findElement(By.id("merchant-info")).getText();
      await driver.wait(until.elementLocated(By.id('add-to-cart-button'))).click();
      await driver.sleep(2000)
      var existed = await driver.findElement(By.id("hlb-view-cart-announce")).then(function () {
        driver.wait(until.elementLocated(By.id('hlb-view-cart-announce'))).click();
        return true;
      }, async function (err) {
        await driver.wait(until.elementLocated(By.xpath("(//input[@class='a-button-input'])[1]"))).click();
        return false;
      });
      await driver.sleep(2000)

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
      let boxboxhas = await driver.findElement(By.xpath("(//span[@class='a-size-base'])[5]")).getText();
      let buyboxprice = await driver.findElement(By.xpath("(//span[contains(@class,'a-size-medium a-color-price')])[2]")).getText();
      console.log("----------------------------------")
      console.log('Buy Box Data Below')
      console.log(`Sold by: ${buyboxSeller}`)
      console.log(`Price: ${buyboxprice}`)
      console.log(boxboxhas)
      console.log("----------------------------------")
      await driver.findElement(By.xpath("(//input[@value='Delete'])[1]")).click();
      await driver.sleep(1000)

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

        try {
          await driver.findElement(By.id("aod-sort-details-string"))
        } catch (Exception) {
          await driver.get(`https://www.amazon.com/dp/${ASIN}`);
          await driver.sleep(3000)
          await driver.findElement(By.xpath("(//a[contains(@class,'a-touch-link a-box')]//div)[1]")).click();
          await driver.sleep(1000)
        }
      }

      //   .then(null, function (err) {
      //     if (err.name === "NoSuchElementError")
      //         console.log("Element was missing!");
      // });


      let offers = await driver.findElements(By.xpath("//div[contains(@class, 'aod-offer')]"))
      await driver.findElement(By.xpath("(//div[@id='aod-background'])[1]")).click();
      await driver.sleep(2000)

      if (offers.length > 3) {
        offers = [1, 1, 1]
      }

      for (let i = 1; i < offers.length; i++) {
        await driver.sleep(3000)
        await driver.findElement(By.className("olp-text-box")).click();
        await driver.sleep(4000)
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

        let storeName = await driver.findElement(By.xpath(`(//a[@role='link'])[${i + 1}]`)).getText();
        try {
          await driver.findElement(By.xpath(`(//div[@id='aod-offer-heading']//h5)[${i + 1}]`))
          var condition = await driver.findElement(By.xpath(`(//div[@id='aod-offer-heading']//h5)[${i + 1}]`)).getText()
        } catch (Exception) {
          driver.sleep(50000)
          await driver.get(`https://www.amazon.com/dp/${ASIN}`);
          await driver.sleep(4000)
          await driver.findElement(By.className("olp-text-box")).click();
          var condition = await driver.findElement(By.xpath(`(//div[@id='aod-offer-heading']//h5)[${i + 1}]`)).getText();
        }
        await driver.findElement(By.xpath(`(//input[@name='submit.addToCart'])[${i + 1}]`)).click();
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
        let thisSellerHas = await driver.findElement(By.xpath("(//span[@class='a-size-base'])[5]")).getText();
        await driver.sleep(500)
        let price = await driver.findElement(By.xpath("(//span[contains(@class,'a-size-medium a-color-price')])[2]")).getText();
        console.log("----------------------------------")
        console.log(`Sold by: ${storeName}`)
        console.log(`Price: ${price}`)
        console.log(`Condition: ${condition}`)
        console.log(thisSellerHas)
        console.log("----------------------------------")
        await driver.findElement(By.xpath("(//input[@value='Delete'])[1]")).click();
        await driver.sleep(2000)
        await driver.get(`https://www.amazon.com/dp/${ASIN}`);
      }
      // let offers = document.querySelector('#aod-offer-list').querySelectorAll('#aod-offer')


    } finally {
      await driver.quit();
    }
  })();
}
