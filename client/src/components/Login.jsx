import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import * as Yup from 'yup'
import { BeatLoader } from "react-spinners";
import {api} from '../lib/axios'
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew')
  const {fetchfn} = UrlState();

  

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin(){
    setErrors({});
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      })

      await schema.validate(formData, {abortEarly: false})
      
      const data = await api.post('/user/login', formData);
      console.log(data);
      await fetchfn();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      
    } catch (e) {
      if (e?.inner){
        const newErrors = {};
        e?.inner?.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }

      if (e?.response) {
        setErrors({
          backend: e.response.data.message || "Something went wrong",
        });
      }
      console.log(e?.response?.data?.message)
    }
    setLoading(false);
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
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1 ">
          <Input
            name="password"
            type="password"
            placeholder="Enter your password "
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div> 
        {errors.backend && <Error message={errors.backend}/>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>{loading ? <BeatLoader size={20}/> : "Login"}</Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
