"use client"

import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner" // or whatever toast you use
import { AxiosError } from "axios"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { axiosClient } from "@/lib/api/axiosclient"

const Payments = () => {
  // Use react-query + axiosClient directly
  const { data: transactions, isLoading, isError, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/transactions")
        if (res.data?.status === false) {
          throw new Error(res.data?.message || "Failed to fetch transactions")
        }
        return res.data?.data
      } catch (err: any) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "Failed to fetch transactions")
        } else if (err instanceof Error) {
          toast.error(err.message)
        } else {
          toast.error("An unexpected error occurred while fetching transactions")
        }
        throw err
      }
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <header className="text-2xl font-semibold text-[#1A1A1A]">
        All transactions
      </header>

      <div className="py-3 px-4 rounded-[14px] flex flex-col gap-6">
        <span className="text-sm text-[#1A1A1A]">Track your subscriptions and renewal status</span>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
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
          <Select defaultValue="sort">
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

        {isLoading ? (
          <span>Loading...</span>
        ) : isError ? (
          <span className="text-red-500">{(error as Error).message}</span>
        ) : transactions?.data?.length === 0 ? (
          <span>Empty table</span>
        ) : (
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
                {transactions?.data?.map((row: any, index: number) => (
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
        )}
      </div>
    </div>
  )
}

export default Payments
