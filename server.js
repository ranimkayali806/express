//Fil för att hantera Express server
const express = require("express") // hämta express class från express dependency
//const application = new express()// skapa ny objekt
const bodyParser = require("body-parser")
const fs = require("fs")

const portNr = 5000
const filePath = "./jsonData.json"

// konfigurerar server med body parser
const application = new express()
application.use(bodyParser.json())
application.use(bodyParser.urlencoded({ extended: false }))


//Starta upp server
application.listen(portNr, () => {
  console.log(`Nu ligger servern på portNr ${portNr} och lyssnar efter inkommande requests`)
})
application.get("", (req, res) => {
  //retunera hello world
  //res.send("Hejsan")
  res.sendfile('./index.html')
})
application.post("/data", (req, res) => {
  //Denna payload innehåller 2 st attribut, name och age
  const data = req.body

  //console.log(data)
  //Skriver ut data till konsol
  console.log(data["name"])
  console.log(data.age)
  //Hämta befintlig data från .json fil
  fs.readFile(filePath, "utf-8", (err, fetchJson) => {
    if (err) console.log(err)

    let lista = JSON.parse(fetchJson)

    //Push Post-Payload till lista
    lista.push(data) // här kan vi lagra hum mycket objekt vi vill

    //Spara lista till .json fil
    fs.writeFile(filePath, JSON.stringify(lista, null, 4), (err) => {
      //Om error, skriv ut error
      if (err) console.log(err)
    })
  })


  //Retunerar meddelande till klient
  res.send(`Hejsan ${data["name"]}, då är ${data["age"]} år gammal`)
})

//Get-Endpoint som returnerar JSON data
application.get("/data", (req, res) => {
  //Hämta JSON data från fil
  fs.readFile(filePath, "utf-8", (err, fetchJson) => {
    if (err) res.send(err)

    res.send(fetchJson)
  })
})
//Get-Endpoint för About.html
application.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname })
})

// Get - endpoint for script fil
application.get("/script", (req, res) => {
  res.sendFile("./script.js", { root: __dirname })
})
