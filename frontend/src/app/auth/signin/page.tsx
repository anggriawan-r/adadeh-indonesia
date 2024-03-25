"use client";

import Image from "next/image";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/type/auth";
import { useForm } from "react-hook-form";
import { useLogin } from "@/stores/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { message, status, handleSignIn, data } = useLogin();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (val: z.infer<typeof signInSchema>) => {
    await handleSignIn(val);
    setIsSubmitted(true);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      if (status) {
        toast({
          title: "Success",
          description: message,
        });
        setIsSubmitted(false);
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: message,
        });
        setIsSubmitted(false);
      }
    }
  }, [message, status, toast, isSubmitted]);

  return (
    <section className="relative mt-20 h-full bg-white lg:mt-0">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            height={1000}
            width={500}
            alt=""
            src="/image.png"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Adadeh
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Toko Online Resmi Adadeh Indonesia menyediakan produk terbaik
              mulai dari sepatu olahraga, dan sneaker, hingga aksesori olahraga
              lainnya untuk semua kebutuhan Anda.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <Image src="/adadeh.svg" alt="Logo" width={50} height={50} />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Adadeh
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Toko Online Resmi Adadeh Indonesia menyediakan produk terbaik
                mulai dari sepatu olahraga, dan sneaker, hingga aksesori
                olahraga lainnya untuk semua kebutuhan Anda.
              </p>
            </div>

            <div className="flex flex-col border-gray-300 px-8 py-14 lg:border">
              <h1 className="hidden text-4xl font-bold lg:block">
                WELCOME BACK.
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 lg:mt-8 lg:w-96"
                  autoComplete="false"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none"
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
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
                          <Input
                            className="rounded-none"
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="rounded-none">
                    SIGN IN
                  </Button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Dont have an account?{" "}
                    <a href="/auth/signup" className="text-gray-700 underline">
                      Sign Up
                    </a>
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
