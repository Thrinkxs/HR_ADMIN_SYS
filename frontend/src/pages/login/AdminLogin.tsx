import logo from "../../assets/icons8-mesh-50.png";
import hero from "../../assets/hr-pic.png";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import {
  Link,
  Navigate,
  useNavigate,
  redirect,
  useLocation,
} from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Axios } from "../../Axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/LoginContext";
import jwtDecode from "jwt-decode";

type stateProps = {
  username: string;
  password: string;
};

const AdminLogin = () => {
  const [formData, setFormData] = useState<stateProps>({
    username: "",
    password: "",
  });
  const { auth, setAuth, userRole, setUserRole, user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const schema: z.ZodType<stateProps> = z.object({
    username: z
      .string()
      .min(16, { message: "Incorrect username" })
      .max(16, { message: "Incorrect username" }),
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
      const res = await Axios.post("/api/login/admin", formData);
      if (!res?.data || res.status !== 200) return alert("Invalid credentials");
      else {
        console.log("Login Success");

        setAuth(true);

        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setUserRole(res.data.user.role);
        // const decodedUser = jwtDecode(res.data.token);
        const decodedUser = res.data.user.role;
        localStorage.setItem("user", JSON.stringify(decodedUser));
        navigate("/dashboard");

        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const decodedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
      setUserRole(JSON.parse(decodedUser));
      setUser(decodedUser);
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="bg-bG h-screen">
      <div className="flex justify-start items-center mx-10 py-5">
        <img src={logo} alt="logo" />{" "}
        <h1 className="text-3xl font-semibold text-heroBg">
          HR<span className="text-sm italic text-herobt font-bold">Pro</span>
        </h1>
      </div>
      <div className="flex my-20   justify-evenly items-center gap-10 bg-heroBg mx-60 h-[70vh] rounded-xl">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Admin</h3>
          <Stack direction="column" spacing={2}>
            <div className="flex flex-col">
              <TextField
                {...register("username")}
                name="username"
                id="username"
                label="Username"
                variant="outlined"
                onChange={handleInputChange}
                required
              />
              {errors.username && (
                <span className="mx-4 italic text-red-400">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              {" "}
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                {...register("password")}
                name="password"
                type="password"
                onChange={handleInputChange}
                required
              />
              {errors.password && (
                <span className="mx-4 italic text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>
          </Stack>
          <button
            type="submit"
            className="border border-button mx-10 py-1 rounded-md hover:text-white hover:bg-button transition-none duration-500"
          >
            Login
          </button>
          <Link
            to="/login/employee"
            replace={true}
            className="border text-center bg-button2"
          >
            Login as Employee
          </Link>
        </form>
        <div className="bg-heroBg ">
          <img src={hero} alt="hero" />
          <p className="font-medium py-2 -mx-3.5">
            " Manage all your employees without any hassle"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
