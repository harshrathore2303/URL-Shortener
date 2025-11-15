import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import Error from "./Error";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 ">
        <div className="space-y-1 ">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          <Error message={"some error"} />
        </div>
        <div className="space-y-1 ">
          <Input
            name="password"
            type="password"
            placeholder="Enter your password "
            onChange={handleInputChange}
          />
        </div> 
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default Login;
