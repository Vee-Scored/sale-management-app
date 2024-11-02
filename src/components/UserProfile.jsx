import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../Axios";
import toast from "react-hot-toast";
import "ldrs/ring";
import { useUserProfileStore } from "../store/useUserProfileStore";
import ChangePassword from "./ChangePassword";

export default function UserProfile() {
  const { profile, setProfile } = useUserProfileStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [img, setImg] = useState(null);
  const successNotify = () => toast.success("Updated Successfully!");
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/user-profile/profile");

      if (res.status >= 200 && res.status < 300) {
        setProfile(res.data.data);
      } else if (res.status == 401) {
        toast.error("Session Expired!");
        alert("Session expired");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(error.message);
      localStorage.removeItem("token");
      nav("/");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
  
      const formData = new FormData();
      formData.append("profile_image", img);
  
      // Upload image
      const imgRes = await fetch(
        "https://voucher-app-auth-api.ygnsh.com/api/v1/user-profile/change-profile-image",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
  
      if (imgRes.status >= 200 && imgRes.status < 300 && img != null) {
        setImg(null);
        toast.success("Image Uploaded Successfully!");
        const res = await axiosInstance.get("/user-profile/profile");
        setProfile(res.data.data);
      }
  
      // Change name
      
      const nameRes = await axiosInstance.post("/user-profile/change-name", {
        name: data.name,
      });
      if (
        nameRes.status >= 200 &&
        nameRes.status < 300 &&
        profile.name !== nameRes.data.user.name
      ) {
        setProfile(nameRes.data.user);
        toast.success(nameRes.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setImg(e.target.files[0]);
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6  text-blue-700">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex  gap-4">
          <div className="flex flex-col justify-between items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
              {profile.profile_image && !profileImage ? (
                <img
                  src={profile.profile_image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              {
                profile.profile_image ? "change image" : "upload image"
              }
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2 justify-between">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                defaultValue={profile.name}
                id="name"
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                defaultValue={profile.email}
                disabled
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 justify-center">
                  {" "}
                  saving{" "}
                  <l-ring
                    size="20"
                    stroke="4"
                    bg-opacity="0"
                    speed="2"
                    color="white"
                  ></l-ring>
                </span>
              ) : (
                "save changes"
              )}
            </button>
          </div>
        </div>
      </form>

      <ChangePassword/>
      
    </div>
  );
}
