import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PasswordField from "../ui/password-field";
import { useAxios } from "../../lib/hooks";
import { useToast } from "../../lib/store";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  role: yup.string().required("Role is required."),
  mobile_number: yup.string().required("Mobile number is required."),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Password must be at least 8 characters with uppercase, lowercase, number, and special character."
    )
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
});

const RegisterUser = () => {
  const [step, setStep] = useState("register");
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      mobile_number: "",
    },
  });

  const axios = useAxios();
  const { setToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("user_name", data.name);
    formData.append("email", data.email.toLowerCase());
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("mobile_number", data.mobile_number);

    try {
      const res = await axios.post("/user/register/", formData);
      if (res.status === 201) {
        setToast({
          message: "User created. Sending OTP...",
          type: "success",
          open: true,
        });
        setUserEmail(data.email.toLowerCase());

          setToast({
            message: "OTP sent to your email.",
            type: "success",
            open: true,
          });
          setStep("otp");
      }
    } catch (err) {
      setToast({
        message: err.response?.data?.error || "Registration failed.",
        type: "error",
        open: true,
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setToast({ message: "Please enter the OTP.", type: "info", open: true });
      return;
    }

    try {
      const res = await axios.post("/user/verify-otp/", {
        email: userEmail,
        otp: otp,
      });

      if (res.status === 200) {
        setToast({
          message: "User registered successfully.",
          type: "success",
          open: true,
        });
        navigate("/login");
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.error || "Invalid OTP.",
        type: "error",
        open: true,
      });
    }
  };

  return (
    <>
      {step === "register" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="top-0">
          <div className="gap-2 w-full mx-auto p-6 rounded-xl shadow-xl border border-slate-100">
            <legend className="font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
              Register
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <label htmlFor="name" className="text-sm text-gray-600">
                      Name *
                    </label>
                    <TextField
                      {...field}
                      id="name"
                      fullWidth
                      size="small"
                      error={!!error}
                      helperText={error?.message}
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
                      Email *
                    </label>
                    <TextField
                      {...field}
                      id="email"
                      fullWidth
                      size="small"
                      error={!!error}
                      helperText={error?.message}
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
                      Role *
                    </label>
                    <FormControl fullWidth className="mt-1" size="small">
                      <Select {...field} displayEmpty error={!!error}>
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
                      Mobile Number *
                    </label>
                    <TextField
                      {...field}
                      id="mobile_number"
                      fullWidth
                      size="small"
                      error={!!error}
                      helperText={error?.message}
                    />
                  </div>
                )}
              />

              {/* Password + Confirm */}
              <div className="md:col-span-2 flex flex-col md:flex-row gap-5 mt-3">
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
                        helperText={error?.message}
                      />
                    </div>
                  )}
                />

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
                        helperText={error?.message}
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-5">
              <Button
                type="button"
                size="small"
                variant="outlined"
                onClick={() => reset()}
              >
                Cancel
              </Button>
              <Button type="submit" size="small" variant="contained">
                Submit
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleOtpSubmit}
          className="max-w-md mx-auto p-6 rounded-xl shadow-xl border border-slate-100"
        >
          <legend className="font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
            OTP Verification
          </legend>
          <div className="mt-5">
            <label htmlFor="otp" className="text-sm text-gray-600">
              Enter OTP sent to {userEmail}
            </label>
            <TextField
              id="otp"
              fullWidth
              size="small"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button type="submit" size="small" variant="contained">
              Verify OTP
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default RegisterUser;
