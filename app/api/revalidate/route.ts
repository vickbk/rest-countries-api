import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  // Instantly flushes every combined search variation and pagination block linked to this tag
  revalidateTag("countries", "max");

  return NextResponse.json({
    revalidated: true,
    message: "Successfully invalidated all country datasets.",
  });
}
