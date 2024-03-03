import { users } from "../dummyData/data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        signup: async (_, { input }, context) => {
            try {
                const { name, username, email, password, gender } = input;
                if (!name || !username || !email || !password || !gender) {
                    throw new Error("All fields are required");
                }
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    name,
                    email,
                    username,
                    password,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                    gender,
                });

                await newUser.save();
                await context.login(newUser);

                return newUser;
            } catch (error) {
                console.log("Error in signup");
                throw new Error(err.message || "Internal server error");
            }
        },

        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;

                const { user } = await context.authenticate("graphql=local", { username, password });
                return user;
            } catch (err) {
                console.log("Error in login");
                throw new Error(err.message || "Internal server error");
            }
        },

        logout: async (_, _, context) => {
            try {
                await context.logout();

                req.session.destroy((err) => {
                    if (err) throw err;
                });
                res.clearCookie("connect.sid");

                return { message: "Logged out sucessfully" };
            } catch (err) {
                console.log("Error in logout");
                throw new Error(err.message || "Internal server error");
            }
        },
    },
    Query: {
        authUser: async (_, _, context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (err) {
                console.log("Error in authUser");
                throw new Error(err.message || "Internal server error");
            }
        },
        user: (_, { userId }) => {
            try {
                return users.findById(userId);
            } catch (err) {
                console.log("Error in user find by id");
                throw new Error(err.message || "Internal server error");
            }
        },
    },
};

export default userResolver;
