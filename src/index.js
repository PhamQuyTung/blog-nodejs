const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const app = express();
const port = 3003;

//
app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(morgan("combined"));

// Cấu hình Handlebars với đuôi `.hbs`
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

console.log("Views path:", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
  res.render("home"); // Render file `home.hbs`
});

app.get("/news", (req, res) => {
  console.log(req.query.q)
  res.render("news"); // Render file `news.hbs`
});

app.get("/search", (req, res) => {
  res.render("search"); // Render file `search.hbs`
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
