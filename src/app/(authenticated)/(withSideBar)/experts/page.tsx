"use client"

import ExpertCard from "@/components/expertCard"
import ProjectSkeletonLoader from "@/components/skeletons/projects.skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetExperts } from "@/hooks/useExpert"
import { IExpert } from "@/types/expert.type"
import { Search, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Experts = () => {

    const [params, setParams] = useState(null)
    const { experts, isLoading } = useGetExperts()

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

            {isLoading ? (
                <ProjectSkeletonLoader />
            ) : (
                 experts?.data.length === 0 ? (
                    <div className="empty-state h-full w-full bg-[#FBFCFC] rounded-3xl p-3">
                        <div className="bg-[#FFFFFF] h-full w-full rounded-[14px] border border-[#D1DAEC80] flex items-center justify-center py-5">
                            <div className="flex flex-col items-center w-full lg:w-[533px] justify-center gap-10">
                                <Image src={'/images/empty-search.svg'} alt="Search icon" width={164} height={150} />
                                <span className="text-center text-base text-[#878A93]">You do not have any active projects yet, your projects will appear here as soon as you are matched with a project</span>
                                <Button className="text-white bg-primary rounded-[14px] hover:bg-primary-hover hover:text-black">start a new project</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-3">
                        {experts?.data?.map((expert: IExpert) => (
                            <ExpertCard expert={expert} />
                        ))}
                    </div>
                )   
            )}
        </div>
    )
}

export default Experts
