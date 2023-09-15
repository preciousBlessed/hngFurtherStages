const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 120,
    //ADDING CUSTOM VALIDATION...
    validate: {
      validator: (v) => v % 2 == 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String,
    minLength: 10,
    maxLength: 100,
    required: true,
    lowercase: true,
    uppercase: false,
  },
  createdAt: {
    type: Date,
    // default: new Date(), //but new Date() queries the new Date() once so it is static value...
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId, //i am a reference to another object based on the ID..., USUALLY the id of another user object
    ref: "User", //what model does this object id reference
  },
  hobbies: [String],
  address: addressSchema,
});

// schemaFunctions and methods...
// schema methods helps us to perform a function on each instance of the user...
// do not use arrow functions
userSchema.methods.sayHi = function () {
  console.log(`Hi, my name is ${this.name}`);
};

//static methods are available on that model and not the instance...
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

//adding functionalities particularly only to a query..
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

//virtual: a virtual is a property not exactly on our schema, but related/based on other property
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

//Middle ware to save, validate, removing and update one....
// 1st three to worry about
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
//this means, before we save a user, we will update the updatedAt field and continue with the rest
// of the code..

userSchema.post("save", function (doc, next) {
  doc.sayHi(); //where doc is the user object...
  next();
});

// module.exports = mongoose.model("User", userSchema);
// module.exports = mongoose.model("UserM", userSchema);
const User = mongoose.model("User", userSchema);
// console.log(module);

// run();

async function run() {
  try {
    const user = await User.create({
      name: "Kyle",
      age: 15,
      email: "test@test.com",
      hobbies: ["Weight Lifting", "Bowling"],
      address: {
        street: "Main St",
      },
    });
    user.sayHi(); //schemaMethod in action...
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

async function getUser() {
  try {
    const user = await User.findById("...");
    const user1 = await User.find({ name: "Kyle" }); // || User.findByName("Kyle") || User.find().byName("Kyle");
    const user2 = await User.findOne({ name: "Kyle" });
    const user3 = await User.exists({ name: "Kyle" }); //returns true if a user named kype exists
    const user4 = await User.deleteOne({ name: "Kyle" }); //first match
    const user5 = await User.deleteMany({ name: "Kyle" }); //all matches

    //finding using queries... User.where
    const user6 = await User.where("name").equals("kyle");
    const user7 = await User.where("age").gt(12);

    const user8 = await User.where("age").gt(12).where("name").equals("kyle");
    const user9 = await User.where("age")
      .gt(12)
      .lt(31)
      .where("name")
      .equals("kyle");
    const user10 = await User.where("age")
      .gt(12)
      .lt(31)
      .where("name")
      .equals("kyle")
      .populate("bestFriend") //will give full details of bestFriend, equivalent method to perform Joins
      .limit(2)
      .select("age");
    //use him as a reference...
    user10[0].bestFriend = "...";
    await user10[0].save();
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

//how to use virtual
const user11 = await User.findOne({ name: "Kyle", email: "test@example.com" });
console.log(user.namedEmail()); //returns Kyle <test@example.com>
//this is because virtual property doesn't get saved in the database, its only available in your database...
