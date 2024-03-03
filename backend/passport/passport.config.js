import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(new Error("Invalid username or password"));
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return done(new Error("Invalid username or password"));
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );
};
