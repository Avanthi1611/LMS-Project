const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("LMS Backend is Running! 🚀");
});

// 1. LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find the user in the database based on your seed data
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        role: role,
        // Note: In a real app we hash passwords. For this demo, it matches "hash123" from seed.js
        passwordHash: password,
      },
    });

    if (user) {
      res.json({ success: true, user: user });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// 2. GET COURSES ROUTE
app.get("/api/courses", async (req, res) => {
  try {
    const { userId, role } = req.query;
    let courses = [];

    if (role === "STUDENT") {
      // Find courses this specific student is enrolled in
      const enrollments = await prisma.enrollment.findMany({
        where: { studentId: userId },
        include: {
          course: {
            include: { instructor: true },
          },
        },
      });
      courses = enrollments.map((e) => e.course);
    } else if (role === "INSTRUCTOR") {
      // Find courses taught by this instructor
      courses = await prisma.course.findMany({
        where: { instructorId: userId },
        include: { instructor: true },
      });
    }

    res.json(courses);
  } catch (error) {
    console.error("Courses fetch error:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// 3. GET POSTS ROUTE (Peer Hub)
app.get("/api/posts", async (req, res) => {
  try {
    // Fetches all posts, including the author's name and the course info
    const posts = await prisma.peerResource.findMany({
      include: {
        author: true,
        course: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(posts);
  } catch (error) {
    console.error("Posts fetch error:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// 4. CREATE NEW POST ROUTE
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content, type, courseId, userId, mediaUrl } = req.body;

    const newPost = await prisma.peerResource.create({
      data: {
        title,
        content,
        type,
        courseId,
        authorId: userId,
        helpfulScore: 0,
        mediaUrl,
      },
      include: {
        author: true,
        course: true,
      },
    });

    res.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ success: false, error: "Failed to create post" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
