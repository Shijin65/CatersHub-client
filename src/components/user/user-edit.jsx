import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { CustomInputField } from "../ui/custom-fields";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../lib/store";
import { useAxios } from "../../lib/hooks";
import { GlobalLoader } from "../ui";
import UserProfile from "../profile/user-profile";
import { grey } from "@mui/material/colors";

const defaultValues = {
  name: "",
  email: "",
  role: "",
  is_active: true,
  is_approved: true,
  profile_image: null,

  // staff_details
  category_choices: "",
  alternate_mobile_number: "",
  address: "",
  district: "",
  place: "",
  weight: "",
  height: "",
  white_shirt: false,
  black_pant: false,
  executive_black_shoe: false,
  grooming: false,
  experienced: false,
  uniform_images: [],
};

// Validation Schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
  is_active: yup.boolean().required(),
  is_approved: yup.boolean().required(),
  profile_image: yup.mixed().nullable(),

  category_choices: yup.string().nullable(),
  alternate_mobile_number: yup
    .string()
    .matches(/^\d{10}$/, "Must be a 10-digit number")
    .nullable(),
  address: yup.string().nullable(),
  district: yup.string().nullable(),
  place: yup.string().nullable(),
  weight: yup.number().typeError("Must be a number").nullable(),
  height: yup.number().typeError("Must be a number").nullable(),

  white_shirt: yup.boolean().required(),
  black_pant: yup.boolean().required(),
  executive_black_shoe: yup.boolean().required(),
  grooming: yup.boolean().required(),
  experienced: yup.boolean().required(),
  uniform_images: yup.array().of(yup.mixed()).nullable(),
});

//Basic Data
const basicFields = ["name", "email", "role", "is_active", "is_approved"];

//Details field
const detailsFields = [
  "name",
  "alternate_mobile_number",
  "address",
  "district",
  "place",
  "weight",
  "height",
  "profile_image",
  "white_shirt",
  "experienced",
  "grooming",
  "executive_black_shoe",
  "black_pant",
];
// Checkbox fields
const fields = [
  { value: "white_shirt", label: "White Shirt" },
  { value: "black_pant", label: "Black Pant" },
  { value: "executive_black_shoe", label: "Executive Black Shoe" },
  { value: "grooming", label: "Grooming" },
  { value: "experienced", label: "Experienced" },
];

const selectOptions = {
  role: [
    { value: "", label: "Select" },
    { value: "staff", label: "Staff" },
    { value: "supervisor", label: "SuperVisor" },
  ],
  is_approved: [
    { value: "true", label: "Approved" },
    { value: "false", label: "Not Approved" },
  ],
  is_active: [
    { label: "Activate", value: "true" },
    { label: "Inactivate", value: "false" },
  ],
};

const ProfileForm = () => {
  const [profilePic, setProfilePic] = useState();
  const [profilePicMode, setProfilePicMode] = useState({
    isAdd: false,
    isEdit: false,
    isRemove: false,
  });

  const api = useAxios();
  const { setToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const { control, handleSubmit, setValue, watch } = useForm({
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
        const res = await api.get(`/user/admin/user/${id}/`);
        const data = res.data;

        basicFields.forEach((key) => {
          if (key in data) {
            setValue(key, data[key]);
          }
        });

        if (data.staff_details) {
          detailsFields.forEach((key) => {
            if (key in data.staff_details) {
              setValue(key, data.staff_details[key]);
            }
          });
        }
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
      const {
        name,
        email,
        role,
        is_active,
        is_approved,
        profile_image,
        ...restStaffDetails
      } = data;

      let profileImageValue = null;
      if (profile_image instanceof File) {
        profileImageValue = profile_image;
      } else if (profile_image === null) {
        profileImageValue = null;
      }

      const payload = {
        id: id,
        email,
        role,
        is_active: is_active === "true" || is_active === true,
        is_approved: is_approved === "true" || is_approved === true,
        user_name: name,
        staff_details: {
          ...restStaffDetails,
          name,
          user_email: email,
          profile_image:
            profileImageValue instanceof File ? null : profileImageValue,
        },
      };

      if (typeof profile_image === "string") {
        delete payload.staff_details.profile_image;
      }

      const res = await api.patch(`/user/admin/user/${id}/`, payload);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-10 w-full pt-2 min-h-[60vh]">
        <div className="flex flex-col gap-2">
          <legend className="2xl:text-lg font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
            Account Info
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", required: true },
              { name: "role", label: "Role", required: true, type: "select" },
              {
                name: "is_active",
                label: "Active",
                required: true,
                type: "select",
              },
              {
                name: "is_approved",
                label: "Approved",
                required: true,
                type: "select",
              },
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

                    {type === "select" ? (
                      <Select
                        fullWidth
                        {...field}
                        size="small"
                        id="role"
                        displayEmpty
                        error={!!error}
                        sx={{
                          width: "100%",
                          height: "32px",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: 1.5,
                          pl: "10px",
                          pr: "10px",
                          pt: "4px",
                          pb: "4px",
                          borderRadius: "0.375rem",
                          backgroundColor:
                            "rgba(243, 244, 246, var(--tw-bg-opacity, 2))", // Tailwind slate-200

                          pointerEvents: "auto",
                          cursor: "text",
                          whiteSpace: "normal",
                          overflow: "visible",

                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: error ? red[200] : grey[400],
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: error ? red[300] : "primary.main",
                            boxShadow: `0 0 0 1px ${
                              error ? red[300] : "primary.main"
                            }`,
                          },
                          "& .MuiSelect-select": {
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      >
                        {selectOptions[name].map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <CustomInputField
                        {...field}
                        type={type || "text"}
                        readOnly={false}
                        error={!!error}
                        helperText={error?.message}
                        className="text-sm text-gray-600"
                      />
                    )}
                  </div>
                )}
              />
            ))}
          </div>
        </div>

        {/* User Details */}
        <div className="gap-2 w-full">
          <legend className="2xl:text-lg font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
            Personal Details
          </legend>
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
  );
};

export default ProfileForm;
