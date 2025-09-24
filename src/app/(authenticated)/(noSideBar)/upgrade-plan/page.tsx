"use client"

import { Button } from "@/components/ui/button"
import { useGetPlans } from "@/hooks/usePlan"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
)

const UpgradePlan = () => {

    const { plans, isLoading } = useGetPlans()
    const [user, setUser] = useState<any>()
    
    useEffect(() => { 
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])

    return (
        <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4">
                <div className="flex flex-col gap-12 w-full py-5 lg:py-20">
                    <h1 className="text-[32px] font-bold">Upgrade Your Plan</h1>
                    {plans?.data.length === 0 && (
                        <div className="flex flex-col gap-4">
                            <span className="text-[#506380] text-base">No plans available at the moment. Please check back later.</span>
                        </div>
                    )}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
                        {plans?.data?.map((plan: any) => (
                            <PlanCard key={plan.id} plan={plan} user={user} />
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

const PlanCard = ({ plan, user }: { plan: any, user: any }) => {

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
    const route = useRouter();

    const componentProps = {
        email: user?.email,
        amount: plan?.cost * 100,
        name: user?.name,
        metadata: {
            custom_fields: [
                {
                    display_name: "Type",
                    variable_name: "type",
                    value: "subscription",
                },
                {
                    display_name: "Business Id",
                    variable_name: "businessId",
                    value: `${user?.id}`,
                },
                {
                    display_name: "Plan Id",
                    variable_name: "planId",
                    value: `${plan?.id}`,
                },
                {
                    display_name: "Amount",
                    variable_name: "amount",
                    value: `${plan?.cost}`,
                },
            ],
        },
        publicKey,
        text: `Get ${plan?.name}`,
        onSuccess: () => {
            route.push('/workspace')
            toast.success(`Payment for ${plan?.name} plan was successful!`)
        }
    }

    return (
        <div className="flex flex-col gap-6 p-4 border border-[#E5E8EB80] rounded-[35px] ">
            <div className={`heading ${plan?.name.includes('Pro') && "bg-[#1A1A1A]"} ${!plan?.name.includes('Pro') && "bg-[#D9D9D9]"} -m-4 rounded-t-[35px] px-5 py-0`}>
                <h2 className={`text-[#1A1A1A] ${plan?.name.includes('Pro') && "text-[#FCCE37]"} py-3 text-base font-medium`}>{ plan?.name }</h2>
            </div>
            <div className="flex flex-col gap-5 py-4">
                <div className="flex flex-col gap-1">
                    <span className="text-5xl text-center font-medium text-[#1A1A1A]">₦{ plan?.cost.toLocaleString() }</span>
                    <span className="text-lg text-center font-normal text-[#878A93CC]">per month</span>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-base">{plan?.description}</span>
                    <div className="flex flex-col gap-3">
                        {plan?.benefits?.map((benefit: string, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                                <Image src="/images/check.svg" alt="check icon" width={20} height={20} />
                                <span className="text-sm text-[#506380] font-normal">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <PaystackButton {...componentProps}
                    className={`${plan?.name.includes('Pro') && "bg-[#1E88E5] text-white"} ${plan?.name.includes('Gold') && "bg-[#1A1A1A] text-white"} p-1 border border-[#DFDFDF] cursor-pointer rounded-[14px] hover:bg-[#E5E8EB80] hover:text-[#878A93]`}
                />
            </div>
        </div>
    )

}

export default UpgradePlan
