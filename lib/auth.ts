"use client";

/**
 * Client-side authentication utilities
 */

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("crm_logged_in") === "true";
};

export const login = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem("crm_logged_in", "true");
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("crm_logged_in");
};
