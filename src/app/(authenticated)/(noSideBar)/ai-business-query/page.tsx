"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useCreateChallenge } from "@/hooks/useChallenge";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// ---- Define types for the form ----
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
					toast.success("Challenge analysis completed");
				},
				onError: (error) => {
					console.log(error.message);
					if (error.message === "No subscription found.") {
						toast.info("You need to subsrcibe to query AI");
						router.push("/upgrade-plan");
					}
				},
			}
		);
	};

	return (
		<div className="flex w-full flex-col gap-10">
			<div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4 bg-[url('/images/blur-bg.svg')]">
				<div className="flex flex-col items-center justify-center gap-6 w-full lg:w-[560px] py-5 lg:py-20">
					<div className="top flex flex-col gap-4 items-center justify-center w-full">
						<span className="text-primary-text font-bold lg:text-[32px] text-center text-xl">
							What's Your Business Challenge
						</span>
						<span className="text-secondary-text text-sm lg:text-base font-medium text-center">
							Tell us your biggest business challenge we'll
							analyze it and build a solution.
						</span>
					</div>

					<div className="rounded-3xl bg-white p-4 lg:p-10 border border-[#D1DAEC80] w-full">
						<FormProvider {...methods}>
							<form
								className="flex flex-col gap-6"
								onSubmit={methods.handleSubmit(onSubmit)}
							>
								{/* Type */}
								<div className="form-group flex flex-col gap-2">
									<Label>Type</Label>
									<Input
										{...methods.register("type", {
											required: true,
										})}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="Visibility, Growth, etc."
									/>
								</div>

								{/* Problem description */}
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
										type="text"
									/>
								</div>

								{/* Start timeline */}
								<div className="form-group flex flex-col gap-2">
									<Label>Start Timeline</Label>
									<Controller
										name="start_timeline"
										control={methods.control}
										render={({ field }) => (
											<Popover>
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
															field.onChange
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										)}
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
									/>
								</div>

								{/* Actions */}
								<div className="flex gap-2 items-center">
									<Button
										type="submit"
										disabled={isCreatingChallenge}
										className="w-fit rounded-[14px] py-6 px-4 bg-primary text-white hover:bg-[#F2BB05] hover:text-black"
									>
										{isCreatingChallenge
											? "Analysing..."
											: "Continue"}
									</Button>
									<Button
										type="button"
										onClick={() =>
											router.replace("/workspace")
										}
										className="bg-transparent text-primary w-fit rounded-[14px] py-6 px-4 hover:bg-white hover:text-primary"
									>
										Explore ScalePadi
									</Button>
								</div>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AiBusinessQuery;
