import { BanknoteArrowDown, LayoutDashboard, MessageCircleMore, UserCheck2 } from "lucide-react";

export const Routes = [
    {
        name: "Workspace",
        route: "/workspace",
        icon: LayoutDashboard
    },
    {
        name: "Experts",
        route: "/experts",
        icon: UserCheck2
    },
    {
        name: "Messages",
        route: "/messages",
        icon: MessageCircleMore
    },
    {
        name: "Payments",
        route: "/payments",
        icon: BanknoteArrowDown
    },
]