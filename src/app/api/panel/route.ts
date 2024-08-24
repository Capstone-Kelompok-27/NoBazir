import { type NextRequest, NextResponse } from "next/server";
import { renderTrpcPanel } from "@metamorph/trpc-panel";
import { appRouter } from "../../../server/api/root";

export function GET(_: NextRequest) {
  const panelHtml = renderTrpcPanel(appRouter, {
    url: "http://localhost:3000/api/trpc",
    transformer: "superjson",
  });

  return new NextResponse(panelHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
