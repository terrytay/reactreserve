import mongoose from 'mongoose'

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false // False so that it wont be return to client when api is called
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin', 'root']
    }
}, {
    timestamps: true // Auto log created time and also when updated time
})

export default mongoose.models.User || mongoose.model('User', UserSchema) // Use existing || create new one. 
// User -> document, Users -> collection, auto-naming convention
