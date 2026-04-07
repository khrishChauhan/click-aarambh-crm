"use server";

export async function authenticate(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  console.log("Login attempt:", { email, password, envEmail: adminEmail, envPass: adminPassword });

  if (email === adminEmail && password === adminPassword) {
    return { success: true };
  }

  return { success: false, error: "Invalid email or password" };
}
