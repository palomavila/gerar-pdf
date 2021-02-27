const express = require("express");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const app = express();

const passengers = [
  {
    name: "Lala",
    flightNumber: 8767,
    time: "18h00"
  },
  {
    name: "Bia",
    flightNumber: 8767,
    time: "18h00"
  },
  {
    name: "Ana",
    flightNumber: 8767,
    time: "18h00"
  },
  {
    name: "Rambo",
    flightNumber: 7859,
    time: "18h00"
  }
];

app.get("/pdf", async (request, response) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle0"
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: "Letter"
  });

  await browser.close();

  response.contentType("application/pdf");

  return response.send(pdf);
});

app.get("/", (request, response) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.send("Erro na leitura do arquivo");
    }

    return response.send(html);
  });
});

app.listen(3000);
