"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar, Clock, DollarSign } from "lucide-react"
import { Button } from "./ui/button"

interface Hire {
  businessId: {
    name: string
    email: string
    id: string
  }
  expertId: {
    name: string
    email: string
    id: string
  }
  description: string
  duration: string
  budget: number
  businessStatus: string
  expertStatus: string
  adminStatus: string
  hireStatus: string
  createdAt: string
  id: string
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-success text-success-foreground"
    case "active":
      return "bg-primary text-primary-foreground"
    case "pending":
    case "awaiting-response":
    case "negotiating":
      return "bg-warning text-warning-foreground"
    case "cancelled":
      return "bg-destructive text-destructive-foreground"
    case "approved":
    case "accepted":
      return "bg-success text-success-foreground"
    case "requested":
      return "bg-secondary text-secondary-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString))
}

export function HireCard({ hire }: { hire: Hire }) {
  return (
    <Card key={hire.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-foreground">{hire.expertId.name}</h3>
                        <Badge className={getStatusColor(hire.hireStatus)}>{hire.hireStatus}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3 text-balance">{hire.description}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{hire.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{formatCurrency(hire.budget)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {"Created"} {formatDate(hire.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{"Status Breakdown"}</p>
                        <div className="flex flex-col gap-1 mt-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-muted-foreground">{"Business:"}</span>
                            <Badge variant="outline" className="text-xs">
                              {hire.businessStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-muted-foreground">{"Expert:"}</span>
                            <Badge variant="outline" className="text-xs">
                              {hire.expertStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-muted-foreground">{"Admin:"}</span>
                            <Badge variant="outline" className="text-xs">
                              {hire.adminStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>{"View Details"}</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">{"Cancel Hire"}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
          </div>
          {hire?.expertStatus === "Accepted" && <Button className="bg-primary hover:bg-primary-hover hover:text-black mt-4">Make Payment</Button>}
            </Card>
  )
}
