import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const StudentsTable = ({ data, page, pageLimit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 border-b text-left text-gray-600">
              S. No.
            </th>
            <th className="px-4 py-2 border-b text-left text-gray-600">Name</th>
            <th className="px-4 py-2 border-b text-left text-gray-600">
              Roll Number
            </th>
            <th className="px-4 py-2 border-b text-left text-gray-600">
              Subject Name
            </th>
            <th className="px-4 py-2 border-b text-left text-gray-600">
              Subject Marks
            </th>
            <th className="px-4 py-2 border-b text-left text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">
                {(page - 1) * pageLimit + index + 1}
              </td>
              <td className="px-4 py-2 border-b">{entry.firstName}</td>
              <td className="px-4 py-2 border-b">{entry.rollNum}</td>
              <td className="px-4 py-2 border-b">{entry.subjectName}</td>
              <td className="px-4 py-2 border-b">{entry.marks}</td>
              <td className="px-4 py-2 border-b">
                <button className="text-blue-500 p-1 text-xl">
                  <FontAwesomeIcon icon={faEdit} />
                </button>{" "}
                <button className="text-red-600 p-1 text-xl">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
