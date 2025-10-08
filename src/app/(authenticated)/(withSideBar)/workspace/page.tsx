"use client";

import ProjectSkeletonLoader from "@/components/skeletons/projects.skeleton";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/hooks/useProject";
import { IProject } from "@/types/project.type";
import { Church } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  phone: string;
}

const WorkSpace = () => {
  const [user, setuser] = useState<User | null>(null);
  const [greeting, setGreeting] = useState("Hello");

  const [params, setParams] = useState(null);
  const { projects, isLoading } = useGetProjects();

  const router = useRouter();

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user") || "{}"));

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <header className="text-[32px] font-semibold text-[#878A9399]">
        {greeting},{" "}
        <span className="text-[#1A1A1A]">{user?.name?.split(" ")[0]}</span>
      </header>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#878A93] text-base">
            Active Projects
          </span>
          <Button
            onClick={() => router.push("/business-setup?type=create")}
            className="text-white bg-primary rounded-[14px] hover:bg-primary-hover hover:text-black"
          >
            Start a new project
          </Button>
        </div>
        {isLoading ? (
          <ProjectSkeletonLoader />
        ) : projects?.data.length === 0 ? (
          <div className="empty-state h-full w-full bg-[#FBFCFC] rounded-3xl p-3">
            <div className="bg-[#FFFFFF] h-full w-full rounded-[14px] border border-[#D1DAEC80] flex items-center justify-center py-5">
              <div className="flex flex-col items-center w-full lg:w-[533px] justify-center gap-10">
                <Image
                  src={"/images/empty-search.svg"}
                  alt="Search icon"
                  width={164}
                  height={150}
                />
                <span className="text-center text-base text-[#878A93]">
                  You do not have any active projects yet, your projects will
                  appear here as soon as you are matched with a project
                </span>
                <Button
                  onClick={() => router.push("/business-setup?type=create")}
                  className="text-white bg-primary rounded-[14px] hover:bg-primary-hover hover:text-black"
                >
                  Start a new project
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {projects?.data?.map((project: IProject) => (
              <div className="p-4 gap-3 rounded-3xl bg-[#FBFCFC] flex flex-col">
                <div className="top w-full flex items-center gap-3 pb-3">
                  <div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">
                    BlueMart
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[#121217]">
                      {project.title}
                    </span>
                    <div className="items-center gap-2 flex">
                      <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                        <Church className="w-4 h-4" />
                        Status:{" "}
                        <span className="text-[#121217] font-light">
                          {project.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2 border border-[#D1DAEC80] rounded-[14px]">
                  <span className="text-[#1A1A1A] text-sm font-normal">
                    Upcoming Deliverables
                  </span>
                  <span className="text-sm text-[#727374]">Funnel Audit</span>
                  <span className="text-sm text-[#727374]">
                    Strategy Development{" "}
                  </span>
                  <span className="text-sm text-[#727374]">
                    Execution & Support
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Image
                    onClick={() => {
                      localStorage.setItem("projectId", project?.id);
                      router.push("/ai-business-query");
                    }}
                    className="cursor-pointer"
                    src={"/images/scalepadi-ai-logo.svg"}
                    alt="Scalepadi AI logo"
                    width={147}
                    height={36}
                  />
                  <Link href={`/workspace/${project.id}`}>
                    <Button variant={"outline"} className="text-xs">
                      View workspace
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSpace;
