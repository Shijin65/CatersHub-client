import React, { useEffect, useState } from "react";
import { CustomButton } from "../ui";
import { useUserStore } from "../../lib/store";
import { PencilIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../lib/hooks";

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-base font-medium text-gray-700">{value || "-"}</span>
  </div>
);

const ViewProfile = ({ handleClose }) => {
  const user = useUserStore((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [notUpdated, setNotUpdated] = useState(false);
  const api = useAxios();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/profile-edit`);
    handleClose();
  };

  useEffect(() => {
    async function getUser() {
      try {
        const res = await api.get(`/user/staff/details/`);
        if (res.status === 200) {
          setProfile(res.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setNotUpdated(true);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
    getUser();
  }, [api]);

  const renderBool = (val) => (val ? "Yes" : "No");

  return (
    <div className="w-full">
      {/* Basic Info */}
      <div className="grid gap-4 sm:grid-cols-2 mb-2">
        {profile && (
          <>
            <InfoItem label="Name" value={profile?.name} />
          </>
        )}
        <InfoItem label="Email" value={user?.email} />
        <InfoItem label="Role" value={user?.role} />
      </div>

      {/* Extended Profile */}
      {profile && (
        <div className="border rounded-xl shadow-sm bg-white p-2">
          <h3 className="text-lg font-semibold text-gray-700 pb-2">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 ">
            <InfoItem label="Address" value={profile?.address} />
            <InfoItem label="Alternate Mobile" value={profile?.alternate_mobile_number} />
            <InfoItem label="District" value={profile?.district} />
            <InfoItem label="Place" value={profile?.place} />
            <InfoItem label="Height (cm)" value={profile?.height} />
            <InfoItem label="Weight (kg)" value={profile?.weight} />
            <InfoItem label="Experienced" value={renderBool(profile?.experienced)} />
            <InfoItem label="Grooming" value={renderBool(profile?.grooming)} />
            <InfoItem label="Black Pant" value={renderBool(profile?.black_pant)} />
            <InfoItem label="White Shirt" value={renderBool(profile?.white_shirt)} />
            <InfoItem label="Executive Black Shoe" value={renderBool(profile?.executive_black_shoe)} />
          </div>
        </div>
      )}

      {/* Profile not updated */}
      {notUpdated && (
        <div className="text-red-600 font-medium mb-6">
          Profile details not updated yet.
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        {user?.role !== "admin" && (
          <CustomButton
            onClick={handleEdit}
            variant="contained"
            color="primary"
            type="button"
            startIcon={<PencilIcon className="w-4 h-4" />}
          >
            Edit
          </CustomButton>
        )}
        <CustomButton
          onClick={handleClose}
          variant="outlined"
          type="button"
          color="error"
          startIcon={<XCircleIcon className="w-4 h-4" />}
        >
          Close
        </CustomButton>
      </div>
    </div>
  );
};

export default ViewProfile;
