import { authSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/http";
import { authStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FillLoading from "../shared/fill-loading";

const Register = () => {
  const { setAuth } = useAuth();
  const { setIsAuth, setUser } = authStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: z.infer<typeof authSchema>) => {
      const { data } = await $axios.post("/auth/register", values);
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    },
    onError: (error) => {
      // @ts-ignore
      toast(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof authSchema>) {
    mutate(values);
  }

  return (
    <>
      {isPending && <FillLoading />}

      <h1 className="text-2xl font-bold">Register</h1>
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <span
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={() => setAuth("login")}
        >
          Sign in
        </span>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@sammi.ac" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <span
              className="text-sm text-blue-500 hover:underline cursor-pointer"
              onClick={() => setAuth("forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default Register;
