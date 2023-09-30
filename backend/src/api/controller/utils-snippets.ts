// const createEmployee = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { name, surname, phone, email, employeeManager, role, status } =
//     req.body;

//   try {
//     // Check if the user already exists by searching for the email
//     const existingUser = await EmployeeModel.findOne({ email });

//     if (existingUser) {
//       // User with the same email already exists
//       return res.status(400).json({
//         success: false,
//         message: "User with this email already exists",
//       });
//     }

//     const saltRounds = 10;
//     const hash = await bcrypt.hash("Password123#", saltRounds);

//     const employee = new EmployeeModel({
//       _id: new mongoose.Types.ObjectId(),
//       firstName: name,
//       lastName: surname,
//       phone,
//       email,
//       employeeManager,
//       status,
//       password: hash,
//       role,
//     });

//     const newEmployee = await employee.save();

//     return res.status(201).json({
//       success: true,
//       message: "New employee created successfully",
//       Employee: newEmployee,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error. Please try again.",
//     });
//   }
// };
