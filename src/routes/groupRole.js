import express from "express";
import apiGroupRole from "../controller/groupRoleCtl";

const router = express.Router();

router.post("/grouproles", apiGroupRole.addGroupRole);

export default router;
