/* eslint-disable react-hooks/rules-of-hooks */
import { useUserApi } from "@/api/useUserApi";
import {
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    useQuery,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys";

const useQueryUsers = () => {
    const getUsers = () => {
        const { getAll } = useUserApi();
        return useQuery({
            queryKey: [QUERY_KEYS.GET_USERS],
            queryFn: async () => await getAll(),
        });
    };
    const deleteUsers = () => {
        const queryClient = useQueryClient();
        const { deleteUser } = useUserApi();
        return useMutation({
            mutationFn: async (id: string) => {
                await deleteUser(id);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_USERS],
                });
            },
        });
    };
    return { getUsers, deleteUsers };
};

export { useQueryUsers };

export const useGetUsers = () => {
    const { getAll } = useUserApi();
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: async () => await getAll(),
    });
};

export const useDeleteUsers = () => {
    const queryClient = useQueryClient();
    const { deleteUser } = useUserApi();
    return useMutation({
        mutationFn: async (id: string) => {
            await deleteUser(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USERS] });
        },
    });
};
