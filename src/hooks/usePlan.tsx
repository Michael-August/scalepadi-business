import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetPlans = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["Plans"],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/plans`);
        if (response.data?.status === false) {
          throw new Error(response.data?.message || "Failed to fetch plans");
        }
        return response.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Failed to fetch plans");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while fetching plans");
        }

        throw error;
      }
    },
  });

  return { plans: data, isLoading };
};

export const useMakeEnquiry = () => {
  const { mutate: makeEnquiry, isPending } = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      note: string;
    }) => {
      try {
        const res = await axiosClient.post("/inquiry", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during inquiry"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Failed to fetch tasks");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while fetching tasks");
        }

        throw error;
      }
    },
  });

  return { makeEnquiry, isPending };
};
