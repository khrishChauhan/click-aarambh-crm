"use server";

import { connectDB } from "@/lib/db";

export async function authenticate(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  console.log("==== LOGIN DEBUG LOG START ====");
  console.log(`Incoming Email: '${email}'`);
  console.log(`Incoming Password: '${password}'`);
  console.log(`Env ADMIN_EMAIL: '${adminEmail}'`);
  console.log(`Env ADMIN_PASSWORD: '${adminPassword}'`);

  try {
    await connectDB();
    console.log("MongoDB Connection: SUCCESS");
  } catch (error) {
    console.error("MongoDB Connection: FAILED", error);
  }
  console.log("==== LOGIN DEBUG LOG END ====");

  if (email === adminEmail && password === adminPassword) {
    return { success: true };
  }

  return { success: false, error: "Invalid email or password" };
}
