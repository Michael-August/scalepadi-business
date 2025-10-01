"use client"

import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IExpert } from "@/types/expert.type";
import InviteExpert from "./InviteExpert";

export default function ExpertCard({ expert }: { expert: IExpert }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const [openSheet, setOpenSheet] = useState(false)

  const MAX_LENGTH = 100; // number of characters to show before "view more"
    const isLongBio = expert.bio && expert.bio.length > MAX_LENGTH;
    
    const getAvatarUrl = (name?: string) => {
        if (name) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;
        }
        return `https://i.pravatar.cc/128?img=${Math.floor(Math.random() * 70)}`;
    };

  return (
    <div className="bg-[#FBFCFC] p-4 flex flex-col gap-4 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Image
          src={expert?.avatar || getAvatarUrl(expert.name)}
          alt="Expert profile"
          width={45}
          height={45}
          className="w-[45px] h-[45px] rounded-full object-cover"
        />
        <span className="text-[#1A1A1A] font-medium text-base">
          {expert.role[0]}
        </span>
      </div>

      {/* Bio Section */}
      <div className="p-4 flex flex-col gap-2 border border-[#D1DAEC80] rounded-[14px]">
        <div className="gap-3 flex flex-col">
          <span className="text-[#1A1A1A] text-sm">
            {expert.bio}
            {isLongBio && !expanded && "..."}
            {isLongBio && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#1E88E5] cursor-pointer ml-1"
              >
                {expanded ? "see less" : "view more"}
              </button>
            )}
          </span>

          {/* Tags */}
            <div className="flex items-center gap-1 flex-wrap">
                {expert.skills.map(s => (
                  <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-[10px] text-[#1E88E5]">
                    {s}
                </span>
              ))}
            
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-[#1A1A1A] text-sm font-medium">{expert.projectCount}</span>
              <span className="text-xs text-[#727374]">Project completed</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#1A1A1A] text-sm font-medium flex items-center gap-1">
                <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />4.0
              </span>
              <span className="text-xs text-[#727374]">Overall Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() =>
            setOpenSheet(true)
          }
          className="text-xs text-white rounded-[14px] hover:bg-primary-hover hover:text-black"
        >
          Invite to project
        </Button>
        <Button
          onClick={() => router.push(`/experts/${expert.id}`)}
          variant={"outline"}
          className="text-xs rounded-[14px]"
        >
          View expert
        </Button>
      </div>

      <InviteExpert open={openSheet} setOpenSheet={setOpenSheet} expertName={expert?.name} expertId={expert?.id} />
    </div>
  );
}
