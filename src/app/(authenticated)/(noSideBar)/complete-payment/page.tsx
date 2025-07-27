"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";

const CompletePayment = () => {
    return (
        <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4">
                <div className="flex flex-col gap-12 w-full lg:w-[771px] py-5 lg:py-20">
                    <div className="flex gap-1 items-center cursor-pointer w-fit">
                        <Image src={'/icons/arrow-left.svg'} alt="Arrow left" width={16} height={16} />
                        <span className="text-sm text-[#3E4351]">Go back</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-xl text-[#0E1426] lg:text-[32px]">Complete Payment</span>
                        <span className="text-base text-[#1A1A1A] font-normal">You're just one step away from kicking off your growth journey. All payments are encrypted and protected.</span>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex flex-col gap-4 lg:w-[337px]">
                                <span className="font-medium text-base text-[#1A1A1A]">Payment Include</span>
                                <div className="flex flex-col gap-2 mt-2">
                                    <span className="font-medium text-base font-[#1A1A1A]">✔️ Custom Execution Timeline</span>
                                    <span className="font-medium text-base font-[#1A1A1A]">✔️ Weekly Progress Tracking</span>
                                    <span className="font-medium text-base font-[#1A1A1A]">✔️ Performance Reporting</span>
                                    <span className="font-medium text-base font-[#1A1A1A]">✔️ Strategy Optimization Support</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 p-4 border border-[#F2F2F2] rounded-[20px] h-fit flex-1">
                                <span className="w-fit text-[#878A93] font-normal text-base">Summary</span>

                                <div className="flex form-group flex-col gap-2">
                                    <Label className="text-sm">Card Number</Label>
                                    <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" placeholder="Enter card number" />
                                </div>

                                <div className="flex gap-2 items-center">
                                    <div className="flex form-group flex-col gap-2">
                                        <Label className="text-sm">CVV</Label>
                                        <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" placeholder="Enter card number" />
                                    </div>
                                    <div className="flex form-group flex-col gap-2">
                                        <Label className="text-sm">Expiry Date</Label>
                                        <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" placeholder="Enter card number" />
                                    </div>
                                </div>
                                <Button className="bg-primary w-full text-white py-6 rounded-[14px] hover:bg-primary-hover hover:text-black">Confirm Payment</Button>
                                <div className='flex items-center gap-2'>
                                    <Checkbox /> <span className='text-sm text-[#878A93]'>Save my card</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompletePayment;
