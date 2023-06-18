import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    console.log("The body is:", req.body);

    // Step 1: Checking if the username already exists
    const checkUser = await userModel.findOne({ username });

    if (checkUser) {
      console.log("The checked user:", checkUser);
      return responseHandler.badrequest(res, "Username already in use");
    }

    // Step 2: Creating a new user
    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    // Step 3: Generating a token
    const token = jsonwebtoken.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24H",
    });

    // Step 4: Sending the response
    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (err) {
    console.log(err);
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("+password +salt +id");

    if (!user) {
      return responseHandler.badrequest(res, "User does not exist");
    }
    if (!user.validatePassword(password)) {
      return responseHandler.badrequest(res, "Invalid password");
    }

    const token = jsonwebtoken.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const { id, displayName } = user;
    responseHandler.ok(res, { token, id, displayName });
  } catch (err) {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong Password");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return responseHandler.notfound(res);

    // const token = jsonwebtoken.sign({ data: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: "24H",
    // });
    responseHandler.ok(res, user);
    return;
  } catch {
    responseHandler.error(res);
    console.log("request is not okay");
  }
};

export default { signup, signin, updatePassword, getInfo };
