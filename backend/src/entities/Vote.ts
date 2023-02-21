import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import BaseEntity from '@entities/Entity';
import User from "@entities/User";
import Post from "@entities/Post";
import Comment from "@entities/Comment";


@Entity("vote")
export default class Vote extends BaseEntity {
    @Column()
    value: number;

    @ManyToOne(() => User)
    user: User;

    @Column()
    userId: number;

    @Column({nullable: true})
    postId: number;

    @ManyToOne(() => Post)
    post: Post;

    @Column({nullable: true})
    commendId: number;

    @ManyToOne(() => Comment)
    comment: Comment;
}
