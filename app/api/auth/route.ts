import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Dummy hardcoded credentials
  if (username === "admin" && password === "admin") {
    const response = NextResponse.json({ message: "Login successful" });
    // Set a simple cookie for authentication
    response.cookies.set("auth", "true", { path: "/", httpOnly: true });
    return response;
  } else {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}
