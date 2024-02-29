import db from "../models";

const getRoles = async () => {
  const res = await db.Role.findAll();
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const addRoles = async (data) => {
  const roles = await db.Role.findAll({
    attributes: ["url", "description"],
    raw: true,
  });

  let differenceRole = data.filter(
    ({ url: id1 }) => !roles.some(({ url: id2 }) => id2 === id1)
  );
  if (differenceRole.length === 0) {
    return { status: 200, code: 0, message: "Notthing create", data: res };
  }
  const res = await db.Role.bulkCreate(differenceRole);

  if (res) {
    return {
      status: 200,
      code: 0,
      message: `Create success: ${differenceRole.length} role`,
      data: res,
    };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const updateRoles = async (data) => {
  console.log(data);
  const res = await db.Role.bulkCreate(data);
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const delRoles = async (id) => {
  const res = await db.Role.destroy({ where: { id: id } });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getRolesByGroup = async (id) => {
  const roles = await db.Role.findAll({
    include: {
      model: db.Group,
      where: { id: id },
      attributes: [],
    },
    attributes: ["id", "url", "description"],
    // raw: true,
    nest: true,
  });
  if (roles) {
    return { status: 200, code: 0, message: "success", data: roles };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
module.exports = { getRoles, addRoles, updateRoles, delRoles, getRolesByGroup };
