import { Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createUser = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      console.log("New User", createUser);
      const text =
        "welcome " +
        createUser.data.username +
        ". We've created your account for you.";

        
      let value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);

      toast({
        title: "Login success",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred:", error);
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        if (error.response.status === 400) {
          toast({
            title: "Account creation failed.",
            description:
              "We've encountered an error while creating your account.",
            status: "error",
            duration: 9000,
            position: "top-center",
            isClosable: true,
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            placeholder="Enter your email address"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your email Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          className="submit-button">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
