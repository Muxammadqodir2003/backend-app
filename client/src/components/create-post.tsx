import { useCreatePost } from "@/hooks/use-create-post";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { postStore } from "@/store/post.store";
import $api from "@/http/api";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState<File | null>(null);

  const { isOpen, onClose } = useCreatePost();
  const { posts, setPosts } = postStore();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", body: "" },
  });

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    setPicture(file as File);
  }

  async function onSubmit(values: z.infer<typeof postSchema>) {
    if (!picture) return null;

    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("picture", picture);

    try {
      const res = await $api.post("/post/create", formData);
      const newData = [...posts, res.data];
      setPosts(newData);
      form.reset();
      onClose();
    } catch (error) {
      // @ts-ignore
      toast(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a post</SheetTitle>
          <SheetDescription>Write what is in your mind</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 mt-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create a title post"
                      className="bg-secondary"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="In this article you can improve..."
                      className="bg-secondary"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                onChange={onFileChange}
                className="bg-secondary"
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePost;
