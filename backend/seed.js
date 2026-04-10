const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up database...");
  await prisma.vote.deleteMany({});
  await prisma.peerResource.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Seeding fresh data...");

  // ==========================================
  // 1. CREATE INSTRUCTORS
  // ==========================================
  const premalatha = await prisma.user.create({
    data: {
      email: "premalatha@univ.edu",
      passwordHash: "hash123",
      name: "Dr. M. Premalatha",
      role: "INSTRUCTOR",
    },
  });
  const kavitha = await prisma.user.create({
    data: {
      email: "kavitha@univ.edu",
      passwordHash: "hash123",
      name: "Prof. Kavitha",
      role: "INSTRUCTOR",
    },
  });
  const uday = await prisma.user.create({
    data: {
      email: "uday.kiran@univ.edu",
      passwordHash: "hash123",
      name: "Dr. Uday Kiran Kommuri",
      role: "INSTRUCTOR",
    },
  });
  const priyanka = await prisma.user.create({
    data: {
      email: "priyanka.mishra@univ.edu",
      passwordHash: "hash123",
      name: "Dr. Priyanka Mishra",
      role: "INSTRUCTOR",
    },
  });

  // ==========================================
  // 2. CREATE STUDENTS
  // ==========================================
  const avanthi = await prisma.user.create({
    data: {
      email: "avanthi@student.edu",
      registrationNumber: "24MIS1137",
      passwordHash: "hash123",
      name: "Avanthika",
      role: "STUDENT",
      badges: ["Top Contributor"],
    },
  });
  const renukha = await prisma.user.create({
    data: {
      email: "renukha@student.edu",
      registrationNumber: "24MIS1013",
      passwordHash: "hash123",
      name: "Renukha Devi P",
      role: "STUDENT",
    },
  });
  const sreenath = await prisma.user.create({
    data: {
      email: "sreenath@student.edu",
      registrationNumber: "24MIS1026",
      passwordHash: "hash123",
      name: "Sreenath S",
      role: "STUDENT",
    },
  });
  const ritesh = await prisma.user.create({
    data: {
      email: "ritesh@student.edu",
      registrationNumber: "24MIS1056",
      passwordHash: "hash123",
      name: "Ritesh T",
      role: "STUDENT",
    },
  });
  const niranjan = await prisma.user.create({
    data: {
      email: "niranjan@student.edu",
      registrationNumber: "24MIS1129",
      passwordHash: "hash123",
      name: "Niranjan S",
      role: "STUDENT",
    },
  });

  // ==========================================
  // 3. CREATE COURSES
  // ==========================================
  const osCourse = await prisma.course.create({
    data: {
      courseCode: "ISWE204L",
      name: "Operating Systems",
      description: "Process synchronization and memory management.",
      semester: "Winter 2025-26",
      instructorId: premalatha.id,
    },
  });
  const ooadCourse = await prisma.course.create({
    data: {
      courseCode: "ISWE207L",
      name: "Object Oriented Analysis and Design",
      description: "UML, Design Patterns, and SOLID principles.",
      semester: "Winter 2025-26",
      instructorId: kavitha.id,
    },
  });
  const dmCourse = await prisma.course.create({
    data: {
      courseCode: "IMGT106L",
      name: "Digital Marketing",
      description: "SEO, SEM, and Analytics.",
      semester: "Winter 2025-26",
      instructorId: uday.id,
    },
  });
  const webCourse = await prisma.course.create({
    data: {
      courseCode: "ISWE206L",
      name: "Web Technologies",
      description: "Frontend and Backend web development.",
      semester: "Winter 2025-26",
      instructorId: priyanka.id,
    },
  });

  // ==========================================
  // 4. CREATE ENROLLMENTS (The Overlaps!)
  // ==========================================
  await prisma.enrollment.createMany({
    data: [
      // OS Students
      { studentId: avanthi.id, courseId: osCourse.id, status: "ACTIVE" },
      { studentId: renukha.id, courseId: osCourse.id, status: "ACTIVE" },
      { studentId: sreenath.id, courseId: osCourse.id, status: "ACTIVE" },

      // OOAD Students
      { studentId: avanthi.id, courseId: ooadCourse.id, status: "ACTIVE" },
      { studentId: renukha.id, courseId: ooadCourse.id, status: "ACTIVE" },
      { studentId: ritesh.id, courseId: ooadCourse.id, status: "ACTIVE" },

      // Digital Marketing Students
      { studentId: renukha.id, courseId: dmCourse.id, status: "ACTIVE" },
      { studentId: ritesh.id, courseId: dmCourse.id, status: "ACTIVE" },
      { studentId: niranjan.id, courseId: dmCourse.id, status: "ACTIVE" },

      // Web Tech Students
      { studentId: sreenath.id, courseId: webCourse.id, status: "ACTIVE" },
      { studentId: avanthi.id, courseId: webCourse.id, status: "ACTIVE" },
      { studentId: niranjan.id, courseId: webCourse.id, status: "ACTIVE" },
    ],
  });

  // ==========================================
  // 5. CREATE PEER HUB POSTS (1 Per Course)
  // ==========================================
  await prisma.peerResource.create({
    data: {
      title: "Banker's Algorithm Implementation (C Code)",
      content:
        "Here is the code for finding the safe sequence. Make sure you initialize the work array properly before the loop!",
      type: "CODE",
      helpfulScore: 42,
      authorId: sreenath.id,
      courseId: osCourse.id,
    },
  });

  await prisma.peerResource.create({
    data: {
      title: "UML Class Diagram vs Object Diagram Guide",
      content:
        "A quick summary: Class diagrams show the static blueprint (classes, interfaces), while Object diagrams show a snapshot of instances at a specific runtime moment.",
      type: "TEXT",
      helpfulScore: 88,
      authorId: avanthi.id,
      courseId: ooadCourse.id,
    },
  });

  await prisma.peerResource.create({
    data: {
      title: "Google Analytics 4 vs Universal Analytics",
      content:
        "Keep in mind for the midterms: GA4 is event-based while Universal Analytics was session-based. This changes how bounce rates are calculated.",
      type: "TEXT",
      helpfulScore: 15,
      authorId: ritesh.id,
      courseId: dmCourse.id,
    },
  });

  await prisma.peerResource.create({
    data: {
      title: "Understanding React useEffect Dependency Arrays",
      content:
        "If you leave the dependency array empty [], it runs only once on mount. If you omit it entirely, it runs on EVERY render. Don't crash your browser during the final project!",
      type: "TEXT",
      helpfulScore: 112,
      authorId: niranjan.id,
      courseId: webCourse.id,
    },
  });

  console.log("Database seeded successfully with overlapping student data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
