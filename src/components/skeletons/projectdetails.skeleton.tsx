"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-24" />
      </div>

      {/* Content area */}
      <div className="space-y-6">
        {/* Project brief */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" /> {/* Section heading */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        {/* Goal */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-[85%]" />
        </div>

        {/* Challenge */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-[85%]" />
        </div>

        {/* Metrics */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Resources */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-40 rounded-md" />
        </div>

        {/* Deliverables */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  )
}
