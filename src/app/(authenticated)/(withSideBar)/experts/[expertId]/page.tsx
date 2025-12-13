"use client";
"use client";

import InviteExpert from "@/components/InviteExpert";
import ExpertProfileSkeleton from "@/components/skeletons/expert-details.skeleton";
import { Button } from "@/components/ui/button";
import { useGetExpert } from "@/hooks/useExpert";
import { useExpertReview } from "@/hooks/useReview";
import { noAvatar } from "@/lib/constatnts";
import { Dot, Star, Verified, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";

const Page = () => {
	return (
		<Suspense fallback={"Loading"}>
			<ExpertDetails />
		</Suspense>
	);
};

const ExpertDetails = () => {
	const [activeTab, setActiveTab] = useState<"about" | "review">("about");
	const { expertId } = useParams();
	const router = useRouter();

	const searchParams = useSearchParams();

	const { expert, isLoading } = useGetExpert(expertId as string);
	const { review: expertReview, isLoading: reviewLoading } = useExpertReview(
		expertId as string
	);

	const [openSheet, setOpenSheet] = useState(false);

	// Calculate rating statistics
	const ratingData = useMemo(() => {
		if (!expertReview?.data) {
			return {
				averageRating: 0,
				totalRatings: 0,
				ratings: [],
				ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
			};
		}

		const ratings = expertReview.data.ratings || [];
		const totalRatings = expertReview.data.totalRatings || 0;
		const averageRating = expertReview.data.averageScore || 0;

		// Calculate rating distribution
		const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
		ratings.forEach((rating: any) => {
			const score = Math.round(rating.score);
			if (score >= 1 && score <= 5) {
				distribution[score as keyof typeof distribution]++;
			}
		});

		return {
			averageRating,
			totalRatings,
			ratings,
			ratingDistribution: distribution,
		};
	}, [expertReview]);

	// Calculate percentage for each star rating
	const getRatingPercentage = (starCount: number) => {
		if (ratingData.totalRatings === 0) return 0;
		return (
			(ratingData.ratingDistribution[
				starCount as keyof typeof ratingData.ratingDistribution
			] /
				ratingData.totalRatings) *
			100
		);
	};

	// Render stars based on rating
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, index) => (
			<Star
				key={index}
				className={`w-[13.33px] h-[13.33px] ${
					index < Math.floor(rating)
						? "text-[#F2BB05] fill-[#F6CF50]"
						: "text-[#CFD0D4] fill-[#E7ECEE]"
				}`}
			/>
		));
	};

	// Calculate performance metrics
	const performanceMetrics = useMemo(() => {
		const completedProjects = expert?.projectCount || 0;
		const averageDuration = expert?.projectCount * 2; // This could be calculated from actual project data

		return {
			completedProjects,
			averageDuration,
			successRate: completedProjects > 0 ? "95%" : "0%", // Placeholder - could be calculated from actual data
			responseTime: "2 hours", // Placeholder
		};
	}, [expert]);

	const handleGoBack = () => {
		router.back();
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-12 w-full lg:w-[900px]">
				{/* Back Button */}
				<div
					className="flex gap-1 items-center cursor-pointer w-fit"
					onClick={handleGoBack}
				>
					<Image
						src={"/icons/arrow-left.svg"}
						alt="Arrow left"
						width={16}
						height={16}
					/>
					<span className="text-sm text-[#3E4351]">Go back</span>
				</div>

				{isLoading && <ExpertProfileSkeleton />}
				{expert && !isLoading && (
					<div className="border border-[#EFF2F3] rounded-3xl p-6 flex flex-col gap-4">
						{/* Header Section */}
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-[52px] relative h-[52px] rounded-full">
									<Image
										src={expert?.profilePicture || noAvatar}
										alt={`${
											expert?.name || "Expert"
										}'s profile`}
										width={52}
										height={52}
										className="rounded-full w-full h-full"
									/>
									<Image
										className="absolute bottom-0 left-0"
										src={"/images/profile-logo.svg"}
										alt="logo"
										width={20}
										height={20}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<span className="text-[#1A1A1A] font-medium text-[20px]">
										{expert?.name || "Expert"}
									</span>
									<div className="flex items-center gap-2">
										{expert?.verified ? (
											<span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm">
												<Verified className="w-4 h-4 text-white fill-green-600" />
												Verified{" "}
												{expert?.role?.[0] || "Expert"}
											</span>
										) : (
											<span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm">
												<X className="w-4 h-4 text-red-600" />
												{expert?.role?.[0] || "Expert"}
											</span>
										)}
									</div>
									<div className="flex items-center gap-1">
										<Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
										<span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm">
											{ratingData.averageRating > 0
												? ratingData.averageRating.toFixed(
														1
												  )
												: "0.0"}
										</span>
										<span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm">
											{
												performanceMetrics.completedProjects
											}{" "}
											Projects completed
										</span>
									</div>
								</div>
							</div>
							{!searchParams.get("route") && (
								<Button
									onClick={() => setOpenSheet(true)}
									className="text-sm text-white rounded-[14px] hover:bg-primary-hover hover:text-black"
								>
									Hire expert
								</Button>
							)}
						</div>

						{/* Tabs Section */}
						<div className="flex flex-col">
							<div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
								<button
									type="button"
									className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                                hover:border-[#3A96E8] transition-colors 
                                ${
									activeTab === "about"
										? "border-[#3A96E8] text-[#3A96E8]"
										: "border-transparent"
								}`}
									onClick={() => setActiveTab("about")}
								>
									<span className="text-sm">About</span>
								</button>

								<button
									type="button"
									className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                                hover:border-[#3A96E8] transition-colors 
                                ${
									activeTab === "review"
										? "border-[#3A96E8] text-[#3A96E8]"
										: "border-transparent"
								}`}
									onClick={() => setActiveTab("review")}
								>
									<span className="text-sm">Reviews</span>
								</button>
							</div>

							{/* About Tab */}
							{activeTab === "about" && (
								<div className="flex flex-col gap-4">
									<div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
										<div className="flex items-center justify-between">
											<span className="font-medium text-[20px] text-primary">
												Bio
											</span>
										</div>
										<span className="text-[#353D44] text-sm">
											{expert?.bio || "No bio available"}
										</span>
									</div>

									<div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
										<div className="flex items-center justify-between">
											<span className="font-medium text-[20px] text-primary">
												Professional Details
											</span>
										</div>
										<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
											<div className="flex flex-col gap-1">
												<span className="text-[#878A93] capitalize text-sm font-normal">
													Years of experience
												</span>
												<span className="text-[#1A1A1A] text-base font-semibold">
													{expert?.yearsOfExperience ||
														"Not specified"}
												</span>
											</div>
											<div className="flex flex-col gap-1">
												<span className="text-[#878A93] text-sm font-normal">
													Category
												</span>
												<span className="text-[#1A1A1A] capitalize text-base font-semibold">
													{expert?.category ||
														"Not specified"}
												</span>
											</div>
											<div className="flex flex-col gap-1">
												<span className="text-[#878A93] text-sm font-normal">
													Role
												</span>
												<span className="text-[#1A1A1A] capitalize text-base font-semibold">
													{expert?.role?.[0] ||
														"Not specified"}
												</span>
											</div>
										</div>
										<div className="flex flex-col gap-4 mt-5">
											<span className="font-medium text-sm text-[#878A93]">
												Skills
											</span>
											<div className="flex items-center gap-2 flex-wrap">
												{expert?.skills?.map(
													(
														skill: string,
														index: number
													) => (
														<span
															key={index}
															className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5] capitalize"
														>
															{skill}
														</span>
													)
												)}
												{(!expert?.skills ||
													expert.skills.length ===
														0) && (
													<span className="text-[#878A93] text-sm">
														No skills listed
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Reviews Tab */}
							{activeTab === "review" && (
								<div className="flex w-full flex-col gap-6">
									{/* Performance Stats */}
									<div className="flex gap-4 flex-col lg:flex-row">
										<div className="bg-white border flex flex-col border-[#EFF2F3] rounded-3xl p-4 w-full lg:w-[324px]">
											<div className="flex flex-col gap-2 border-b border-[#EFF2F3] pb-4 mb-4">
												<span className="text-base text-[#878A93] font-medium">
													Projects Completed
												</span>
												<span className="font-bold text-[32px] text-[#121217]">
													{
														performanceMetrics.completedProjects
													}
												</span>
											</div>
											<div className="flex flex-col gap-2">
												<span className="text-base text-[#878A93] font-medium">
													Average Project Duration
												</span>
												<span className="font-bold text-[24px] text-[#121217]">
													{
														performanceMetrics.averageDuration
													}
												</span>
											</div>
										</div>

										{/* Rating Overview */}
										<div className="bg-white border border-[#EFF2F3] flex gap-6 rounded-3xl p-4 flex-1">
											<div className="flex flex-col">
												<span className="font-bold text-[84px] text-[#0E1426]">
													{ratingData.averageRating >
													0
														? ratingData.averageRating.toFixed(
																1
														  )
														: "0.0"}
												</span>
												<div className="flex flex-col gap-1">
													<div className="flex items-center gap-1">
														{renderStars(
															ratingData.averageRating
														)}
													</div>
													<span className="text-[#878A93] text-sm font-normal">
														{
															ratingData.totalRatings
														}{" "}
														Client Review
														{ratingData.totalRatings !==
														1
															? "s"
															: ""}
													</span>
												</div>
											</div>

											{/* Rating Distribution */}
											<div className="flex flex-col gap-3 flex-1">
												{[5, 4, 3, 2, 1].map(
													(stars) => (
														<div
															key={stars}
															className="flex items-center gap-1"
														>
															<div className="w-full lg:w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px]">
																<div
																	className="h-[6px] bg-[#CCCCCC] rounded-[4px] transition-all duration-300"
																	style={{
																		width: `${getRatingPercentage(
																			stars
																		)}%`,
																	}}
																></div>
															</div>
															<div className="flex items-center gap-1 min-w-[100px]">
																<div className="flex items-center gap-1">
																	{renderStars(
																		stars
																	)}
																</div>
																<span className="text-[#0E1426] text-sm font-normal">
																	{getRatingPercentage(
																		stars
																	).toFixed(
																		0
																	)}
																	%
																</span>
															</div>
														</div>
													)
												)}
											</div>
										</div>
									</div>

									{/* Individual Reviews */}
									<div className="bg-white border border-[#D1DAEC80] rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
										{ratingData.ratings.length > 0 ? (
											ratingData.ratings.map(
												(
													review: any,
													index: number
												) => (
													<div
														key={review.id || index}
														className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]"
													>
														<div className="flex items-center gap-1">
															{renderStars(
																review.score
															)}
														</div>
														<div className="flex items-center gap-2">
															<div className="flex items-center gap-1">
																<Image
																	className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]"
																	src={
																		noAvatar
																	}
																	width={22}
																	height={22}
																	alt="reviewer picture"
																/>
																<span className="text-xs text-[#3E4351] font-medium">
																	{review.ratingBy ||
																		"Anonymous"}
																</span>
															</div>
															<Dot className="text-[#CFD0D4] w-6 h-6" />
															<span className="text-xs text-[#3E4351] font-normal">
																{new Date(
																	review.createdAt
																).toLocaleDateString()}
															</span>
														</div>
														<span className="text-[#878A93] text-base font-normal">
															{review.note ||
																"No review text provided"}
														</span>
													</div>
												)
											)
										) : (
											<div className="col-span-2 text-center py-8">
												<span className="text-[#878A93] text-lg">
													No reviews yet
												</span>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			<InviteExpert
				open={openSheet}
				setOpenSheet={setOpenSheet}
				expertName={expert?.name}
				expertId={expertId as string}
			/>
		</div>
	);
};

export default Page;
