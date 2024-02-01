import Layout from "../components/Layout";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  

  return (
    <Layout title="Tasker | Home" content="Homepage">

      <div className="container">
        <div className="header">
          <h1>Tasker</h1>
          <h3>The all in one task app.</h3>
          <br />
          <hr />
          <h4><Link to="/login">Login</Link> to begin saving your tasks</h4>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
