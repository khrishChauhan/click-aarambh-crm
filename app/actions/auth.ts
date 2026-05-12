"use server";

export async function authenticate(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (email === adminEmail && password === adminPassword) {
    return { success: true };
  }

  return { success: false, error: "Invalid email or password" };
}
