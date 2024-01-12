const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
//GET Current User
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetch successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

//Update Current User
const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    next("Please Provide All Fields");
  }
  const user = await userModel.findOne({ _id: req.body.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).json({
    message: "User Updated successfully",
    user,
    token,
  });
};
module.exports = { currentUserController, updateUserController };
