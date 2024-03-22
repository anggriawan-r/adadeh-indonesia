"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import { MdOutlineSpaceDashboard, MdCategory, MdOutlineProductionQuantityLimits, MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useLogin } from "@/stores/useAuth";

export default function Sidebar(){
    const router = useRouter()
    const { handleSignOut } = useLogin()
    return(
        <>
            <header className="grid place-items-center h-40">
                <div className="space-y-2">
                    <Image src={"/adadeh.svg"} height={80} width={80} alt="Logo" />
                    <p className="text-center">Admin</p>
                </div>
            </header>
            <main className="flex flex-col justify-between min-h-[calc(100%-160px)]">
                <ul className="space-y-4">
                    <li>
                        <Button 
                            className="w-full justify-start" 
                            variant={"ghost"}
                            onClick={()=>router.push("/dashboard")}
                        >
                            <MdOutlineSpaceDashboard className="text-xl mr-2" />
                            Dashboard
                        </Button>
                    </li>
                    <li>
                        <Button 
                            className="w-full justify-start" 
                            variant={"ghost"}
                            onClick={()=>router.push("/dashboard/categories")}
                        >
                            <MdCategory className="text-xl mr-2" />
                            Category
                        </Button>
                    </li>
                    <li>
                        <Button 
                            className="w-full justify-start" 
                            variant={"ghost"}
                            onClick={()=>router.push("/dashboard/products")}
                        >
                            <MdOutlineProductionQuantityLimits className="text-xl mr-2" />
                            Product
                        </Button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Button className="w-full justify-start" variant={"ghost"} onClick={()=>{
                            handleSignOut()
                            router.push("/auth/signin")
                        }}>
                            <MdLogout className="text-xl mr-2" />
                            Logout
                        </Button>
                    </li>
                </ul>
            </main>
        </>
    )
}