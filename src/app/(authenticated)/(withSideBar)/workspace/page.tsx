"use client";

import ProjectSkeletonLoader from "@/components/skeletons/projects.skeleton";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/hooks/useProject";
import { IProject } from "@/types/project.type";
import { Church, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
	email: string;
	name: string;
	phone: string;
}

const WorkSpace = () => {
	const [user, setuser] = useState<User | null>(null);
	const [greeting, setGreeting] = useState("Hello");
	const [params, setParams] = useState<Record<string, any> | null>({
		limit: 9,
	});
	const [page, setPage] = useState(1);
	const { projects, isLoading } = useGetProjects(params);
	const router = useRouter();

	const handleNext = () => {
		if (projects?.currentPage < projects?.totalPages) {
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
		if (projects?.currentPage > 1) {
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

	useEffect(() => {
		setuser(JSON.parse(localStorage.getItem("user") || "{}"));

		const hour = new Date().getHours();

		if (hour >= 5 && hour < 12) {
			setGreeting("Good morning");
		} else if (hour >= 12 && hour < 17) {
			setGreeting("Good afternoon");
		} else if (hour >= 17 && hour < 21) {
			setGreeting("Good evening");
		} else {
			setGreeting("Good night");
		}
	}, []);

	// Function to check if project is overdue
	const isProjectOverdue = (dueDate: string) => {
		return new Date(dueDate) < new Date();
	};

	const getBusinessName = (project: IProject) => {
		const business = project.businessId;
		if (business?.name?.trim()) {
			return business.name.trim().split(" ")[0];
		}
		if (business?.title?.trim()) {
			return business.title.trim().split(" ")[0];
		}
		if (business?.email) {
			return business.email.split("@")[0];
		}
		return "BlueMart";
	};

	const getProjectDescription = (project: IProject) => {
		const hasChallenge =
			project.challengeId &&
			(project.challengeId.description || project.challengeId.type);

		if (hasChallenge) {
			const challengeText = [
				project.challengeId.type,
				project.challengeId.description,
			]
				.filter(Boolean)
				.join(" - ");

			return (
				<div className="flex flex-col gap-1">
					<span className="text-sm text-[#727374] line-clamp-2">
						{project.brief || project.goal}
					</span>
					<span className="text-xs text-gray-500 font-medium line-clamp-2">
						Challenge: {challengeText}
					</span>
				</div>
			);
		}

		return (
			<span className="text-sm text-[#727374] line-clamp-2">
				{project.brief || project.goal}
			</span>
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<header className="text-[32px] font-semibold text-[#878A9399]">
				{greeting},{" "}
				<span className="text-[#1A1A1A]">
					{user?.name?.split(" ")[0]}
				</span>
			</header>

			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<span className="font-semibold text-[#878A93] text-base hidden md:block">
						Active Projects{" "}
						{projects?.data?.length > 0 &&
							`(${projects.data.length})`}
					</span>
					<div className="flex items-center gap-2 justify-end">
						<Button
							onClick={() =>
								router.push("/business-setup?type=create")
							}
							className="text-white bg-primary rounded-[14px] hover:bg-primary-hover hover:text-black"
						>
							Start a new project
						</Button>
						<button
							onClick={() => {
								// localStorage.setItem("projectId", project?.id);
								router.push("/ai-business-query");
							}}
							className="cursor-pointer transition-transform hover:scale-105"
						>
							<Image
								src={"/images/scalepadi-ai-logo.svg"}
								alt="Scalepadi AI logo"
								width={147}
								height={36}
							/>
						</button>
					</div>
				</div>
				{isLoading ? (
					<ProjectSkeletonLoader />
				) : projects?.data.length === 0 ? (
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
									You do not have any active projects yet,
									your projects will appear here as soon as
									you are matched with a project
								</span>
								<button
									onClick={() => {
										// localStorage.setItem("projectId", project?.id);
										router.push("/ai-business-query");
									}}
									className="cursor-pointer transition-transform hover:scale-105"
								>
									<Image
										src={"/images/scalepadi-ai-logo.svg"}
										alt="Scalepadi AI logo"
										width={147}
										height={36}
									/>
								</button>
								<Button
									onClick={() =>
										router.push(
											"/business-setup?type=create"
										)
									}
									className="text-white bg-primary rounded-[14px] hover:bg-primary-hover hover:text-black"
								>
									Start a new project
								</Button>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
							{projects?.data?.map((project: IProject) => (
								<div
									key={project.id}
									className={`p-4 gap-3 rounded-3xl bg-[#FBFCFC] flex flex-col justify-between relative 
                      
                      `}
								>
									{/* Overdue Indicator */}
									{/* {isProjectOverdue(project.dueDate) && (
                        <div className="absolute -top-2 -right-2 bg-[#FF6B35] text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                          <AlertTriangle className="w-3 h-3" />
                          Overdue
                        </div>
                        ${
                        isProjectOverdue(project.dueDate) ? 'border border-[#FF6B35]' : ''
                      }
                      )} */}

									<div className="top w-full flex items-center gap-3">
										<div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">
											{getBusinessName(project)}
										</div>
										<div className="flex flex-col gap-2 flex-1">
											<span className="text-sm font-medium text-[#121217] line-clamp-1">
												{project.title}
											</span>
											<div className="items-center gap-2 flex">
												<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
													<Church className="w-4 h-4" />
													Status:{" "}
													<span className="text-[#121217] font-light capitalize">
														{project.status}
													</span>
												</span>
											</div>
										</div>
									</div>

									{/* Project Brief/Goal with Challenge */}
									<div className="p-4 flex flex-col gap-2 border border-[#D1DAEC80] rounded-[14px]">
										<span className="text-[#1A1A1A] text-sm font-medium">
											Project Overview
										</span>
										{getProjectDescription(project)}
									</div>

									<div className="flex items-center justify-between">
										<button
											onClick={() => {
												localStorage.setItem(
													"projectId",
													project?.id
												);
												router.push(
													"/ai-business-query"
												);
											}}
											className="cursor-pointer transition-transform hover:scale-105"
										>
											<Image
												src={
													"/images/scalepadi-ai-logo.svg"
												}
												alt="Scalepadi AI logo"
												width={147}
												height={36}
											/>
										</button>
										<Link href={`/workspace/${project.id}`}>
											<Button
												variant={"outline"}
												className="text-xs"
											>
												View workspace
											</Button>
										</Link>
									</div>
								</div>
							))}
						</div>
						{/* ✅ Pagination Controls */}
						<div className="flex items-center justify-end gap-4 p-4 border-t">
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600">
									Page {projects?.currentPage} of{" "}
									{projects?.totalPages}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-8 p-0 border-none"
									disabled={projects?.currentPage === 1}
									onClick={handlePrev}
								>
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-8 p-0 border-none"
									disabled={
										projects?.currentPage ===
										projects?.totalPages
									}
									onClick={handleNext}
								>
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default WorkSpace;
