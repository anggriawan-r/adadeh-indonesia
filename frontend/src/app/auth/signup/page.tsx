"use client";

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
import { signUpSchema } from "@/type/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "@/stores/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [validasi, setValidasi] = useState(false);
  const { message, handleSignUp } = useRegister();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (val: z.infer<typeof signUpSchema>) => {
    if (val.password !== val.password_confirmation) {
      setValidasi(true);
    }
    await handleSignUp(val)
      .then(() => {
        toast({
          title: "Success",
          description: message,
        });
        router.push("/auth/signin");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: message,
        });
      });
  };
  return (
    <section className="relative mt-20 h-[calc(100%-80px)] bg-white lg:mt-0">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            height={1000}
            width={500}
            alt=""
            src="/signup.png"
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

        <main className="mt-20 flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
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

            <div className="flex flex-col justify-center border-gray-300 py-14 lg:border lg:px-8">
              <h1 className="hidden text-4xl font-bold lg:block">SIGN UP.</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 lg:mt-8 lg:w-96"
                  autoComplete="false"
                >
                  {validasi && (
                    <p className="text-sm text-red-500">
                      Konfirmasi password harus sama dengan password
                    </p>
                  )}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none"
                            placeholder="Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            type="password"
                            className="rounded-none"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Confirmation</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="rounded-none"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="rounded-none">
                    SIGN UP
                  </Button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?{" "}
                    <a href="/auth/signin" className="text-gray-700 underline">
                      Login.
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
