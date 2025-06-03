import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordField from "../ui/password-field";
import { useToast, useUserStore } from "../../lib/store";
import { useAxios } from "../../lib/hooks";

export default function LoginUser() {
  const [data, setData] = useState({ email: "", password: "" });
  const location = useLocation();
  const navigate = useNavigate();
  const { setToast } = useToast();
  const axios = useAxios();
  const isAdminLogin = location.pathname === "/admin-login";
  const setUser = useUserStore((state) => state.setUser);

  const handleRedirect = () => {
    navigate("/register");
  };

  const handleForgetPassword = () => {
    console.log("Forget Password");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setToast({
        message: "Please enter both email and password.",
        type: "info",
        open: true,
      });
      return;
    }

    try {
      if (isAdminLogin) {
        const res = await axios.post("/user/admin-login/", {
          email: data.email.toLowerCase(),
          password: data.password,
        });

        if (res.status === 200) {
          setUser(res.data);
          navigate("/dash-board");
        }
      } else {
        const formData = new URLSearchParams();
        formData.append("email", data.email.toLowerCase());
        formData.append("password", data.password);

        const res = await axios.post("/user/login/", formData.toString(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (res.status === 200) {
          const userData = {
            access: res.data.access_token,
            id: res.data.user_id,
            role: res.data.role,
          };
          setUser(userData);
          navigate("/");
        }
      }
    } catch (error) {
      const status = error?.response?.status;
      const message =
        status === 403
          ? "Your account is not yet approved by the admin."
          : error?.response?.data?.message || "Invalid credentials";

      setToast({
        message,
        type: "error",
        open: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form
        onSubmit={handleLogin}
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
          {isAdminLogin ? "Login as Admin" : "Login"}
        </Button>

        {!isAdminLogin && (
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
