import mongoose from "mongoose";


export const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.DBSTRING)
        console.log("db connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}