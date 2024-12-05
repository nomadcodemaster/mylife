import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectDB from "@/libs/database";
import TimelineEntry from "@/models/TimelineEntry";

const mockUser = {
  id: "dev-user-123",
  email: "jack@example.com",
  name: "Jack N. Off"
};

export async function GET() {
  try {
    if (process.env.NODE_ENV === "development") {
      return Response.json({ 
        entries: [
          {
            _id: "1",
            userId: mockUser.id,
            title: "Started my journey 🚀",
            description: "Decided to build something amazing!",
            date: "2024-01-01",
            category: "personal",
            isPublic: true
          },
          {
            _id: "2",
            userId: mockUser.id,
            title: "First Achievement 🏆",
            description: "Successfully deployed my first app",
            date: "2024-02-15",
            category: "achievement",
            isPublic: true
          }
        ] 
      });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const entries = await TimelineEntry.find({ 
      userId: session.user.id 
    }).sort({ date: -1 });

    return Response.json({ entries });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();

    await connectDB();

    const entry = await TimelineEntry.create({
      ...json,
      userId: session.user.id,
    });

    return Response.json({ entry });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}