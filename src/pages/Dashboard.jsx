import Layout from "../components/Layout";
import "./Dashboard.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { deleteTask, getTaskByDate } from "../features/task";
import SaveModal from "../components/SaveModal";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    const fetchData = () => {
      getTaskByDate(selectedDate).then((response) => {
        if (response.status === 200) {
          const data = response.data;
          console.log(data)
          setTasks(data);
        } else {
          // Handle any other responses, e.g., validation errors
        }
      });
    };
    if (user) {
      fetchData();
    }
  }, [selectedDate, user]);

  function getToday() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmDelete) {
      deleteTask(id).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setTasks((prevTasks) =>
          prevTasks.filter((item) => item.task_id !== id)
          );
        } else {
          // Handle any other responses, e.g., validation errors
        }
      });
    }
  }; 

  if (!isAuthenticated) { 
    return <Navigate to="/" />;
  }

  return (
    <Layout title="Tasker | Dashboard" content="Dashboardpage">
      <SaveModal isVisible={showModal} onClose={() => setShowModal(false)} />
      <div className="container">
        {user && (
          <h4>Hi {user.first_name}</h4>
        )}
        <label htmlFor="dateInput">Date:&nbsp;</label>
        <input
          type="date"
          id="dateInput"
          name="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
        />
        &nbsp;&nbsp;<button onClick={()=>{setShowModal(true)}} className="">Create Task</button>
      </div>
      <table className="centered-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style={{color:'white'}}>
              {tasks.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td> {/* Auto-generated index */}
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status ? "Done": "Not Done"}</td>
                  <td>
                    <button
                      className="btn-dash edit"
                      onClick={()=>handleUpdate(item.task_id)}
                    >
                      <span className="material-symbols-outlined">
                        border_color
                      </span>
                    </button>{" "}
                    &nbsp;{" "}
                    <button
                      className="btn-dash delete"
                      onClick={()=>handleDelete(item.task_id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </Layout>
  );
};

export default Dashboard;
