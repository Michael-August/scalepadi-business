"use client"

import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { axiosClient } from "@/lib/api/axiosclient"
import { useState } from "react"
import { CalendarDays, CreditCard, Building2, User, Briefcase } from "lucide-react"

const Payments = () => {
  const [type, setType] = useState<"subscription" | "project" | "hire">("subscription")

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions", type],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(`/transactions?type=${type}`)
        if (res.data?.status === false) {
          throw new Error(res.data?.message || "Failed to fetch transactions")
        }
        return res.data?.data || []
      } catch (err: any) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "Failed to fetch transactions")
        } else {
          toast.error("An unexpected error occurred while fetching transactions")
        }
        throw err
      }
    },
  })

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusVariant = (status: string) => {
      switch (status?.toLowerCase()) {
        case "active":
        case "completed":
        case "paid":
          return "default"
        case "pending":
        case "in progress":
          return "secondary"
        case "cancelled":
        case "failed":
          return "destructive"
        default:
          return "outline"
      }
    }

    return (
      <Badge variant={getStatusVariant(status)} className="font-medium">
        {status}
      </Badge>
    )
  }

  const renderTableHead = () => {
    if (type === "subscription") {
      return (
        <TableRow>
          {/* <TableHead className="font-semibold">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Business
            </div>
          </TableHead> */}
          <TableHead className="font-semibold">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Plan
            </div>
          </TableHead>
          <TableHead className="font-semibold">Amount Paid</TableHead>
          <TableHead className="font-semibold">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Next Renewal
            </div>
          </TableHead>
          <TableHead className="font-semibold">Status</TableHead>
        </TableRow>
      )
    }

    if (type === "project") {
      return (
        <TableRow>
          {/* <TableHead className="font-semibold">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Business
            </div>
          </TableHead> */}
          <TableHead className="font-semibold">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Project Title
            </div>
          </TableHead>
          <TableHead className="font-semibold">Amount</TableHead>
          <TableHead className="font-semibold">Project Status</TableHead>
          <TableHead className="font-semibold">Payment Status</TableHead>
        </TableRow>
      )
    }

    if (type === "hire") {
      return (
        <TableRow>
          {/* <TableHead className="font-semibold">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Hirer
            </div>
          </TableHead> */}
          <TableHead className="font-semibold">Role</TableHead>
          <TableHead className="font-semibold">Amount</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
        </TableRow>
      )
    }
  }

  const renderTableBody = () => {
    return transactions?.data?.map((row: any, index: number) => {
      if (type === "subscription") {
        return (
          <TableRow key={index} className="hover:bg-muted/50 transition-colors">
            {/* <TableCell className="font-medium">{row.subscriptionId?.businessId?.name}</TableCell> */}
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{row.subscriptionId?.planName}</span>
              </div>
            </TableCell>
            <TableCell className="font-mono font-semibold">₦{row.amount.toLocaleString()}</TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(row.subscriptionId?.nextRenewal).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
          </TableRow>
        )
      }

      if (type === "project") {
        return (
          <TableRow key={index} className="hover:bg-muted/50 transition-colors">
            {/* <TableCell className="font-medium">{row.projectId?.businessId?.name}</TableCell> */}
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{row.projectId?.title}</span>
              </div>
            </TableCell>
            <TableCell className="font-mono font-semibold">₦{row.amount.toLocaleString()}</TableCell>
            <TableCell>
              <StatusBadge status={row.projectId?.status} />
            </TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
          </TableRow>
        )
      }

      if (type === "hire") {
        return (
          <TableRow key={index} className="hover:bg-muted/50 transition-colors">
            {/* <TableCell className="font-medium">{row.hireId?.businessId?.name}</TableCell> */}
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{row.hireId?.role}</span>
              </div>
            </TableCell>
            <TableCell className="font-mono font-semibold">₦{row.amount.toLocaleString()}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
          </TableRow>
        )
      }
    })
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
      ))}
    </div>
  )

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <CreditCard className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
      <p className="text-muted-foreground text-sm max-w-sm">
        {type === "subscription" && "You don't have any subscription transactions yet."}
        {type === "project" && "You don't have any project transactions yet."}
        {type === "hire" && "You don't have any hire transactions yet."}
      </p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View and manage all your payment transactions across different services.
        </p>
      </div>

      <Card className="border-none">
        <CardHeader className="pb-4">
          <Tabs value={type} onValueChange={(val: any) => setType(val)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Subscriptions
              </TabsTrigger>
              <TabsTrigger value="project" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="hire" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Hire
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent>
          <Tabs value={type} onValueChange={(val: any) => setType(val)}>
            <TabsContent value={type} className="mt-0">
              {isLoading ? (
                <LoadingSkeleton />
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-destructive/10 p-3 mb-4">
                    <CreditCard className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading transactions</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">{(error as Error).message}</p>
                </div>
              ) : !transactions || transactions.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="rounded-lg">
                  <Table>
                    <TableHeader>{renderTableHead()}</TableHeader>
                    <TableBody>{renderTableBody()}</TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Payments
