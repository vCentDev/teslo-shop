import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from 'sonner';

import { appRouter } from "./app.router"
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthState } from "./auth/store/auth.store";

const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    const { checkAuthStatus } = useAuthState()

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 60 * 1.5
    })

    if (isLoading) return <CustomFullScreenLoading />

    return children
}

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />

            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
                <ReactQueryDevtools initialIsOpen={false} />
            </CheckAuthProvider>
        </QueryClientProvider>
    )
}
