import db from "../models";

const getGroups = async () => {
  try {
    const data = await db.Group.findAll({ order: [["description", "ASC"]] });
    if (data && data.length > 0) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: data,
      };
    } else {
      return {
        status: 500,
        code: 1,
        message: "fail",
        data: [],
      };
    }
  } catch (error) {
    return {
      status: 500,
      code: -1,
      message: "fail",
      data: [],
    };
  }
};
const addGroups = async (data) => {
  try {
    const groups = await db.Group.findAll({
      attributes: ["name", "description"],
      raw: true,
    });
    let differenceGroup = data.filter(
      ({ name: id1 }) => !groups.some(({ name: id2 }) => id2 === id1)
    );
    if (differenceGroup.length === 0) {
      return { status: 200, code: 0, message: "Notthing create", data: res };
    }
    const res = await db.Group.bulkCreate(differenceGroup);

    if (res) {
      return {
        status: 200,
        code: 0,
        message: `Create success: ${differenceGroup.length} group`,
        data: res,
      };
    } else {
      return { status: 500, code: -1, message: "error", data: "" };
    }
  } catch (error) {
    return {
      status: 500,
      code: -1,
      message: "fail",
      data: [],
    };
  }
};
const delGroups = async (id) => {
  const res = await db.Group.destroy({ where: { id: id } });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
module.exports = { getGroups, addGroups, delGroups };
