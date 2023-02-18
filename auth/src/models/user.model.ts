import mongoose from "mongoose";

interface UserAttr {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserAttr>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserAttr>("User", userSchema);

const user = new User({ email: "fsaf", pass: 342342 });

export { User };
