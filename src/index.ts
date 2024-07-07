import routes from "./routes";
import { setupSwagger } from "./swaggerConfig";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

setupSwagger(app);

app.use("/api", routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
