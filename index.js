const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const carRouter = require('./routes/car'); 
const cors = require('cors');
app.use(cors());
app.use(carRouter);

app.use((req, res) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log("App works!!!");
});




