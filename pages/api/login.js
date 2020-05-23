import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDb()

export default async (req, res) => {
    const {email, password} = req.body
    try {
        // Check to see if a user exists with the provided email
        const user = await User.findOne({email}).select('+password')

        // if not, return error
        if (!user) {
            return res.status(404).send("Email/password do not match")
        }

        // Check to see if user password matches the one in database
        const passwordMatch = await bcrypt.compare(password, user.password)
        // If so, generate a token
        if (passwordMatch) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
            // Send that token to client
            res.status(200).json(token)
        } else {
            res.status(401).send("Email/password do not match")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Error logging in user")
    }
}