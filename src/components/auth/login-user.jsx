import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordField from "../ui/password-field";
import { useToast, useUserStore } from "../../lib/store";
import { API_URL } from "../../lib/util/constants";
import { useAxios } from "../../lib/hooks";

export default function LoginUser() {
  const [data, setData] = useState({ email: "", password: "", otp: "" });
  const [step, setStep] = useState("email");
  const location = useLocation();
  const navigate = useNavigate();
  const { setToast } = useToast();
  const axios = useAxios();
  const isLogin = location.pathname === "/login";
  const isAdminLogin = location.pathname === "/admin-login";
  const setUser = useUserStore((state) => state.setUser);
  const handleForgetPassword = () => {
    console.log("Forget Password");
  };

  const handleRedirect = () => {
    navigate("/register");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!data.email) {
      setToast({
        message: "Please enter your email.",
        type: "info",
        open: true,
      });
      return;
    }

    if (isAdminLogin) {
      //Admin Login
      if (!data.password) {
        return setToast({
          message: "Please enter your password.",
          type: "info",
          open: true,
        });
      }

      try {
        const res = await axios.post("/user/admin-login/", {
          email: data.email.toLowerCase(),
          password: data.password,
        });

        if (res.status === 200) {
          setUser(res.data);
          navigate("/");
        }
      } catch (error) {
        setToast({
          message:
            error?.response?.data?.message || "Invalid admin credentials",
          type: "error",
          open: true,
        });
      }
    } else {
      //User Otp request
      try {
        const res = await axios.post("user/request-new-otp/", {
          email: data.email.toLowerCase(),
        });

        if (res.status === 200) {
          setToast({
            message: "OTP sent to your email.",
            type: "success",
            open: true,
          });
          setStep("otp");
        }
      } catch (error) {
        setToast({
          message: error?.response?.data?.message || "Failed to send OTP",
          type: "error",
          open: true,
        });
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!data.otp) {
      setToast({
        message: "Please enter the OTP.",
        type: "info",
        open: true,
      });
      return;
    }

    try {
      const res = await axios.post("/user/verify-otp/", {
        email: data.email.toLowerCase(),
        otp: data.otp,
      });

      if (res.status === 200) {
        const data = res.data;

        const transformedData = {
          access: data.access_token,
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
        };
        setUser(transformedData);
        navigate("/");
      }
    } catch (error) {
      setToast({
        message: error.response.data.error || "Invalid OTP",
        type: "error",
        open: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form
        onSubmit={
          isLogin && step === "otp" ? handleOtpSubmit : handleEmailSubmit
        }
        className="flex flex-col justify-center items-center w-[80%] md:w-[70%] h-[80%] md:shadow-2xl rounded-xl gap-4 p-4"
      >
        <div>
          <h1 className="text-blue-900 text-2xl font-semibold text-center">
            {isAdminLogin ? "ADMIN LOGIN" : "LOGIN"}
          </h1>
          <p className="text-[12px] md:text-sm mt-2">
            {isAdminLogin
              ? "Admin access to the system dashboard."
              : "Sign in to your account to manage catering services effortlessly."}
          </p>
        </div>

        <TextField
          size="small"
          id="email"
          label="Email"
          type="email"
          value={data.email}
          className="w-full"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          sx={{
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        {isAdminLogin && (
          <PasswordField
            id="password"
            label="Password"
            value={data.password}
            className="w-full"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        )}

        {isLogin && step === "otp" && (
          <TextField
            size="small"
            id="otp"
            label="OTP"
            type="text"
            value={data.otp}
            className="w-full"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                otp: e.target.value,
              }))
            }
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
        )}

        <Button
          type="submit"
          className="w-full shadow-2xl"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "12px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {isAdminLogin
            ? "Login as Admin"
            : step === "otp"
            ? "Verify OTP"
            : "Send OTP"}
        </Button>

        {!isAdminLogin && step !== "otp" && (
          <div className="flex justify-between w-full pt-2 pb-2 text-blue-700 text-sm text-left font-normal">
            <div
              className="cursor-pointer text-[12px] md:text-sm hover:text-blue-500"
              onClick={handleForgetPassword}
            >
              Forgot Password?
            </div>
            <div
              className="cursor-pointer text-[12px] md:text-sm hover:text-blue-500"
              onClick={handleRedirect}
            >
              Don't have an account?
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
