import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import Api from "../services/Api";
import { useAuth } from "../contexts/authContext";
import ConfirmationPopup from "./confirmationPopup";

const StudentsTable = ({ data, page, pageLimit, onSort }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const { token } = useAuth();
  const queryClient = useQueryClient();

  const handleEditChange = (e, field) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const onClose = () => {
    setIsOpen(false);
    setRowId(null);
  };

  const mutation = useMutation(
    async (id) => {
      const response = await Api.editStudentEntry(token, id, editedData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("studentsList");
        onClose();
      },
      onError: (error) => {
        console.error("Error adding student:", error);
      },
    }
  );

  const handleSave = (id) => {
    mutation.mutate(id);
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  const handleDelete = (id) => {
    setIsOpen(true);
    setRowId(id);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    onSort(newSortOrder);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="th">S. No.</th>
            <th className="th">Name</th>
            <th className="th">
              Roll Number{" "}
              <button onClick={handleSort} className="text-gray-600">
                <FontAwesomeIcon
                  icon={sortOrder === "asc" ? faSortUp : faSortDown}
                />
              </button>
            </th>
            <th className="th">Subject Name</th>
            <th className="th">Subject Marks</th>
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => {
            const isEditing = editingRowId === entry._id;

            return (
              <tr key={entry._id} className="hover:bg-gray-100">
                <td className="td">{(page - 1) * pageLimit + index + 1}</td>
                <td className="td">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={entry.firstName}
                      value={editedData.firstName}
                      onChange={(e) => handleEditChange(e, "firstName")}
                      className="form-input-small"
                    />
                  ) : (
                    entry.firstName
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={entry.rollNum}
                      value={editedData.rollNum}
                      onChange={(e) => handleEditChange(e, "rollNum")}
                      className="form-input-small"
                    />
                  ) : (
                    entry.rollNum
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={entry.subjectName}
                      value={editedData.subjectName}
                      onChange={(e) => handleEditChange(e, "subjectName")}
                      className="form-input-small"
                    />
                  ) : (
                    entry.subjectName
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <input
                      type="number"
                      defaultValue={entry.marks}
                      value={editedData.marks}
                      onChange={(e) => handleEditChange(e, "marks")}
                      className="form-input-small"
                      max={100}
                      min={0}
                    />
                  ) : (
                    entry.marks
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <>
                      <button
                        className="text-green-500 p-1 text-xl"
                        onClick={() => handleSave(entry._id)}
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>{" "}
                      <button
                        className="text-red-600 p-1 text-xl"
                        onClick={handleCancel}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-blue-500 p-1 text-xl"
                        onClick={() => setEditingRowId(entry._id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>{" "}
                      <button
                        className="text-red-600 p-1 text-xl"
                        onClick={() => handleDelete(entry._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmationPopup
        isOpen={isOpen}
        onClose={onClose}
        id={rowId}
        token={token}
      />
      {mutation.isError && (
        <ErrorScreen
          message={mutation.error.message}
          retry={() => mutation.mutate(studentData)}
        />
      )}
    </div>
  );
};

export default StudentsTable;
