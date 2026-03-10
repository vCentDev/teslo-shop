import { useAuthState } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

// Caso de introducir una dirección URL que se necesite estar Autenticado
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthState()
  if (authStatus === 'cheking') return null

  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />

  return children
}

// Caso de introducir una dirección URL sin Autenticación (Es dicir Pública)
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthState()
  if (authStatus === 'cheking') return null

  if (authStatus === 'authenticated') return <Navigate to="/" />

  return children
}

// Caso de introducir una dirección URL que se necesite privilegios de Administrador
export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthState()

  if (authStatus === 'cheking') return null

  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />

  if (!isAdmin()) return <Navigate to="/" />

  return children
}