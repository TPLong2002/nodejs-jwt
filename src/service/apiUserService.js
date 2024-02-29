import bcrypt from "bcryptjs";

import db from "../models";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const createNewUser = async (data) => {
  try {
    const res = await db.User.create({
      username: data.username,
      email: data.email,
      address: data.address,
      gender: data.gender,
      phone: data.phone,
      groupId: data.groupId,
      password: hashPassword(data.password),
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { code: -1, message: error.message, data: "" };
  }
};
const getUsers = async () => {
  try {
    const users = await db.User.findAll({
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: [
        "id",
        "username",
        "email",
        "address",
        "gender",
        "phone",
        "groupId",
      ],
      nest: true,
    });
    if (users && users.length > 0) {
      return { status: 200, code: 0, message: "success", data: users };
    } else {
      return { status: 500, code: 1, message: "fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const getUserByPage = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: ["id", "username", "email", "address", "gender", "phone"],
      nest: true,
      offset: +offset,
      limit: +limit,
    });
    const totalPage = Math.ceil(count / limit);
    if (rows && rows.length > 0) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: { totalPage: totalPage, data: rows },
      };
    } else {
      return { status: 500, code: 1, message: "fail", data: [] };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const delUsers = async (data) => {
  try {
    const res = await db.User.destroy({ where: { id: data.id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getUserById = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id: id },
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: [
        "id",
        "username",
        "email",
        "address",
        "gender",
        "phone",
        "groupId",
      ],
      nest: true,
    });
    if (user) {
      return { status: 200, code: 0, message: "success", data: user };
    } else {
      return { status: 500, code: 1, message: "fail", data: [] };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateUsers = async (data) => {
  try {
    const res = await db.User.update(data, { where: { id: data.id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  getUsers,
  delUsers,
  updateUsers,
  getUserById,
  getUserByPage,
};
