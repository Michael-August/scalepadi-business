"use client";

import ProjectSkeletonLoader from "@/components/skeletons/projects.skeleton";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetExperts } from "@/hooks/useExpert";
import { useGetHires } from "@/hooks/useProject";
import { IExpert } from "@/types/expert.type";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { HireCard } from "@/components/HireCard";
import { useQueries } from "@tanstack/react-query";
import { fetchExpertReview } from "@/hooks/useReview";
import { Button } from "@/components/ui/button";
const ExpertCard = dynamic(() => import("@/components/expertCard"), {
	ssr: false,
});

// Interface for review data
interface ExpertReview {
	status: boolean;
	message: string;
	data: {
		averageScore: number;
		totalRatings: number;
		ratings: Array<{
			createdAt: string;
			expertId: string;
			id: string;
			note: string;
			ratingBy: string;
			score: number;
		}>;
	};
}

const Experts = () => {
	const [activeTab, setActiveTab] = useState<"experts" | "hired">("experts");

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("");
	type ExpertParams = {
		page: number;
		limit: number;
		filter?: string;
		search?: string;
	};

	const [params, setParams] = useState<ExpertParams>({
		page,
		limit: 9,
	});

	const [user, setUser] = useState<any>(null);
	const { experts, isLoading } = useGetExperts(params);
	const { hires } = useGetHires();

	// Extract expert IDs from the experts data
	const expertIds = useMemo(() => {
		return experts?.data?.map((expert: IExpert) => expert.id) || [];
	}, [experts?.data]);

	// Get reviews for all experts using useQueries
	const expertReviewsQueries = useQueries({
		queries: expertIds.map((expertId: any) => ({
			queryKey: ["review", expertId],
			queryFn: () => fetchExpertReview(expertId),
			enabled: !!expertId && expertIds.length > 0,
		})),
	});

	const handleFilterChange = (value: string) => {
		setFilter(value);
		setParams((prev) => ({
			...prev,
			filter: value || undefined,
			page: 1, // reset pagination on filter change
		}));
	};

	const handleNext = () => {
		if (experts?.currentPage < experts?.totalPages) {
			setPage((prev) => {
				const newPage = prev + 1;
				setParams((prevParams) => ({
					...prevParams,
					page: newPage,
				}));
				return newPage;
			});
		}
	};

	const handlePrev = () => {
		if (experts?.currentPage > 1) {
			setPage((prev) => {
				const newPage = prev - 1;
				setParams((prevParams) => ({
					...prevParams,
					page: newPage,
				}));
				return newPage;
			});
		}
	};

	// Transform reviews into a map for easy access with proper typing
	const expertReviewsMap = useMemo(() => {
		return expertReviewsQueries.reduce((acc, query: any) => {
			if (query.data) {
				acc[query.data.expertId] = query.data
					.review as ExpertReview | null;
			}
			return acc;
		}, {} as Record<string, ExpertReview | null>);
	}, [expertReviewsQueries]);

	// Extract rating data for each expert
	const expertRatingsMap = useMemo(() => {
		return Object.entries(expertReviewsMap).reduce(
			(acc, [expertId, review]) => {
				if (review?.status && review.data) {
					acc[expertId] = {
						averageScore: review.data.averageScore,
						totalRatings: review.data.totalRatings,
						ratings: review.data.ratings,
					};
				} else {
					acc[expertId] = {
						averageScore: 0,
						totalRatings: 0,
						ratings: [],
					};
				}
				return acc;
			},
			{} as Record<
				string,
				{ averageScore: number; totalRatings: number; ratings: any[] }
			>
		);
	}, [expertReviewsMap]);

	const isReviewsLoading = expertReviewsQueries.some(
		(query) => query.isLoading
	);

	useEffect(() => {
		const handler = setTimeout(() => {
			setParams((prev) => {
				const newParams = { ...prev, page: 1 };

				if (search.trim()) {
					newParams.search = search.trim();
				} else {
					delete newParams.search; // ✅ remove search key when empty
				}

				return newParams;
			});
		}, 700); // 0.7s debounce

		return () => clearTimeout(handler); // cleanup timeout on change
	}, [search]);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return (
		<div className="w-full">
			<div className="tab pt-2 mb-5 w-full flex items-center gap-5 bg-[#F9FAFB]">
				<button
					type="button"
					className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                    hover:border-[#3A96E8] transition-colors 
                    ${
						activeTab === "experts"
							? "border-[#3A96E8] text-[#3A96E8]"
							: "border-transparent"
					}`}
					onClick={() => setActiveTab("experts")}
				>
					<span className="text-sm">Experts</span>
				</button>

				<button
					type="button"
					className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                    hover:border-[#3A96E8] transition-colors 
                    ${
						activeTab === "hired"
							? "border-[#3A96E8] text-[#3A96E8]"
							: "border-transparent"
					}`}
					onClick={() => setActiveTab("hired")}
				>
					<span className="text-sm">Hired Experts</span>
				</button>
				<div
					className={`flex w-full items-center justify-center pb-3`}
				></div>
				<div
					className={`flex w-full items-center justify-center pb-3`}
				></div>
			</div>

			{activeTab === "experts" && (
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Select
								value={filter}
								onValueChange={handleFilterChange}
							>
								<SelectTrigger className="w-fit rounded-[10px] h-9 border border-[#D1DAEC]">
									<SelectValue placeholder="Filter" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="rating">
											By rating
										</SelectItem>
										<SelectItem value="duration">
											By duration
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<div className="rounded-[10px] p-2 flex items-center h-9 gap-2 border border-[#D8DFE2]">
								<Search className="w-3 h-3" />
								<Input
									className="border-0 bg-transparent !h-9 p-0"
									placeholder="search"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
						<Image
							src={"/images/scalepadi-ai-logo.svg"}
							className="cursor-pointer"
							alt="Scalepadi AI logo"
							width={147}
							height={36}
						/>
					</div>

					{isLoading || isReviewsLoading ? (
						<ProjectSkeletonLoader />
					) : experts?.data.length === 0 ? (
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
										We do not have experts now
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
							{experts?.data?.map((expert: IExpert) => (
								<ExpertCard
									key={expert.id}
									expert={expert}
									review={expertReviewsMap[expert.id]}
									rating={expertRatingsMap[expert.id]}
								/>
							))}

							{/* ✅ Pagination Controls */}
							<div className="col-span-full flex items-center justify-end gap-4 p-4 border-t mt-4">
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-600">
										Page {experts?.currentPage} of{" "}
										{experts?.totalPages}
									</span>
								</div>
								<div className="flex items-center gap-1">
									<Button
										variant="outline"
										size="sm"
										className="h-8 w-8 p-0 border-none"
										disabled={experts?.currentPage === 1}
										onClick={handlePrev}
									>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="h-8 w-8 p-0 border-none"
										disabled={
											experts?.currentPage ===
											experts?.totalPages
										}
										onClick={handleNext}
									>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			{activeTab === "hired" && (
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Select value="rating">
								<SelectTrigger className="w-fit rounded-[10px] h-9 border border-[#D1DAEC]">
									<SelectValue placeholder="Filter" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="rating">
											By rating
										</SelectItem>
										<SelectItem value="duration">
											By duration
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<div className="rounded-[10px] p-2 flex items-center h-9 gap-2 border border-[#D8DFE2]">
								<Search className="w-3 h-3" />
								<Input
									className="border-0 bg-transparent !h-9 p-0"
									placeholder="search"
								/>
							</div>
						</div>
						<Image
							src={"/images/scalepadi-ai-logo.svg"}
							className="cursor-pointer"
							alt="Scalepadi AI logo"
							width={147}
							height={36}
						/>
					</div>

					{isLoading ? (
						<ProjectSkeletonLoader />
					) : hires?.data?.data?.length === 0 ? (
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
										No hired experts found
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							{hires?.data?.data?.map((hire: any) => (
								<HireCard key={hire.id} hire={hire} />
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Experts;
