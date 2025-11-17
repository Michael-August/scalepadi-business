import { Dispatch, SetStateAction } from "react";
import { Sheet, SheetContent } from "./ui/sheet";
import { FormProvider, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useHireExpert } from "@/hooks/useProject";
import { toast } from "sonner";

type FormValues = {
	description: string;
	duration: string;
	budget: string;
};

const InviteExpert = ({
	open,
	setOpenSheet,
	expertName,
	expertId,
}: {
	open: boolean;
	setOpenSheet: Dispatch<SetStateAction<boolean>>;
	expertName: string;
	expertId: string;
}) => {
	const methods = useForm<FormValues>({
		mode: "onBlur",
		defaultValues: {
			description: "",
			duration: "",
			budget: "",
		},
	});

	const { hireExpert, isPending } = useHireExpert();

	const onSubmit = (data: FormValues) => {
		// Handle form submission
		console.log("Form Data:", data);
		console.log("Inviting expert with ID:", expertId);

		const payload = {
			expertId,
			...data,
		};

		hireExpert(payload, {
			onSuccess: () => {
				setOpenSheet(false);
				toast.success("Expert invited successfully");
				methods.reset();
			},
			onError: (error: any) => {
				toast.error(error.message || "Failed to invite expert");
			},
		});
	};

	return (
		<Sheet open={open} onOpenChange={setOpenSheet}>
			<SheetContent>
				<div className="p-4">
					<div className="top flex flex-col gap-4 mb-4 w-full">
						<span className="text-primary-text font-bold lg:text-base text-sm">
							Share some details about this project
						</span>
						<span className="text-secondary-text text-xs font-medium">{`This will help ${expertName} better understand your needs`}</span>
					</div>

					<div className="w-full">
						<FormProvider {...methods}>
							<form
								className="flex flex-col gap-6"
								onSubmit={methods.handleSubmit(onSubmit)}
							>
								<div className="form-group flex flex-col gap-2">
									<Label>
										Describe the problem{" "}
										<span className="text-red-600">*</span>
									</Label>
									<Textarea
										{...methods.register("description", {
											required:
												"Problem description is required",
										})}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
									/>
									{methods.formState.errors.description && (
										<p className="text-red-500 text-sm">
											{
												methods.formState.errors
													.description.message
											}
										</p>
									)}
									<span className="text-xs text-[#2585D7]">
										Feel free to elaborate and add all the
										necessary info including links
									</span>
								</div>

								<div className="form-group flex flex-col gap-2">
									<Label>Duration</Label>
									<Input
										{...methods.register("duration")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="1 month 3months etc"
										type="text"
									/>
								</div>
								<div className="form-group flex flex-col gap-2">
									<Label>Budget</Label>
									<Input
										{...methods.register("budget")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										placeholder="Enter project budget"
										type="number"
									/>
								</div>

								<Button
									type="submit"
									disabled={isPending || isPending}
									className="w-fit rounded-[14px] py-6 px-4 bg-primary text-white hover:bg-[#F2BB05] hover:text-black"
								>
									{isPending || isPending
										? "Submitting..."
										: "Submit & Invite"}
								</Button>
							</form>
						</FormProvider>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default InviteExpert;
