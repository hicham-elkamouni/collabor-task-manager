import AddTask from "@components/add-task";
import Pagination from "@components/table/pagination";
import Table from "@components/table/table";
import { useGetTasks } from "@hooks/use-query-tasks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrincipalPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError } = useGetTasks(currentPage);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    if (data?.next !== null) {
      setCurrentPage((prev) => prev + 1);
      navigate(`?page=${currentPage+1}`);
    }
  };
  
  const handlePrevious = () => {
    if (data?.prev !== null) {
      setCurrentPage((prev) => prev - 1);
      navigate(`?page=${currentPage-1}`);
    }
  };

  return (
    <div className="content-wrapper">
      <AddTask />

      <Table tasks={data?.data}>
        <Pagination
          currentPage={currentPage}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </Table>
    </div>
  );
};

export default PrincipalPage;
