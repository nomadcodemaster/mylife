import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectDB from "@/libs/database";
import TimelineEntry from "@/models/TimelineEntry";

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    await connectDB();

    const entry = await TimelineEntry.findOneAndUpdate(
      { _id: params.id, userId: session.user.id },
      json,
      { new: true }
    );

    return Response.json({ entry });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await TimelineEntry.deleteOne({ _id: params.id, userId: session.user.id });

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}