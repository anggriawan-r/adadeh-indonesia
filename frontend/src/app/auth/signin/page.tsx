"use client"

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
import { useToast } from "@/components/ui/use-toast"

export default function SignIn() {
  const { message, handleSignIn } = useLogin()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = async (val: z.infer<typeof signInSchema>) => {
    await handleSignIn(val)
    .then(()=>{
      toast({
        title: "Success",
        description: message
      })
    })
    .catch(()=>{
      toast({
        variant: "destructive",
        title: "Failed",
        description: message
      })
    })
  }
  return (
    <>
      <section className="mt-20 bg-white lg:mt-0 h-[calc(100%-80px)] relative top-20">
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
                mulai dari sepatu olahraga, dan sneaker, hingga aksesori
                olahraga lainnya untuk semua kebutuhan Anda.
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
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Dont have an account?
                      <a href="/auth/signup" className="text-gray-700 underline">
                        Sign Up
                      </a>
                    </p>
                  </form>
                </Form>
                {/* <form action="#" className="flex flex-col lg:mt-8 lg:w-96">
                  <div className="mt-2">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Email{" "}
                    </label>

                    <input
                      placeholder="john.doe@example.com"
                      type="email"
                      id="Email"
                      name="email"
                      className="mt-1 w-full border border-gray-300 bg-white p-2 text-sm text-gray-700"
                    />
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor="Password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Password{" "}
                    </label>

                    <input
                      type="password"
                      placeholder="password"
                      id="Password"
                      name="password"
                      className="mt-1 w-full border border-gray-300 bg-white p-2 text-sm text-gray-700"
                    />
                  </div>

                  <div className="mt-4">
                    <button className="mb-4 inline-block shrink-0 border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black">
                      LOGIN
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Dont have an account?
                      <a href="#" className="text-gray-700 underline">
                        Sign Up
                      </a>
                      .
                    </p>
                  </div>
                </form> */}
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
