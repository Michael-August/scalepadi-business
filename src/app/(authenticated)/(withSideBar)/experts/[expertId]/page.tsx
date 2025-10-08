"use client"

import InviteExpert from "@/components/InviteExpert"
import { Button } from "@/components/ui/button"
import { useGetExpert } from "@/hooks/useExpert"
import { noAvatar } from "@/lib/constatnts"
import { Dot, Sheet, Star, Verified, X } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

const ExpertDetails = () => {
    const [activeTab, setActiveTab] = useState<'about' | 'review'>('about')
    const {expertId} = useParams()

    const { expert, isLoading } = useGetExpert(expertId as string)
    console.log(expert)

    const [ openSheet, setOpenSheet ] = useState(false)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-12 w-full lg:w-[900px]">
                <div className="flex gap-1 items-center cursor-pointer w-fit">
                    <Image src={'/icons/arrow-left.svg'} alt="Arrow left" width={16} height={16} />
                    <span className="text-sm text-[#3E4351]">Go back</span>
                </div>

                <div className="border border-[#EFF2F3] rounded-3xl p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-[52px] relative h-[52px] rounded-full">
                                <Image src={expert?.profilePicture || noAvatar} alt="Profile Picture" width={52} height={52} className="rounded-full w-full h-full" />
                                <Image className="absolute bottom-0 left-0" src={'/images/profile-logo.svg'} alt="logo" width={20} height={20} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#1A1A1A] font-medium text-[20px]">{expert?.name}</span>
                                <div className="flex items-center gap-2">
                                    {expert?.verified && <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Verified className="w-4 h-4 text-white fill-green-600" /> Verified {expert?.role[0]}</span>}
                                    {!expert?.verified && <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><X className="w-4 h-4 text-red-600" /> {expert?.role[0]}</span>}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                    <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm">4.0</span>
                                    <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm">21: Projects completed</span>
                                </div>
                            </div>
                        </div>
                        <Button onClick={() => setOpenSheet(true)} className="text-sm text-white rounded-[14px] hover:bg-primary-hover hover:text-black">Invite expert</Button>
                    </div>

                    <div className="flex flex-col">
                        <div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
                            <div
                                className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                                hover:border-[#3A96E8] transition-colors 
                                ${activeTab === 'about' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                                onClick={() => setActiveTab('about')}
                            >
                                <span className="text-sm">About</span>
                            </div>

                            <div
                                className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                                hover:border-[#3A96E8] transition-colors 
                                ${activeTab === 'review' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                                onClick={() => setActiveTab('review')}
                            >
                                <span className="text-sm">Reviews</span>
                            </div>
                        </div>

                        {activeTab === 'about' && (
                            <div className="flex flex-col gap-4">
                                <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-[20px] text-primary">Bio</span>
                                    </div>
                                    <span className="text-[#353D44] text-sm">{expert?.bio}</span>
                                </div>

                                <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-[20px] text-primary">Professional Details</span>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[#878A93] text-sm font-normal">Years of experience</span>
                                            <span className="text-[#1A1A1A] text-base font-semibold">{expert?.yearsOfExperience}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[#878A93] text-sm font-normal">Category</span>
                                            <span className="text-[#1A1A1A] text-base font-semibold">{expert?.category}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[#878A93] text-sm font-normal">Role</span>
                                            <span className="text-[#1A1A1A] text-base font-semibold">{expert?.role[0]}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 mt-5">
                                        <span className="font-medium text-sm text-[#878A93]">Skills</span>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {expert?.skills.map((skill: string, index: number) => (
                                                <span key={index} className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'review' && (
                            <div className="flex w-full flex-col gap-6">
                                <div className="flex gap-4">
                                    <div className="bg-white border flex flex-col border-[#EFF2F3] rounded-3xl p-4 w-[324px] ">
                                        <div className="flex flex-col gap-2 border-b border-[#EFF2F3] pb-4 mb-4">
                                            <span className="text-base text-[#878A93] font-medium">Projects Completed</span>
                                            <span className="font-bold text-[32px] text-[#121217]">5</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-base text-[#878A93] font-medium">Average Project Duration</span>
                                            <span className="font-bold text-[24px] text-[#121217]">3 months</span>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-[#EFF2F3] flex gap-6 rounded-3xl p-4 flex-1">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[84px] text-[#0E1426]">4.0</span>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                    <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                </div>
                                                <span className="text-[#878A93] text-sm font-normal">Client&rsquo;s Reviews</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-1">
                                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                                    <div className="w-[40%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                    </div>
                                                    <span className="text-[#0E1426] text-sm font-normal">40%</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                                    <div className="w-[20%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                    </div>
                                                    <span className="text-[#0E1426] text-sm font-normal">20%</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                                    <div className="w-[15%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                    </div>
                                                    <span className="text-[#0E1426] text-sm font-normal">15%</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                                    <div className="w-[15%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                    </div>
                                                    <span className="text-[#0E1426] text-sm font-normal">15%</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                                    <div className="w-[10%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                                    </div>
                                                    <span className="text-[#0E1426] text-sm font-normal">10%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-[#D1DAEC80] rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                                            </div>
                                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                                        </div>
                                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                                    </div>
                                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                                            </div>
                                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                                        </div>
                                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                                    </div>
                                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                                            </div>
                                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                                        </div>
                                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                                    </div>
                                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                                            </div>
                                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                                        </div>
                                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <InviteExpert open={openSheet} setOpenSheet={setOpenSheet} expertName={expert?.name} expertId={expertId as string} />
        </div>
    )
}

export default ExpertDetails
