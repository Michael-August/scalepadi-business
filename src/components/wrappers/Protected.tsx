"use client"

import { useGetBusinessByToken } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Protected = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const { business } = useGetBusinessByToken()

    useEffect(() => {
        if (!localStorage.getItem("token")) { 
            toast.info("You need to login first")
            localStorage.clear()
            router.replace('/signin');
        }

        if (business?.status === true) {
            localStorage.setItem("user", JSON.stringify(business.data))
        } 
    }, [business]);

    return (
        <>
            {children}
        </>
    )
}

export default Protected;
