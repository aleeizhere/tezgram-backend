import * as mongoose from 'mongoose';

export const AppSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  images: [{ type: String, required: true }],
});

export interface AppModel extends mongoose.Document {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  images: string[];
}

/*
import * as mongoose from 'mongoose';
export const registerSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String },
  email: { type: String },
  password: { type: String },
  posts: [
    {
      course: { type: String },
      description: { type: String },
    },
  ],
  proposals: [
    {
      email: { type: String },
      emails: { type: String },
      course: { type: String },
      detail: { type: String },
      offer: { type: String },
    },
  ],
  accepts: [
    {
      email: { type: String },
      emails: { type: String },
      course: { type: String },
      detail: { type: String },
      offer: { type: String },
    },
  ],
  //cpassword: { type: String, required: true },
  //contact: { type: Number, required: true },
  //role: { type: String, required: true },
});
export interface Register extends mongoose.Document {
  map(arg0: () => void);
  proposal: any;
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  posts: Posts[];
  proposals: Proposals[];
  accepts: Accepts[];
  //  cpassword: string;
  //contact: number;
  //role: string;
}
export interface Posts {
  course: string;
  description: String;
}
export interface Proposals {
  _id: string;
  email: string;
  emails: string;
  course: string;
  detail: string;
  offer: String;
}
export interface Accepts {
  _id: string;
  email: string;
  emails: string;
  course: string;
  detail: string;
  offer: String;
}
*/
