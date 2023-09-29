import express from "express";
import controller from "../controller/Admin";

const router = express.Router();

router.post("/", controller.loginAdmin);

export = router;
