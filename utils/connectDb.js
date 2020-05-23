import mongoose from 'mongoose'
const connection = {}

export default async function connectDb() {
    if (connection.isConnected) {
        // Use existing database connection
        return;
    }
    // Use a new database connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


    connection.isConnected = db.connections[0].readyState;

}