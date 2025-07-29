import { NextRequest, NextResponse } from "next/server";

function parseCookies(cookieString: string): { [key: string]: string } {
  const cookies: { [key: string]: string } = {};
  cookieString.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length > 1) {
      cookies[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });
  return cookies;
}

export async function GET(req: NextRequest) {
  const cookies = parseCookies(req.headers.get("cookie") || "");
  const isAuthenticated = cookies.auth === "true";
  return NextResponse.json({ isAuthenticated });
}
