"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const Inquiry = () => {
    return (
        <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col gap-[9px] w-full px-4 lg:px-44 py-5 lg:py-20">
                <div className="flex gap-1 items-center cursor-pointer w-fit">
                    <Image src={'/icons/arrow-left.svg'} alt="Arrow left" width={16} height={16} />
                    <span className="text-sm text-[#3E4351]">Go back</span>
                </div>

                <div className="flex flex-col gap-6 w-full lg:w-[616px] items-center mx-auto mt-5">
                    <div className="flex flex-col gap-6">
                        <span className="font-bold text-xl text-[#1A1A1A] lg:text-[32px]">Have Inquiries about our Product ?</span>
                        <span className="text-base text-[#1A1A1A] font-light">You're just one step away from kicking off your growth journey. All payments are encrypted and protected.</span>
                    </div>

                    <div className="rounded-3xl bg-white border border-[#D1DAEC80] w-full lg:w-[560px] mx-auto p-10">
                        <form action="" className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="form-group flex flex-col gap-2">
                                    <Label>First name</Label>
                                    <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" placeholder="Enter first name" />
                                </div>
                                <div className="form-group flex flex-col gap-2">
                                    <Label>Last name</Label>
                                    <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" placeholder="Enter last name" />
                                </div>
                                <div className="form-group flex flex-col gap-2">
                                    <Label>Email address</Label>
                                    <Input type="email" className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" placeholder="Enter email address" />
                                </div>
                                <div className="form-group flex flex-col gap-2">
                                    <Label>I am looking for information about:</Label>
                                    <Textarea className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" placeholder="Enter first name" />
                                    <span className="text-xs text-[#2585D7]">Feel free to elaborate and add all the necessary info including links</span>
                                </div>
                            </div>
                            <Button className="bg-primary text-white py-6 rounded-[14px] w-fit hover:bg-primary-hover hover:text-black">Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inquiry;
