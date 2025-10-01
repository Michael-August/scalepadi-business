import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetNotifications = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["Notifications"],
		queryFn: async () => {
			try {
				const response = await axiosClient.get(
					`/notifications-business`
				);
				if (response.data?.status === false) {
					throw new Error(
						response.data?.message ||
							"Failed to fetch notifications"
					);
				}
				return response.data?.data;
			} catch (error: any) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data?.message ||
							"Failed to fetch notifications"
					);
				} else if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error(
						"An unexpected error occured while fetching notifications"
					);
				}

				throw error;
			}
		},
	});

	return { notifications: data, isLoading };
};

export const useMarkAsRead = () => {
	const queryClient = useQueryClient();
	const { mutate: markAsRead, isPending } = useMutation({
		mutationFn: async (data: { notifId: string }) => {
			try {
				const res = await axiosClient.put(
					`/notification-business/${data.notifId}`
				);
				if (res.data?.status === false) {
					throw new Error(
						res.data?.message ||
							"An error occurred while marking as read"
					);
				}
				return res.data;
			} catch (error: any) {
				// If backend sent a message, preserve it
				const backendMessage =
					error?.response?.data?.message ||
					error?.message ||
					"An error occurred during marking as read";

				throw new Error(backendMessage);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Notifications"] });
		},
	});

	return { markAsRead, isPending };
};
