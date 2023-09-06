const express = require("express");
const app = express();
const connectDatabase = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

app.use(cors());
app.use(express.json());
require("dotenv").config();

app.use("/api/user", userRoute);

connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express servers listening on port ${PORT}`);
});
