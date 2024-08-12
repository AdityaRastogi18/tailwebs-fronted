import React, { useState } from "react";
import Api from "../services/Api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/authContext";
import StudentsTable from "../components/StudentsTable";
import SearchBar from "../components/SearchBar";
import AddStudentModal from "../components/AddStudentModal";
import ErrorScreen from "../components/ErrorScreen";

const Home = () => {
  const { token } = useAuth();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["studentsList", token, page, pageLimit, sortOrder, searchQuery],
    () => Api.getStudents(token, page, pageLimit, sortOrder, searchQuery),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <ErrorScreen message={error.message} retry={refetch} />;
  }

  const totalPages = data.totalPages;

  const handleSearchQuery = (query) => {
    setPage(1);
    setSearchQuery(query);
  };

  return (
    <div className="min-h-full w-full container">
      <main className="p-4">
        <section className="my-5 w-full flex items-center justify-between">
          <SearchBar onSearch={(query) => handleSearchQuery(query)} />
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
            onSort={(sortOrd) => setSortOrder(sortOrd)}
          />
        </section>
        <div className="flex justify-between items-center py-8">
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-red-500 hover:bg-red-600"
          >
            Add Student
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
