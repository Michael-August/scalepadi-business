"use client"

import { Input } from "@/components/ui/input";
import { Info, Plus, SendHorizontal } from "lucide-react";
import Image from "next/image";

const AnalysisResultPage = () => { 
    return (
        <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4">
                <div className="flex flex-col gap-12 w-full lg:w-[900px] py-5 lg:py-20">
                    <div className="flex gap-1 items-center cursor-pointer w-fit">
                        <Image src={'/icons/arrow-left.svg'} alt="Arrow left" width={16} height={16} />
                        <span className="text-sm text-[#3E4351]">Go back</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Image src={'/images/scalepadi-ai-logo.svg'} alt="ScalePadi AI Logo" width={126} height={36} />
                        <span className="font-bold text-xl text-[#0E1426] lg:text-[32px]">Here's What We Found</span>
                        <span className="text-base text-[#1A1A1A] font-normal">Our AI analyzed your challenge and highlighted the bottlenecks stalling your growth.</span>
                    </div>

                    <div className="border relative border-[#F2F2F2] rounded-3xl p-4 lg:p-6">
                        <div className="sticky bg-white top-0 pb-6 border-b -mx-4 px-4 lg:-mx-6 lg:px-6 border-[#F2F2F2] flex flex-col gap-1">
                            <div className="flex items-center justify-between p-3">
                                <span className="text-base font-medium text-primary">Identified growth bottleneck(s)</span>
                                <span className="w-fit p-2 border border-[#E7E8E9] rounded-[10px] cursor-pointer">Edit</span>
                            </div>
                            <span className="flex items-center gap-1 text-sm text-[#878A93]">
                                <Info />
                                <span>ScalePadi Ai is chating with you based on the context in the business problem you've provided above</span>
                            </span>
                        </div>
                        <div className="h-[820px] overflow-y-scroll hide-scrollbar">

                        </div>
                        <div className="pt-6 border-t -mx-4 px-4 lg:-mx-6 lg:px-6 border-[#F2F2F2]">
                            <div className="flex items-center w-full justify-between bg-[#F7F7F8] py-1 px-[6px]">
                                <div className="flex w-full items-center gap-1">
                                    <Image src={'/images/scalepadi-ai-logo.svg'} alt="ScalePadi AI Logo" width={126} height={36} />
                                    <Plus className="w-6 h-6 text-[#878A93] cursor-pointer" />
                                    <Input className="w-full bg-[#F7F7F8] border-none" autoFocus={true} />
                                </div>
                                <div className="p-1 rounded-[8px] bg-primary text-white flex items-center cursor-pointer">
                                    <SendHorizontal className="-rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysisResultPage;
