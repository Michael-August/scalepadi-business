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
	Plus,
	Link,
	X,
	Pin,
	Verified,
	Star,
	LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetProject, useGetTasksForProject } from "@/hooks/useProject";
import moment from "moment";
import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { IExpert } from "@/types/expert.type";
import { noAvatar } from "@/lib/constatnts";

const ProjectDetails = () => {
	const [activeTab, setActiveTab] = useState<
		"projectOverview" | "taskTracker"
	>("projectOverview");
	const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

	const { projectId } = useParams();

	const { project, isLoading } = useGetProject(projectId as string);
	const { tasks, isLoading: isLoadingTasks } = useGetTasksForProject(
		projectId as string
	);

	const [user, setUser] = useState<any>();

	const router = useRouter();

	const [openReview, setOpenReview] = useState(false);
	const [openRejectReason, setOpenRejectReason] = useState(false);

	const componentProps = {
		reference: new Date().getTime().toString(),
		email: user?.email,
		amount:
			project?.data?.proposedTotalCost &&
			parseFloat(project?.data?.proposedTotalCost) * 100,
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
					value: `${project?.data?.proposedBudget}`,
				},
			],
		},
		onSuccess: (response: any) => {
			toast.success("Payment successful!");
		},
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return (
		<div className="flex w-full flex-col gap-6">
			<div className="flex flex-col gap-4 border-b border-[#EDEEF3] pb-4">
				<div className="heading w-full bg-[#F8F8F8] py-4 px-6 flex items-center gap-2">
					<span
						onClick={() => window.history.back()}
						className="text-[#1746A2AB] text-sm font-medium cursor-pointer"
					>
						Back to My projects
					</span>
					<span className="text-[#CFD0D4] text-sm">/</span>
					<span className="text-[#1A1A1A] text-sm font-medium">
						{project?.data?.title}
					</span>
					<span className="text-[#CFD0D4] text-sm">/</span>
				</div>

				<div className="flex w-full items-center justify-between">
					<div className="top w-full flex items-center gap-3">
						<div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">
							BlueMart
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm text-[#878A93] ">
								{project?.data?.title}
							</span>
							<div className="items-center gap-2 flex">
								<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
									<Users2 className="w-4 h-4" />
									Members:{" "}
									<span className="text-[#121217]">
										{project?.data?.experts?.length}
									</span>
								</span>
								<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
									<Clock className="w-4 h-4" />
									Due:{" "}
									<span className="text-[#121217]">
										{moment(project?.data?.dueDate).format(
											"MMMM DD"
										)}
									</span>
								</span>
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm text-[#878A93] opacity-0">
								Hi
							</span>
							<div className="items-center gap-1 flex">
								<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
									<Church className="w-4 h-4" />
									Status:{" "}
									<span className="text-[#121217]">
										{project?.data?.status}
									</span>
								</span>
								{/* <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                    <Church className="w-4 h-4" />
                                    Role: <span className="text-[#121217]">In progress</span>
                                </span> */}
							</div>
						</div>
					</div>
					<Image
						onClick={() => {
							localStorage.setItem(
								"projectId",
								projectId as string
							);
							router.push("/ai-business-query");
						}}
						className="cursor-pointer"
						src={"/images/scalepadi-ai-logo.svg"}
						alt="Scalepadi AI logo"
						width={147}
						height={36}
					/>
				</div>
			</div>

			{project?.data?.proposedTotalCost &&
				(project?.data?.paymentStatus === "pending" ||
					project?.data?.paymentStatus === "cancelled") && (
					<PaystackButton
						{...componentProps}
						className="text-white bg-primary py-2 px-3 rounded-[14px] w-fit hover:bg-primary-hover hover:text-black"
					/>
				)}
			{project?.data?.proposedTotalCost &&
				(project?.data?.paymentStatus === "pending" ||
					project?.data?.paymentStatus === "cancelled") && (
					<span className="text-sm text-green-700">
						Proposed Price: ₦
						{project?.data?.proposedTotalCost.toLocaleString()}
					</span>
				)}

			<div className="project-details w-full lg:w-[895px] pb-10">
				<div className="tab pt-2 w-full flex items-center gap-5 bg-[#F9FAFB]">
					<div
						className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                        hover:border-[#3A96E8] transition-colors 
                        ${
							activeTab === "projectOverview"
								? "border-[#3A96E8] text-[#3A96E8]"
								: "border-transparent"
						}`}
						onClick={() => setActiveTab("projectOverview")}
					>
						<span className="text-sm">Project Overview</span>
					</div>

					<div
						className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                        hover:border-[#3A96E8] transition-colors 
                        ${
							activeTab === "taskTracker"
								? "border-[#3A96E8] text-[#3A96E8]"
								: "border-transparent"
						}`}
						onClick={() => setActiveTab("taskTracker")}
					>
						<span className="text-sm">Task Tracker</span>
					</div>
					<div
						className={`flex w-full items-center justify-center pb-3`}
					></div>
					<div
						className={`flex w-full items-center justify-center pb-3`}
					></div>
				</div>
				{activeTab === "projectOverview" && (
					<div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<span className="text-[#1A1A1A] text-sm font-normal">
								Project brief
							</span>
							{/* <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(yourContent) }}
                        /> */}
							<span className="text-sm text-[#727374]">
								{project?.data?.brief}
							</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-[#1A1A1A] text-sm font-normal">
								Goal
							</span>
							<span className="text-sm text-[#727374]">
								{project?.data?.goal}
							</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-[#1A1A1A] text-sm font-normal">
								Challenge
							</span>
							<span className="text-sm text-[#727374]">
								Increase weekly customer sign-ups by 30% in 6
								weeks through acquisition funnel optimization
								and sales outreach.
							</span>
						</div>
						{/* <div className="flex flex-col gap-2">
                        <span className="text-[#1A1A1A] text-sm font-normal">Metrics to Influence</span>
                        <ul className="list-none flex flex-col gap-2 text-sm text-[#727374]">
                            <li>Weekly Sign-Ups</li>
                            <li>Landing Page Conversion Rate</li>
                            <li>CPA (Cost per Acquisition)</li>
                            <li>Referral Rate</li>
                        </ul>
                    </div> */}
						<div className="flex flex-col gap-2">
							{project?.data?.resources?.length > 0 && (
								<span className="text-[#1A1A1A] text-sm font-normal">
									Resources
								</span>
							)}
							{project?.data?.resources?.map(
								(resource: string, index: number) => (
									<div
										key={index}
										className="flex items-center gap-[10px]"
									>
										<div className="flex items-center gap-2 p-1 bg-[#F7F9F9] rounded-3xl">
											<File className="w-4 h-4 text-primary" />
											<span className="text-[#878A93] text-[8px] truncate max-w-[120px]">
												{resource.split("/").pop()}{" "}
												{/* show only file name */}
											</span>
											<a
												href={resource}
												download
												target="_blank"
												rel="noopener noreferrer"
											>
												<Download className="w-4 h-4 text-[#878A93] cursor-pointer" />
											</a>
										</div>
									</div>
								)
							)}
						</div>
						{/* <div className="flex flex-col gap-2">
                        <span className="text-[#1A1A1A] text-sm font-normal">Deliverables</span>
                        <ul className="list-none flex flex-col gap-2 text-sm text-[#727374]">
                            <li>Weekly Sign-Ups</li>
                            <li>Landing Page Conversion Rate</li>
                            <li>CPA (Cost per Acquisition)</li>
                            <li>Referral Rate</li>
                        </ul>
                    </div> */}
					</div>
				)}

				{activeTab === "taskTracker" && (
					<div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<span className="text-sm text-[#1A1A1A]">
								Track Tasks in real time
							</span>
							<span className="text-sm text-[#727374]">
								Review submissions and approve or request
								changes.
							</span>
						</div>

						<div className="p-3 flex flex-col gap-4 rounded-3xl bg-[#FBFCFC]">
							{project?.data?.experts?.length !== 0 && (
								<div className="flex flex-col gap-4">
									{project?.data?.experts?.map(
										(expert: any) => (
											<div className="flex items-center gap-2">
												<div className="w-[52px] relative h-[52px] rounded-full">
													<Image
														src={
															(expert?.profilePicture as string) ||
															noAvatar
														}
														alt="Profile Picture"
														width={52}
														height={52}
														className="rounded-full w-full h-full"
													/>
													<Image
														className="absolute bottom-0 left-0"
														src={
															"/images/profile-logo.svg"
														}
														alt="logo"
														width={20}
														height={20}
													/>
												</div>
												<div className="flex flex-col gap-2">
													<span className="text-[#1A1A1A] font-medium text-[20px]">
														{expert?.id?.name}
													</span>
													<div className="flex items-center gap-1">
														<Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
														<Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
														<Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
														<Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
														<Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
													</div>
													{/* <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Verified className="w-4 h-4 text-[#878A93]" /> Verified</span>
                                                    <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Pin className="w-4 h-4 text-[#878A93]" /> Abuja,Nigeria</span>
                                                    <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Clock className="w-4 h-4 text-[#878A93]" /> Availability: Full time</span>
                                                </div> */}
												</div>
											</div>
										)
									)}
								</div>
							)}

							{tasks?.data?.length === 0 && (
								<div className="flex flex-col gap-4 items-center justify-center">
									<Image
										src={
											"https://www.shutterstock.com/image-vector/flat-icon-no-task-vector-260nw-2264189001.jpg"
										}
										alt="No tasks"
										width={200}
										height={200}
									/>
									<span className="text-sm text-[#727374]">
										No tasks have been assigned to this
										project yet
									</span>
								</div>
							)}

							{tasks?.data?.length !== 0 && isLoadingTasks && (
								<div>Loading tasks...</div>
							)}
							{tasks?.data?.length !== 0 &&
								!isLoadingTasks &&
								tasks?.data?.map((task: any, index: number) => (
									<div
										key={task.id}
										className="flex flex-col gap-4"
									>
										<div className="bg-white p-3 rounded-2xl flex flex-col gap-4">
											<span className="text-[#878A93] text-sm font-medium">
												Task {index + 1}:{" "}
												<span className="text-[#1A1A1A]">
													{task?.title}
												</span>
											</span>
											<span className="text-[#727374] text-sm">
												{task?.description}
											</span>
										</div>

										<div className="flex flex-col gap-4">
											<div className="links flex items-center flex-wrap gap-2 w-full">
												{task?.links?.map(
													(
														link: string,
														index: number
													) => (
														<div
															key={index}
															className="link border border-[#FEE1BA] flex px-2 py-[10px] items-center gap-2 rounded-[14px] lg:w-[367px]"
														>
															<LinkIcon className="text-[#FF5F6D]" />
															{link}
														</div>
													)
												)}
											</div>

											<div className="docs flex items-center gap-2 w-full">
												{task?.documents?.map(
													(
														doc: string,
														index: number
													) => (
														<div
															key={index}
															className="flex w-full items-center justify-between p-3 border border-[#F3F4F6] rounded-[12px]"
														>
															<div className="flex items-center gap-3">
																<Image
																	src={
																		"/icons/file-icon.svg"
																	}
																	alt="file"
																	width={32}
																	height={32}
																/>
																<div className="flex flex-col gap-1">
																	<span className="text-sm text-[#353D44]">
																		{doc
																			.split(
																				"/"
																			)
																			.pop()}
																	</span>{" "}
																	{/* show only file name */}
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
																<Download className="text-[#878A93] cursor-pointer w-5 h-5" />
															</a>
														</div>
													)
												)}
											</div>

											{task?.submission?.length === 0 && (
												<span className="text-sm text-[#727374]">
													No documents have been
													submitted for this task yet
												</span>
											)}
											{/* Submissions */}
											{task.submission &&
												task.submission.length > 0 && (
													<div className="flex flex-col gap-3">
														<span className="text-[#878A93] text-sm font-medium mt-4">
															Submissions
														</span>

														{/* Links */}

														<div className="flex flex-wrap gap-2">
															{(
																task?.submission?.filter(
																	(
																		item: string
																	) =>
																		!item.includes(
																			"res.cloudinary.com"
																		)
																) || []
															)?.map(
																(
																	link: string,
																	index: number
																) => (
																	<div
																		key={`${link} - ${index}`}
																		className="links flex items-center flex-wrap gap-2 w-full"
																	>
																		<div className="link border border-[#FEE1BA] flex px-2 py-[10px] items-center gap-2 rounded-[14px] lg:w-[367px]">
																			<LinkIcon className="text-[#FF5F6D]" />
																			{
																				link
																			}
																		</div>
																	</div>
																)
															)}
														</div>

														{/* Documents */}
														<div className="flex flex-wrap gap-2">
															{(
																task?.submission?.filter(
																	(
																		item: string
																	) =>
																		item.includes(
																			"res.cloudinary.com"
																		)
																) || []
															)?.map(
																(
																	doc: string,
																	index: number
																) => (
																	<div className="flex w-full items-center justify-between p-3 border border-[#F3F4F6] rounded-[12px]">
																		<div className="flex items-center gap-3">
																			<Image
																				src={
																					"/icons/file-icon.svg"
																				}
																				alt="file"
																				width={
																					32
																				}
																				height={
																					32
																				}
																			/>
																			<div className="flex flex-col gap-1">
																				<span className="text-sm text-[#353D44]">
																					Document{" "}
																					{index +
																						1}
																				</span>
																				{/* <span className="text-xs text-[#757B85]">250kb</span> */}
																			</div>
																		</div>
																		<a
																			href={
																				doc
																			}
																			target="_blank"
																			rel="noopener noreferrer"
																		>
																			<Download className="text-[#878A93] cursor-pointer w-5 h-5" />
																		</a>
																	</div>
																)
															)}
														</div>
													</div>
												)}

											{/* <div className="flex flex-col gap-1">
                                            <span className="text-[#1A1A1A] text-sm">Additional notes</span>
                                            <span className="text-sm text-[#727374]">{task?.additionalNotes}</span>
                                        </div> */}

											<div className="flex items-center justify-end gap-3">
												<Button
													onClick={() =>
														setOpenRejectReason(
															true
														)
													}
													variant={"outline"}
													className="border-red-500 text-red-600 rounded-[14px] hover:text-red-800"
												>
													Reject
												</Button>
												<Button
													onClick={() =>
														setOpenReview(true)
													}
													className="text-white bg-primary rounded-[14px] hover:bg-primary-hover hover:text-black"
												>
													Approve
												</Button>
											</div>
										</div>
									</div>
								))}
							{/* <div className="flex flex-col gap-4">
                                <div className="bg-white p-3 rounded-2xl flex flex-col gap-4">
                                    <span className="text-[#878A93] text-sm font-medium">Task 1: <span className="text-[#1A1A1A]">Audit the current acquisition funnel</span></span>
                                    <span className="text-[#727374] text-sm">Review GreenMart’s landing pages, sign-up process, and paid traffic sources. Identify key drop-off points and capture screenshots where applicable.</span>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="links flex items-center flex-wrap gap-2 w-full">
                                        <div className="link border border-[#FEE1BA] flex px-2 py-[10px] items-center gap-2 rounded-[14px] lg:w-[367px]">
                                            <LinkIcon className="text-[#FF5F6D]" />
                                            url
                                        </div>
                                        <div className="link border border-[#FEE1BA] flex px-2 py-[10px] items-center gap-2 rounded-[14px] lg:w-[367px]">
                                            <LinkIcon className="text-[#FF5F6D]" />
                                            url
                                        </div>
                                    </div>

                                    <div className="docs flex items-center gap-2 w-full">
                                        <div className="flex w-full items-center justify-between p-3 border border-[#F3F4F6] rounded-[12px]">
                                            <div className="flex items-center gap-3">
                                                <Image src={'/icons/file-icon.svg'} alt="file" width={32} height={32} />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-[#353D44]">[Front] My phone bill.pdf</span>
                                                    <span className="text-xs text-[#757B85]">250kb</span>
                                                </div>
                                            </div>
                                            <Download className="text-[#878A93] cursor-pointer w-5 h-5" />
                                        </div>
                                        <div className="flex w-full items-center justify-between p-3 border border-[#F3F4F6] rounded-[12px]">
                                            <div className="flex items-center gap-3">
                                                <Image src={'/icons/file-icon.svg'} alt="file" width={32} height={32} />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-[#353D44]">[Front] My phone bill.pdf</span>
                                                    <span className="text-xs text-[#757B85]">250kb</span>
                                                </div>
                                            </div>
                                            <Download className="text-[#878A93] cursor-pointer w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#1A1A1A] text-sm">Additional notes</span>
                                        <span className="text-sm text-[#727374]">Review GreenMart's landing pages, sign-up process, and paid traffic sources. Identify key drop-off points and capture screenshots where applicable.</span>
                                    </div>

                                    <div className="flex items-center justify-end gap-3">
                                        <Button onClick={() => setOpenRejectReason(true)} variant={'outline'} className="border-red-500 text-red-600 rounded-[14px] hover:text-red-800">Reject</Button>
                                        <Button onClick={() => setOpenReview(true)} className="text-white bg-primary rounded-[14px] hover:bg-primary-hover hover:text-black">Approve</Button>
                                    </div>
                                </div>
                            </div> */}
						</div>
					</div>
				)}
			</div>

			<Dialog open={openReview} onOpenChange={setOpenReview}>
				<DialogContent className="!rounded-3xl">
					<DialogTitle className="text-primary text-[20px]">
						Write a review
					</DialogTitle>

					<div className="flex flex-col gap-6">
						<span className="text-[#878A93] text-sm">
							Your project was recently completed and we will like
							for you to leave a feedback and performance review
							for the expert
						</span>
						<div className="flex items-center justify-center gap-4">
							<Star className="w-[32px] h-[32px] text-[#CFD0D4] fill-[#E7ECEE]" />
							<Star className="w-[32px] h-[32px] text-[#CFD0D4] fill-[#E7ECEE]" />
							<Star className="w-[32px] h-[32px] text-[#CFD0D4] fill-[#E7ECEE]" />
							<Star className="w-[32px] h-[32px] text-[#CFD0D4] fill-[#E7ECEE]" />
							<Star className="w-[32px] h-[32px] text-[#CFD0D4] fill-[#E7ECEE]" />
						</div>

						<div className="form-group flex flex-col gap-2">
							<Label>Write your feedback</Label>
							<Textarea className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" />
						</div>

						<Button className="bg-primary text-white py-6 rounded-[14px] w-fit hover:bg-primary-hover hover:text-black">
							Submit review
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={openRejectReason} onOpenChange={setOpenRejectReason}>
				<DialogContent className="!rounded-3xl">
					<DialogTitle className="text-primary text-[20px]">
						Request update
					</DialogTitle>

					<div className="flex flex-col gap-6">
						<span className="text-[#878A93] text-sm">
							Kingly write detailed information as regards to why
							the submitted project has been rejected and what you
							want the expert to do?
						</span>
						<div className="form-group flex flex-col gap-2">
							<Label>Write your feedback</Label>
							<Textarea className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" />
						</div>

						<Button className="bg-primary text-white py-6 rounded-[14px] w-fit hover:bg-primary-hover hover:text-black">
							Submit request
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProjectDetails;
