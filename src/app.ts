
import express, { type Application, type NextFunction, type Request, type Response} from "express";

import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import fs from "fs";
import logger from "./middleware/logger";
import { errorMonitor } from "events";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";





const app: Application = express()

//?CORS Origin START
const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
}
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors( corsOptions))
//?CORS Origin END

//!Cookie Middleware START
app.use(cookieParser())
//!Cookie Middleware END


 app.use(express.json());
 app.use(express.text());
 app.use(express.urlencoded({extended: true}))
 //!CUSTOM MIDDLEWARE Creation START
app.use(logger);
 //!CUSTOM MIDDLEWARE Creation END


 app.use("/api/v1/users", userRoute);
 app.use("/api/v1/profile", profileRoute );
 app.use("/api/v1/auth", authRoute);


//*  Class Related Practice START
app.post('/',(req: Request, res: Response)=>{

    const {name, email, password} = req.body;
    // console.log(password)
    res.status(200).json({
        success: true,
        message: "This Is Test API JSON DATA",
        author: "Tabu",
        data: {name, email}
    })
    

})
//*  Class Related Practice END

//Get From Root
app.get('/', (req : Request, res : Response)=>{
res.json({
    success : true,
    message : "Welcome To My Root Express Server!!!"
});
});

app.get('/about', (req, res)=>{
    res.send("I am learning Typescript & Express.js")
})

app.get('/contact',(req, res)=>{
    res.send("Contact Me at azaan@gmail.com")
})


// User Information API Make Task START

app.get('/user/:id', (req:Request, res:Response)=>{
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).send("Your Id Must be a Number")
    }
    res.status(200).json({
        "message" : "User Information",
        "UserId": id
    })
    console.log(id)
})
// User Information API Make Task END

//!Searching Product with Using req.query START
app.get("/products", (req, res)=>{
    const queryParams = req.query;
    res.status(200).json({
         data: queryParams,
        message: " This Is Your Product"
    })
    console.log(queryParams)
})
//!Searching Product with Using req.query END


// express.json() Middleware ব্যবহার করবে।
// POST Request তৈরি করবে।
// req.body দিয়ে User-এর Name এবং Email গ্রহণ করবে।
// res.status(201).json() দিয়ে Response পাঠাবে।

//?Create User Task START
 const users: any[] = []; 
app.post('/users', (req, res)=>{ 
    const userBody = req.body; 
    users.push(userBody)
    res.status(201).json({
        message: "User Information Created Successfully",
        data: userBody
    })
})
app.get('/users', (req, res)=>{
    res.status(200).json({
        message: "All Users Are Here",
        data: users
    })
})
//?Create User Task END


//!Global Error MiddleWare Handler START
app.use(globalErrorHandler);
//!Global Error MiddleWare Handler END

//!Red Comment
//?Blue Comment
//*Green Comment
//todo  Orange Comment



export default app;
 

