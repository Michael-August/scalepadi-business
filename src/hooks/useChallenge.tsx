import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetChallenges = (params?: any) => {
	const { data, isLoading } = useQuery({
		queryKey: ["Challenges", params],
		queryFn: async () => {
			try {
				const response = await axiosClient.get(
					`/challenges?${new URLSearchParams(params).toString()}`
				);
				if (response.data?.status === false) {
					throw new Error(
						response.data?.message || "Failed to fetch challenges"
					);
				}
				return response.data?.data;
			} catch (error: any) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data?.message ||
							"Failed to fetch challenges"
					);
				} else if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error(
						"An unexpected error occured while fetching challenges"
					);
				}

				throw error;
			}
		},
	});

	return { challenges: data, isLoading };
};

export const useGetChallengeById = (challengeId: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["Challenges", challengeId],
		queryFn: async () => {
			try {
				const response = await axiosClient.get(
					`/query/challenge?ai=${challengeId}`
				);
				if (response.data?.status === false) {
					throw new Error(
						response.data?.message || "Failed to fetch challenge"
					);
				}
				return response.data?.data;
			} catch (error: any) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data?.message ||
							"Failed to fetch challenge"
					);
				} else if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error(
						"An unexpected error occured while fetching challenge"
					);
				}

				throw error;
			}
		},
		enabled: !!challengeId,
	});

	return { challenge: data, isLoading };
};

export const useCreateChallenge = () => {
	const queryClient = useQueryClient();
	const { mutate: createChallenge, isPending } = useMutation({
		mutationFn: async (data: any) => {
			try {
				const res = await axiosClient.post("/challenge", data);
				if (res.data?.status === false) {
					throw new Error(
						res.data?.message ||
							"An error occurred while creating challenge"
					);
				}
				return res.data;
			} catch (error: any) {
				// If backend sent a message, preserve it
				const backendMessage =
					error?.response?.data?.message ||
					error?.message ||
					"An error occurred during challenge creation";

				throw new Error(backendMessage);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Challenges"] });
		},
	});

	return { createChallenge, isPending };
};

export const useCreateQueryForChallenge = (challengeId: string) => {
	const queryClient = useQueryClient();
	const { mutate: createQueryForChallenge, isPending } = useMutation({
		mutationFn: async (data: any) => {
			try {
				const res = await axiosClient.post(
					`/challenge/${challengeId}/write`,
					data
				);
				if (res.data?.status === false) {
					throw new Error(
						res.data?.message ||
							"An error occurred while creating challenge"
					);
				}
				return res.data;
			} catch (error: any) {
				// If backend sent a message, preserve it
				const backendMessage =
					error?.response?.data?.message ||
					error?.message ||
					"An error occurred during challenge query";

				throw new Error(backendMessage);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["Challenges", challengeId],
			});
		},
	});

	return { createQueryForChallenge, isPending };
};
