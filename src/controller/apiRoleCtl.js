import RoleService from "../service/roleService";
const getRoles = async (req, res) => {
  try {
    const data = await RoleService.getRoles();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addRoles = async (req, res) => {
  try {
    const data = await RoleService.addRoles(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delRoles = async (req, res) => {
  try {
    const data = await RoleService.delRoles(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getRolesByGroup = async (req, res) => {
  try {
    const data = await RoleService.getRolesByGroup(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
module.exports = { getRoles, addRoles, delRoles, getRolesByGroup };
