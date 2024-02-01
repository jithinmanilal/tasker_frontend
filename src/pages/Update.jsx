import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../features/task";
import { UserContext } from "../context/UserContext";

const Update = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    const fetchData = () => {
      getTaskById(taskId).then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setTitle(data.title);
          setDescription(data.description);
          setStatus(data.status);
          setDueDate(data.task_date);
          console.log(data);
        } else {
          // Handle any other responses, e.g., validation errors
        }
      });
    };
    if (user) {
      fetchData();
    }
  }, [user, taskId]);

  const onSubmit = () => {
    const body = {
      title: title,
      description: description,
      status: status,
      task_date: dueDate,
    };
    updateTask(taskId, body).then(() => {
        navigate("/dashboard");     
    });
  };

  return (
    <Layout title="Tasker | Update" content="Task update">
      <div className="container">
          <h2 className="text-white text-lg">Update Task</h2>
          <small>
            Set a title and description with min length of 3 and 5 characters
            respectively.
          </small>
          <div className="">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={status}
                onChange={() => setStatus(!status)}
              />
              Completed
            </label>
            <br />
            <p></p>
            <input
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <p></p>
          <button type="submit" onClick={onSubmit} className="submit-button">
            Update Task
          </button>
      </div>
    </Layout>
  );
};

export default Update;
