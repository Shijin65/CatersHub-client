import { useNavigate } from 'react-router-dom';
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordField from "../ui/password-field";
import * as yup from "yup";
import { Controller } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAxios } from "../../lib/hooks";
import { useToast } from "../../lib/store";
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  role: yup.string().required("Role is required."),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character."
    )
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
});

const defaultValues = {
  name:"",
  email: "",
  password: "",
  role: "",
  confirmPassword: "",
  mobile_number: "",
};

const RegisterUser = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues,
  });
  
  const { setToast } = useToast();
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("user_name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("mobile_number", data.mobile_number);

    try {
      const res = await axios.post("/user/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        setToast({
          message: "User Created Successfully.",
          type: "success",
          open: true,
        });
        reset();
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="top-0">
      <div className="gap-2  w-full mx-auto p-6 rounded-xl shadow-xl border border-slate-100">
        <legend className="flex-1 2xl:text-lg  font-semibold text-slate-600  bg-slate-200 p-2 rounded-md ps-4">
          Register
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-5 ">
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <label htmlFor="name" className="text-sm text-gray-600">
                  Name <span className="text-red-500">*</span>
                </label>
                <TextField
                  {...field}
                  id="name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  className="text-sm text-gray-600 mt-1"
                />
              </div>
            )}
          />
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <TextField
                  {...field}
                  id="email"
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  className="text-sm text-gray-600 mt-1"
                />
              </div>
            )}
          />

          {/* Role */}
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <label htmlFor="role" className="text-sm text-gray-600">
                  Role <span className="text-red-500">*</span>
                </label>
                <FormControl fullWidth className="mt-1">
                  <Select
                    {...field}
                    size="small"
                    id="role"
                    displayEmpty
                    error={!!error}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="supervisor">Supervisor</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          />

          {/* Mobile Number */}
          <Controller
            name="mobile_number"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <label
                  htmlFor="mobile_number"
                  className="text-sm text-gray-600"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <TextField
                  {...field}
                  id="mobile_number"
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  className="text-sm text-gray-600 mt-1"
                />
              </div>
            )}
          />

          {/* Password Fields - full width on md and up */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-5 mt-3">
            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                  <PasswordField
                    {...field}
                    id="password"
                    label="Password"
                    error={!!error}
                    helperText={error ? error.message : ""}
                    className="text-sm text-gray-600"
                  />
                </div>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                  <PasswordField
                    {...field}
                    id="confirmPassword"
                    label="Confirm Password"
                    error={!!error}
                    helperText={error ? error.message : ""}
                    className="text-sm text-gray-600"
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div className=" flex justify-end gap-4 mt-5">
          <Button type="button" size="small" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" size="small" variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterUser;
