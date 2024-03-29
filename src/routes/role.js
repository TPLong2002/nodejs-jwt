import express from "express";
import roleCtl from "../controller/apiRoleCtl";
const router = express.Router();

router.get("/roles", roleCtl.getRoles);
router.post("/roles", roleCtl.addRoles);
router.delete("/roles", roleCtl.delRoles);
router.get("/rolesgroup", roleCtl.getRolesByGroup);

export default router;
