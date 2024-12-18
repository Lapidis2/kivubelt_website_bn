require("dotenv").config();
const User = require("../modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");



const signup_post = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.json({ message: "user already exist" });
        }
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword,
            isConfirmed: false,
            confirmToken: crypto.randomBytes(20).toString("hex"),
        };
        const user = await User.create(newUser);

        await user.save();

        const token = await jwt.sign({ user }, process.env.SCRET_KEY, {
            expiresIn: "1hr",
        });

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.Admin_email,
                pass: process.env.admin_psswd,
            },
        });

        const confirmLink = `http://${req.headers.host}/confirm/${user.confirmationToken}`;

        const response = await transporter.sendMail({
            from: process.env.Admin_email,
            to: email,
            subject: "Confirmation of email ",
            html: `<p>Dear ${name},</p>
                <p>Thank you for registering to our website.</p>
                <p>Please click <a href='${confirmLink}'>Here</a>To confirm your account.</p>
                `,
        });
        if (response) {
            return res
                .status(200)
                .send({
                    mesage: "user regisetered success full.Please check your email to confirm",
                    user,
                    token
                });
        } else {
            throw new error("failed to send confirmation token", error);
        }

    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to sign up' });

    }

};
// login Route
const signin_post = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
        }

        // Create a JWT token
        const token = await jwt.sign({ userId: user._id }, process.env.SCRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ message: 'login successful', user, token })
    } catch (error) {
        res.json({ message: "Internal server error" }, { error: error.mesage });
    }
};
//get all user
const get_all_user = async(req, res) => {
    const users = await User.find();
    if (!users || users.length == 0) {
        res.status(404).json({ message: "NO user found" })
    }
    res.status(200).json({
        message: "all registered users ",
        users
    })
};
const update_user = async(req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;
        console.log(id)
        const updateUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        console.log(updateUser)

        res.status(200).json({ message: "User updated successfully", updateUser });
    } catch (error) {
        res.json({ message: "Internal server error" }, error);
    }
};

const delete_user = async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(400).json({ mesage: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfull" });
    } catch (error) {
        res.status(500).json({ message: "internal server error", error });
    }
};
const confirmEmail = async(req, res) => {

    try {
        const token = req.params.token
        const user = await User.findOne({
            confirmToken: token
        })
        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }
        user.isConfirmed = true,
            user.confirmToken = null
        await user.save()
        res.status(200).json({
            message: "Account confirmation successfull!"
        })

    } catch (error) {
        res.status(500).json({ message: "internal server error", error })

    }
}

const get_user = (req, res) => {};


module.exports = {
    signin_post,
    signup_post,
    update_user,
    get_all_user,
    get_user,
    delete_user,
    confirmEmail
};