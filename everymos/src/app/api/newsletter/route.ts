import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get("email")?.toString() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // TODO: wire to ConvertKit or Beehiiv via fetch using CONVERTKIT_API_KEY
  // For now, log so the form does something observable.
  console.log("[newsletter] subscribe:", email, new Date().toISOString());

  return NextResponse.redirect(new URL("/newsletter/thanks", request.url), 303);
}
