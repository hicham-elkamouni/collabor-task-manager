import { useNavigate } from "react-router-dom";
import { useDeleteTask } from "@hooks/use-mutation-tasks";
import { Task } from "../../types/task";
import TableCell from "@components/table/table-cell";
import TableRow from "@components/table/table-row";
import TableDataCell from "@components/table/table-data-cell";
import ActionButton from "@components/table/action-button";
import TableHead from "@components/table/table-head";

interface TableProps {
  tasks: Task[] | undefined;
  children: React.ReactNode;
}

const Table = ({ tasks, children }: TableProps) => {
  const navigate = useNavigate();
  const deleteTask = useDeleteTask();

  const handleEdit = (task: Task) => {
    navigate(`/tasks/${task.id}`);
  };

  const handleDelete = (id: string) => {
    deleteTask.mutate(id);
  };

  return (
    <div className="table">
      <table>
        <TableHead>
          <TableCell label="Title" value="Title" />
          <TableCell label="Status" value="Status" />
          <TableCell label="Actions" value="Actions" />
        </TableHead>
        <tbody>
          {!!tasks?.length ? (
            tasks?.map((task) => (
              <TableRow key={task.id}>
                <TableDataCell label="Title" value={task.title} />
                <TableDataCell label="Status" value={task.status} />
                <TableDataCell
                  label="Actions"
                  value={
                    <div className="actions-container">
                      <ActionButton
                        title={"Edit"}
                        classname="btn btn-edit"
                        onActionClick={() => handleEdit(task)}
                      />
                      <ActionButton
                        title={"Delete"}
                        classname="btn btn-delete"
                        onActionClick={() => handleDelete(String(task.id))}
                      />
                    </div>
                  }
                />
              </TableRow>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default Table;