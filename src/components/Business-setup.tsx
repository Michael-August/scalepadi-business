"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetBusinessDetails } from "@/hooks/useAuth";
import { useCreateProject } from "@/hooks/useProject";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { useCreateChallenge } from "@/hooks/useChallenge";
import { error } from "console";

// ---- Define types for the form ----
type FormValues = {
	title: string;
	challengeType?: string; // optional
	brief: string;
	goal?: string;
	dueDate?: string | Date;
};

const BusinessSetUp = () => {
	const [files, setFiles] = useState<File[]>([]);
	const methods = useForm<FormValues>({
		mode: "onBlur",
		defaultValues: {
			challengeType: undefined,
			title: "",
			brief: "",
			goal: "",
			dueDate: undefined,
		},
	});

	const router = useRouter();
	const searchParams = useSearchParams();
	const comingFromExpert = searchParams.get("route");
	const expertName = searchParams.get("expertName");
	const mode = searchParams.get("type");
	const challengeId = searchParams.get("challengeId");

	// const { setBusinessDetails, isPending } = useSetBusinessDetails();
	const { createproject, isPending: isCreatingProject } = useCreateProject();
	const { createChallenge, isPending: isCreatingChallenge } =
		useCreateChallenge();

	const onSubmit = async (data: FormValues) => {
		const formData = new FormData();
		formData.append("title", data.title);
		if (mode === "create") {
			formData.append("brief", data.brief);
		} else {
			formData.append("description", data.brief);
		}
		if (data.goal) formData.append("goal", data.goal);
		if (data.dueDate) formData.append("dueDate", data.dueDate.toString());
		if (challengeId) formData.append("challengeId", challengeId);
		formData.append("requestSupervisor", "false");

		// Append multiple files
		files.forEach((file) => {
			formData.append("files", file);
		});

		if (mode === "create") {
			createproject(formData, {
				onSuccess: () => {
					toast.success("Project created");
					router.push("/workspace");
				},
				onError: (error) => {
					toast.error(`${error.message}`);
				},
			});
		} else {
			createChallenge(formData, {
				onSuccess: (res) => {
					localStorage.setItem(
						"challenge",
						JSON.stringify(res?.data)
					);
					toast.success("Challenge analysis completed");
					router.push("/analysis-result");
				},
			});
		}
	};

	return (
		<div className="flex w-full flex-col gap-10">
			<div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4 bg-[url('/images/blur-bg.svg')]">
				<div className="flex flex-col items-center justify-center gap-6 w-full lg:w-[560px] py-5 lg:py-20">
					<div className="top flex flex-col gap-4 items-center justify-center w-full">
						<span className="text-primary-text font-bold lg:text-[32px] text-center text-xl">
							{comingFromExpert
								? "Share some details about this project"
								: "Whats Your Business Challenge."}
						</span>
						<span className="text-secondary-text text-sm lg:text-base font-medium text-center">
							{comingFromExpert
								? `This will help ${expertName} better understand your needs`
								: "Tell us your biggest business challenge we'll analyze it and build a solution."}
						</span>
					</div>

					<div className="rounded-3xl bg-white p-4 lg:p-10 border border-[#D1DAEC80] w-full">
						<FormProvider {...methods}>
							<form
								className="flex flex-col gap-6"
								onSubmit={methods.handleSubmit(onSubmit)}
							>
								{/* Title */}
								<div className="form-group flex flex-col gap-2">
									<Label>Title</Label>
									<Input
										{...methods.register("title")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="Enter project title"
										type="text"
									/>
								</div>

								{/* Challenge type */}
								{/* <div className="form-group flex flex-col gap-2">
                  <Label>Challenge type</Label>
                  <Controller
                    name="challengeType"
                    control={methods.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                          <SelectValue placeholder="Select Business Challenge type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div> */}

								{/* Problem description */}
								<div className="form-group flex flex-col gap-2">
									<Label>
										Describe the problem{" "}
										<span className="text-red-600">*</span>
									</Label>
									<Textarea
										{...methods.register("brief", {
											required:
												"Problem description is required",
										})}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
									/>
									{methods.formState.errors.brief && (
										<p className="text-red-500 text-sm">
											{
												methods.formState.errors.brief
													.message
											}
										</p>
									)}
									<span className="text-xs text-[#2585D7]">
										Feel free to elaborate and add all the
										necessary info including links
									</span>
								</div>

								{/* Growth goal */}
								<div className="form-group flex flex-col gap-2">
									<Label>
										Growth goal
										<span className="text-[#878A93]">
											(optional)
										</span>
									</Label>
									<Input
										{...methods.register("goal")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										type="text"
									/>
								</div>

								{/* Due Date */}
								<div className="form-group flex flex-col gap-2">
									<Label>
										Due Date
										<span className="text-[#878A93]">
											(optional)
										</span>
									</Label>
									<Controller
										name="dueDate"
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
															: "Select due date"}
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

								{/* File upload */}
								<div className="flex flex-col gap-2">
									<Label className="text-[#0E1426] text-sm font-normal">
										File upload
										<span className="text-[#878A93]">
											(optional)
										</span>
									</Label>

									<label
										htmlFor="task-upload"
										className="w-fit bg-white border rounded-[10px] cursor-pointer border-[#D1DAEC80] p-2 flex items-center gap-2"
									>
										<Plus className="w-4 h-4" />
										<span className="text-[#1A1A1A] text-xs font-normal">
											Add additional files
										</span>
									</label>

									<Input
										id="task-upload"
										type="file"
										className="hidden"
										multiple
										accept=".jpg, .jpeg, .png, .pdf, .docx, .xlsx"
										onChange={(e) =>
											setFiles(
												e.target.files
													? Array.from(e.target.files)
													: []
											)
										}
									/>

									{/* Show uploaded files */}
									{files.length > 0 && (
										<div className="flex flex-col gap-2">
											{files.map((file, index) => (
												<div
													key={index}
													className="flex items-center justify-between border border-[#ABC6FB] bg-white rounded-[8.4px] p-[7.3px]"
												>
													<div className="flex items-center gap-2">
														<Image
															src={
																"/icons/file-icon.svg"
															}
															alt="File icon"
															width={20}
															height={20}
														/>
														<span className="text-[#878A93] text-xs">
															{file.name}
														</span>
													</div>
													<X
														className="text-[#878A93] cursor-pointer"
														size={14}
														onClick={() =>
															setFiles((prev) =>
																prev.filter(
																	(_, i) =>
																		i !==
																		index
																)
															)
														}
													/>
												</div>
											))}
										</div>
									)}
								</div>

								{/* Actions */}
								<div className="flex gap-2 items-center">
									<Button
										type="submit"
										disabled={
											isCreatingChallenge ||
											isCreatingProject
										}
										className="w-fit rounded-[14px] py-6 px-4 bg-primary text-white hover:bg-[#F2BB05] hover:text-black"
									>
										{isCreatingChallenge ||
										isCreatingProject
											? "Submitting..."
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
								{/* <Image
                  src={"/images/analysis-done.svg"}
                  alt="Analysis progress"
                  width={314}
                  height={36}
                /> */}
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessSetUp;
