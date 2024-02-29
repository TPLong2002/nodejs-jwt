import db from "../models";

const getGroupsWithRole = async (user) => {
  let roles = await db.Group.findAll({
    where: { id: user.groupId },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: {
        attributes: [],
      },
    },

    // raw: true,
    // nest: true,
  });
  return roles;
};
module.exports = { getGroupsWithRole };
