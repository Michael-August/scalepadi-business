"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResendVerificationCode, useVerifyEmail } from "@/hooks/useAuth";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const OTP = () => {
	const length = 6;
	const [otp, setOtp] = useState(Array(length).fill(""));
	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	const [email, setEmail] = useState("");
	const [secondesLeft, setSecondsLeft] = useState(60);
	const [resendAvailable, setResendAvailable] = useState(false);
	const router = useRouter();

	const { verifyEmail, isPending } = useVerifyEmail();
	const { resendVerificationCode, isPending: isResending } =
		useResendVerificationCode();

	const handleChange = (value: string, index: number) => {
		const digits = value.split("");
		const updatedOtp = [...otp];

		for (let i = 0; i < digits.length && index + i < length; i++) {
			updatedOtp[index + i] = digits[i];
		}

		setOtp(updatedOtp);

		// Move focus to next
		const nextIndex = index + digits.length;
		if (nextIndex < length) {
			inputsRef.current[nextIndex]?.focus();
		}
	};

	const handleResend = () => {
		setSecondsLeft(60);
		setResendAvailable(false);
		setOtp(Array(length).fill(""));
		inputsRef.current[0]?.focus();

		resendVerificationCode(
			{ email },
			{
				onSuccess: () => {
					toast.success("Code resent, check your email again");
				},
				onError: (error: any) => {
					toast.error(
						`Failed to resend code ${
							error?.response?.data?.message || error?.message
						}`
					);
				},
			}
		);
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Backspace") {
			const updatedOtp = [...otp];

			if (otp[index]) {
				// If current has value, clear it
				updatedOtp[index] = "";
				setOtp(updatedOtp);
			} else if (index > 0) {
				// Go to previous and clear it
				updatedOtp[index - 1] = "";
				setOtp(updatedOtp);
				inputsRef.current[index - 1]?.focus();
			}
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (otp.some((digit) => digit === "")) {
			toast.error("Please fill all OTP fields");
			return;
		}

		const otpData = {
			code: otp.join(""),
		};
		verifyEmail(otpData, {
			onSuccess: (res) => {
				toast.success("Email verified successfully");
				localStorage.setItem("token", res.data.token);
				router.push("/ai-business-query");
				localStorage.removeItem("newUserEmail");
			},
			onError: (error) => {
				console.error("Error verifying OTP:", error);
				toast.error(
					error.message || "An error occurred during OTP verification"
				);
			},
		});
	};

	useEffect(() => {
		setEmail(localStorage.getItem("newUserEmail") || "");
	}, []);

	useEffect(() => {
		if (secondesLeft > 0) {
			const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
			return () => clearTimeout(timer);
		} else {
			setResendAvailable(true);
		}
	}, [secondesLeft]);

	return (
		<div>
			<div className="flex justify-center py-10 lg:py-28">
				<div className="flex flex-col gap-6">
					<div className="top flex flex-col gap-4 items-center justify-center">
						<span className="text-primary-text font-bold lg:text-[32px] text-2xl">
							Code Your Email
						</span>
						<span className="text-secondary-text text-base font-normal text-center">
							Enter the code sent to your email:{" "}
							<span className="text-primary">{email}</span> to
							continue.
						</span>
					</div>

					<div className="rounded-3xl bg-white p-10 border border-[#EFF2F3] w-full flex flex-col gap-6">
						<div className="flex flex-col gap-4">
							<div className="flex justify-center gap-4">
								{otp.map((digit, index) => (
									<Input
										key={index}
										ref={(el) => {
											inputsRef.current[index] = el;
										}}
										maxLength={length}
										placeholder="*"
										inputMode="text"
										className={clsx(
											"text-center w-16 h-12 rounded-xl text-xl font-medium border border-[#D1DAEC80]"
										)}
										value={digit}
										onChange={(e) =>
											handleChange(e.target.value, index)
										}
										onKeyDown={(e) =>
											handleKeyDown(e, index)
										}
									/>
								))}
							</div>
							<div className="font-normal text-sm w-fit cursor-pointer">
								{resendAvailable ? (
									<span
										className="text-primary"
										onClick={handleResend}
									>
										Resend code
									</span>
								) : (
									<span className="text-[#CDD0D5]">
										Resend code{" "}
										<span className="text-[#868C98]">
											{secondesLeft}s
										</span>
									</span>
								)}
							</div>
						</div>
						<Button
							disabled={isPending}
							onClick={handleSubmit}
							className="bg-primary text-white w-fit rounded-[14px] px-4 py-6"
						>
							{isPending ? "verifying code..." : "Verify code"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OTP;
