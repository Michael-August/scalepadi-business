"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Users2,
	Clock,
	Church,
	Download,
	File,
	Star,
	LinkIcon,
	MessageCircle,
	User,
	Calendar,
	CheckCircle,
} from "lucide-react";
import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
	useGetProject,
	useGetTasksForProject,
	useUpdateTaskChanges,
} from "@/hooks/useProject";
import {
	useCreateReview,
	useExpertReview,
	useGetReview,
	useRateExpert,
} from "@/hooks/useReview";
import moment from "moment";
import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { noAvatar } from "@/lib/constatnts";
import { useMakeEnquiry } from "@/hooks/usePlan";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ProjectDetailSkeleton from "@/components/skeletons/projectdetails.skeleton";

type InquiryFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	note: string;
};

const ProjectDetails = () => {
	const [activeTab, setActiveTab] = useState<
		"projectOverview" | "taskTracker" | "team"
	>("projectOverview");
	const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

	const { projectId } = useParams();

	const { project, isLoading } = useGetProject(projectId as string);
	const { tasks, isLoading: isLoadingTasks } = useGetTasksForProject(
		projectId as string
	);

	const [user, setUser] = useState<any>();

	const router = useRouter();

	const [userInquiryDetails, setUserInquiryDetails] = useState<{
		firstName: string;
		lastName: string;
		email: string;
	}>();

	const { makeEnquiry, isPending } = useMakeEnquiry();

	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<InquiryFormValues>();

	useEffect(() => {
		if (user?.name) {
			const nameParts = user?.name.trim().split(" ");
			const firstName = nameParts[0];
			const lastName =
				nameParts.length === 1 ? nameParts[0] : nameParts[1];

			setValue("firstName", firstName);
			setValue("lastName", lastName);
			setValue("email", user.email || "");
		}
	}, [user, setValue]);

	const onSubmit = (data: InquiryFormValues) => {
		makeEnquiry(
			{ ...data, note },
			{
				onSuccess: () => {
					toast.success("Enquiry submitted successfully");
					setOpenRejectReason(false);
				},
			}
		);
	};

	const [openReview, setOpenReview] = useState(false);
	const [openRejectReason, setOpenRejectReason] = useState(false);
	const [openExpertReview, setOpenExpertReview] = useState(false);
	const [selectedExpert, setSelectedExpert] = useState<any>(null);
	const [showNoteInput, setShowNoteInput] = useState<
		"approved" | "needs-changes" | null
	>(null);
	const [note, setNote] = useState("");
	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
	const [rating, setRating] = useState<number>(0);
	const [reviewDescription, setReviewDescription] = useState("");
	const [expertRating, setExpertRating] = useState<number>(0);
	const [expertReviewDescription, setExpertReviewDescription] = useState("");

	const updateTaskChangesMutation = useUpdateTaskChanges({
		onSuccess: () => {
			setShowNoteInput(null);
			setNote("");
			setOpenRejectReason(false);
			setOpenReview(false);
			setSelectedTaskId(null);
		},
		onError: () => {},
	});

	const createReviewMutation = useCreateReview();
	const { review } = useGetReview(projectId as string);

	const rateExpertMutation = useRateExpert();

	const { review: expertReview } = useExpertReview(
		selectedExpert?.id?.id || ""
	);

	const handleStatusUpdate = (
		status: "approved" | "needs-changes",
		note: string,
		taskId: string
	) => {
		if (!note.trim()) {
			toast.error("Please enter a note before submitting.");
			return;
		}

		updateTaskChangesMutation.mutate({
			taskId: taskId,
			status: status,
			note: note.trim(),
		});
	};

	const handleReviewSubmit = () => {
		if (rating === 0) {
			toast.error("Please select a rating before submitting.");
			return;
		}

		if (!reviewDescription.trim()) {
			toast.error("Please enter a review description before submitting.");
			return;
		}

		createReviewMutation.mutate({
			projectId: projectId as string,
			rating: rating,
			description: reviewDescription.trim(),
		});

		setRating(0);
		setReviewDescription("");
		setOpenReview(false);
	};

	const handleExpertReviewSubmit = () => {
		if (!selectedExpert) {
			toast.error("No expert selected for review.");
			return;
		}

		if (expertRating === 0) {
			toast.error("Please select a rating before submitting.");
			return;
		}

		if (!expertReviewDescription.trim()) {
			toast.error("Please enter a review description before submitting.");
			return;
		}

		rateExpertMutation.mutate(
			{
				expertId: selectedExpert.id.id,
				score: expertRating,
				note: expertReviewDescription.trim(),
			},
			{
				onSuccess: () => {
					setExpertRating(0);
					setExpertReviewDescription("");
					setOpenExpertReview(false);
					setSelectedExpert(null);
				},
			}
		);
	};

	const handleOpenExpertReview = (expert: any) => {
		setSelectedExpert(expert);
		setOpenExpertReview(true);
	};

	const handleCloseExpertReview = () => {
		setOpenExpertReview(false);
		setSelectedExpert(null);
		setExpertRating(0);
		setExpertReviewDescription("");
	};

	const handleTaskReview = () => {
		setOpenReview(true);
	};

	const componentProps = {
		reference: new Date().getTime().toString(),
		email: user?.email,
		amount:
			project?.data?.totalCost &&
			parseFloat(project?.data?.totalCost) * 100,
		publicKey,
		text: "Make Payment",
		metadata: {
			custom_fields: [
				{
					display_name: "Type",
					variable_name: "type",
					value: "project",
				},
				{
					display_name: "Business Id",
					variable_name: "businessId",
					value: `${user?.id}`,
				},
				{
					display_name: "Project Id",
					variable_name: "projectId",
					value: `${project?.data?.id}`,
				},
				{
					display_name: "Amount",
					variable_name: "amount",
					value: `${project?.data?.totalCost}`,
				},
			],
		},
		onSuccess: (response: any) => {
			toast.success("Payment successful!");
			queryClient.invalidateQueries({
				queryKey: ["projects", projectId],
			});
		},
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
			setUserInquiryDetails(JSON.parse(storedUser));
		}
	}, []);

	const userExpertRating = expertReview?.data?.ratings?.find(
		(rating: any) => rating.ratingBy === user?.id
	);

	const formattedText = project?.data?.brief
		.replace(/\\r\\n/g, "<br />")
		.replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

	return (
		<div className="flex w-full flex-col gap-6">
			<div className="flex flex-col gap-4 border-b border-[#EDEEF3] pb-4">
				{/* Header Section */}
				<div className="heading w-full bg-[#F8F8F8] py-4 px-6 flex items-center gap-2">
					<button
						onClick={() => window.history.back()}
						className="text-[#1746A2AB] text-sm font-medium cursor-pointer hover:text-[#1746A2] transition-colors"
					>
						← Back to My projects
					</button>
					<span className="text-[#CFD0D4] text-sm">/</span>
					<span className="text-[#1A1A1A] text-sm font-medium truncate max-w-[200px]">
						{project?.data?.title || "Untitled Project"}
					</span>
				</div>

				{isLoading && <ProjectDetailSkeleton />}

				{/* Project Info Section */}
				<div className="flex w-full items-center justify-between gap-4">
					<div className="top w-full flex items-center gap-3 flex-wrap">
						<div className="bg-[#D1F7FF] flex items-center justify-center p-2 text-[#1A1A1A] text-xs h-[54px] rounded-xl min-w-[80px]">
							{project?.data?.businessId?.name
								?.trim()
								.split(" ")[0] || "BlueMart"}
						</div>

						<div className="flex flex-col gap-2 flex-1 min-w-[200px]">
							<span className="text-sm text-[#878A93]">
								{project?.data?.title}
							</span>
							<div className="items-center gap-4 flex flex-wrap">
								<span className="flex items-center gap-1 text-sm text-[#878A93]">
									<Users2 className="w-4 h-4" />
									Members:{" "}
									<span className="text-[#121217] font-medium">
										{project?.data?.experts?.length || 0}
									</span>
								</span>
								<span className="flex items-center gap-1 text-sm text-[#878A93]">
									<Clock className="w-4 h-4" />
									Due:{" "}
									<span className="text-[#121217] font-medium">
										{project?.data?.dueDate
											? moment(
													project?.data?.dueDate
											  ).format("MMMM DD")
											: "Not set"}
									</span>
								</span>
								<span className="flex items-center gap-1 text-sm text-[#878A93]">
									<Church className="w-4 h-4" />
									Status:{" "}
									<span
										className={`font-medium capitalize ${
											project?.data?.status ===
											"completed"
												? "text-green-600"
												: project?.data?.status ===
												  "in-progress"
												? "text-blue-600"
												: "text-orange-600"
										}`}
									>
										{project?.data?.status || "unknown"}
									</span>
								</span>
							</div>
						</div>
					</div>

					{/* AI Assistant Button */}
					<button
						onClick={() => {
							localStorage.setItem(
								"projectId",
								projectId as string
							);
							router.push("/ai-business-query");
						}}
						className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
					>
						<Image
							src={"/images/scalepadi-ai-logo.svg"}
							alt="Scalepadi AI logo"
							width={180}
							height={80}
						/>
					</button>
				</div>
			</div>

			{/* Payment Section */}
			{project?.data?.totalCost &&
			(project?.data?.paymentStatus === "pending" ||
				project?.data?.paymentStatus === "cancelled") &&
			tasks?.data?.every((task: any) => task.status === "assigned") &&
			project?.data?.experts?.every(
				(expert: any) => expert?.status === "accepted"
			) ? (
				<div className="flex items-center gap-4 p-4 bg-[#F8F9FA] rounded-lg my-4 flex-wrap">
					<div className="flex items-center gap-3">
						<span className="text-sm font-medium text-gray-700">
							Proposed Price:
						</span>
						<span className="text-lg font-bold text-green-700">
							₦{project?.data?.totalCost?.toLocaleString()}
						</span>
					</div>
					<PaystackButton
						{...componentProps}
						className="text-white bg-primary py-2 px-6 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					/>
				</div>
			) : (
				<div className="flex gap-4 p-4 bg-[#F8F9FA] rounded-lg my-4 flex-col">
					<div className="flex items-center gap-3">
						<span className="text-sm font-medium text-gray-700">
							Total cost so far:
						</span>
						<span className="text-lg font-bold text-green-700">
							₦{project?.data?.totalCost?.toLocaleString() || 0}
						</span>
					</div>
					<span className="text-xs text-gray-500">
						Tasks are still being assigned and experts are yet to
						accept tasks
					</span>
					<span className="text-xs text-gray-500">
						You will be prompted to pay when tasks are assigned and
						experts has accepted
					</span>
				</div>
			)}

			{/* Payment Status for Completed Payments */}
			{project?.data?.paymentStatus === "completed" && (
				<div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg my-4">
					<CheckCircle className="w-5 h-5 text-green-600" />
					<span className="text-sm font-medium text-green-700">
						Payment Completed • Paid ₦
						{project?.data?.totalCost?.toLocaleString()}
					</span>
				</div>
			)}

			<div className="tab pt-2 w-full flex items-center gap-5 bg-[#F9FAFB] border-b border-gray-200">
				{[
					{ id: "projectOverview", label: "Project Overview" },
					{ id: "taskTracker", label: "Task Tracker" },
					{ id: "team", label: "Team Members" },
					// { id: "deliverables", label: "Deliverables" },
				].map((tab) => (
					<button
						key={tab.id}
						className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3 transition-colors ${
							activeTab === tab.id
								? "border-[#3A96E8] text-[#3A96E8] font-medium"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
						onClick={() => setActiveTab(tab?.id as any)}
					>
						<span className="text-sm">{tab.label}</span>
					</button>
				))}
			</div>

			{activeTab === "projectOverview" && (
				<div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6">
					{/* Project Brief */}
					<div className="flex flex-col gap-3">
						<h3 className="text-[#1A1A1A] text-base font-semibold">
							Project Brief
						</h3>
						{/* <p className="text-sm text-[#727374] leading-relaxed">
							{formattedText || "No project brief provided."}
						</p> */}
						<div
							className="whitespace-pre-line text-sm text-[#727374] leading-relaxed"
							dangerouslySetInnerHTML={{ __html: formattedText }}
						/>
					</div>

					{/* Goal */}
					<div className="flex flex-col gap-3">
						<h3 className="text-[#1A1A1A] text-base font-semibold">
							Goal
						</h3>
						<p className="text-sm text-[#727374] leading-relaxed">
							{project?.data?.goal || "No goal specified."}
						</p>
					</div>

					{/* Challenge */}
					<div className="flex flex-col gap-3">
						<h3 className="text-[#1A1A1A] text-base font-semibold">
							Challenge
						</h3>
						<p className="text-sm text-[#727374] leading-relaxed">
							{project?.data?.challengeId?.description ||
								"No challenge description provided."}
						</p>
					</div>

					{/* Resources */}
					{project?.data?.resources?.length > 0 && (
						<div className="flex flex-col gap-3">
							<h3 className="text-[#1A1A1A] text-base font-semibold">
								Resources
							</h3>
							<div className="flex flex-wrap gap-2">
								{project.data.resources.map(
									(resource: string, index: number) => (
										<div
											key={index}
											className="flex items-center gap-2 p-2 bg-[#F7F9F9] rounded-lg border"
										>
											<File className="w-4 h-4 text-primary" />
											<span className="text-[#878A93] text-xs max-w-[150px] truncate">
												{resource.split("/").pop() ||
													`Resource ${index + 1}`}
											</span>
											<a
												href={resource}
												download
												target="_blank"
												rel="noopener noreferrer"
												className="p-1 hover:bg-gray-100 rounded transition-colors"
											>
												<Download className="w-4 h-4 text-[#878A93] cursor-pointer" />
											</a>
										</div>
									)
								)}
							</div>
						</div>
					)}
				</div>
			)}

			{activeTab === "team" && (
				<div className="w-full border border-[#F2F2F2] rounded-2xl p-6">
					<h3 className="text-[#1A1A1A] text-base font-semibold mb-4">
						Team Members
					</h3>
					<div className="grid gap-3">
						{project?.data?.experts?.map(
							(expert: any, index: number) => (
								<div
									key={expert._id}
									className="flex items-center gap-3 p-3 border rounded-lg"
								>
									<img
										src={
											expert.id?.profilePicture ||
											"/images/avatar-placeholder.png"
										}
										alt={expert.id?.name}
										className="w-10 h-10 rounded-full object-cover"
									/>
									<div className="flex-1">
										<p className="font-medium text-sm">
											{expert.id?.name}
										</p>
										<p className="text-xs text-gray-500">
											{expert.id?.email}
										</p>
									</div>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											expert.status === "accepted"
												? "bg-green-100 text-green-800"
												: expert.status === "pending"
												? "bg-yellow-100 text-yellow-800"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{expert.status}
									</span>
								</div>
							)
						)}
					</div>
				</div>
			)}

			{activeTab === "taskTracker" && (
				<div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6">
					{/* Section Header */}
					<div className="flex flex-col gap-2">
						<span className="text-sm text-[#1A1A1A] font-medium">
							Track Tasks in Real Time
						</span>
						<span className="text-sm text-[#727374]">
							Review submissions, view feedback, and approve or
							request changes.
						</span>
					</div>

					<div className="p-3 flex flex-col gap-6 rounded-3xl bg-[#FBFCFC]">
						{/* Experts List - New Design */}
						{project?.data?.experts?.length > 0 && (
							<div className="flex flex-col gap-6">
								<div className="flex items-center justify-between">
									<span className="text-lg font-semibold text-[#1A1A1A]">
										Project Team
									</span>
									<span className="text-sm text-[#878A93]">
										{project.data.experts.length} expert(s)
										assigned
									</span>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{project.data.experts.map(
										(expert: any, index: number) => (
											<div
												key={index}
												className="flex flex-col border border-[#F3F4F6] rounded-2xl p-6 bg-white hover:shadow-lg transition-all duration-300"
											>
												<div className="flex items-start gap-4">
													<div className="relative">
														<div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#E2E2E2]">
															<Image
																src={
																	expert?.profilePicture ||
																	noAvatar
																}
																alt="Expert Avatar"
																width={64}
																height={64}
																className="object-cover"
															/>
														</div>
														<div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 border-2 border-white">
															<User className="w-3 h-3 text-white" />
														</div>
													</div>

													<div className="flex-1">
														<div className="flex items-start justify-between">
															<div>
																<h3 className="text-lg font-semibold text-[#1A1A1A]">
																	{
																		expert
																			?.id
																			?.name
																	}
																</h3>
																<p className="text-sm text-[#878A93] mt-1">
																	Expert
																	Specialist
																</p>
															</div>
															<div className="flex items-center gap-1 bg-[#F8F9FA] px-2 py-1 rounded-full">
																<Star className="w-3 h-3 text-[#F2BB05] fill-[#F6CF50]" />
																<span className="text-xs font-medium text-[#1A1A1A]">
																	{expertReview
																		?.data
																		?.averageScore ||
																		"0.0"}
																</span>
															</div>
														</div>

														<div className="flex items-center gap-4 mt-3 text-xs text-[#878A93]">
															<div className="flex items-center gap-1">
																<MessageCircle className="w-3 h-3" />
																<span>
																	{expertReview
																		?.data
																		?.totalRatings ||
																		0}{" "}
																	reviews
																</span>
															</div>
															<div className="flex items-center gap-1">
																<Calendar className="w-3 h-3" />
																<span>
																	Joined{" "}
																	{moment(
																		expert?.createdAt
																	).format(
																		"MMM YYYY"
																	)}
																</span>
															</div>
														</div>

														<div className="mt-4">
															<Button
																onClick={() =>
																	handleOpenExpertReview(
																		expert
																	)
																}
																className="w-full bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl py-3 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md"
															>
																<Star className="w-4 h-4 mr-2" />
																Rate Expert
															</Button>
														</div>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						)}

						{/* Tasks */}
						{isLoadingTasks ? (
							<div className="text-center py-6 text-[#727374] text-sm">
								Loading tasks...
							</div>
						) : tasks?.data?.length === 0 ? (
							<div className="flex flex-col items-center justify-center gap-3 py-8">
								<Image
									src="https://www.shutterstock.com/image-vector/flat-icon-no-task-vector-260nw-2264189001.jpg"
									alt="No tasks"
									width={200}
									height={200}
								/>
								<span className="text-sm text-[#727374]">
									No tasks have been assigned yet
								</span>
							</div>
						) : (
							<div className="flex flex-col gap-6">
								{tasks.data.map((task: any, index: number) => (
									<div
										key={task.id}
										className="flex flex-col gap-5 border border-[#ECECEC] bg-white rounded-2xl p-5 shadow-sm"
									>
										{/* Header */}
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-[#878A93]">
												Task {index + 1}:{" "}
												<span className="text-[#1A1A1A]">
													{task?.title}
												</span>
											</span>
											<span
												className={`px-3 py-1 text-xs rounded-full capitalize ${
													task.status === "completed"
														? "bg-[#E7F9EF] text-[#15803D]"
														: task.status ===
														  "approved"
														? "bg-[#FFF5E5] text-[#B45309]"
														: "bg-[#F5F5F5] text-[#6B7280]"
												}`}
											>
												{task.status || "pending"}
											</span>
										</div>

										{/* Description */}
										<p className="text-sm text-[#727374]">
											{task?.description}
										</p>

										{/* Links */}
										{task?.link?.length > 0 && (
											<div className="flex flex-wrap gap-2 w-full">
												{task.link.map(
													(
														link: string,
														i: number
													) => (
														<div
															key={i}
															className="flex items-center gap-2 border border-[#FEE1BA] rounded-[14px] px-3 py-2 lg:w-[360px]"
														>
															<LinkIcon className="text-[#FF5F6D]" />
															<a
																href={link}
																target="_blank"
																rel="noopener noreferrer"
																className="truncate text-sm text-[#1A1A1A]"
															>
																{link}
															</a>
														</div>
													)
												)}
											</div>
										)}

										{/* Documents */}
										{task?.document?.length > 0 && (
											<div className="flex flex-wrap gap-2 w-full">
												{task.document.map(
													(
														doc: string,
														i: number
													) => (
														<div
															key={i}
															className="flex w-full sm:w-[360px] items-center justify-between p-3 border border-[#F3F4F6] rounded-[12px]"
														>
															<div className="flex items-center gap-3">
																<Image
																	src="/icons/file-icon.svg"
																	alt="file"
																	width={32}
																	height={32}
																/>
																<div className="flex flex-col">
																	<span className="text-sm text-[#353D44] truncate max-w-[200px]">
																		{doc
																			.split(
																				"/"
																			)
																			.pop()}
																	</span>
																	<span className="text-xs text-[#757B85]">
																		250kb
																	</span>
																</div>
															</div>
															<a
																href={doc}
																download
																target="_blank"
																rel="noopener noreferrer"
															>
																<Download className="text-[#878A93] w-5 h-5 hover:text-[#1A1A1A]" />
															</a>
														</div>
													)
												)}
											</div>
										)}

										{/* Submissions */}
										{task?.submission?.length > 0 && (
											<div className="flex flex-col gap-3 w-full">
												<span className="text-[#878A93] text-sm font-medium">
													Submissions
												</span>
												<div className="flex flex-wrap gap-2">
													{task.submission.map(
														(
															item: string,
															i: number
														) =>
															item.includes(
																"res.cloudinary.com"
															) ? (
																<div
																	key={i}
																	className="flex w-full sm:w-[360px] items-center justify-between p-3 border border-[#F3F4F6] rounded-[12px]"
																>
																	<div className="flex items-center gap-3">
																		<Image
																			src="/icons/file-icon.svg"
																			alt="file"
																			width={
																				32
																			}
																			height={
																				32
																			}
																		/>
																		<span className="text-sm text-[#353D44]">
																			Document{" "}
																			{i +
																				1}
																		</span>
																	</div>
																	<a
																		href={
																			item
																		}
																		target="_blank"
																		rel="noopener noreferrer"
																	>
																		<Download className="text-[#878A93] w-5 h-5" />
																	</a>
																</div>
															) : (
																<div
																	key={i}
																	className="flex items-center gap-2 border border-[#FEE1BA] rounded-[14px] px-3 py-2 lg:w-[360px]"
																>
																	<LinkIcon className="text-[#FF5F6D]" />
																	<a
																		href={
																			item
																		}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="truncate text-sm text-[#1A1A1A]"
																	>
																		{item}
																	</a>
																</div>
															)
													)}
												</div>
											</div>
										)}

										{/* Notes */}
										{/* {task?.notes?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[#1A1A1A] text-sm font-medium">
                          Notes
                        </span>
                        <div className="flex flex-col gap-2">
                          {task.notes.map((note: any, i: number) => (
                            <div
                              key={i}
                              className="text-sm text-[#727374] bg-[#F9FAFB] border border-[#F3F4F6] p-2 rounded-lg"
                            >
                              {note.content}
                            </div>
                          ))}
                        </div>
                      </div>
                    )} */}

										{/* Actions */}
										{task.status === "approved" && (
											<div className="flex justify-end gap-3 mt-4">
												<Button
													variant="outline"
													className="border-[#E2E2E2] text-[#1A1A1A] rounded-[12px] hover:bg-gray-50"
													onClick={() =>
														setOpenRejectReason(
															true
														)
													}
												>
													Contact Support
												</Button>
												<Button
													className="bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#333]"
													onClick={handleTaskReview}
												>
													Review
												</Button>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}

			<Dialog open={openReview} onOpenChange={setOpenReview}>
				<DialogContent className="!rounded-3xl max-w-md">
					<DialogTitle className="text-primary text-[20px] text-center">
						Write a review
					</DialogTitle>

					<div className="flex flex-col gap-6">
						{review?.data ? (
							// Show existing review
							<div className="flex flex-col gap-4">
								<span className="text-[#878A93] text-sm text-center">
									Your review for this project
								</span>

								{/* Display existing rating */}
								<div className="flex items-center justify-center gap-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`w-[32px] h-[32px] ${
												star <= review?.data?.rating
													? "text-[#F2BB05] fill-[#F6CF50]"
													: "text-[#CFD0D4] fill-[#E7ECEE]"
											}`}
										/>
									))}
								</div>

								<div className="flex flex-col gap-2">
									<Label>Your feedback</Label>
									<div className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] bg-gray-50">
										{review?.data?.description}
									</div>
								</div>

								<div className="flex flex-col gap-1">
									<div className="text-sm text-[#878A93] text-center">
										Review submitted on{" "}
										{moment(review?.data?.createdAt).format(
											"MMMM DD, YYYY"
										)}
									</div>
									<div className="text-xs text-[#878A93] text-center">
										By: {review?.data?.by?.name} (
										{review?.data?.by?.email})
									</div>
								</div>
							</div>
						) : (
							// Show review form
							<>
								<span className="text-[#878A93] text-sm text-center">
									Your project was recently completed and we
									will like for you to leave a feedback and
									performance review for the expert
								</span>

								{/* Interactive Star Rating */}
								<div className="flex items-center justify-center gap-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`w-[32px] h-[32px] cursor-pointer transition-colors ${
												star <= rating
													? "text-[#F2BB05] fill-[#F6CF50]"
													: "text-[#CFD0D4] fill-[#E7ECEE]"
											}`}
											onClick={() => setRating(star)}
										/>
									))}
								</div>

								<div className="form-group flex flex-col gap-2">
									<Label>Write your feedback</Label>
									<Textarea
										value={reviewDescription}
										onChange={(
											e: ChangeEvent<HTMLTextAreaElement>
										) =>
											setReviewDescription(e.target.value)
										}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="Share your experience with the expert..."
									/>
								</div>

								<Button
									onClick={handleReviewSubmit}
									disabled={createReviewMutation.isPending}
									className="bg-primary text-white py-6 rounded-[14px] w-full hover:bg-primary-hover hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{createReviewMutation.isPending
										? "Submitting..."
										: "Submit review"}
								</Button>
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>

			<Dialog
				open={openExpertReview}
				onOpenChange={handleCloseExpertReview}
			>
				<DialogContent className="!rounded-3xl max-w-md">
					<DialogTitle className="text-primary text-[20px] text-center">
						Rate Expert
					</DialogTitle>

					<div className="flex flex-col gap-6">
						{userExpertRating ? (
							// Show existing expert review by current user
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-3 mb-4">
									<div className="relative w-12 h-12 rounded-full overflow-hidden">
										<Image
											src={
												selectedExpert?.profilePicture ||
												noAvatar
											}
											alt="Expert Avatar"
											width={48}
											height={48}
											className="object-cover"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-[#1A1A1A]">
											{selectedExpert?.id?.name}
										</h3>
										<p className="text-sm text-[#878A93]">
											Your Review
										</p>
									</div>
								</div>

								{/* Display existing rating */}
								<div className="flex items-center justify-center gap-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`w-[32px] h-[32px] ${
												star <= userExpertRating?.score
													? "text-[#F2BB05] fill-[#F6CF50]"
													: "text-[#CFD0D4] fill-[#E7ECEE]"
											}`}
										/>
									))}
								</div>

								<div className="flex flex-col gap-2">
									<Label>Your feedback</Label>
									<div className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] bg-gray-50">
										{userExpertRating?.note ||
											"No feedback provided"}
									</div>
								</div>

								<div className="flex flex-col gap-1">
									<div className="text-sm text-[#878A93] text-center">
										Review submitted on{" "}
										{moment(
											userExpertRating?.createdAt
										).format("MMMM DD, YYYY")}
									</div>
								</div>
							</div>
						) : (
							// Show expert review form
							<>
								<div className="flex items-center gap-3 mb-4">
									<div className="relative w-12 h-12 rounded-full overflow-hidden">
										<Image
											src={
												selectedExpert?.profilePicture ||
												noAvatar
											}
											alt="Expert Avatar"
											width={48}
											height={48}
											className="object-cover"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-[#1A1A1A]">
											{selectedExpert?.id?.name}
										</h3>
										<p className="text-sm text-[#878A93]">
											Rate this expert
										</p>
									</div>
								</div>

								<span className="text-[#878A93] text-sm text-center">
									How was your experience working with{" "}
									{selectedExpert?.id?.name}?
								</span>

								{/* Interactive Star Rating */}
								<div className="flex items-center justify-center gap-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`w-[32px] h-[32px] cursor-pointer transition-colors ${
												star <= expertRating
													? "text-[#F2BB05] fill-[#F6CF50]"
													: "text-[#CFD0D4] fill-[#E7ECEE]"
											}`}
											onClick={() =>
												setExpertRating(star)
											}
										/>
									))}
								</div>

								<div className="form-group flex flex-col gap-2">
									<Label>Write your feedback</Label>
									<Textarea
										value={expertReviewDescription}
										onChange={(
											e: ChangeEvent<HTMLTextAreaElement>
										) =>
											setExpertReviewDescription(
												e.target.value
											)
										}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="Share your experience working with this expert..."
										rows={4}
									/>
								</div>

								<Button
									onClick={handleExpertReviewSubmit}
									disabled={rateExpertMutation.isPending}
									className="bg-primary text-white py-6 rounded-[14px] w-full hover:bg-primary-hover hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{rateExpertMutation.isPending
										? "Submitting..."
										: "Submit review"}
								</Button>
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={openRejectReason} onOpenChange={setOpenRejectReason}>
				<DialogContent className="!rounded-3xl">
					<DialogTitle className="text-primary text-[20px]">
						Request Update
					</DialogTitle>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-6"
					>
						<span className="text-[#878A93] text-sm">
							Kindly write detailed information about your
							inquiry.
						</span>

						{/* Hidden inputs for prefilled user info */}
						<input type="hidden" {...register("firstName")} />
						<input type="hidden" {...register("lastName")} />
						<input type="hidden" {...register("email")} />

						<div className="form-group flex flex-col gap-2">
							<Label>Write your feedback</Label>
							<Textarea
								value={note}
								onChange={(e) => setNote(e.target.value)}
								className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
							/>
						</div>

						<Button
							type="submit"
							className="bg-primary text-white py-6 rounded-[14px] w-fit hover:bg-primary-hover hover:text-black"
							disabled={isPending}
						>
							{isPending ? "Submitting..." : "Submit Request"}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProjectDetails;
