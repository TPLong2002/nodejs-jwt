import apiUserService from "../service/apiUserService";

const addUser = async (req, res) => {
  try {
    const data = await apiUserService.createNewUser(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUsers = async (req, res) => {
  try {
    if (req.query.page) {
      let page = req.query.page;
      let limit = req.query.limit;
      var data = await apiUserService.getUserByPage(page, limit);
      res
        .status(data.status)
        .json({ code: data.code, message: data.message, data: data.data });
    } else {
      var data = await apiUserService.getUsers();
      res
        .status(data.status)
        .json({ code: data.code, message: data.message, data: data.data });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delUsers = async (req, res) => {
  try {
    const data = await apiUserService.delUsers(req.body);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUserById = async (req, res) => {
  try {
    const data = await apiUserService.getUserById(req.query.id);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const updateUsers = async (req, res) => {
  try {
    const data = await apiUserService.updateUsers(req.body);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUserAccount = async (req, res) => {
  // res.cookie("token", req.token, {
  //   httpOnly: true,
  // });
  return res.status(200).json({
    code: 0,
    message: "ok",
    data: { isAuth: true, access_token: req.token, ...req.user },
  });
};
module.exports = {
  addUser,
  getUsers,
  delUsers,
  updateUsers,
  getUserById,
  getUserAccount,
};
