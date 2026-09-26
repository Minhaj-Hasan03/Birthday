import express from "express";
import {
  saveBirthdayMessage,
} from "../controllers/birthdayMessageController.js";

const birthdayMessageRouter = express.Router();

birthdayMessageRouter.post(
  "/save",
  saveBirthdayMessage
);

export default birthdayMessageRouter;