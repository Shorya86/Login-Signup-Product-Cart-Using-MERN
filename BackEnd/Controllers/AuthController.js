const UserModels = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModels.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        succes: false,
      });
    }
    const userModel = new UserModels({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Singup Succesfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const user = await UserModels.findOne({ email });
    // console.log(user);
    
    const errMsg = "Auth Failed email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        succes: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: errMsg,
        succes: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, role:user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Succesfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
      role:user.role,
      _id:user._id
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Delete
const delUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModels.findByIdAndDelete(id);
    // we cannot find id
    if (!users) {
      return res
        .status(400)
        .join({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Enter Valid ID ` });
  }
};

// Update
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...otherData } = req.body; // Extract password if provided

    // Find user by ID
    let user = await UserModels.findById(id);
    
    // If the user doesn't exist
    if (!user) {
      return res
        .status(400)
        .json({ message: `Cannot find any user with ID ${id}` });
    }

    // If password is provided, hash it before updating
    if (password) {
      otherData.password = await bcrypt.hash(password, 10);
    }

    // Update the user data
    user = await UserModels.findByIdAndUpdate(id, otherData, { new: true });

    // Respond with the updated user data
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Error updating user with ID ${id}` });
  }
};

// Read By Id
// READ by id
const userFind = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModels.findById(id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Cant Find this id" });
  }
};


module.exports = {
  signup,
  login,
  delUser,
  updateUser,
  userFind
};
