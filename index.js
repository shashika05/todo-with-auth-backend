const express = require("express");
const cors = require("cors");
const dbConn = require("./db/dbConn");
const router = require("./router");

const app = express();
const PORT = 9999;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
dbConn();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
