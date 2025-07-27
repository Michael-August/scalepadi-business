"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const PaymentSuccessful = () => {
    return (
        <div className="flex justify-center px-4 h-screen py-20">
            <div className="w-full lg:w-[547px] flex flex-col gap-6">
                <Image src={'/icons/payment-success.svg'} alt="Payment Successful" width={54} height={54} />
                <span className="font-bold text-xl text-[#0E1426] lg:text-[32px]">Payment successful</span>
                <span className="text-base text-[#1A1A1A] font-normal">You’re just one step away from kicking off your growth journey. All payments are encrypted and protected.</span>

                <Button className="bg-primary text-white py-6 rounded-[14px] w-fit hover:bg-primary-hover hover:text-black">
                    Explore your dashboard
                </Button>
            </div>
        </div>
    )
}

export default PaymentSuccessful;
