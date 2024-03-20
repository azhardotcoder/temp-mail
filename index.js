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
  const { 'x-rapidapi-key': rapidapiKey, 'x-rapidapi-host': rapidapiHost } = req.headers;
  const {email}=req.body
  console.log(email);
  if(!(rapidapiKey&&rapidapiHost)){
    res.status(401).send({message: 'unauthorized user'})
    return
  }
  if(!email){
    res.status(400).send({message: 'email required'})
    return
  }
  // res.send("ping pong")
  // return
  const options = {
    method: "GET",
    url: `https://temp-mail44.p.rapidapi.com/api/v3/email/${email}/messages`,
    headers: {
      "X-RapidAPI-Key": rapidapiKey,
      "X-RapidAPI-Host": rapidapiHost
    },
  };

  async function readEmail() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.send(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error)

    }
  }
  readEmail();
});

app.post("/email", (req, res) => {
  const { 'x-rapidapi-key': rapidapiKey2, 'x-rapidapi-host': rapidapiHost2 } = req.headers;
  const {key1, key2}=req.body
console.log(req.body);
// console.log(rapidapiKey2, rapidapiHost2);
  // res.send("OK OK")
  // return
  const { 'x-rapidapi-key': rapidapiKey, 'x-rapidapi-host': rapidapiHost } = req.headers;
  if(!(rapidapiKey&&rapidapiHost)){
    res.status(401).send({message: 'unauthorized user'})
  }
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
      // console.error(error);
      console.log(error.message);
      res.status(429).send(error)
    }
  }
  fetchData();
});
app.listen(PORT, () => {
  console.log(PORT);
});
