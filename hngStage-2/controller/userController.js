const User = require("../models/modelUser");

// function titleCase(str) {
//   return str.replace(
//     /\w*\S/g,
//     (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
//   );
// } //function converts names to titleCase

//CREATE A USER
exports.createUser = async (req, res) => {
  try {
    const { fullName, country, age, email } = await req.body;

    const newUser = await User.create({
      fullName: fullName,
      country: country,
      age: age,
      email: email,
    });

    res.status(200).json({
      status: `New user has been successfully created at ${new Date().toISOString()}`,
      data: { newUser },
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed to Create new user",
      message: err.message,
    });
  }
};

//GET all users
exports.getAllUsers = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      const users = await User.find();

      res.status(200).json({
        status: "All users successfully fetched",
        number_of_users: users.length,
        data: users,
      });
      //view the request body...
      console.log(req.body);
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

//GET one user...

exports.getOne = async (req, res) => {
  try {
    const { user_id } = req.params;

    //Test if the user_id is found or undefined
    console.log(`GET ${user_id}`);

    const searchedUser = user_id
      ? await User.findById({ _id: user_id })
      : await User.where("fullName").equals(new RegExp(req.body.fullName, "i"));

    //Testing on console...
    searchedUser.length === undefined
      ? console.log({ searchedUser, size: [searchedUser].length })
      : console.log({ searchedUser, size: searchedUser.length });
    //query returns array of objects, while find returns object

    if (!searchedUser || searchedUser.length === 0) {
      return res.status(404).json({
        status: "404 Not Found",
      });
    } else {
      res.status(200).json({
        status: `${
          searchedUser.length || [searchedUser].length
        } user(s) successfully fetched`,
        data: searchedUser,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed to fetch one user!",
      message: err.message,
    });
  }
};

//Update
exports.updateUser = async (req, res) => {
  try {
    const { user_id } = await req.params;

    const userToUpdate = await User.findByIdAndUpdate(
      { _id: user_id },
      req.body,
      { new: true, runValidators: true }
    );
    await userToUpdate.modify(
      req.body.fullName || userToUpdate.fullName,
      req.body.country || userToUpdate.country
    );
    userToUpdate.save();

    res.status(200).json({
      status: "Successfully updated this user",
      data: userToUpdate,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "updates failed", message: err.message });
  }
};

//delete One User
exports.deleteOneUser = async (req, res) => {
  try {
    console.log("About deleting...");
    const { user_id } = req.params;
    // let _id = user_id;
    // console.log(_id);
    const userToDel = await User.findByIdAndDelete(user_id); //will the  user exist after this?

    if (userToDel) {
      res.status(200).json({
        status: `Done! the user with the id ${req.params.user_id} has been removed!`,
      });
      console.log("Deleted!");
    } else {
      return res.status(500).json({
        status: "Failed!",
        message: "No such user exists! Please check the ID properly.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed to delete",
      message: err.message,
    });
  }
};

//exports to router
