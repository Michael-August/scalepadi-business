"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Loader, Check } from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useCreateChallenge } from "@/hooks/useChallenge";
import { v4 as uuidv4 } from "uuid";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import SingleSelectField from "@/components/searchableSingleSelectInput";
import { problemTypes } from "@/lib/constatnts";

type FormValues = {
	type: string;
	description: string;
	goal: string;
	start_timeline?: string | Date;
	tools_used: string;
	decision_maker: string;
	industry: string;
	revenue_range: string;
	team_size: number;
};

// interface ScalePadiBannerProps {
//   message?: string;
// }

// const ScalePadiBanner = ({
//   message = "ScalePadi Ai is finished running analysis",
// }: ScalePadiBannerProps) => {
//   return (
//     <div className="mt-6 flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-200 w-fit">
//       <div className="relative flex items-center justify-center h-7 w-7 rounded-full overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-purple-200">
//         <Image
//           src="/icons/scale-logo.svg"
//           alt="ScalePadi"
//           width={20}
//           height={20}
//           className="object-contain"
//         />
//       </div>
//       <p className="text-sm font-medium text-gray-700">
//         <span className="font-semibold text-gray-900">ScalePadi Ai</span> is
//         finished running analysis
//       </p>
//       <Check className="h-4 w-4 text-green-600 ml-1" />
//     </div>
//   );
// };

const Page = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AiBusinessQuery />
		</Suspense>
	);
};

