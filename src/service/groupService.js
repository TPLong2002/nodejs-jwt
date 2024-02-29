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
module.exports = { getGroups };
