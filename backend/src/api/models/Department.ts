import mongoose, { InferSchemaType } from "mongoose";

const DeptSchema = new mongoose.Schema({
  deptName: {
    type: String,
    required: true,
  },
  deptManager: {
    type: String,
    required: true,
  },

  deptStatus: {
    type: Boolean,
    required: true,
  },
});

type Dept = InferSchemaType<typeof DeptSchema>;

const Dept = mongoose.model("Dept", DeptSchema);

export default Dept;
