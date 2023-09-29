import mongoose, { InferSchemaType } from "mongoose";

const DeptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },

  status: {
    type: String,
  },
});

type DeptModel = InferSchemaType<typeof DeptSchema>;

const DeptModel = mongoose.model("DeptModel", DeptSchema);

export default DeptModel;
