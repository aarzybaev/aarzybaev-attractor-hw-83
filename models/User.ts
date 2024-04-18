import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import {UserFields, UserMethods, UserModel} from "../types";
import config from "../config";
import {randomUUID} from "crypto";

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;



const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
}, config.mongoose.versionKey);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

UserSchema.set('toJSON', {
    transform: (doc_, ret, options_) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function(password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = randomUUID();
};

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);

export default User;
