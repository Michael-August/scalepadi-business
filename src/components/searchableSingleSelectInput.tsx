import { useController } from "react-hook-form";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandItem,
	CommandList,
	CommandEmpty,
	CommandInput,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SingleSelectProps {
	name: string;
	label: string;
	options: string[];
	placeholder?: string;
	rules?: any;
}

const SingleSelectField = ({
	name,
	label,
	options,
	placeholder,
	rules,
}: SingleSelectProps) => {
	const { field, fieldState } = useController({ name, rules });
	const [open, setOpen] = useState(false);

	return (
		<div className="form-group flex flex-col gap-2">
			<label>{label}</label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] w-full justify-between"
					>
						{field.value || placeholder || "Select option"}
						<ChevronsUpDown size={16} className="opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent
					className="p-0 w-[var(--radix-popover-trigger-width)]"
					align="start"
				>
					<Command>
						<CommandInput placeholder={`Search ${label}...`} />

						<CommandEmpty>No results found.</CommandEmpty>

						<CommandList className="max-h-64 overflow-y-auto">
							{options.map((option, idx) => (
								<CommandItem
									key={idx}
									onSelect={() => {
										field.onChange(option);
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Check
										size={14}
										className={cn(
											field.value === option
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{option}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{fieldState.error && (
				<p className="text-red-500 text-sm">
					{fieldState.error.message}
				</p>
			)}
		</div>
	);
};

export default SingleSelectField;
