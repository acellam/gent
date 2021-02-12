// tslint:disable
import { PubSub } from 'apollo-server';
import User from '../../models/user';
import * as mongoose from "mongoose";
import * as jwt from 'jsonwebtoken';

const pubsub = new PubSub();

const USER_ADDED = 'USER_ADDED';


// User Queries
const UserQueries = {
    users: async (_parent: any, _args: any, _context: any) => {
        try {
            const users = await User.find();
            return users.map((user) => {
                return user;
            });
        } catch (err) {
            throw err;
        }
    },
    user: async (_parent: any, { userId }: any) => {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (err) {
            throw err;
        }
    },
    login: async (_parent: any, { email, password }: any) => {
        try {
            const user: any = await User.findOne({ email, password });
            if (!user) {
                throw new Error('User does not Exists');
            }
            const token = jwt.sign({ userId: user.id }, String(process.env.JWT_SECRET), {
                expiresIn: '1h'
            });
            return {
                userId: user.id,
                token,
                tokenExpiration: 1
            };
        } catch (err) {
            throw err;
        }
    }
};

// User Mutations
const UserMutation = {
    createUser: async (_parent: any, { userInput }: any) => {
        try {
            const user = await User.findOne({
                email: userInput.email
            });
            if (user) {
                throw new Error('User already Exists');
            } else {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: userInput.email,
                    name: userInput.name,
                    password: userInput.password
                });
                const savedUser = await newUser.save();
                pubsub.publish(USER_ADDED, {
                    userAdded: savedUser
                });
                const token = jwt.sign({ userId: savedUser.id }, String(process.env.JWT_SECRET), {
                    expiresIn: '1h'
                });
                return {
                    userId: savedUser.id,
                    token,
                    tokenExpiration: 1
                };
            }
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (_parent: any, { userId, updateUser }: any, context: any) => {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Non Authenticated');
        }
        try {
            const user = await User.findByIdAndUpdate(userId, updateUser, {
                new: true
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
};

// User Subscriptions
const UserSubscription = {
    userAdded: {
        subscribe: () => pubsub.asyncIterator([USER_ADDED])
    }
};

export { UserQueries, UserMutation, UserSubscription };
