"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categorySchema } from "@/type/category";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useCategory } from "@/stores/useCategory";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface props{
    id: string
    token: any
}

export default function UpdateCategory({ id, token }:props) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });
  const { edit, message } = useCategory();
  const { toast } = useToast();
  const router = useRouter()
  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    console.log(values)
    await edit(values, id, token)
      .then(() => {
        toast({
          title: "Success",
          description: message,
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: message,
        });
      })
      .finally(()=>{
        router.refresh()
      })
  };
  return (
    <Dialog>
      <DialogTrigger className="rounded-lg border border-slate-200 px-4 py-2">
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
