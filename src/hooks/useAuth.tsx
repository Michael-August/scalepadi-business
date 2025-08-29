import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useSignUp = () => {
    const { mutate: signUp, isPending } = useMutation({
        mutationFn: async (data) => {
            try {
                const res = await axiosClient.post("/sign-up-business", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred during sign up");
                }
                return res.data;
            } catch (error: any) {
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        }
    })

    return { signUp, isPending };
}

export const useLogin = () => {
    const { mutate: login, isPending } = useMutation({
        mutationFn: async (data: { email: string, password: string }) => {
            try {
                const res = await axiosClient.post("/login/business", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred during login");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        }
    })

    return { login, isPending };
}

export const useVerifyEmail = () => {
    const { mutate: verifyEmail, isPending } = useMutation({
        mutationFn: async (data: { code: string }) => {
            try {
                const res = await axiosClient.put("/verify-business", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred during email verification");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        }
    })

    return { verifyEmail, isPending };
}

export const useResendVerificationCode = () => {
    const { mutate: resendVerificationCode, isPending } = useMutation({
        mutationFn: async (data: { email: string}) => {
            try {
                const res = await axiosClient.put("/verify-business", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred during email verification");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        }
    })

    return { resendVerificationCode, isPending };
}

export const useSetBusinessDetails = () => {
    const { mutate: setBusinessDetails, isPending } = useMutation({
        mutationFn: async (data: any) => {
            try {
                const res = await axiosClient.post("/profile/business", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred while setting business details");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        }
    })

    return { setBusinessDetails, isPending };
}

export const useForgotPassword = () => {
    const { mutate: forgotPassword, isPending } = useMutation({
        mutationFn: async (data: { email: string }) => {
            try {
                const res = await axiosClient.post("/forgot-password-business", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred during password reset request");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        }
    })

    return { forgotPassword, isPending };
}

export const useResetPassword = () => {
    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: async (data: { code: string, newPassword: string, confirmPassword: string }) => {
            try {
                const res = await axiosClient.put("/reset-password-business", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred during password reset");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        },
    })

    return { resetPassword, isPending };
}

export const useLogout = () => {
    const { mutate: logout, isPending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axiosClient.post("/logout/business");
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred during logout");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during login";

                throw new Error(backendMessage);
            }
        }
    })

    return { logout, isPending };
}

export const useGetBusinessByToken = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/token/business`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch business");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch business")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching business")
                }

                throw error;
            }
        }
    })

    return { business: data, isLoading }
}
