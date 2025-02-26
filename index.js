const express = require("express");
var morgan = require("morgan");
const app = express();
const port = 3003;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Xây dựng trang blog với F8!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
