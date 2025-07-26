"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Image from "next/image";

const BusinessSetUp = () => { 

    const [file, setFile] = useState<File | null>();
    const methods = useForm({ mode: 'onBlur' });
    
    return (
        <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4 bg-[url('/images/blur-bg.svg')]">
                <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-[560px] py-5 lg:py-20">
                    <div className="top flex flex-col gap-4 items-center justify-center w-full">
                        <span className="text-primary-text font-bold lg:text-[32px] text-center text-xl">Whats Your Business Challenge.</span>
                        <span className="text-secondary-text text-sm lg:text-base font-medium text-center">Tell us your biggest business challenge we'll analyze it and build a solution.</span>
                    </div>

                    <div className="rounded-3xl bg-white p-4 lg:p-10 border border-[#D1DAEC80] w-full">
                        <FormProvider {...methods}>
                            <form className="flex flex-col gap-6">
                                <div className="form-group flex flex-col gap-2">
                                    <Label>
                                        Challenge type <span className="text-red-600">*</span>
                                    </Label>

                                    <Controller
                                        name="challengeType"
                                        control={methods.control}
                                        rules={{ required: "Gender is required" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                                <SelectValue placeholder="Select Business Challenge type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {methods.formState.errors.gender?.message && (
                                        <p className="text-red-500 text-sm">{methods.formState.errors.gender.message as string}</p>
                                    )}
                                </div>

                                <div className="form-group flex flex-col gap-2">
                                    <Label>
                                        Describe the problem
                                    </Label>
                                    <Textarea className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" />
                                    <span className="text-xs text-[#2585D7]">Feel free to elaborate and add all the necessary info including links</span>
                                </div>

                                <div className="form-group flex flex-col gap-2">
                                    <Label>Growth goal<span className="text-[#878A93]">(optional)</span></Label>
                                    <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" />
                                </div>

                                <div className="form-group flex flex-col gap-2">
                                    <Label>
                                        Duration<span className="text-[#878A93]">(optional)</span>
                                    </Label>

                                    <Controller
                                        name="challengeType"
                                        control={methods.control}
                                        rules={{ required: "Gender is required" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                                <SelectValue placeholder="Select Business Challenge type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="male">4 to 8 weeks</SelectItem>
                                                    <SelectItem value="female">9 to 12 weeks</SelectItem>
                                                </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {methods.formState.errors.gender?.message && (
                                        <p className="text-red-500 text-sm">{methods.formState.errors.gender.message as string}</p>
                                    )}
                                </div>

                                {!file && <div className="flex flex-col gap-2">
                                    <Label className="text-[#0E1426] text-sm font-normal">File upload<span className="text-[#878A93]">(optional)</span></Label>

                                    <label htmlFor="task-upload" className="w-fit bg-white border rounded-[10px] cursor-pointer border-[#D1DAEC80] p-2 flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        <span className="text-[#1A1A1A] text-xs font-normal">Add additional files</span>
                                    </label>

                                    <Input
                                        id="task-upload"
                                        type="file"
                                        className="hidden"
                                        accept=".jpg, .jpeg, .png, .pdf, .docx, .xlsx"
                                    />
                                </div>}

                                {file &&
                                    <div className="flex w-full flex-col gap-2">
                                        <Label className="text-[#0E1426] text-sm font-normal">File uploaded</Label>
                                        <div className="flex w-full items-center gap-1">
                                            <div className="flex items-center gap-1 border border-[#ABC6FB] bg-white rounded-[8.4px] p-[7.3px]">
                                                <Image src={'/icons/file-icon.svg'} alt="File icon" width={20} height={20} />
                                                <span className="text-[#878A93] text-xs">title</span>
                                            </div>
                                            <div className="flex items-center justify-center w-3 h-3 bg-[#BCC2C7] rounded-full cursor-pointer">
                                                <X onClick={() => setFile(null)} className="text-[#878A93] cursor-pointer" />
                                            </div> 
                                        </div>
                                    </div>
                                }

                                <div className="flex gap-2 items-center">
                                    <Button className="w-fit rounded-[14px] py-6 px-4 bg-primary text-white hover:bg-[#F2BB05] hover:text-black">
                                        Continue
                                    </Button>
                                    <Button className="bg-transparent text-primary w-fit rounded-[14px] py-6 px-4 hover:bg-white hover:text-primary">Explore ScalePadi AI</Button>
                                </div>
                                <Image src={'/images/analysis-done.svg'} alt="Analysis progress" width={314} height={36} />
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessSetUp;
