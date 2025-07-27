import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const data = [
    {
      business: "GreenMart",
      plan: "Padi Pro",
      planColor: "bg-blue-500",
      amount: "\u20A6145,000",
      renewal: "Dec 4, 2019",
      status: "Active",
      statusColor: "text-green-600 bg-green-100",
      action: "Pause",
    },
    {
      business: "GreenMart",
      plan: "Padi Yakata",
      planColor: "bg-yellow-400",
      amount: "\u20A6120,00",
      renewal: "Jul 4, 2019",
      status: "Expired",
      statusColor: "text-yellow-600 bg-yellow-100",
      action: "Renew",
    },
    {
      business: "ui design",
      plan: "growth engine",
      planColor: "bg-cyan-400",
      amount: "\u20A6120,00",
      renewal: "Jul 4, 2019",
      status: "Active",
      statusColor: "text-green-600 bg-green-100",
      action: "View",
    },
];

const Payments = () => {
    return (
        <div className="flex flex-col gap-4">
            <header className="text-2xl font-semibold text-[#1A1A1A]">
                All transactions
            </header>

            <div className="py-3 px-4 rounded-[14px] flex flex-col gap-6">
                <span className="text-sm text-[#1A1A1A]">Track your subscriptions and renewal status</span>
                <div className="flex items-center gap-2">
                    <Select value="all">
                        <SelectTrigger className="w-fit rounded-[10px] h-9 border border-[#D1DAEC]">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="rating">By rating</SelectItem>
                                <SelectItem value="duration">By duration</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value="sort">
                        <SelectTrigger className="w-fit rounded-[10px] h-9 border border-[#D1DAEC]">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="sort">Sort</SelectItem>
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

                <div className="overflow-x-auto rounded-md">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100">
                            <tr className="text-[#878A93]">
                                <th className="px-6 py-3">Business</th>
                                <th className="px-6 py-3">Subscription Plan</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Next Renewal</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-6 py-4">
                                        <span className="flex items-center text-[#878A93] gap-2">
                                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                            {row.business}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex text-[#878A93] items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${row.planColor}`}></span>
                                            {row.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#878A93]">{row.amount}</td>
                                    <td className="px-6 py-4 text-[#878A93]">{row.renewal}</td>
                                    <td className="px-6 py-4 text-[#878A93]">
                                        <span
                                            className={`text-xs font-medium px-3 py-1 rounded-full ${row.statusColor}`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-sm text-[#0E1426] border border-[#E7E8E9] rounded px-3 py-1">
                                            {row.action}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Payments
