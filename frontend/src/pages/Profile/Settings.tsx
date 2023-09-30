import { useAuth } from "../../context/LoginContext";
import React, { useState, useEffect } from "react";
import { stateProps, useData } from "../../context/FormDataContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, Select } from "@mui/material";
import { Axios } from "../../Axios";
import Backdrop from "@mui/material/Backdrop";

type stateProps = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

const Settings = () => {
  const { user, setUser } = useAuth();
  const [success, setSuccess] = useState(false);
  const { submitting, setSubmitting } = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<stateProps>({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  //Schema
  const schema: z.ZodType<stateProps> = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(30, { message: "Name should not be longer than 30 characters" }),
    surname: z
      .string()
      .min(2, { message: "Surname must be at least 2 characters long" })
      .max(30, { message: "Surname should not be longer than 30 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().refine((value) => value.length === 10, {
      message: "Phone number must be 10 digits long",
    }),
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

  //handle input change in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //handle submit/post to api
  const onSubmit = async () => {
    setSubmitting(true);
    console.log("data submitted", formData);
    try {
      const response = await Axios.post(`/api/employees/${id}/edit`, formData);
      console.log("API Response:", response.data);

      if (response.data.success) {
        setSuccess(true);

        handleOpen();
        setSubmitting(false);
      }
    } catch (error) {
      setMessage("User already exists");

      console.log("Failed to create employee", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl py-6 mx-10">Profile</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-10 flex flex-col justify-center gap-5"
      >
        <div className="">
          <label htmlFor="name" className="w-60 inline-block">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            {...register("name")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.name && (
            <span className="mx-4 italic text-red-400">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="surname" className="w-60 inline-block">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            value={user.surname}
            {...register("surname")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.surname && (
            <span className="mx-4 italic text-red-400">
              {errors.surname.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="w-60 inline-block">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={user.phone}
            placeholder="eg. 0821111111"
            {...register("phone")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.phone && (
            <span className="mx-4 italic text-red-400">
              {errors.phone.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="w-60 inline-block">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            placeholder="test@test.com"
            {...register("email")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.email && (
            <span className="mx-4 italic text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="border p-1 px-2 rounded bg-green-400"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
          <button type="button" className="border p-1 px-2 rounded bg-red-400">
            Cancel
          </button>
        </div>
      </form>
      {success && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <h1>Employee Created Successfully</h1>
        </Backdrop>
      )}
      {message && (
        <h1 className="text-red-400 italic text-center text-xl">
          User already exists
        </h1>
      )}
    </div>
  );
};

export default Settings;
