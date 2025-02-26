const express = require("express");
const app = express();
const port = 3003;

app.get("/", (req, res) => {
  var a = 3;
  var b = 4;
  var c = a + b;
  res.send("Xây dựng trang blog với F8!" );
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
