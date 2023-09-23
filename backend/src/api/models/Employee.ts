import mongoose, { InferSchemaType } from "mongoose";
const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    tel: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    employeeManager: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

type Employee = InferSchemaType<typeof EmployeeSchema>;
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
export default EmployeeModel;
module.exports = EmployeeModel;