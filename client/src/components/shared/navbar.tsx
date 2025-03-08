import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import CreatePost from "../create-post";
import { useCreatePost } from "@/hooks/use-create-post";
import { authStore } from "@/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import $axios from "@/http";
import { IUser } from "@/interfaces";

const Navbar = () => {
  const { isOpen, onOpen } = useCreatePost();
  const { isAuth, user, isLoading, setIsAuth, setUser } = authStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await $axios.post("/auth/logout");
      localStorage.removeItem("accessToken");
      navigate("/auth");
      setIsAuth(false);
      setUser({} as IUser);
    } catch (error) {
      // @ts-ignore
      toast(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="w-full h-24 bg-gray-900 fixed inset-0">
        <div className="w-full h-full flex justify-between items-center container mx-auto">
          <Link to={"/"}>
            <div className="flex items-center justify-center gap-2 ml-2">
              <img src={"/logo.svg"} />
              <p className="font-bold text-4xl">Sammi</p>
            </div>
          </Link>

          <div className="flex gap-2 items-center">
            {isAuth && (
              <Button
                className="rounded-full font-bold"
                size={"lg"}
                variant={"outline"}
                onClick={onOpen}
              >
                Create Post
              </Button>
            )}
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : isAuth ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer my-auto">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <p className="text-sm text-red-400 text-center">
                    {user.isActivated
                      ? "User is activated"
                      : "User is not activated"}
                  </p>
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={"/auth"}>
                <Button className="rounded-full font-bold" size={"lg"}>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <CreatePost />
    </>
  );
};

export default Navbar;
