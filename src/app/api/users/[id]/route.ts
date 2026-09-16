import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { searchParams } = new URL(request.url);
  const fields = searchParams.get("fields");

  return NextResponse.json(
    {
      message: "Success",
      targetId: id,
      fields,
    },
    {
      status: 200,
      headers: { "X-Custom-Header": "random" },
    },
  );
}
