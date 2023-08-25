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
      if (response.data.length !== 0) {
        res.json(response.data);
      } else {
        res.status(404).json({ error: "Nothing found" }); // Use an object with error property
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

const port = process.env.PORT || 3001;
app.listen(port);
