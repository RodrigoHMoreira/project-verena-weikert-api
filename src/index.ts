import routes from "./routes";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.PRODUCTION_URL]
  : [process.env.LOCAL_URL, process.env.PRODUCTION_URL];

const corsOptions = {
  origin: function (origin: string, callback: any) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use("/api", routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
