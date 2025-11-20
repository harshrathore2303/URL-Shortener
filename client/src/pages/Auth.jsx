import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { UrlState } from "@/context";
import { BeatLoader } from "react-spinners";

const Auth = () => {
  const [searchParams] = useSearchParams();
  
  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();
  const {isAuthenticated, loading, fetchfn} = UrlState();
  
  useEffect(() => {
    fetchfn(); 
  }, []);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(
        longLink
          ? `/dashboard?createNew=${longLink}`
          : "/dashboard"
      );
    }
  }, [isAuthenticated, loading, longLink]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <BeatLoader color="red"/>
      </div>
    );
  }

  return (
    <div className="mt-28 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longLink
          ? "Hold up! Let's login first"
          : "Login / SignUp"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login/>
        </TabsContent>
        <TabsContent value="signup"><SignUp/ ></TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
