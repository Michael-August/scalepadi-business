"use client";

import { useLogout } from "@/hooks/useAuth";
import { Routes } from "@/lib/routes";
import { ChevronRight, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const SideBar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isPending } = useLogout();

  const handleLogOut = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout Successful");
        localStorage.clear();
        router.push("/signin");
      },
    });
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="flex flex-col w-[250px] px-[18px] py-[30px] h-full">
        {/* Sticky Logo */}
        <div className="flex-shrink-0 mb-10">
          <Image src="/logo.svg" alt="Logo" width={137.7} height={28} />
        </div>

        {/* Scrollable Routes */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-3">
            {Routes.map((route) => {
              const isActive = pathname.startsWith(route.route);
              return (
                <Link
                  key={route.route}
                  href={route.route}
                  onClick={onLinkClick}
                  className={`flex items-center gap-[10px] px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-[#1A1A1A] hover:bg-secondary hover:text-primary"
                  }`}
                >
                  <route.icon className="w-5 h-5" />
                  <span>{route.name}</span>
                </Link>
              );
            })}
            <div
              onClick={() => router.push("/ai-business-query")}
              className="flex-shrink-0 mb-10"
            >
              <Image
                src="/images/scalepadi-ai-logo.svg"
                alt="Scalepadi AI logo"
                width={137.7}
                height={28}
              />
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex-shrink-0 mt-8 flex flex-col gap-3">
          <div
            onClick={() => router.push("/inquiry")}
            className="flex w-full cursor-pointer justify-between bg-[#F5F6F8] items-center rounded-2xl px-4 py-3"
          >
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
              <Image
                src="/icons/double-message.svg"
                alt="message icon"
                width={28}
                height={28}
              />
            </div>
            <div className="flex flex-col flex-1 ml-3">
              <span className="text-[#1A1A1A] font-bold text-[15px]">
                Help Center
              </span>
              <span className="text-[#83899F] text-sm font-normal">
                Answers here
              </span>
            </div>
            <ChevronRight className="text-[#9CA0B2] w-4 h-4" />
          </div>

          <button
            onClick={handleLogOut}
            className="flex items-center gap-[10px] px-4 py-3 rounded-xl text-sm font-medium text-[#E33161] hover:bg-red-50 transition-colors duration-150"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>{isPending ? "Logging out..." : "Log out"}</span>
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      {/* <div className="hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EDEEF3] justify-around py-2 z-50">
        {Routes.slice(0, 4).map((route) => {
          const isActive = pathname.startsWith(route.route);
          return (
            <Link
              key={route.route}
              href={route.route}
              className={`flex flex-col items-center gap-1 text-xs font-medium ${
                isActive ? "text-primary" : "text-[#1A1A1A]"
              }`}
            >
              <route.icon className="w-5 h-5" />
              <span>{route.name}</span>
            </Link>
          );
        })}
      </div> */}
    </>
  );
};

export default SideBar;
