import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import {api} from '../lib/axios';
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const {user, fetchfn} = UrlState();
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.get('/user/logout');
      await fetchfn();
      navigate('/');
      window.location.reload();
      setLoading(false);
    } catch (error) {
      
    }
  }

  return (
    <>
    <nav className="py-4 flex justify-between items-center">
      <Link>
        <img src="../../public/vite.svg" alt="" className="h-16" />
      </Link>

      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full overflow-hidden">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profile_pic ? user.profile_pic : "https://github.com/shadcn.png"} />
                <AvatarFallback>HR</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/dashboard" className="flex">
                  <LinkIcon className="mr-2 h-4 w-4"/>
                  <span>My Links</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4"/>  
                <span onClick={handleLogout}>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>

    {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
