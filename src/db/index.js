import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'

export const connectDB = async () => {
    try {
    const db = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DBNAME>',DB_NAME)
        const connInstance = await mongoose.connect(db);
        console.log(`\n MongoDB is connected at hose:: ${connInstance.connection.host} 🚀🚀`)
    } catch (error) {
        console.log('MONGODB connection ERROR::',error)
    }
}