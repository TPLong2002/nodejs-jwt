import express from "express";
import apiUser from "../controller/apiUserCtl";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTmdw";
const router = express.Router();

router.get("/show", apiUser.getUsers);
router.get("/account", apiUser.getUserAccount);
router.post("/add", apiUser.addUser);
router.delete("/delete", apiUser.delUsers);
router.post("/update", apiUser.updateUsers);
router.get("/id", apiUser.getUserById);

export default router;
