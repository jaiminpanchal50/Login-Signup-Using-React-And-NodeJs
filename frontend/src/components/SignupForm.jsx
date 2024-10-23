import { Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import "./signup.css";

const SignupForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: "",
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
    // Handle form submission logic (e.g., send data to server)
    try {
      const createUser = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      // console.log(createUser.data.username);
      // console.log(createUser.status);
      // let name = await createUser.data.status;
      // console.log(name);


      const text =  'welcome'+ createUser.data.username + "We've created your account for you.";
      let value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);




      
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-center",
      });
    } catch (error) {
      console.log("nre error", error);
      if (error.response && error.response.status === 400) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          position: "top-center",
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
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
          className="submit-button"
          //   onClick={() =>
          //     toast({
          //       title: "Account created.",
          //       description: "We've created your account for you.",
          //       status: "success",
          //       duration: 9000,
          //       isClosable: true,
          //     })
          //   }
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
