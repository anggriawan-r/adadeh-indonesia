import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/user/Account";
import Password from "@/components/user/Password";
import Address from "@/components/user/Address";
import Phone from "@/components/user/Phone";
import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";

export default function UserPage() {
  return (
    <main className="mt-20 flex min-h-[calc(100svh-80px-48px)] w-full items-start justify-center gap-4 sm:pr-4">
      <div className="relative hidden h-[calc(100vh-80px-48px)] sm:block sm:basis-1/2">
        <Image
          src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg"
          alt="view of shoes"
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="mt-6 flex h-max w-full basis-1/2 justify-center self-start px-4 sm:mb-10 sm:mt-10">
        <div className="flex h-max w-max flex-col gap-4">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 border border-black bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-black hover:text-white">
              <GoHeart className="text-xl" />
              Wishlist
            </button>
            <button className="flex items-center gap-2 border border-black bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-black hover:text-white">
              <FiShoppingCart className="text-xl" />
              Cart
            </button>
          </div>
          <Tabs defaultValue="account" className="max-w-[400px]">
            <TabsList className="rounded-none">
              <TabsTrigger className="rounded-none" value="account">
                Account
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="password">
                Password
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="address">
                Address
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="phone">
                Phone
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="flex flex-col gap-4 border border-black/10 bg-white p-4">
                <p className="text-black/50">
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </p>
                <Account />
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="flex flex-col gap-4 border border-black/10 bg-white p-4">
                <p className="text-black/50">
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </p>
                <Password />
              </div>
            </TabsContent>
            <TabsContent value="address">
              <div className="flex flex-col gap-4 border border-black/10 bg-white p-4">
                <p className="text-black/50">
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </p>
                <Address />
              </div>
            </TabsContent>
            <TabsContent value="phone">
              <div className="flex flex-col gap-4 border border-black/10 bg-white p-4">
                <p className="text-black/50">
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </p>
                <Phone />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
