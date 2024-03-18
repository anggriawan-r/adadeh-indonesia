import Image from "next/image";

export default function SignUp() {
  return (
    <>
      <section className="mt-20 bg-white lg:mt-0">
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
                <h1 className="hidden text-4xl font-bold lg:block">SIGN UP.</h1>
                <form
                  action="#"
                  className="flex flex-col gap-6 lg:mt-8 lg:w-96"
                >
                  <div>
                    <label
                      htmlFor="Name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Name{" "}
                    </label>

                    <input
                      placeholder="John Doe"
                      type="text"
                      id="Name"
                      name="name"
                      className="mt-1 w-full border border-gray-300 bg-white p-2 text-sm text-gray-700"
                    />
                  </div>

                  <div>
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

                  <div>
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

                  <div>
                    <button className="mb-4 inline-block shrink-0 border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black">
                      SIGN UP
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Already habe an account?
                      <a href="#" className="text-gray-700 underline">
                        Login.
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
