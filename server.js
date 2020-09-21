require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Cards = require("./dbCards.js");

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.xgt3b.mongodb.net/tinderdb?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("hello world from wherever");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listeners
app.listen(port, () => {
  console.log(`listening on localhost: ${port}`);
});
