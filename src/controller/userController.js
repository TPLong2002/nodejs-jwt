import userService from "../service/userService";

const addUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await userService.createNewUser(username, password);
  return res.redirect("/users");
};
const getUsers = async (req, res) => {
  var data = await userService.getUsers();
  res.render("user.ejs", { data });
};
const delUsers = async (req, res) => {
  await userService.delUsers(req.body.id);
  return res.redirect("/users");
};
const getUserById = async (req, res) => {
  var data = await userService.getUserById(req.params.id);
  res.render("update_user.ejs", { data });
};
const updateUsers = async (req, res) => {
  await userService.updateUsers(req.params.id, req.body.username);
  return res.redirect("/users");
};
module.exports = {
  addUser,
  getUsers,
  delUsers,
  updateUsers,
  getUserById,
};
