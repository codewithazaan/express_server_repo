import type { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction ) =>{

    console.log("This Is Protected Route");

    // console.log("Headers:", req.headers.authorization)

    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({
            success: false,
            message: "Unauthorized Access!!!"
        })
    }

    next();

}
export default auth;