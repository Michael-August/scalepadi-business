"use client";

import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import moment from "moment";
import { useGetNotifications, useMarkAsRead } from "@/hooks/useNotification";
import io, { Socket } from "socket.io-client";
import { toast } from "sonner";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";

interface INotification {
  id: string;
  user: string;
  content: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

const DashboardNav = ({
  className,
  withLogo = true,
}: {
  withLogo?: boolean;
  className?: string;
}) => {
  const { notifications, isLoading } = useGetNotifications();
  const [allNotifications, setNotifications] = useState<INotification[] | null>(
    notifications?.data?.notifications
  );
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout, isPending } = useLogout();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: any) => n[0])
        .join("")
        .toUpperCase()
    : "?";
  console.log(user);

  const { markAsRead } = useMarkAsRead();

  const [unreadNotif, setUnreadNotif] = useState(true);

  const pathName = usePathname();
  const route = pathName.split("/")[1] || "";

  const [sockets, setSockets] = useState<Socket[]>([]);

  useEffect(() => {
    const socket = io("https://scale-padi.onrender.com", {
      transports: ["websocket"],
    });

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      const loggedInUser = JSON.parse(storedUser);

      socket.on("connect", () => {
        console.log(`🟢 Connected for user ${loggedInUser?.id}:`, socket.id);
        socket.emit("register", loggedInUser?.id);
      });

      socket.on("notification", (data: INotification) => {
        setUnreadNotif(true);
        setNotifications([data, ...(allNotifications ?? [])]);
      });

      socket.on("disconnect", () => {
        console.log(`🔌 Disconnected for user ${loggedInUser?.id}`);
      });
    }

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setUnreadNotif(
      notifications?.notifications.some(
        (notif: INotification) => notif.read === false
      )
    );
    setNotifications(notifications?.notifications);
  }, [notifications]);

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
    <nav
      className={cn(
        `w-full bg-white border-b border-primary-border flex items-center justify-between py-2 px-4 lg:pr-14`,
        className
      )}
    >
      {!withLogo && (
        <div className="text-[#0E1426] text-lg font-medium">
          {route.charAt(0).toUpperCase() + route.slice(1)}
        </div>
      )}
      {withLogo && (
        <Image src={"/logo.svg"} alt="Logo" width={104} height={27.54} />
      )}

      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <div
              onClick={() => setUnreadNotif(false)}
              className="px-4 relative py-2 cursor-pointer"
            >
              {unreadNotif && (
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              )}
              <Image
                src={"/icons/bell.svg"}
                alt="Bell"
                width={20}
                height={20}
              />
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="w-[419px] p-0">
            <div className="h-screen p-4 flex flex-col gap-6">
              <span className="text-2xl font-medium text-[#1A1A1A]">
                Notifications
              </span>
              {/* Example Notification */}
              {isLoading && <span>Loading...</span>}
              <div className="max-h-[48rem] overflow-y-auto hide-scrollbar flex flex-col gap-3">
                {allNotifications?.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markAsRead(
                        { notifId: notif?.id },
                        {
                          onSuccess: () => {
                            toast.success("Notification read");
                          },
                        }
                      );
                    }}
                    className={`cursor-pointer p-4 rounded-lg transition-all duration-200 shadow-sm border-l-4 flex flex-col gap-1
										${
                      notif?.read === false
                        ? "bg-[#F2F6FF] border-[#1746A2] hover:bg-[#E9F0FF]"
                        : "bg-[#FAFAFA] border-[#F2BB05] hover:bg-[#F5F5F5]"
                    }
										`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        notif.read === false
                          ? "text-[#1746A2]"
                          : "text-gray-600"
                      }`}
                    >
                      {notif.content}
                    </p>
                    <span className="text-xs text-gray-400">
                      <RelativeTime date={notif.createdAt} />
                    </span>
                  </div>
                ))}
              </div>

              {allNotifications?.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No notifications
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="relative">
          {/* Avatar */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {user?.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt={user.name}
                width={38}
                height={38}
                className="w-[38px] h-[38px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[38px] h-[38px] rounded-full bg-[#FCCE37] flex items-center justify-center text-sm font-semibold text-gray-800">
                {initials}
              </div>
            )}
            <ChevronDown
              size={18}
              className={`transition-transform ${
                open ? "rotate-180" : "rotate-0"
              } text-gray-600`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div
                className={`cursor-pointer rounded-xl w-full items-center px-4 py-3 flex text-[#E33161] gap-[10px] font-medium text-sm`}
                onClick={handleLogOut}
              >
                <LogOutIcon className="w-5 h-5" />
                <span>{isPending ? "Loging out..." : "Log out"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;

interface RelativeTimeProps {
  date: string | Date;
}

export const RelativeTime: React.FC<RelativeTimeProps> = ({ date }) => {
  const [relative, setRelative] = useState("");

  const formatRelativeTime = (date: string | Date) => {
    const now = moment();
    const target = moment(date);

    const diffMinutes = now.diff(target, "minutes");
    const diffHours = now.diff(target, "hours");
    const diffDays = now.diff(target, "days");
    const diffMonths = now.diff(target, "months");

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60)
      return `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    setRelative(formatRelativeTime(date));

    // Optional: update every minute so it's always fresh
    const interval = setInterval(() => {
      setRelative(formatRelativeTime(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return <p className="text-[10px] text-muted-foreground">{relative}</p>;
};
