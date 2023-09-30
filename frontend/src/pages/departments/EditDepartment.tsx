import React, { useState } from "react";
import { stateProps, useData } from "../../context/FormDataContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

type stateProps = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  employeeManager: string;
  role: string;
  status: string;
};

const EditDepartment = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  //Schema
  const schema: z.ZodType<stateProps> = z.object({
    name: z.string().min(2).max(30),
    surname: z.string().min(2).max(30),
    email: z.string().email(),
    phone: z.number().min(10).max(10),
    manager: z.string().min(2).max(30),
    status: z.string().min(2).max(30),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<stateProps>({
    // defaultValues: { name: data.name, email: data.email },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: stateProps) => {
    setSubmitting(true);

    console.log("Submitted", data);
  };
  return (
    <div className="">
      <h1 className="text-3xl py-6 mx-10">Edit Department</h1>
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
            {...register("name")}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="surname" className="w-60 inline-block">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            {...register("surname")}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.surname && <span>{errors.surname.message}</span>}
        </div>
        <div>
          <label htmlFor="phone" className="w-60 inline-block">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="eg. 0821111111"
            {...register("phone")}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="w-60 inline-block">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="test@test.com"
            {...register("email")}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="manager" className="w-60 inline-block">
            Manager
          </label>
          <input
            type="text"
            id="manager"
            {...register("manager")}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.manager && <span>{errors.manager.message}</span>}
        </div>

        <div>
          <label htmlFor="status" className="w-60 inline-block">
            Status
          </label>
          <Select
            displayEmpty
            {...register("status")}
            name="status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            value={status}
          >
            <MenuItem value="">
              <em>-Select-</em>
            </MenuItem>
            {/* Render the list of employees with role "manager" here */}
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive </MenuItem>
          </Select>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="border p-1 px-2 rounded bg-green-400"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="border p-1 px-2 rounded bg-red-400"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDepartment;
