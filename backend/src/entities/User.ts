import {Entity, Column, Index, OneToMany, BeforeInsert} from "typeorm";
import {IsEmail, Length} from "class-validator";
import bcrypt from "bcryptjs";
import BaseEntity from '@entities/Entity';
import Post from "@entities/Post";


@Entity('user')
export default class User extends BaseEntity {
    @Index()
    @IsEmail()
    @Length(1, 255, {message: "이메일 주소가 잘못되었습니다."})
    @Column({unique: true})
    email: string;

    @Index()
    @Length(3, 32, {message: "사용자 이름은 3자 이상이여야 합니다."})
    @Column({unique: true})
    username: string;

    @Column()
    @Length(6, 255, {message: "비밀번호는 6자리 이상이여야 합니다."})
    password: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
    //
    // @OneToMany(() => Vote, (vote) => vote.user)
    // votes:Vote[]

    // 그대로 쓰면 됨
    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 6);
    // }
}
