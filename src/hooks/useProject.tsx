import { axiosClient } from "@/lib/api/axiosclient"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useGetProjects = (params?: any) => {
    const { data, isLoading } = useQuery({
        queryKey: ["projects", params],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/projects?${new URLSearchParams(params).toString()}`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch projects");
                }
                return response.data?.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch projects")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching projects")
                }

                throw error;
            }
        }
    })

    return { projects: data, isLoading }
}   

export const useGetProject = (projectId: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["projects", projectId],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/project/${projectId}`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch project");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch project")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching project")
                }

                throw error;
            }
        },
        enabled: !!projectId
    })

    return { project: data, isLoading }
}   

export const useCreateProject = () => {
    const queryClient = useQueryClient()
    const { mutate: createproject, isPending } = useMutation({
        mutationFn: async (data: any) => {
            try {
                const res = await axiosClient.post("/project", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred while setting project");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during project creation";

                throw new Error(backendMessage);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]})
        }
    })

    return { createproject, isPending };
}

export const useGetTasksForProject = (projectId: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/tasks/${projectId}`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch tasks");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch tasks")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching tasks")
                }

                throw error;
            }
        },
        enabled: !!projectId
    })

    return { tasks: data, isLoading }
}

export const useHireExpert = () => {
    const queryClient = useQueryClient()
    const { mutate: hireExpert, isPending } = useMutation({
        mutationFn: async (data: any) => {
            try {
                const res = await axiosClient.post("/hire", data);
                if (res.data?.status === false) {
                    throw new Error(res.data?.message || "An error occurred while Hiring expert");
                }
                return res.data;
            } catch (error: any) {
                // If backend sent a message, preserve it
                const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred during project creation";

                throw new Error(backendMessage);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["experts"]})
        }
    })

    return { hireExpert, isPending };
}

export const useGetHires = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["Hires"],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/hires/business`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch hires");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch hires")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching hires")
                }

                throw error;
            }
        },
    })

    return { hires: data, isLoading }
}
