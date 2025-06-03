import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import useSWR, { mutate } from "swr";
import { useToast } from "../../lib/store";
import { useAxios } from "../../lib/hooks";
import { GlobalLoader } from "../ui";

const fetcher = (api) => (url) => api.get(url).then((res) => res.data);

const UserView = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setToast } = useToast();

  const [approving, setApproving] = useState(false);

  const location = useLocation();
  const basePath = location.pathname.split("/")[1];

  const {
    data: user,
    error,
    isLoading,
    mutate
  } = useSWR(`/user/admin/user/${id}/`);

  const handleEdit = () => {
    navigate(`/${basePath}/${id}/edit`);
  };

  const handleApprove = async () => {
    try {
      setApproving(true);
      await api.post("/user/approve-user/", { email: user?.email });

      setToast({
        message: "User approved successfully.",
        type: "success",
        open: true,
      });

      mutate(); 
    } catch (error) {
      console.error("Approve error:", error);
      setToast({
        message: "Failed to approve user.",
        type: "error",
        open: true,
      });
    } finally {
      setApproving(false);
    }
  };

  if (isLoading) return <GlobalLoader loading />;
  if (error) return <div className="text-red-600">Failed to load user.</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Account Info */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Account Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Username:</span>{" "}
            {user.user_name || "-"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role || "-"}
          </p>
          <p>
            <span className="font-semibold">Active:</span>{" "}
            {user.is_active ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Approved:</span>{" "}
            {user.is_approved ? "Yes" : "No"}
          </p>
        </div>
      </section>

      {/* Staff Details */}
      {user.staff_details ? (
        <>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {user.staff_details.profile_image ? (
                  <img
                    src={user.staff_details.profile_image}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {user.staff_details.name}
                </p>
                <p>
                  <span className="font-semibold">Alternate Mobile:</span>{" "}
                  {user.staff_details.alternate_mobile_number || "-"}
                </p>
                <p>
                  <span className="font-semibold">District:</span>{" "}
                  {user.staff_details.district}
                </p>
                <p>
                  <span className="font-semibold">Place:</span>{" "}
                  {user.staff_details.place}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {user.staff_details.address}
                </p>
                <p>
                  <span className="font-semibold">Weight:</span>{" "}
                  {user.staff_details.weight} kg
                </p>
                <p>
                  <span className="font-semibold">Height:</span>{" "}
                  {user.staff_details.height} cm
                </p>
                <p>
                  <span className="font-semibold">Experienced:</span>{" "}
                  {user.staff_details.experienced ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Uniform & Grooming
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold">White Shirt:</span>{" "}
                {user.staff_details.white_shirt ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Black Pant:</span>{" "}
                {user.staff_details.black_pant ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Executive Black Shoe:</span>{" "}
                {user.staff_details.executive_black_shoe ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Grooming:</span>{" "}
                {user.staff_details.grooming ? "Yes" : "No"}
              </p>
            </div>
          </section>
        </>
      ) : (
        <p className="text-red-600">User has not updated their profile yet.</p>
      )}

      {/* Uniform Images */}
      {user.staff_details?.uniform_images?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Uniform Images
          </h2>
          <div className="flex flex-wrap gap-4">
            {user.staff_details.uniform_images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Uniform ${idx + 1}`}
                className="w-40 h-40 object-cover rounded border"
              />
            ))}
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-end mt-10">
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit User
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleApprove}
          disabled={user.is_approved || approving}
        >
          {approving ? "Approving..." : "Approve"}
        </Button>
      </div>
    </div>
  );
};

export default UserView;
