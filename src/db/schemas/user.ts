import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    password: string;
}

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

const Users = model<User>('user', schema);

export default Users;