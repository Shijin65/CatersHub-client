import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { CustomInputField } from "../ui/custom-fields";
import { useNavigate } from "react-router-dom";
import UserProfile from "./user-profile";
import { useToast } from "../../lib/store";
import { useAxios } from "../../lib/hooks";
import { GlobalLoader } from "../ui";

// Validation Schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  alternate_mobile_number: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\d{10}$/, "Alternate mobile number must be 10 digits")
    .optional(),
  address: yup.string().optional(),
  district: yup.string().optional(),
  place: yup.string().optional(),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be positive")
    .optional(),
  height: yup
    .number()
    .typeError("Height must be a number")
    .positive("Height must be positive")
    .optional(),
  profile_image: yup.mixed().required("Profile image is required."),
  white_shirt: yup.boolean(),
  black_pant: yup.boolean(),
  executive_black_shoe: yup.boolean(),
  grooming: yup.boolean(),
  experienced: yup.boolean(),
});

// Checkbox fields
const fields = [
  { value: "white_shirt", label: "White Shirt" },
  { value: "black_pant", label: "Black Pant" },
  { value: "executive_black_shoe", label: "Executive Black Shoe" },
  { value: "grooming", label: "Grooming" },
  { value: "experienced", label: "Experienced" },
];

const ProfileForm = () => {
  const [profilePic, setProfilePic] = useState();
  const [profilePicMode, setProfilePicMode] = useState({
    isAdd: false,
    isEdit: false,
    isRemove: false,
  });

  const api = useAxios();
  const navigate = useNavigate();
  const { setToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      white_shirt: false,
      black_pant: false,
      executive_black_shoe: false,
      grooming: false,
      experienced: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/user/staff/details/");
        const data = res.data;

        Object.keys(validationSchema.fields).forEach((key) => {
          if (key in data) {
            setValue(key, data[key]);
          }
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "profile_image") {
          if (value instanceof File) {
            formData.append("profile_image", value);
          } else if (value === null) {
            formData.append("profile_image", null);
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await api.patch("/user/staff/details/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setToast({
          message: "Profile updated successfully.",
          type: "success",
          open: true,
        });
      }
    } catch (error) {
      console.error(error);
      setToast({
        message: error?.response?.data?.message || "Failed to update profile.",
        type: "error",
        open: true,
      });
    }
  };

  if (isLoading) {
    return <GlobalLoader loading={isLoading} />;
  }

  return (
    <div className="rounded-md m-5 shadow-xl  p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between border-b-2 border-b-gray-300">
          <header className="sm:text-md 2xl:text-lg font-semibold px-0 flex gap-2 items-center h-10 mt-2 ">
            <h1 className="text-black/80 page-title text-[16px] xl:text-[16px] 2xl:text-[18px] font-semibold">
              USER DETAILS
            </h1>
          </header>
          <div className="text-gray-500 gap-3 items-center hidden sm:block ml-auto">
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(-1)}
              startIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
            >
              Back
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-10 w-full pt-2 min-h-[60vh]">
          {/* User Details */}
          <div className="gap-2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
              <div className="col-span-full mx-auto pb-3">
                <UserProfile
                  setProfilePicMode={setProfilePicMode}
                  profilePic={profilePic}
                  control={control}
                />
              </div>

              {[
                { name: "name", label: "Name", required: true },
                {
                  name: "alternate_mobile_number",
                  label: "Alternate Mobile Number",
                },
                { name: "address", label: "Address", span: 2 },
                { name: "district", label: "District" },
                { name: "place", label: "Place" },
                { name: "weight", label: "Weight", type: "number" },
                { name: "height", label: "Height", type: "number" },
              ].map(({ name, label, type, required, span }) => (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div className={`${span === 2 ? "md:col-span-2" : ""}`}>
                      <label htmlFor={name} className="text-sm text-gray-600">
                        {label}{" "}
                        {required && <span style={{ color: "red" }}>*</span>}
                      </label>
                      <br />
                      <CustomInputField
                        {...field}
                        type={type || "text"}
                        readOnly={false}
                        error={!!error}
                        helperText={error?.message}
                        className="text-sm text-gray-600"
                      />
                    </div>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Preferences & Experience */}
          <div className="flex flex-col gap-2">
            <legend className="2xl:text-lg font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
              Preferences & Experience
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {fields.map(({ value, label }) => (
                <Controller
                  key={value}
                  name={value}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label={label}
                    />
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
