import { Skeleton } from "@/components/ui/skeleton";

export default function ExpertProfileSkeleton() {
	return (
		<div className="p-6 rounded-2xl border bg-white">
			{/* Header Section */}
			<div className="flex justify-between items-start mb-6">
				<div className="flex items-center gap-4">
					<Skeleton className="w-16 h-16 rounded-full" />
					<div className="flex flex-col gap-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-3 w-44" />
						<Skeleton className="h-3 w-24" />
					</div>
				</div>
				<Skeleton className="h-9 w-28 rounded-lg" />
			</div>

			{/* Tabs */}
			<div className="flex gap-6 mb-4 border-b pb-2">
				<Skeleton className="h-4 w-12" />
				<Skeleton className="h-4 w-16" />
			</div>

			{/* About / Bio */}
			<div className="border rounded-xl p-4 mb-6">
				<Skeleton className="h-5 w-16 mb-3" />
				<Skeleton className="h-3 w-48" />
			</div>

			{/* Professional Details */}
			<div className="border rounded-xl p-4">
				<Skeleton className="h-5 w-40 mb-4" />
				<div className="grid grid-cols-3 gap-6 mb-4">
					<div>
						<Skeleton className="h-3 w-24 mb-2" />
						<Skeleton className="h-4 w-20" />
					</div>
					<div>
						<Skeleton className="h-3 w-20 mb-2" />
						<Skeleton className="h-4 w-16" />
					</div>
					<div>
						<Skeleton className="h-3 w-16 mb-2" />
						<Skeleton className="h-4 w-28" />
					</div>
				</div>

				{/* Skills */}
				<Skeleton className="h-3 w-16 mb-3" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-36 rounded-full" />
					<Skeleton className="h-6 w-28 rounded-full" />
					<Skeleton className="h-6 w-32 rounded-full" />
				</div>
			</div>
		</div>
	);
}
