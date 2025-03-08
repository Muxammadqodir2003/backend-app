import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { postStore } from "@/store/post.store";
import { useMutation } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import FillLoading from "../shared/fill-loading";
import { toast } from "sonner";
import $api from "@/http/api";

const ConfirmModal = () => {
  const { isOpen, onClose, post } = useConfirm();
  const { setPosts, posts } = postStore();

  const { mutate, error, isPending } = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: async () => {
      const { data } = await $api.delete(`/post/delete/${post._id}`);
      return data;
    },
    onSuccess: (data) => {
      const newData = posts.filter((c) => c._id !== data._id);
      setPosts(newData);
      onClose();
    },
    onError: (error) => {
      // @ts-ignore
      toast(error.response.data.message);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            {/* @ts-ignore */}
            <AlertDescription>{error.response.data.message}</AlertDescription>
          </Alert>
        )}
        {isPending && <FillLoading />}
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => mutate()}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
