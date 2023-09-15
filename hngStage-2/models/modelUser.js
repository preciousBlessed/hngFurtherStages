const mongoose = require("mongoose");

function titleCase(str) {
  return str.replace(
    /\w*\S/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  );
} //function converts names to titleCase

const mySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    country: { type: String },
    age: { type: Number },
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true }
);

//module method to Title-Case First Name and Country...
mySchema.methods.modify = function (fullName, country) {
  this.fullName = titleCase(fullName);
  this.country = titleCase(country);
  console.log(`${this} is being modified...`);
};

//pre-saving
mySchema.pre("save", function (next) {
  this.modify(this.fullName, this.country);
  console.log("I have been saved...");
  next();
});
//post-saving
mySchema.post("save", function (doc, next) {
  doc.modify(doc.fullName, doc.country);
  console.log("After Saving Me");
  next();
});

module.exports = mongoose.model("hngUserProfiles", mySchema);
//exports to controller...
