import express from "express";
import userController from "../controller/userController";

const router = express.Router();
const initWebRoutes = (app) => {
  router.post("/user/user-create", userController.addUser);
  router.get("/users", userController.getUsers);
  router.post("/delusers", userController.delUsers);
  router.post("/user/update-user/:id", userController.updateUsers);
  router.get("/user/update-user/:id", userController.getUserById);
  return app.use("/", router);
};
export default initWebRoutes;
