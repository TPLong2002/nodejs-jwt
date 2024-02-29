import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const createNewUser = async (username, password) => {
  const cnn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "dulieu",
    Promise: bluebird,
  });
  let hasPass = hashPassword(password);
  try {
    const data = await db.User.create({
      username: username,
      password: hasPass,
    });
    console.log(data.get({ raw: true }));
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async () => {
  // test association
  // const user = await db.User.findOne({
  //   include: { model: db.Group, attributes: ["id", "name", "description"] },
  //   attributes: ["id", "username"],
  //   where: { id: 1 },
  //   raw: true,
  //   nest: true,
  // }).then((user) => {
  //   console.log("user =>", user);
  // });
  // const roles = await db.Role.findAll({
  //   include: {
  //     model: db.Group,
  //     where: { id: 1 },
  //     attributes: ["id", "name", "description"],
  //   },
  //   attributes: ["id", "url", "description"],
  //   raw: true,
  //   nest: true,
  // }).then((roles) => {
  //   console.log("roles =>", roles);
  // });

  // const cnn = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "dulieu",
  //   Promise: bluebird,
  // });

  try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (error) {
    console.log(error);
  }
};
const delUsers = async (id) => {
  const cnn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "dulieu",
    Promise: bluebird,
  });
  try {
    await db.User.destroy({ where: { id: id } });
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (id) => {
  const cnn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "dulieu",
    Promise: bluebird,
  });
  try {
    const user = await db.User.findOne({ where: { id: id } });
    console.log(user.get({ plain: true }));
    return user;
  } catch (error) {
    console.log(error);
  }
};
const updateUsers = async (id, username) => {
  const cnn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "dulieu",
    Promise: bluebird,
  });
  try {
    await db.User.update({ username: username }, { where: { id: id } });
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
};
