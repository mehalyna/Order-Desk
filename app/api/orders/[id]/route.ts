import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/infrastructure/database/connection";
import { createServices } from "@/app/lib/di/services";
import { OrderStatus } from "@/app/lib/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, discount, managerNote } = body;

    const db = await connectToDatabase();
    const { orderService } = createServices(db);

    const result = await orderService.updateOrder(id, {
      status: status as OrderStatus,
      discount: Number(discount),
      managerNote
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
