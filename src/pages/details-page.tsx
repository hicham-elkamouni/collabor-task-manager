import TaskForm from "@components/task-form";
import { useGetTask } from "@hooks/use-query-tasks";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useGetTask(id ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <TaskForm task={data} />
    </div>
  );
};

export default DetailsPage;
