const User = require("../model/User");

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("find user by email error", error);
    return null;
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("find user by email error", error);
    return null;
  }
};

const updateUserDetails = async (email, updatedFields) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updatedFields },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.error("update user details error", error);
    return null;
  }
};

module.exports = { findUserByEmail, updateUserDetails, findUserById };
