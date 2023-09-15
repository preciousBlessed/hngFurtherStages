require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");
const port = process.env.API_PORT || 3000;
const mongoSanitize = require("express-mongo-sanitize"); //prevents against noSQL injections
const perfectExpressSanitizer = require("perfect-express-sanitizer");
//IMPORT AND CONNECT TO THE DATABASE
const { connect } = require("./databaseConfig/connection");
connect();

//MIDDLEWARES
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//PREVENT ATTACKS
//Implement Data Sanitization against NoSQL query injection
app.use(mongoSanitize()); //--> //filter out all dollar signs and dots...
app.use(
  perfectExpressSanitizer.clean(
    {
      xxx: true,
      noSql: true,
      sql: true,
    }
    // whiteList = [],
    // only = ["body", "query"]
  )
); //automatically sanitize all incoming requests

//ROUTING
app.get("/", (req, res) => {
  res.send("<h1>Hello Curd Node Express </h1>");
});

app.use("/api", userRoutes);

// LISTENING...
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is now listening on port ${port}`);
});

// mongodb+srv://blessedtobe30:<password>@cluster0.6bkonmc.mongodb.net/
// mongodb+srv://blessedtobe30:<password>@cluster0.6bkonmc.mongodb.net/
