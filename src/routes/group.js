import express from "express";
import apiGroup from "../controller/apiGroupCtl";
const router = express.Router();
router.get("/groups", apiGroup.getGroups);
router.post("/groups", apiGroup.addGroups);
router.delete("/groups", apiGroup.delGroups);
export default router;
