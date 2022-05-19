//načtení modulu express
const express = require("express");
const tagRouter = require("./Controller/TagController");
const videoRouter = require("./Controller/VideoController");
const authRouter = require("./Controller/AuthorController");


//inicializace nového Express.js serveru
const app = express();
//definování portu, na kterém má aplikace běžet na localhostu
const port = 3000;

// Parsování body
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

//jednoduchá definice routy s HTTP metodou GET, která pouze navrací text
app.get("/", (req, res) => {
    res.send('Hello World!')
});

app.use("/video", videoRouter);

app.use("/tag", tagRouter);

app.use("/author", authRouter);

app.get("/*", (req, res) => {
    // res.send('Something else, unknown!')
    res.status(404).send("Page does not exist")
})

//nastavení portu, na kterém má běžet HTTP server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
