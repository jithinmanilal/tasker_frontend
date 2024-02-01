import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

import { BASE_URL } from '../context/Constants';
import Layout from "../components/Layout";
import './Login.css';
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axiosInstance from '../context/AxiosInstance';

const OtpLogin = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false); 

    const getUserDetails = async () => {
    try {
      const response = await axiosInstance.get('/users/me');
  
      if (response.status === 200) {
        setUser(response.data);
        return response.data; // User details
      } else {
        return null; // User details not available
      }
    } catch (error) {
      console.error('Error retrieving user details:', error);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  
    if (!emailSubmitted) {
            await axios.post(`${BASE_URL}/api/auth/create-otp`, { "email": email })
            .then((response) => {
                if (response.status === 200) {
                setEmailSubmitted(true);
                console.log('Email submitted successfully');
                } else {
                console.log('Email submission failed');
                }
            })
            .catch((error) => {
                console.error('Error submitting email:', error);
            });
      } else {
            await axios.post(`${BASE_URL}/api/auth/validate-otp`, { email, otp })
        .then((response) => {
            if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            console.log('Login successful');
            getUserDetails();
            setIsAuthenticated(true);
            } else {
            console.log('Login failed');
            }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout title="Tasker | OTP Login" content="Loginpage">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>Login with OTP</h1>
          <p>
            {!emailSubmitted
              ? "Enter email to get OTP."
              : "OTP has been sent. Enter OTP to login."}
          </p>
          <hr />
          {errors.general && (
            <div className="text-red-600 text-center mt-4 text-sm">
              {errors.general}
            </div>
          )}

          {!emailSubmitted && (
            <label htmlFor="email">
              <b>Email</b>
            </label>
          )}

          <input
            type="text"
            placeholder={!emailSubmitted ? "Enter Email" : "Email Locked"}
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={emailSubmitted}
          />

          {emailSubmitted && (
            <>
              <label htmlFor="otp">
                <b>OTP</b>
              </label>

              <input
                type="password"
                placeholder="Enter OTP"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="registerbtn">
            {emailSubmitted ? "Login" : "Submit Email"}
          </button>
        </div>

        <div className="container signin">
          <p style={{ color: "black" }}>
            Remember Password? <Link to="/login">Login with Password</Link>
          </p>
          <p style={{ color: "black" }}>
            Don&apos;t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default OtpLogin;
