import { axiosClient } from "@/lib/api/axiosclient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetExperts = (params?: any) => {
    const { data, isLoading } = useQuery({
        queryKey: ["experts", params],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/experts/business?${new URLSearchParams(params).toString()}`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch experts");
                }
                return response.data?.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch experts")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching experts")
                }

                throw error;
            }
        }
    })

    return { experts: data, isLoading }
}  

export const useGetExpert = (expertId: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["experts", expertId],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/expert/${expertId}/business`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch expert");
                }
                return response.data?.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch expert")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching expert")
                }

                throw error;
            }
        }
    })

    return { expert: data, isLoading }
} 
