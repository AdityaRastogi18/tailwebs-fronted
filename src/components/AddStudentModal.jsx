import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Api from "../services/Api";
import { useAuth } from "../contexts/authContext";

const AddStudentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rollNum: 0,
    subjectName: "",
    marks: 0,
  });

  const [errors, setErrors] = useState({});

  const { token } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      const urlEncodedData = new URLSearchParams(formData).toString();
      const response = await Api.addStudent(token, urlEncodedData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("studentsList");
        clearForm();
        onClose();
      },
      onError: (error) => {
        clearForm();
        console.error("Error adding student:", error);
      },
    }
  );

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      rollNum: 0,
      subjectName: "",
      marks: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    errors[name] = "";
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, rollNum, subjectName, marks } = formData;
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!rollNum) newErrors.rollNum = "Roll Number is required";
    if (!subjectName) newErrors.subjectName = "Subject Name is required";
    if (!marks) newErrors.marks = "Marks are required";
    else if (isNaN(marks)) newErrors.marks = "Marks must be a number";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    clearForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-2xl font-bold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Roll Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="rollNum"
              value={formData.rollNum}
              onChange={handleChange}
              className={`form-input ${errors.rollNum ? "border-red-500" : ""}`}
            />
            {errors.rollNum && (
              <p className="text-red-500 text-xs italic">{errors.rollNum}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className={`form-input ${
                errors.subjectName ? "border-red-500" : ""
              }`}
            />
            {errors.subjectName && (
              <p className="text-red-500 text-xs italic">
                {errors.subjectName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Marks
            </label>
            <input
              type="number"
              min={0}
              max={100}
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              className={`form-input ${errors.marks ? "border-red-500" : ""}`}
            />
            {errors.marks && (
              <p className="text-red-500 text-xs italic">{errors.marks}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="btn bg-gray-400 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn bg-green-600 hover:bg-green-800 ${
                mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      {mutation.isError && (
        <ErrorScreen
          message={mutation.error.message}
          retry={() => mutation.mutate(studentData)}
        />
      )}
    </div>
  );
};

export default AddStudentModal;
