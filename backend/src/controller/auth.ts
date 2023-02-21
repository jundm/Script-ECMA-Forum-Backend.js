import {Request, Response} from 'express';
import {isEmpty, validate} from "class-validator";
import cookie from 'cookie';
import jwt, {Secret} from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import User from "@entities/User";

interface errorsType {
    email?: string;
    username?: string;
}

const mapError = (errors: any[]) => {
    return errors.reduce((prev: any, err: any) => {
        prev[err.property] = Object.entries(err.constraints)[0][1];
    }, {});
};

const register = async (req: Request, res: Response) => {
    const {email, username, password} = req.body;
    try {
        let errors: errorsType = {};
        const emailUser = await User.findOneBy({email});
        const usernameUser = await User.findOneBy({username});
        if (emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
        if (usernameUser) errors.username = "이미 이 사용자 이름이 사용되었습니다.";
        if (Object.keys(errors).length > 0) return res.status(400).json(errors);

        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password;
        let userErrors = await validate(user);
        if (userErrors.length > 0) return res.status(400).json(mapError(userErrors));
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({error});
    }
};

const login = async (req: Request, res: Response) => {
    // TODO 입력 값에 대한 검증
    // TODO 세션 or jwt
    // TODO 암호화 검증 단방향 암호화 hash fucntion
    const {username, password} = req.body;
    try {
        let errors: any = {};
        if (isEmpty(username)) errors.username = "사용자 이름은 비워둘 수 없습니다.";
        if (isEmpty(password)) errors.password = "비밀번호는 비워둘 수 없습니다.";
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }
        // 디비에서 유저 찾기
        const user = await User.findOneBy({username});
        if (!user) return res.status(404).json({username: "사용자 이름이 등록되지 않았습니다."});
        // 유저가 있다면 비밀번호 비교하기
        // @ts-ignore
        // let passwordMatches = await bcrypt.compare(password, user.password);
        const passwordMatches = password === user.password;
        // 비밀번호가 다르다면 에러 보내기
        if (!passwordMatches) {
            return res.status(401).json({password: "비밀번호가 잘못되었습니다."});
        }
        // 비밀번호가 맞다면 토큰 생성
        if (!process.env.JWT_SECRET) return res.status(500).json("토큰이 없습니다");
        const token = jwt.sign({username}, process.env.JWT_SECRET);
        // 쿠키저장
        res.set("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        }));
        return res.status(200).json({user, token});

    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export {register, login};
