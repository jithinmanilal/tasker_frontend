import { useState } from "react";
import "./SaveModal.css";
import PropTypes from "prop-types";
import { createTask } from "../features/task";
import { useNavigate } from "react-router-dom";

const SaveModal = ({ isVisible, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState(getToday());
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    if (title.length < 3) {
      setTitleError("Title must have at least 3 characters.");
      return;
    } else {
      setTitleError("");
    }

    if (description.length < 5) {
      setDescriptionError("Description must have at least 5 characters.");
      return;
    } else {
      setDescriptionError("");
    }
    const body = {
      "title": title,
      "description": description,
      "status": status,
      "task_date": dueDate,
    };
    createTask(body).then((response) => {
      if (response.status === 200) {
        onClose();
        navigate("/dashboard");
      } else {
        // Handle any other responses, e.g., validation errors
      }
    });
  }

  function getToday() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  if (!isVisible) return null;

  return (
    <div id="wrapper" className="" onClick={handleClose}>
      <div className="modal-content">
        <div className="top-right-button">
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={onSubmit}>
            <h2 className="text-white text-lg">Create a new Task</h2>
            <small>Set a title and description with min length of 3 and 5 characters respectively.</small>
            <div className="">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                  />
                  {titleError && <p className="text-red-600 text-center mt-4 text-sm">{titleError}</p>}
              <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && <p className="text-red-600 text-center mt-4 text-sm">{descriptionError}</p>}
              <label>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={() => setStatus(!status)}
                />
                Completed
              </label>
              <br /><p></p>
              <input
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <p></p>
            <button type="submit" className="submit-button">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

SaveModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SaveModal;
