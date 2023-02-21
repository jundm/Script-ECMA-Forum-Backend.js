import {Router} from "express";
import {create, read} from "@controller/post";

const post = Router();

post.get("/read", read);
post.post("/create", create);
export default post;