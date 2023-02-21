import {Request, Response} from "express";
import Post from "@entities/Post";

const create = (req: Request, res: Response) => {
    //TODO req 유저정보, 제목, 내용, 등록시간,
    const {user, title, content} = req.body;
    const post = new Post();
    post.user = user;
    post.title = title;
    post.content = content;
    post.save();
    return res.status(200).json("success!");
};

const read = async (req: Request, res: Response) => {
    const post = await Post.findOneBy({id: 0});
    if (post === null) return;
    console.log(post, 'hi');
    return res.status(200).json(post);
};


export {create, read};