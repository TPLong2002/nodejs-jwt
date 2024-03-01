import db from "../models";
import bcrypt from "bcryptjs";
import JWTServices from "./JWTService";
import JWTmdw from "../middleware/JWTmdw";
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const checkEmail = async (email) => {
  const check = await db.User.findOne({
    where: {
      email: email,
    },
  });
  if (check) {
    return true;
  }
  return false;
};
const checkPhone = async (phone) => {
  const check = await db.User.findOne({
    where: {
      phone: phone,
    },
  });
  if (check) {
    return true;
  }
  return false;
};
const register = async (data) => {
  try {
    if (await checkEmail(data.email)) {
      return {
        status: 400,
        message: "email already exist ",
        code: 3,
        data: {},
      };
    }
    if (await checkPhone(data.phone)) {
      return { status: 400, message: "phone already exist", code: 3, data: {} };
    }
    const user = await db.User.create({
      username: data.username,
      email: data.email,
      address: data.address,
      gender: data.gender,
      phone: data.phone,
      groupId: data.groupId,
      password: hashPassword(data.password),
    });
    return { status: 200, message: "register success", code: 0, data: {} };
  } catch (error) {
    return { status: 500, message: "Server Error", code: -1, data: {} };
  }
};

const checkPassword = (Password, hashPassword) => {
  return bcrypt.compareSync(Password, hashPassword);
};
const login = async (data) => {
  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
      },
    });

    if (user) {
      if (checkPassword(data.password, user.password)) {
        let roles = await JWTServices.getGroupsWithRole(user);
        // console.log("roles =>", roles);
        const payload = {
          email: user.email,
          username: user.username,
          roles: roles,
        };
        const token = await JWTmdw.createToken(payload);
        return {
          status: 200,
          message: "login success",
          code: 0,
          data: {
            email: user.email,
            username: user.username,
            access_token: token,
            roles: roles,
          },
        };
      }
    }
    return {
      status: 400,
      message: "Email,Phone or Password is wrong",
      code: 3,
      data: {},
    };
  } catch (error) {
    return { status: 500, message: "Server Error", code: -1, data: {} };
  }
};

module.exports = { register, login };
