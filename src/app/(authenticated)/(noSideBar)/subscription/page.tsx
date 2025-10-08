"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Subscription = () => {
  const [showOptions, setShowOptions] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  const [withSupervisor, setWithSupervisor] = useState(false);

  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4">
        <div className="flex flex-col gap-12 w-full lg:w-[800px] py-5 lg:py-20">
          <div className="flex gap-1 items-center cursor-pointer w-fit">
            <X />
            <span className="text-sm text-[#3E4351]">Close</span>
          </div>

          <div className="flex flex-col gap-5">
            <span className="font-bold text-xl text-[#0E1426] lg:text-[32px]">
              Ready to Activate{" "}
            </span>
            <span className="font-bold text-xl text-primary lg:text-[32px]">
              Your Growth Engine?
            </span>
            <span className="text-base text-[#1A1A1A] font-light">
              You've explored your custom strategy and the expert team we've
              matched to your goals. Now it's time to unlock full access and
              begin execution.
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col gap-4 lg:w-[337px]">
                <div className="p-4 rounded-3xl bg-[#FBFCFC] flex flex-col gap-4">
                  <span className="font-medium text-base text-[#1A1A1A]">
                    Growth Engineer Plan
                  </span>
                  <div className="flex flex-col gap-2 bg-white border border-[#D1DAEC80] rounded-[14px] p-4">
                    <span className="text-2xl lg:text-4xl font-medium text-[#1A1A1A]">
                      ₦600,000
                    </span>
                    <span className="text-[#878A93] text-base font-light border-b pb-4 border-[#D8DFE299]">
                      Per Month
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-medium text-[#1A1A1A]">
                        ₦150,000
                      </span>
                      <span className="text-primary font-light text-base">
                        onetime fee
                      </span>
                    </div>
                    <span className="text-[#878A93] text-base font-light">
                      Per Experts hired
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-base font-[#1A1A1A]">
                      ✔️ Custom Execution Timeline
                    </span>
                    <span className="font-medium text-base font-[#1A1A1A]">
                      ✔️ Weekly Progress Tracking
                    </span>
                    <span className="font-medium text-base font-[#1A1A1A]">
                      ✔️ Performance Reporting
                    </span>
                    <span className="font-medium text-base font-[#1A1A1A]">
                      ✔️ Strategy Optimization Support
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => router.push("/complete-payment")}
                    className="bg-primary text-white py-6 rounded-[14px] w-full"
                  >
                    Confirm
                  </Button>
                  <Button
                    variant={"outline"}
                    className="py-6 border-[#D7ECFF] text-primary rounded-[14px] w-full"
                  >
                    Explore Dashboard
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-6 p-6 border border-[#F2F2F2] rounded-[20px] h-fit flex-1">
                <span className="w-fit text-[#878A93] font-normal text-base">
                  Summary
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-base text-[#3E4351] font-normal">
                    Growth Engineer Plan
                  </span>
                  <span className="text-base text-[#1A1A1A] font-medium">
                    ₦600,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-[#3E4351] font-normal">
                    Expert (3)
                  </span>
                  <span className="text-base text-[#1A1A1A] font-medium">
                    ₦450,000
                  </span>
                </div>
                {withSupervisor && (
                  <div className="flex items-center justify-between bg-[#F9FAFB] p-2 rounded-[10px]">
                    <span className="text-base text-[#3E4351] font-normal">
                      Supervisor
                    </span>
                    <span className="text-base text-[#1A1A1A] font-medium">
                      ₦50,000
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-[10px] border-t border-[#D1DAEC]">
                  <span className="text-base text-[#3E4351] font-semibold">
                    Total
                  </span>
                  <span className="text-base text-[#121217] font-bold">
                    ₦1,100,000{" "}
                  </span>
                </div>
                <div className="p-4 border border-[#EAEEF2] rounded-2xl gap-3">
                  <span className="text-base text-[#24292F]">
                    Add discount code
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full border border-[#D1DAEC] rounded-[14px] py-3 px-4 text-base text-[#1A1A1A]"
                    />
                    <Button className="bg-primary text-white py-3 px-6 rounded-[14px]">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-base text-[#878A93]">
              Need something more tailored ?{" "}
              <Link
                href={"/inquiry"}
                className="font-medium text-primary cursor-pointer"
              >
                Book a call with us
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Dialog open={showOptions} onOpenChange={setShowOptions}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="flex items-center gap-6 justify-center px-5 rounded-3xl"
        >
          <div className="flex items-center justify-center flex-col gap-6 w-full lg:w-[800px]">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-sm font-semibold text-[#1A1A1A]">
                👋 Hello there,{" "}
              </span>
              <span className="text-sm font-semibold text-[#1A1A1A]">
                Need help overseeing expert execution?
              </span>
            </div>
            <span className="text-sm text-[#1A1A1A] font-normal">
              For a small additional fee, we'll assign a ScalePadi supervisor to
              ensure quality delivery, monitor milestones, and advocate for your
              business success.
            </span>

            <div className="flex items-center justify-center gap-2">
              <Button
                className="bg-primary w-fit text-white py-3 px-6 rounded-[14px]"
                onClick={() => {
                  setWithSupervisor(true);
                  setShowOptions(false);
                }}
              >
                Yes, Add a Supervisor
              </Button>
              <Button
                variant={"outline"}
                className="py-3 px-6 rounded-[14px] text-primary border-[#D7ECFF]"
                onClick={() => {
                  setShowOptions(false);
                  setWithSupervisor(false);
                }}
              >
                No, Continue without Supervisor
              </Button>
            </div>
            <span
              className="text-xs text-[#878A93] cursor-pointer"
              onClick={() => {
                setShowOptions(false);
                setShowExplanation(true);
              }}
            >
              What does a Supervisor do?
            </span>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="flex items-center gap-6 justify-center px-5 rounded-3xl"
        >
          <div className="flex items-center justify-center flex-col gap-6 w-full lg:w-[800px]">
            <span className="text-sm text-[#1A1A1A] font-normal">
              The SUPERVISOR Ensure expert accountability and full delivery
              integrity.
            </span>
            <ul className="list-disc pl-5 text-sm text-[#1A1A1A] font-normal">
              <li>Ensure expert tasks align with your goals</li>
              <li>Monitor progress and provide feedback</li>
              <li>Facilitate communication between you and experts</li>
              <li>Advocate for your business success</li>
            </ul>

            <Button
              className="bg-primary w-fit text-white py-3 px-6 rounded-[14px]"
              onClick={() => {
                setShowOptions(true);
                setShowExplanation(false);
              }}
            >
              Understood
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscription;
