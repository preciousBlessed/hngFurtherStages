require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const { MONGODB_URL, DATABASE_LOCAL } = process.env;

// console.log(MONGODB_URL, DATABASE_LOCAL) //test...

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL || DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection successful!");
    })
    .catch((err) => {
      console.log("Failed to connect to database, exiting now ...");
      console.log(err);
      process.exit(1);
    });
};
