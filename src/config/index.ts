import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    port : process.env.PORT,
    connection_string: process.env.DATABASE_URL as string,
    secret_key: process.env.ACCESS_TOKEN_SECRET as string,
    refresh_key: process.env.REFRESH_TOKEN_SECRET as string
   
}
export default config;