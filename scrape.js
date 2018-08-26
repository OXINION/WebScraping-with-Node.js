const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request("https://finance.oxinion.com", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $(".post-outer").each((i, el) => {
      const title = $(el)
        .find(".post-outer")
        .text()
        .replace(/\s\s+/g, "");
      const link = $(el)
        .find("a")
        .attr("href");
      const date = $(el)
        .find(".post-date")
        .text();

      //Write Row to CSV
      writeStream.write(`${title}, ${link}, ${date} \n`);
    });

    console.log("Scrapping Done...");
  }
});
