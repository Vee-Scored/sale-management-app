'use client'

import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../Axios'
import toast from 'react-hot-toast'

export default function ChangePassword() {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = async (data) => {
    try {
      // Here you would typically make an API call to change the password
      console.log('Password change data:', data)
      const formData = new FormData();

      formData.append("old_password",data.oldPassword);
      formData.append("new_password",data.newPassword);
      formData.append("new_password_confirmation",data.confirmPassword)
      const res = await axiosInstance.post("/user-profile/change-password",formData)
      // Simulating an API call
      if (res.status > 199 && res.status <299) {
        toast.success("Password changed successfully!")
      }
      setIsOpen(false)
      reset()
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Failed to change password. Please try again.')
    }
  }

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'old':
        setShowOldPassword(!showOldPassword)
        break
      case 'new':
        setShowNewPassword(!showNewPassword)
        break
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword)
        break
    }
  }

  return (
    <div>
      <p onClick={()=>setIsOpen(true)} className="mt-3 font-semibold text-md cursor-pointer text-blue-600">Change password?</p>

      {isOpen && (
        <div className="fixed inset-0  bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Change Password</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="oldPassword"
                      {...register('oldPassword', { required: 'Current password is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('old')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showOldPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.oldPassword && <p className="mt-1 text-sm text-red-600">{errors.oldPassword.message}</p>}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      {...register('newPassword', { 
                        required: 'New password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      {...register('confirmPassword', { 
                        required: 'Please confirm your new password',
                        validate: value => value === getValues('newPassword') || 'The passwords do not match'
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}