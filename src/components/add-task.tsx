import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  return (
    <div className="add-item__container">
      <button
        className="add-item__button"
        onClick={() => {
          navigate("/tasks/new");
        }}
      >
        <IoAdd size={24} />
      </button>
    </div>
  );
};

export default AddTask;
