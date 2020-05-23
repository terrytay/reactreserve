import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
import Cart from '../../models/Cart'

connectDb()

export default async (req, res) => {
    const {name, email, password} = req.body
    try {
        // Validate name / email / password
        if (!isLength(name, {min: 3, max: 10})) {
            return res.status(422).send("Name must be 3-10 characters long");
        } else if (!isLength(password, {min: 6})) {
            return res.status(422).send("Password must be at least 6 characters")
        } else if (!isEmail(email)) {
            return res.status(422).send("Email must be valid")
        }

        // Check to see if user exists in db
        const user = await User.findOne({email})
        if (user) {
            return res.status(422).send(`User already exists with email ${email}`);
        }

        // Hash password for security and privacy
        const hash = await bcrypt.hash(password, 10);

        // create user
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save(); //Save to collection in database

        // Create cart for new user
        await new Cart({ user: newUser._id}).save()

        // create token for new user
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: '1d' // 1d stands for one day
        });
        // send back token
        res.status(201).json(token);
    } catch (error) {
        console.error(error)
        res.status(500).send("Error signing up user. Please try again later.")
    }
}