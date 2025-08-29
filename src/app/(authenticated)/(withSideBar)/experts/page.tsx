"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetExperts } from "@/hooks/useExpert"
import { Search, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Experts = () => {

    const [params, setParams] = useState(null)
    const { experts, isLoading } = useGetExperts()
    const router = useRouter()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Select value="rating">
                        <SelectTrigger className="w-fit rounded-[10px] h-9 border border-[#D1DAEC]">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="rating">By rating</SelectItem>
                                <SelectItem value="duration">By duration</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="rounded-[10px] p-2 flex items-center h-9 gap-2 border border-[#D8DFE2]">
                        <Search className="w-3 h-3" />
                        <Input className="border-0 bg-transparent !h-9 p-0" placeholder="search" />
                    </div>
                </div>
                <Image src={'/images/scalepadi-ai-logo.svg'} className="cursor-pointer" alt="Scalepadi AI logo" width={147} height={36} />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#FBFCFC] p-4 flex flex-col gap-4 rounded-3xl">
                    <div className="flex items-center gap-2">
                        <Image src={'/images/profile-pic.svg'} alt="Expert profile pics" width={45} height={45} className="w-[45px] h-[45px] rounded-full" />
                        <span className="text-[#1A1A1A] font-medium text-base">Growth Marketing Expert</span>
                    </div>
                    <div className="p-4 flex flex-col gap-2 border border-[#D1DAEC80] rounded-[14px]">
                        <div className="gap-3 flex flex-col">
                            <span className="text-[#1A1A1A] text-sm">I am a proactive and enthusiastic designer who uses design to translate business goals into scalable products... <span className="text-[#1E88E5] cursor-pointer">view more</span></span>
                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Rapid prototyping</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Agile Development strategies</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Business Analytics</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium">21</span>
                                    <span className="text-xs text-[#727374]">Project completed</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium flex items-center gap-1"><Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />4.0</span>
                                    <span className="text-xs text-[#727374]">Overall Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button onClick={() => router.push(`/business-setup?route=experts&expertName=`)} className="text-xs text-white rounded-[14px] hover:bg-primary-hover hover:text-black">Invite to project</Button>
                        <Button onClick={() => router.push('/experts/1')} variant={'outline'} className="text-xs rounded-[14px]">View expert</Button>
                    </div>
                </div>
                <div className="bg-[#FBFCFC] p-4 flex flex-col gap-4 rounded-3xl">
                    <div className="flex items-center gap-2">
                        <Image src={'/images/profile-pic.svg'} alt="Expert profile pics" width={45} height={45} className="w-[45px] h-[45px] rounded-full" />
                        <span className="text-[#1A1A1A] font-medium text-base">Growth Marketing Expert</span>
                    </div>
                    <div className="p-4 flex flex-col gap-2 border border-[#D1DAEC80] rounded-[14px]">
                        <div className="gap-3 flex flex-col">
                            <span className="text-[#1A1A1A] text-sm">I am a proactive and enthusiastic designer who uses design to translate business goals into scalable products... <span className="text-[#1E88E5] cursor-pointer">view more</span></span>
                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Rapid prototyping</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Agile Development strategies</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Business Analytics</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium">21</span>
                                    <span className="text-xs text-[#727374]">Project completed</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium flex items-center gap-1"><Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />4.0</span>
                                    <span className="text-xs text-[#727374]">Overall Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button className="text-xs text-white rounded-[14px] hover:bg-primary-hover hover:text-black">Invite to project</Button>
                        <Button variant={'outline'} className="text-xs rounded-[14px]">View expert</Button>
                    </div>
                </div>
                <div className="bg-[#FBFCFC] p-4 flex flex-col gap-4 rounded-3xl">
                    <div className="flex items-center gap-2">
                        <Image src={'/images/profile-pic.svg'} alt="Expert profile pics" width={45} height={45} className="w-[45px] h-[45px] rounded-full" />
                        <span className="text-[#1A1A1A] font-medium text-base">Growth Marketing Expert</span>
                    </div>
                    <div className="p-4 flex flex-col gap-2 border border-[#D1DAEC80] rounded-[14px]">
                        <div className="gap-3 flex flex-col">
                            <span className="text-[#1A1A1A] text-sm">I am a proactive and enthusiastic designer who uses design to translate business goals into scalable products... <span className="text-[#1E88E5] cursor-pointer">view more</span></span>
                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Rapid prototyping</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Agile Development strategies</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Business Analytics</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium">21</span>
                                    <span className="text-xs text-[#727374]">Project completed</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium flex items-center gap-1"><Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />4.0</span>
                                    <span className="text-xs text-[#727374]">Overall Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button className="text-xs text-white rounded-[14px] hover:bg-primary-hover hover:text-black">Invite to project</Button>
                        <Button variant={'outline'} className="text-xs rounded-[14px]">View expert</Button>
                    </div>
                </div>
                <div className="bg-[#FBFCFC] p-4 flex flex-col gap-4 rounded-3xl">
                    <div className="flex items-center gap-2">
                        <Image src={'/images/profile-pic.svg'} alt="Expert profile pics" width={45} height={45} className="w-[45px] h-[45px] rounded-full" />
                        <span className="text-[#1A1A1A] font-medium text-base">Growth Marketing Expert</span>
                    </div>
                    <div className="p-4 flex flex-col gap-2 border border-[#D1DAEC80] rounded-[14px]">
                        <div className="gap-3 flex flex-col">
                            <span className="text-[#1A1A1A] text-sm">I am a proactive and enthusiastic designer who uses design to translate business goals into scalable products... <span className="text-[#1E88E5] cursor-pointer">view more</span></span>
                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Rapid prototyping</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Agile Development strategies</span>
                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">Business Analytics</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium">21</span>
                                    <span className="text-xs text-[#727374]">Project completed</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#1A1A1A] text-sm font-medium flex items-center gap-1"><Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />4.0</span>
                                    <span className="text-xs text-[#727374]">Overall Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button className="text-xs text-white rounded-[14px] hover:bg-primary-hover hover:text-black">Invite to project</Button>
                        <Button variant={'outline'} className="text-xs rounded-[14px]">View expert</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experts
