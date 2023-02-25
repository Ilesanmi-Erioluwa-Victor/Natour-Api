const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({
  path
})
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
});
