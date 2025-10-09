"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMakeEnquiry } from "@/hooks/usePlan";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type InquiryFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  note: string;
};

const Inquiry = () => {
  const router = useRouter();
  const { makeEnquiry, isPending } = useMakeEnquiry();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryFormValues>();

  const onSubmit = (data: InquiryFormValues) => {
    makeEnquiry(data, {
      onSuccess: () => {
        toast.success("Enquiry submitted successfully");
        router.push("/workspace");
      },
      // onError: () => {
      // 	toast.error("Error submitting enquiry");
      // },
    });
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-[9px] w-full px-4 lg:px-44 py-5 lg:py-20">
        <div
          onClick={() => router.back()}
          className="flex gap-1 items-center cursor-pointer w-fit"
        >
          <Image
            src={"/icons/arrow-left.svg"}
            alt="Arrow left"
            width={16}
            height={16}
          />
          <span className="text-sm text-[#3E4351]">Go back</span>
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-[616px] items-center mx-auto mt-5">
          <div className="flex flex-col gap-6">
            <span className="font-bold text-xl text-[#1A1A1A] lg:text-[32px]">
              Have Inquiries about our Product ?
            </span>
            <span className="text-base text-[#1A1A1A] font-light">
              You're just one step away from kicking off your growth journey.
              All payments are encrypted and protected.
            </span>
          </div>

          <div className="rounded-3xl bg-white border border-[#D1DAEC80] w-full lg:w-[560px] mx-auto p-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="form-group flex flex-col gap-2">
                  <Label>First name</Label>
                  <Input
                    className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
                    type="text"
                    placeholder="Enter first name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="form-group flex flex-col gap-2">
                  <Label>Last name</Label>
                  <Input
                    className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
                    type="text"
                    placeholder="Enter last name"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div className="form-group flex flex-col gap-2">
                  <Label>Email address</Label>
                  <Input
                    type="email"
                    className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
                    placeholder="Enter email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="form-group flex flex-col gap-2">
                  <Label>I am looking for information about:</Label>
                  <Textarea
                    className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
                    placeholder="Enter your note"
                    {...register("note", {
                      required: "This field is required",
                    })}
                  />
                  {errors.note && (
                    <span className="text-red-500 text-sm">
                      {errors.note.message}
                    </span>
                  )}
                  <span className="text-xs text-[#2585D7]">
                    Feel free to elaborate and add all the necessary info
                    including links
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary text-white py-6 rounded-[14px] w-fit hover:bg-primary-hover hover:text-black"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
