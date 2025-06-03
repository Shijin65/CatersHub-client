import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CustomButton, GlobalLoader } from "../ui";
import { AutoCompleteMultiple } from "../ui/auto-complete-multiple";
import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { useAxios } from "../../lib/hooks";
import { grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useToast } from "../../lib/store";

const WorkItemAssign = ({ handleClose, workId, mutateWork }) => {
  const { id } = useParams();
  const {setToast} = useToast()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      supervisor: "",
      staff: [],
    },
  });

  const [supervisors, setSupervisors] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);

  const axios = useAxios();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [supRes, staffRes] = await Promise.all([
          axios.get("/user/admin/supervisors/"),
          axios.get("/user/admin/staff/"),
        ]);

        const supervisorOptions = supRes.data
          .filter((sup) => sup.is_approved)
          .map((sup) => ({
            label: sup.user_name || "Supervisor",
            value: sup.id,
            email: sup.email, // used for mapping
          }));

        const staffOptions = staffRes.data
          .filter((staff) => staff.is_approved)
          .map((staff) => ({
            name: staff.user_name || "Staff",
            id: staff.id,
          }));

        setSupervisors(supervisorOptions);
        setStaffList(staffOptions);

        // If editing, fetch assignment data
        if (workId) {
          const { data } = await axios.get(`/user/work-assignments/${workId}/`);

          if (data) {
            setIsAddMode(false);
            const matchedSupervisor = supervisorOptions.find(
              (s) => s.email === data.supervisor
            );

            const matchedStaff = data.staff_members
              .map((sm) => staffOptions.find((s) => s.id === sm.id))
              .filter(Boolean); // remove nulls

            reset({
              title: data.title,
              description: data.description,
              deadline: data.deadline,
              supervisor: matchedSupervisor?.value || "",
              staff: matchedStaff,
            });
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [workId]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        catering_work: parseInt(id),
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        supervisor: data.supervisor || null,
        staff_members: data.staff?.map((s) => s.id) || [],
      };

      if (isAddMode) {
        await axios.post(`/user/work-assign/`, payload);
      } else {
        await axios.patch(`/user/work-assignments/${workId}/`, payload);
      }
      mutateWork();
      
      setToast({
        message: "Work Assignment successfully.",
        type: "success",
        open: true,
      });
      
      handleClose();
    } catch (error) {
      setToast({
        message: "Failed to assign work.",
        type: "error",
        open: true,
      });
      console.error("Error submitting form:", error);
    }
  };

  if (loading) {
    return <div className="w-full flex justify-center"><CircularProgress /></div>
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={control}
          rules={{ required: "Work Item Title is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className="w-full">
              <label
                htmlFor="supervisor"
                className="text-sm text-gray-600 block"
              >
                Work Item Title <span className="text-red-500">*</span>
              </label>
              <TextField
                {...field}
                label=""
                fullWidth
                size="small"
                error={!!error}
                helperText={error?.message}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: grey[100],
                    fontSize: "0.875rem",
                  },
                }}
              />
            </div>
          )}
        />

        {/* Work Description */}
        <Controller
          name="description"
          control={control}
          rules={{ required: "Work Description is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className="w-full">
              <label
                htmlFor="supervisor"
                className="text-sm text-gray-600 block "
              >
                Work Description <span className="text-red-500">*</span>
              </label>
              <TextField
                {...field}
                multiline
                rows={4}
                fullWidth
                size="small"
                error={!!error}
                helperText={error?.message}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: grey[100],
                    fontSize: "0.875rem",
                  },
                }}
              />
            </div>
          )}
        />

        {/* Due Date */}
        <Controller
          name="deadline"
          control={control}
          rules={{ required: "Due Date is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className="w-full">
              <label
                htmlFor="supervisor"
                className="text-sm text-gray-600 block"
              >
                Due Date <span className="text-red-500">*</span>
              </label>
              <TextField
                {...field}
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                error={!!error}
                helperText={error?.message}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: grey[100],
                    fontSize: "0.875rem",
                  },
                }}
              />
            </div>
          )}
        />

        {/* Supervisor */}
        <Controller
          name="supervisor"
          control={control}
          rules={{ required: "Supervisor is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className="w-full">
              <label className="text-sm text-gray-600 block">
                Supervisor <span className="text-red-500">*</span>
              </label>
              <TextField
                {...field}
                select
                fullWidth
                size="small"
                error={!!error}
                helperText={error?.message}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: grey[100],
                    fontSize: "0.875rem",
                  },
                  "& .MuiSelect-select": {
                    padding: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    backgroundColor: grey[200],
                  },
                }}
              >
                {supervisors.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
        />

        {/* Staff */}
        <Controller
          name="staff"
          control={control}
          rules={{ required: "Staff is required" }}
          render={({ field, fieldState }) => (
            <div className="w-full">
              <label className="text-sm text-gray-600 block">
                Staff <span className="text-red-500">*</span>
              </label>
              <AutoCompleteMultiple
                {...field}
                options={staffList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            </div>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <CustomButton
            type="button"
            onClick={handleClose}
            variant="outlined"
            color="error"
          >
            Cancel
          </CustomButton>
          <CustomButton type="submit" variant="contained" color="primary">
            Assign
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default WorkItemAssign;
