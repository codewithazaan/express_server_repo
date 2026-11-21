import app from "./app";
import config from "./config";
import { userTableDB } from "./db";



const main = async() =>{

    userTableDB();

    app.listen(config.port, ()=>{
    console.log(`Server Is Running On the Port ${config.port}`)
})


}

main()




