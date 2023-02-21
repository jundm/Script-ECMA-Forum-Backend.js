import {Entity, Column, Index, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import BaseEntity from '@entities/Entity';
import User from '@entities/User';
import Vote from "@entities/Vote";
import Comment from '@entities/Comment';


@Entity('post')
export default class Post extends BaseEntity {
    // TODO 작성자(작성자의 고유키 join), 제목, 내용, 고유키(id primary key), 좋아요,
    // TODO 코멘트는 별도 테이블로 빼서 조인한다

    @Index()
    @Column({name: 'user_id'})
    userId: string;

    @Column()
    title: string;
    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name:'user_id',referencedColumnName:'id'})
    user: User;

    @OneToMany(() => Vote, (vote) => vote)
    votes: Vote[];

    @OneToMany(() => Comment, (comment) => comment.id)
    comments: Comment[];

}
