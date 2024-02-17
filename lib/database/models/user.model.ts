import { Schema, model, models } from "mongoose";

export interface IUSer {
    clerkId: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    photo: string;
    planId?: number;
    creditBalance?: number;

}


const UserSchema = new Schema({

    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    photo: {
        type: String,
        required: true
    },
    planId: {
        type: Number,
        default: 1
    },
    creditBalance: {
        type: Number,
        default: 10
    }
})

const User = models?.User || model("User", UserSchema)

export default User;