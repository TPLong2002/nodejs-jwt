import groupService from "../service/groupService";
const getGroups = async (req, res) => {
  try {
    const data = await groupService.getGroups();
    res.status(data.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addGroups = async (req, res) => {
  try {
    const data = await groupService.addGroups(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delGroups = async (req, res) => {
  try {
    const data = await groupService.addGroups(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

module.exports = { getGroups, addGroups, delGroups };
