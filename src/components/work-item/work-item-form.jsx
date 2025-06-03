import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { CustomInputField } from "../ui/custom-fields";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../lib/store";
import { useAxios } from "../../lib/hooks";
import { grey, red } from "@mui/material/colors";

const validationSchema = yup.object().shape({
  event_name: yup.string().required("Event name is required"),
  event_type: yup.string().required("Event type is required"),
  event_date: yup.date().required("Event date is required"),
  location: yup.string().required("Location is required"),
  staff_required: yup
    .number()
    .positive("Must be positive number")
    .integer("Must be whole number")
    .required("Staff required is required"),
  contact_person: yup.string().required("Contact person is required"),
  contact_number: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Contact number is required"),
  white_shirt: yup.boolean(),
  black_pant: yup.boolean(),
  executive_black_shoe: yup.boolean(),
  grooming_standard: yup.boolean(),
});

const eventTypes = [
  { value: "corporate", label: "Corporate" },
  { value: "wedding", label: "Wedding" },
  { value: "other", label: "Other" },
];

const defaultValues = {
  event_name: "",
  event_type: "",
  event_date: "",
  location: "",
  staff_required: 0,
  contact_person: "",
  contact_number: "",
  white_shirt: false,
  black_pant: false,
  executive_black_shoe: false,
  grooming_standard: false,
};

const WorkItemForm = ({ initialValues, isEdit = false, mutate }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: initialValues || defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToast } = useToast();
  const axios = useAxios();
  const { id } = useParams();

  const isAddMode = !id;

  const createWorkItem = async (data) => {
    try {
      const formattedData = {
        ...data,
        event_date: data.event_date
          ? new Date(data.event_date).toISOString().split("T")[0]
          : data.event_date,
      };
      const res = await axios.post(
        "/user/admin/catering-work/create/",
        formattedData
      );

      if (res.status === 201) {
        setToast({
          message: "Work added successfully.",
          type: "success",
          open: true,
        });
        navigate("/work-item");
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.error || "Failed to add Work.",
        type: "error",
        open: true,
      });
    }
  };

  const updateWorkItem = async (data) => {
    try {
      const formattedData = {
        ...data,
        event_date: data.event_date
          ? new Date(data.event_date).toLocaleDateString("en-CA") // "YYYY-MM-DD" format
          : null,
      };
      
      const res = await axios.patch(
        `/user/admin/catering-work/update/${id}/`,
        formattedData
      );

      if (res.status === 200) {
        setToast({
          message: "Work updated successfully.",
          type: "success",
          open: true,
        });
        navigate("/work-item");
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.error || "Failed to update Work.",
        type: "error",
        open: true,
      });
    }
  };

  const onSubmit = async (data) => {
    if (isAddMode) {
      await createWorkItem(data);
    } else {
      await updateWorkItem(data);
    }
  };
  async function getWorkItem() {
    try {
      let res = await axios.get(`/user/admin/catering-work/update/${id}`);
      const data = res.data;

      Object.keys(defaultValues).forEach((key) => {
        if (data[key] !== undefined) {
          setValue(key, data[key]);
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isAddMode) {
      setIsLoading(true);
      getWorkItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddMode]);

  if (isLoading)
    return (
      <div className="min-h-[200px] text-center flex flex-col gap-2 p-2">
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
      </div>
    );

  return (
    <div className="rounded-md m-2 px-5 pt-2 pb-5 border-none bg-white w-[100%] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-full">
          <div className="flex flex-col gap-10 w-full pt-2 min-h-[60vh]">
            {/* Event Details */}
            <div className="gap-2 w-full">
              <legend className="flex-1 2xl:text-lg font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
                Event Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                <Controller
                  name="event_name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label
                        htmlFor="event_name"
                        className="text-sm text-gray-600"
                      >
                        <>
                          Event Name&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </>
                      </label>
                      <br />
                      <CustomInputField
                        {...field}
                        error={!!error}
                        helperText={error ? error?.message : ""}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="event_type"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div className="w-full">
                      <label
                        htmlFor="event_type"
                        className="text-sm text-gray-600 block mb-1"
                      >
                        Event Type <span className="text-red-500">*</span>
                      </label>
                      <TextField
                        {...field}
                        id="event_type"
                        select
                        fullWidth
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                        sx={{
                          "& .MuiSelect-select": {
                            padding: "5px 8px",
                            fontSize: "0.875rem",
                            rounded: "8px",
                            backgroundColor:
                              "rgb(243 244 246 / var(--tw-bg-opacity, 2))",
                            "&:focus-visible": {
                              outline: "none",
                              boxShadow: `0 0 0 1px ${
                                error ? red[300] : "primary"
                              }`,
                              borderColor: error ? red[300] : "inherit",
                            },
                            "&:hover": {
                              background: grey[300],
                              borderColor: grey[300],
                            },
                          },
                        }}
                      >
                        {eventTypes.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{
                              fontSize: "0.875rem",
                              padding: "6px 16px",
                            }}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  )}
                />

                <Controller
                  name="event_date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label
                        htmlFor="event_date"
                        className="text-sm text-gray-600"
                      >
                        <>
                          Event Date&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </>
                      </label>
                      <br />
                      <CustomInputField
                        {...field}
                        type="date"
                        error={!!error}
                        helperText={error ? error?.message : ""}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="location"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label
                        htmlFor="location"
                        className="text-sm text-gray-600"
                      >
                        <>
                          Location&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </>
                      </label>
                      <br />
                      <CustomInputField
                        {...field}
                        error={!!error}
                        helperText={error ? error?.message : ""}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="staff_required"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label
                        htmlFor="staff_required"
                        className="text-sm text-gray-600"
                      >
                        <>
                          Staff Required&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </>
                      </label>
                      <br />
                      <CustomInputField
                        {...field}
                        type="number"
                        error={!!error}
                        helperText={error ? error?.message : ""}
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="gap-2 w-full">
              <legend className="flex-1 2xl:text-lg font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
                Contact Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                <Controller
                  name="contact_person"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label
                        htmlFor="contact_person"
                        className="text-sm text-gray-600"
                      >
                        <>
                          Contact Person&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </>
                      </label>
                      <br />
                      <CustomInputField
                        {...field}
                        error={!!error}
                        helperText={error ? error?.message : ""}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="contact_number"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label
                        htmlFor="contact_number"
                        className="text-sm text-gray-600"
                      >
                        <>
                          Contact Number&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </>
                      </label>
                      <br />
                      <CustomInputField
                        {...field}
                        error={!!error}
                        helperText={error ? error?.message : ""}
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Staff Requirements */}
            <div className="flex flex-col gap-2">
              <legend className="2xl:text-lg font-semibold text-slate-600 bg-slate-200 p-2 rounded-md ps-4">
                Staff Requirements
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Controller
                  name="white_shirt"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="White Shirt"
                    />
                  )}
                />

                <Controller
                  name="black_pant"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Black Pant"
                    />
                  )}
                />

                <Controller
                  name="executive_black_shoe"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Executive Black Shoe"
                    />
                  )}
                />

                <Controller
                  name="grooming_standard"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Grooming Standard"
                    />
                  )}
                />
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
              {isEdit ? "Update" : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkItemForm;
