"use client"

import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const SignUp = () => {

    const [pageState, setPageState] = useState('initial')
    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="flex">
                <Image className="hidden lg:block" src={'/images/signup-side.svg'} alt="Side image" width={692} height={743} />
                <div className="bg-[url('/images/blur-bg.svg')] w-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-6 lg:w-[506px] py-5 lg:py-0">
                        <div className="top flex flex-col gap-4 items-center justify-center">
                            <span className="text-primary-text font-bold lg:text-[32px] text-2xl">Sign up</span>
                            <span className="text-secondary-text text-base font-medium text-center">Complete the form below to create account</span>
                        </div>
    
                        <div className="rounded-3xl bg-white p-10 border border-[#EFF2F3] w-full">
                            <form action="" className="flex flex-col gap-6">
                            <div className="form-group flex flex-col gap-2">
                                    <Label>Full Name <span className="text-red-600">*</span></Label>
                                    <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" placeholder="Enter Full Name" />
                                </div>
                                <div className="form-group flex flex-col gap-2">
                                    <Label>Email <span className="text-red-600">*</span></Label>
                                    <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group flex flex-col gap-2">
                                    <Label>Category <span className="text-red-600">*</span></Label>
                                    <Select>
                                        <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="expert">Expert</SelectItem>
                                                <SelectItem value="business">Business</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="form-group flex flex-col gap-2">
                                    <Label>Gender <span className="text-red-600">*</span></Label>
                                    <Select>
                                        <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="form-group w-full flex flex-col gap-2">
                                    <Label>Phone Number <span className="text-red-600">*</span></Label>
                                    <PhoneInput
                                        country={'ng'}
                                        value={''}
                                        onChange={() => {}}
                                        inputClass="!rounded-[14px] !py-6 !w-full !border !border-[#D1DAEC]"
                                        containerClass="!w-full !rounded-tl-[14px] !rounded-bl-[14px]"
                                    />
                                </div>
                                <div className="form-group flex flex-col gap-2">
                                    <Label>
                                        Password <span className="text-red-600">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
                                            onClick={() => setShowPassword((prev: boolean) => !prev)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Checkbox /> <span className='text-sm text-[#878A93]'>By signing up, you agree to our <span className='text-primary cursor-pointer'>Terms</span>.</span>
                                    </div>
                                </div>
                                <Button className="bg-primary text-white w-fit rounded-[14px] px-4 py-6">Create my account</Button>
                            </form>
                        </div>
    
                        <div className="w-full">
                            <Link href={'/signin'} className="text-sm text-[#878A93] text-left">Already have an account? <span className="text-primary cursor-pointer">Log in</span></Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SignUp
