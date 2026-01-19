const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json()); // สำคัญมาก ถ้าไม่มี req.body จะเป็น undefined

/* ---------- DATABASE ---------- */
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/todo")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ---------- MODEL ---------- */
const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

/* ---------- ROUTES ---------- */

// health check
app.get("/", (req, res) => {
  res.send("Todo API is running");
});

// get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// ✅ create todo (เพิ่ม console.log ตามที่ขอ)
app.post("/todos", async (req, res) => {
  try {
    console.log("📥 POST /todos body =", req.body);

    const todo = await Todo.create({
      title: req.body.title,
    });

    console.log("✅ Saved todo =", todo);

    res.status(201).json(todo);
  } catch (err) {
    console.error("❌ Create todo error:", err);
    res.status(500).json({ message: "Create todo failed" });
  }
});

// toggle todo
app.patch("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(todo);
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

/* ---------- START SERVER ---------- */
app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});
