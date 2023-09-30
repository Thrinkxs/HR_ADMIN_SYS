import logo from "../../assets/icons8-mesh-50.png";
import hero from "../../assets/hr-pic.png";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../Axios";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type stateProps = {
  email: string;
  password: string;
};

const EmployeeLogin = () => {
  const [formData, setFormData] = useState<stateProps>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const schema: z.ZodType<stateProps> = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(12, { message: "Password length incorrect" })
      .max(12, { message: "Password length incorrect" }),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<stateProps>({
    // defaultValues: { name: data.name, email: data.email },
    resolver: zodResolver(schema),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const res = await Axios.post("/api/login/employee", formData);
      if (!res?.data || res.status !== 200) return alert("Invalid credentials");
      else {
        console.log("Login Success");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-bG h-screen">
      <div className="flex justify-start items-center mx-10 py-5">
        <img src={logo} alt="logo" />{" "}
        <h1 className="text-3xl font-semibold text-heroBg">
          HR<span className="text-sm italic text-herobt font-bold">Pro</span>
        </h1>
      </div>
      <div className="flex my-20   justify-evenly items-center gap-10  bg-gradient-to-t from-button2 to-heroBg bg-heroBg mx-60 h-[70vh] rounded-xl">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Employee</h3>
          <Stack direction="column" spacing={2}>
            <div className="flex flex-col">
              <TextField
                type="text"
                id="email"
                label="email"
                variant="outlined"
                {...register("email")}
                name="email"
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="mx-4 italic text-red-400">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              {" "}
              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                {...register("password")}
                name="password"
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className="mx-4 italic text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>
          </Stack>
          <button className="border border-button mx-10 py-1 rounded-md hover:text-white hover:bg-button transition-none duration-500">
            Login
          </button>
          <Link to="/" className="border text-center text-white bg-button2">
            Login as Admin
          </Link>
        </form>
        <div className="bg-heroBg ">
          <img src={hero} alt="hero" />
          <p className="font-medium py-2 -mx-3.5 bg-button2">
            " Manage all your employees without any hassle"
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
