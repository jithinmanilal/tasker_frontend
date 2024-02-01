import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from '../context/Constants';
import './Register.css';

const Register = () => {
  const { registered, setRegistered, isAuthenticated } =
    useContext(UserContext);

  const [errors, setErrors] = useState({});

  const [confirmPassword, setConfirmPassword] = useState("");
  const [body, setBody] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { email, first_name, last_name, password } = body;

  const onChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
  
    if (password !== confirmPassword) {
      setErrors({
        confirm_password: "Password and Confirm Password do not match.",
      });
      return;
    }
  
    axios.post(`${BASE_URL}/api/users/register`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // Registration successful
          setRegistered(true);
          console.log('User registered successfully');
        } else {
          // Handle any other responses, e.g., validation errors
        }
      })
      .catch((error) => {
        // Handle any network or request errors
        setErrors({ general: 'Registration failed. Please check your information.' });
        console.error('Error registering user:', error);
      });
  };
  

  if (registered) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Layout title='Tasker | Register' content='Registerpage'>
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this Form to create an account.</p>
          <hr />
          {errors.general && (
            <div className="text-red-600 text-center mt-4 text-sm">
              {errors.general}
            </div>
          )}
          <label htmlFor="first_name">
            <b>First Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="first_name"
            id="first_name"
            value={first_name}
            onChange={onChange}
            required
          />

          <label htmlFor="last_name">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="last_name"
            id="last_name"
            value={last_name}
            onChange={onChange}
            required
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            required
          />

          <label htmlFor="confirmPassword">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <hr />

          {/* <p>
            By creating an account you agree to our{" "}
            <a href="#">Terms & Privacy</a>.
          </p> */}
          <button type="submit" className="registerbtn">
            Register
          </button>
        </div>

        <div className="container signin">
          <p style={{color:'black'}}>
            Already have an account? <Link to="/login">Sign in</Link>.
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
