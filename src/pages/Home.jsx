import React, { useState } from "react";
import Api from "../services/Api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/authContext";
import StudentsTable from "../components/StudentsTable";
import SearchBar from "../components/SearchBar";
import AddStudentModal from "../components/AddStudentModal";

const Home = () => {
  const { token } = useAuth();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, isLoading, isError, error } = useQuery(
    ["studentList", token, page, pageLimit, sortOrder, searchQuery],
    () => Api.getStudents(token, page, pageLimit, sortOrder, searchQuery),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const totalPages = data.totalPages;

  return (
    <div className="min-h-full w-full">
      <main className="p-4">
        <section className="my-5 w-full flex items-center justify-between">
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-red-500 hover:bg-red-600"
          >
            Add Student
          </button>
        </section>
        <AddStudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <section>
          <StudentsTable
            data={data.students}
            page={page}
            pageLimit={pageLimit}
            sort={setSortOrder}
          />
        </section>
        <div className="flex justify-center items-center mt-4">
          <div className="inline-flex shadow-sm ">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="btn-grp-start"
            >
              Previous
            </button>

            {new Array(totalPages).fill(null).map((_, index) => (
              <button
                onClick={() => setPage(index + 1)}
                className="btn-grp-middle"
                key={`btn-${index}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="btn-grp-end"
              data-testid="Next"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
