import express from "express";
import controller from "../controller/Employee";

const router = express.Router();

router.get("/", controller.readAllEmployee);

export = router;
