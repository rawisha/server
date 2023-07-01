const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
app.use(
  cors({
    origin: "*",
  })
);

app.get(":endpoint([\\/\\w\\?\\=]*)", function (req, res) {
  let endpoint = process.env.API_URL + req.params.endpoint.replace("/", "");

  axios
    .get(endpoint)
    .then((response) => {
      if (response.data) {
        res.json(response.data);
      } else {
        res.status(204).json({ error: "haay keeer.. bro bixwlenarawa" });
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

const port = process.env.PORT || 3001;
app.listen(port);
