import { useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import {
  FolderOpenIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Controller } from "react-hook-form";
import { IconButton } from "../ui";
import { useToast } from "../../lib/store";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const validateFile = (file) => {
  if (!file) return "Please select a file.";
  if (!ALLOWED_TYPES.includes(file.type)) return "Invalid file type.";
  if (file.size > MAX_FILE_SIZE)
    return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
  return null;
};

const UserProfile = ({ setProfilePicMode, control }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const { setToast } = useToast();

  return (
    <div className="flex flex-col gap-4 mt-3 items-center 2xl:items-start">
      <Controller
        name="profile_image"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
              const validationError = validateFile(file);
              if (validationError) {
                setToast({
                  message: validationError,
                  type: "error",
                  open: true,
                });
                return;
              }
              const url = URL.createObjectURL(file);
              setImagePreview(url);
              onChange(file);
            }
          };

          const handleRemove = () => {
            setImagePreview(null);
            onChange(null);
          };

          const imageSrc =
            imagePreview || (typeof value === "string" ? value : null);

          return (
            <div className="relative grid">
              <Avatar
                variant="rounded"
                alt="Avatar"
                src={imageSrc || undefined}
                sx={{
                  borderRadius: "12px",
                  width: 240,
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 48,
                  position: "relative",
                }}
              >
                {!imageSrc && <UserIcon className="w-20 h-20 text-gray-400" />}
              </Avatar>

              {!imageSrc ? (
                <div className="-mt-10 w-[241px] text-center">
                  <label htmlFor="profile-upload-input">
                    <Button
                      size="small"
                      variant="contained"
                      component="span"
                      startIcon={<FolderOpenIcon className="w-5 h-5" />}
                      className="absolute w-28 bottom-3 bg-white shadow-md text-gray-800 rounded-md text-sm"
                    >
                      Browse
                    </Button>
                    <input
                      id="profile-upload-input"
                      type="file"
                      accept={ALLOWED_TYPES.join(",")}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="absolute p-3 flex items-end justify-end gap-2 inset-0 bg-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg w-[241px]">
                  <IconButton
                    color="primary"
                    component="label"
                    size="small"
                    sx={{ borderRadius: "30%" }}
                    onClick={() =>
                      setProfilePicMode({
                        isAdd: false,
                        isEdit: true,
                        isRemove: false,
                      })
                    }
                  >
                    <PencilSquareIcon className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      accept={ALLOWED_TYPES.join(",")}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    sx={{ borderRadius: "30%" }}
                    onClick={handleRemove}
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </IconButton>
                </div>
              )}

              {error && (
                <FormHelperText error className="text-center">
                  {error.message}
                </FormHelperText>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default UserProfile;
