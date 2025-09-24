import { axiosClient } from "@/lib/api/axiosclient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetPlans = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["Plans"],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/plans`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch plans");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch plans")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching plans")
                }

                throw error;
            }
        },
    })

    return { plans: data, isLoading }
}