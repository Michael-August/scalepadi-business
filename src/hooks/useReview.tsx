import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface CreateReviewData {
  projectId: string;
  rating: number;
  description: string;
}

export interface ReviewBy {
  name: string;
  title: string;
  email: string;
  id: string;
}

export interface ReviewProject {
  brief: string;
  goal: string;
  id: string;
  status: string;
  title: string;
}

export interface ReviewData {
  id: string;
  by: ReviewBy;
  createdAt: string;
  description: string;
  projectId: ReviewProject;
  rating: number;
}

export interface Review {
  status: boolean;
  message: string;
  data: ReviewData;
}

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateReviewData) => {
      try {
        const response = await axiosClient.post("/review", data);
        if (response.data?.status === false) {
          throw new Error(response.data?.message || "Failed to create review");
        }
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        const backendMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred during review creation";

        throw new Error(backendMessage);
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["review", variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review submitted successfully!");
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to submit review"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while submitting review");
      }
    },
  });
};

export const useGetReview = (projectId: string) => {
  const query = useQuery({
    queryKey: ["review", projectId],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/review/${projectId}`);
        const result = response.data;
        if (result?.status === false && result?.message === "No review found.") {
          return null; 
        }

        if (result?.status === false) {
          toast.error(result?.message || "Failed to fetch review");
          return null;
        }

        return result;
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;

        if (error.response?.status === 404) {
          return null;
        }

        toast.error(error.response?.data?.message || "Unexpected error fetching review");
        return null;
      }
    },
    enabled: !!projectId,
  });

  return {
    review: query.data,
    isLoading: query.isLoading,
  };
};

