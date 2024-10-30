const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { JWT_SECRET } = require("../config/server.config");

// Note: can make it as another service but just do with single file and here in this serivice

const authController = async (req, res) => {
    try {
        const { name, email } = req.body;
        console.log(req.body);

        let existingUser = await User.findOne({ email });

        if (!existingUser) {
            existingUser = await User.create({ name, email });
            console.log("✅ New user created =>", existingUser);
        } else {
            console.log("🚫 User already exists =>", existingUser);
        }

        const tokenData = {
            name : existingUser.name,
            email: existingUser.email,
            id: existingUser._id,
        };
        const jwtSecret = JWT_SECRET;
        const options = {
            expiresIn: "24h",
        };
        const jwtToken = jwt.sign(tokenData, jwtSecret, options);

        console.log("JWT token generated =>", jwtToken);

        const cookiesOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires after 24 hours
            httpOnly: true,
            sameSite: "None",
        };
        
        res.cookie("tokenData", jwtToken, cookiesOptions).status(200).json({
            success: true,
            message: existingUser ? "User login success" : "User created and logged in",
            user: existingUser,
            token: jwtToken,
        });
    } catch (error) {
        console.log("🚫 Authentication failed =>", error);
        return res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error,
        });
    }
};

const checkingToken = async (req, res, next) => {
    try {
        const token = req.cookies?.tokenData || req.body?.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        console.log("💫 token in auth ==>", token);
        
        console.log("req.cookies", req.cookies.tokenData);
        console.log("req.body.token", req.body?.token);
        console.log("header", req.header("Authorization"));

        if (!token) {
            console.log("🚫 token is not available");
            return res.status(400).json({
                success: false,
                message: "Token is not available so Do Login again",
            });
        }

        // Checking if token is valid or not
        try {
            const jwtSecret = JWT_SECRET;
            const decoded = await jwt.verify(token, jwtSecret);
            console.log("💫 decoded token res =>", decoded);

            // Adding decoded token to request
            req.decodedUser = decoded;

            console.log("✅ token verified successful");
        
            return(
                res.status(200).json(
                    {
                        success : true, 
                        message : "token verfied",
                    }
                )
            )

        } catch (error) {
            console.log("🚫 token is invalid");
            return res.status(400).json({
                success: false,
                message: "Token is invalid",
            });
        }
    } catch (error) {
        console.log("🚫 checking token error =>", error);
        return res.status(500).json({
            success: false,
            message: "checking token error",
            error: error,
        });
    }
};

module.exports = { authController, checkingToken };
