require("dotenv").config();
const app = require("./src/app");

let port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => {
  console.log(`server is running`);
});
