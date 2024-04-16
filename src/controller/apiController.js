import apiController from "../service/apiService";

const test = async (req, res) => {
  return res.json({ message: "hello world", data: "test" });
};

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({ message: "missing value", code: 2 });
    }
    if (req.body.password.length < 6) {
      return res.status(200).json({ message: "password has short", code: 2 });
    }
    let data = await apiController.register(req.body);

    return res
      .status(data.status)
      .json({ message: data.message, code: data.code });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1 });
  }
};
const Login = async (req, res) => {
  try {
    if (!req.body.valueLogin || !req.body.password) {
      return res.status(200).json({ message: "missing value", code: 2 });
    }
    if (req.body.password.length < 6) {
      return res.status(200).json({ message: "password has short", code: 2 });
    }
    console.log(req.body.valueLogin);
    let data = await apiController.login(req.body);
    if (data?.data?.access_token) {
      res.cookie("token", data.data.access_token, {
        httpOnly: true,
      });
      return res
        .status(data.status)
        .json({ message: data.message, code: data.code, data: data.data });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1 });
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "logout success", code: 0 });
};
module.exports = { test, register, Login, logout };
