const express = require("express");
const axios = require("axios");
require("dotenv").config();
const bodyParser = require('body-parser')

const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json())


const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  const options = {
    method: "GET",
    url: "https://temp-mail44.p.rapidapi.com/api/v3/email/tz1uxahdr5aj@rentforsale7.com/messages",
    headers: {
      "X-RapidAPI-Key": process.env.API_SECRET,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
    },
  };

  async function readEmail() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  readEmail();
});

app.post("/email", (req, res) => {
  const {key1, key2}=req.body
  const { 'x-rapidapi-key': rapidapiKey, 'x-rapidapi-host': rapidapiHost } = req.headers;

  const options = {
    method: "POST",
    url: "https://temp-mail44.p.rapidapi.com/api/v3/email/new",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": rapidapiKey,
      "X-RapidAPI-Host": rapidapiHost
    },
    data: {
      key1: key1,
      key2: key2,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
});
app.listen(PORT, () => {
  console.log(PORT);
});
