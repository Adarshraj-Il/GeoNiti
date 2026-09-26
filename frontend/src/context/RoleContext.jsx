import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const { user } = useAuth();
  
  const roleLabel = user?.roles?.[0] || "Guest";
  const roleId = roleLabel.toLowerCase().replace(/\s+/g, '_');
  
  const role = {
    id: roleId,
    label: roleLabel,
  };

  const hasPermission = (perm) => {
    return user?.permissions?.includes(perm) || false;
  };

  const setRoleId = () => { console.warn("Cannot set role directly when using backend RBAC"); };
  const roles = [role];

  return (
    <RoleContext.Provider value={{ role, roleId, setRoleId, roles, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
