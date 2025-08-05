import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Added expiration time to the token
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id, // Include userId
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User Already Exists" }); // Changed to status 400
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" }); // Changed to status 400
        }

        // Validating password length and strength
        if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            return res.status(400).json({ // Changed to status 400
                success: false,
                message: "Password must be at least 8 characters long and contain both letters and numbers"
            });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();

        // Creating a JWT token
        const token = createToken(user._id);

        // Sending the response
        res.status(201).json({ success: true, token }); // Changed to status 201 for successful creation
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error: " + error.message }); // Added proper status code
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    
    try{

        const {email,password}= req.body

        if (email=== process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+ password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false, message:"Invalid credentials"})
    }
    
}
catch(error){
    res.json({success:false,message:error.message})

}
}

export { loginUser, registerUser, adminLogin };