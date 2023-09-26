import mongoose, { InferSchemaType } from "mongoose";

const userAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
type userAdmin = InferSchemaType<typeof userAdminSchema>;

const userAdmin = mongoose.model("userAdmin", userAdminSchema);

export default userAdmin;
