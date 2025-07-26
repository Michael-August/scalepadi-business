"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { useRef, useState } from "react";

const OTP = () => {

    const length = 6;
    const [otp, setOtp] = useState(Array(length).fill(""))
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return
        
        const digits = value.split("");
        const updatedOtp = [...otp]

        for (let i = 0; i < digits.length && index + i < length; i++) {
            updatedOtp[index + i] = digits[i];
        }

        setOtp(updatedOtp);

        // Move focus to next
        const nextIndex = index + digits.length;
        if (nextIndex < length) {
            inputsRef.current[nextIndex]?.focus();
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            const updatedOtp = [...otp];

            if (otp[index]) {
                // If current has value, clear it
                updatedOtp[index] = "";
                setOtp(updatedOtp);
            } else if (index > 0) {
                // Go to previous and clear it
                updatedOtp[index - 1] = "";
                setOtp(updatedOtp);
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div>
            <div className="flex justify-center py-10 lg:py-28">
                <div className="flex flex-col gap-6">
                    <div className="top flex flex-col gap-4 items-center justify-center">
                        <span className="text-primary-text font-bold lg:text-[32px] text-2xl">Code Your Email</span>
                        <span className="text-secondary-text text-base font-normal text-center">Enter the code sent to your email: <span className="text-primary">Devidezeri@gmail.com</span> to continue.</span>
                    </div>

                    <div className="rounded-3xl bg-white p-10 border border-[#EFF2F3] w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-4">

                            <div className="flex justify-center gap-4">
                                {otp.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => { inputsRef.current[index] = el; }}
                                        maxLength={length}
                                        placeholder="*"
                                        inputMode="numeric"
                                        className={clsx("text-center w-16 h-12 rounded-xl text-xl font-medium border border-[#D1DAEC80]")}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))

                                }
                            </div>
                            <span className="font-normal text-sm w-fit text-primary cursor-pointer">
                                Resend code
                            </span>
                        </div>
                        <Button className="bg-primary text-white w-fit rounded-[14px] px-4 py-6">Verify code</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTP
