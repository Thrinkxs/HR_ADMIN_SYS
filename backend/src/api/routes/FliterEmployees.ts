import express from "express";
import controller from "../controller/Status";

const router = express.Router();

router.get("/status=active", controller.filterEmployee);

export = router;