const AiBusinessQuery = () => {
	const methods = useForm<FormValues>({
		mode: "onBlur",
		defaultValues: {
			type: "",
			description: "",
			goal: "",
			start_timeline: undefined,
			tools_used: "",
			decision_maker: "",
			industry: "",
			revenue_range: "",
			team_size: 1,
		},
	});

	const router = useRouter();
	const { createChallenge, isPending: isCreatingChallenge } =
		useCreateChallenge();

	const searchParams = useSearchParams();
	console.log(searchParams.get("inProgress"));

	const [showBanner, setShowBanner] = useState(false);

	const onSubmit = async (data: FormValues) => {
		createChallenge(
			{
				...data,
				queryId: uuidv4(),
				projectId: localStorage.getItem("projectId"),
			},
			{
				onSuccess: (res) => {
					localStorage.setItem(
						"challenge",
						JSON.stringify(res?.data)
					);
					router.push(`/analysis-result/${res.data.queryId}`);
					localStorage.removeItem("projectId");
					setShowBanner(true);
				},
				onError: (error) => {
					if (axios.isAxiosError(error)) {
						const message = error.response?.data?.message;
						if (
							message === "No subscription found." ||
							message ===
								"Subscription is not active or has no requests left."
						) {
							localStorage.setItem(
								"AI Business Query",
								JSON.stringify(data)
							);
							router.push("/upgrade-plan?route=query");
						}
					} else {
						console.error("Unexpected error:", error);
					}
				},
			}
		);
	};

	useEffect(() => {
		if (searchParams.get("inProgress") === "true") {
			const savedData = JSON.parse(
				localStorage.getItem("AI Business Query") || "{}"
			);
			methods.reset(savedData);
		}
	}, [searchParams.get("inProgress")]);

	return (
		<div className="flex w-full flex-col gap-10">
			<div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4 bg-[url('/images/blur-bg.svg')]">
				<div className="flex flex-col items-center justify-center gap-6 w-full lg:w-[560px] py-5 lg:py-20">
					<div className="flex flex-col gap-4 items-center justify-center w-full">
						<span className="text-primary-text font-bold lg:text-[32px] text-center text-xl">
							What's Your Business Challenge
						</span>
						<span className="text-secondary-text text-sm lg:text-base font-medium text-center">
							Tell scalepadi AI your biggest business challenge it
							will analyze it and build a solution.
						</span>
					</div>

					<div className="rounded-3xl bg-white p-4 lg:p-10 border border-[#D1DAEC80] w-full">
						<FormProvider {...methods}>
							<form
								className="flex flex-col gap-6"
								onSubmit={methods.handleSubmit(onSubmit)}
							>
								{/* Type */}
								<SingleSelectField
									name="type"
									label="Type"
									options={problemTypes}
									placeholder="Select Challenge type"
									rules={{ required: "Type is required" }}
								/>

								{/* Description */}
								<div className="form-group flex flex-col gap-2">
									<Label>Description</Label>
									<Textarea
										{...methods.register("description", {
											required: true,
										})}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
									/>
								</div>

								{/* Goal */}
								<div className="form-group flex flex-col gap-2">
									<Label>Goal</Label>
									<Input
										{...methods.register("goal", {
											required: true,
										})}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="What outcome are you targeting?"
									/>
								</div>

								{/* Start Timeline */}
								<div className="form-group flex flex-col gap-2">
									<Label>Start Timeline</Label>
									<Controller
										name="start_timeline"
										control={methods.control}
										render={({ field }) => {
											const [open, setOpen] =
												useState(false);
											const handleSelect = (
												date: Date | undefined
											) => {
												field.onChange(date);
												setOpen(false);
											};

											return (
												<Popover
													open={open}
													onOpenChange={setOpen}
												>
													<PopoverTrigger asChild>
														<Button
															type="button"
															variant="outline"
															className={cn(
																"w-full justify-start text-left font-normal rounded-[14px] py-6 px-4 border border-[#D1DAEC]",
																!field.value &&
																	"text-muted-foreground"
															)}
														>
															<CalendarIcon className="mr-2 h-4 w-4" />
															{field.value
																? format(
																		new Date(
																			field.value
																		),
																		"PPP"
																  )
																: "Select date"}
														</Button>
													</PopoverTrigger>
													<PopoverContent
														className="w-auto p-0"
														align="start"
													>
														<Calendar
															mode="single"
															selected={
																field.value
																	? new Date(
																			field.value
																	  )
																	: undefined
															}
															onSelect={
																handleSelect
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											);
										}}
									/>
								</div>

								{/* Tools Used */}
								<div className="form-group flex flex-col gap-2">
									<Label>Tools Used</Label>
									<Input
										{...methods.register("tools_used")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="HubSpot, Google Analytics, etc."
									/>
								</div>

								{/* Decision Maker */}
								<div className="form-group flex flex-col gap-2">
									<Label>Decision Maker</Label>
									<Input
										{...methods.register("decision_maker")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="CMO, CTO, etc."
									/>
								</div>

								{/* Industry */}
								<div className="form-group flex flex-col gap-2">
									<Label>Industry</Label>
									<Input
										{...methods.register("industry")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="Marketing, Finance, etc."
									/>
								</div>

								{/* Revenue Range */}
								<div className="form-group flex flex-col gap-2">
									<Label>Revenue Range</Label>
									<Input
										{...methods.register("revenue_range")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="₦1m–₦2m"
									/>
								</div>

								{/* Team Size */}
								<div className="form-group flex flex-col gap-2">
									<Label>Team Size</Label>
									<Input
										{...methods.register("team_size", {
											valueAsNumber: true,
										})}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										type="number"
										min={1}
									/>
								</div>

								{/* Actions */}
								<div className="flex flex-col items-start gap-4">
									<div className="flex gap-2 items-center">
										<Button
											type="submit"
											disabled={isCreatingChallenge}
											className="w-fit rounded-[14px] py-2 px-4 bg-primary text-white hover:bg-[#F2BB05] hover:text-black"
										>
											{isCreatingChallenge ? (
												<>
													Thinking{" "}
													<Loader
														size={16}
														className="animate-spin ml-2"
													/>
												</>
											) : (
												"Continue"
											)}
										</Button>

										<Button
											type="button"
											onClick={() =>
												router.replace("/workspace")
											}
											className="bg-transparent text-primary w-fit rounded-[14px] py-2 px-4 hover:bg-white hover:text-primary"
										>
											Explore ScalePadi
										</Button>
									</div>

									{/* ✅ Banner appears here */}
									{/* <ScalePadiBanner /> */}
									{showBanner && (
										<Image
											src="/images/analysis-done.svg"
											alt="ScalePadi"
											width={400}
											height={400}
											className="object-contain"
										/>
									)}
								</div>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
