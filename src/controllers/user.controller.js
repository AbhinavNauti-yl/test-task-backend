import User from "../Models/User.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req?.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    if(!user) {
        return res.status(500).json({
            message: "could not create user"
        })
    }
    res.status(200).json({
        data: user
    })
  } catch (error) {
    res.status(500).json({
      message: "could not create user",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");

    if(!user) {
        return res.status(500).json({
            message: "could not create user"
        })
    }
    res.status(200).json({
        data: user
    })
  } catch (error) {
    res.status(500).json({
      message: "could not create user",
    });
  }
};

export { createUser, getAllUsers };
