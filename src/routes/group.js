import express from "express";
import apiGroup from "../controller/apiGroupCtl";
const router = express.Router();
router.get("/groups", apiGroup.getGroups);
export default router;
