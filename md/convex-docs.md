# Convex Backend Documentation

Comprehensive guide to using Convex - a reactive database with TypeScript queries, serverless functions, authentication, and real-time updates.

## Table of Contents
1. [What is Convex?](#what-is-convex)
2. [Getting Started](#getting-started)
3. [Database Schemas](#database-schemas)
4. [Queries](#queries)
5. [Mutations](#mutations)
6. [Actions](#actions)
7. [Authentication](#authentication)
8. [File Storage](#file-storage)
9. [React Integration](#react-integration)
10. [Best Practices](#best-practices)

---

## What is Convex?

Convex is a reactive database and serverless platform for building dynamic, live-updating web applications. It provides:

- **TypeScript-first** - End-to-end type safety from database to client
- **Real-time subscriptions** - Automatic UI updates when data changes
- **Serverless functions** - Backend logic runs in the cloud
- **Built-in authentication** - Multiple auth providers supported
- **File storage** - Store and serve files directly
- **ACID transactions** - Automatic retry and consistency guarantees

## Getting Started

### Installation

```bash
npm install convex
npx convex dev
```

### Project Structure

```
my-app/
├── convex/
│   ├── _generated/         # Auto-generated types
│   ├── schema.ts           # Database schema definition
│   ├── functions.ts        # Queries, mutations, and actions
│   └── auth.ts             # Authentication configuration
└── src/
    └── main.tsx            # React app with Convex provider
```

### Initialize Convex Client

```typescript
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConvexProvider client={convex}>
    <App />
  </ConvexProvider>
);
```

---

## Database Schemas

Define your database structure in `convex/schema.ts`:

### Basic Schema

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    userId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_completed", ["isCompleted"]),
  
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),
});
```

### Schema with Authentication Tables

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }).index("email", ["email"]),
});

export default schema;
```

### Type Safety

After defining your schema, TypeScript types are auto-generated:

```typescript
import { Doc } from "../convex/_generated/dataModel";

// Use typed documents
function TaskItem({ task }: { task: Doc<"tasks"> }) {
  return <div>{task.text}</div>;
}
```

---

## Queries

Queries read data from the database and are **reactive** - components automatically re-render when data changes.

### Basic Query

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllOpenTasks = query({
  args: {},
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_completed", (q) => q.eq("isCompleted", false))
      .collect();
    return tasks;
  },
});
```

### Query with Arguments

```typescript
export const getTasksByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});
```

### Using Queries in React

```typescript
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function TaskList() {
  const tasks = useQuery(api.tasks.getAllOpenTasks);
  
  if (tasks === undefined) return <div>Loading...</div>;
  
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>{task.text}</li>
      ))}
    </ul>
  );
}
```

---

## Mutations

Mutations **write data** to the database. They are transactional and automatically retry on conflicts.

### Basic Mutation

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    const taskId = await ctx.db.insert("tasks", {
      text,
      isCompleted: false,
      userId,
      createdAt: Date.now(),
    });
    
    return taskId;
  },
});
```

### Update Mutation

```typescript
export const setTaskCompleted = mutation({
  args: { 
    taskId: v.id("tasks"), 
    completed: v.boolean() 
  },
  handler: async (ctx, { taskId, completed }) => {
    await ctx.db.patch(taskId, { isCompleted: completed });
  },
});
```

### Delete Mutation

```typescript
export const deleteTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, { taskId }) => {
    await ctx.db.delete(taskId);
  },
});
```

### Using Mutations in React

```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function AddTaskForm() {
  const addTask = useMutation(api.tasks.addTask);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text") as string;
    
    await addTask({ text });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="text" required />
      <button type="submit">Add Task</button>
    </form>
  );
}
```

---

## Actions

Actions can call **external APIs** and perform **long-running operations**. Unlike mutations, they don't have automatic retry.

### Action with External API

```typescript
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const generateAndStore = action({
  args: { prompt: v.string() },
  handler: async (ctx, args) => {
    // Call external API
    const imageUrl = await generateImage(args.prompt);
    
    // Download the image
    const response = await fetch(imageUrl);
    const image = await response.blob();
    
    // Store in Convex storage
    const storageId: Id<"_storage"> = await ctx.storage.store(image);
    
    // Save to database via internal mutation
    await ctx.runMutation(internal.images.storeResult, {
      storageId,
      prompt: args.prompt,
    });
  },
});

export const storeResult = internalMutation({
  args: {
    storageId: v.id("_storage"),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("images", {
      storageId: args.storageId,
      prompt: args.prompt,
    });
  },
});
```

---

## Authentication

Convex supports multiple authentication providers through `@convex-dev/auth`.

### Setup with Password Auth

```typescript
// convex/auth.ts
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});
```

### Setup with OAuth (GitHub)

```typescript
import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub],
});
```

### React Provider Setup

```typescript
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </React.StrictMode>
);
```

### Get Authenticated User in Functions

```typescript
import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const doSomething = mutation({
  args: { data: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }
    
    const user = await ctx.db.get(userId);
    // Use authenticated user...
  },
});
```

### Check Authentication in Queries

```typescript
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => 
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    
    return user;
  },
});
```

---

## File Storage

Convex provides built-in file storage for images, documents, and other files.

### Upload Files

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveFileId = mutation({
  args: { 
    storageId: v.id("_storage"),
    filename: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("files", {
      storageId: args.storageId,
      filename: args.filename,
      uploadedAt: Date.now(),
    });
  },
});
```

### Client-side Upload

```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function FileUpload() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFileId = useMutation(api.files.saveFileId);
  
  const handleFileUpload = async (file: File) => {
    // Get upload URL
    const uploadUrl = await generateUploadUrl();
    
    // Upload file
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: file,
    });
    
    const { storageId } = await response.json();
    
    // Save reference in database
    await saveFileId({ storageId, filename: file.name });
  };
  
  return <input type="file" onChange={(e) => handleFileUpload(e.target.files![0])} />;
}
```

### Get File URLs

```typescript
export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});
```

---

## React Integration

### Using React Query with Convex

```typescript
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function App() {
  // Queries are reactive - auto-update on changes
  const messages = useQuery(api.chat.getMessages);
  
  // Mutations for writes
  const sendMessage = useMutation(api.chat.send);
  
  const handleSend = (body: string) => {
    sendMessage({ body });
  };
  
  if (messages === undefined) return <div>Loading...</div>;
  
  return (
    <div>
      {messages.map(msg => <div key={msg._id}>{msg.body}</div>)}
      <button onClick={() => handleSend("Hello!")}>Send</button>
    </div>
  );
}
```

### Optimistic Updates

```typescript
const markComplete = useMutation(api.tasks.setTaskCompleted);

const handleToggle = async (taskId: Id<"tasks">, completed: boolean) => {
  // Optimistically update UI
  setLocalTasks(prev => 
    prev.map(t => t._id === taskId ? { ...t, isCompleted: completed } : t)
  );
  
  // Then update server
  await markComplete({ taskId, completed });
};
```

---

## Best Practices

### 1. Always Validate Authentication

```typescript
// ✅ GOOD - Secure authentication check
export const updateTeam = mutation({
  args: {
    id: v.id("teams"),
    update: v.object({
      name: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { id, update }) => {
    const user = await ctx.auth.getUserIdentity();
    if (user === null) {
      throw new Error("Unauthorized");
    }
    
    const isTeamMember = await checkTeamMembership(ctx, user, id);
    if (!isTeamMember) {
      throw new Error("Unauthorized");
    }
    
    await ctx.db.patch(id, update);
  },
});

// ❌ BAD - Never trust client-provided user IDs
export const updateTeamBad = mutation({
  args: {
    userId: v.id("users"), // ❌ Can be spoofed!
    teamId: v.id("teams"),
  },
  handler: async (ctx, { userId, teamId }) => {
    // This is insecure!
  },
});
```

### 2. Use Indexes for Performance

```typescript
// Define indexes in schema
export default defineSchema({
  messages: defineTable({
    body: v.string(),
    userId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_time", ["createdAt"]),
});

// Use indexes in queries
export const getRecentMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_time")
      .order("desc")
      .take(50);
  },
});
```

### 3. Proper Error Handling

```typescript
export const createPost = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create a post");
    }
    
    if (args.title.length === 0) {
      throw new Error("Title cannot be empty");
    }
    
    if (args.content.length > 10000) {
      throw new Error("Content is too long");
    }
    
    return await ctx.db.insert("posts", {
      ...args,
      userId,
      createdAt: Date.now(),
    });
  },
});
```

### 4. Use Internal Mutations for Actions

```typescript
// Internal mutations can only be called from actions/other functions
export const internalUpdate = internalMutation({
  args: { id: v.id("items"), data: v.any() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.data);
  },
});

// Call from actions
export const processWebhook = action({
  args: { payload: v.any() },
  handler: async (ctx, args) => {
    // Process external data
    const processedData = await process(args.payload);
    
    // Update database via internal mutation
    await ctx.runMutation(internal.items.internalUpdate, {
      id: processedData.id,
      data: processedData,
    });
  },
});
```

### 5. Pagination Best Practices

```typescript
export const getPaginatedMessages = query({
  args: {
    cursor: v.optional(v.id("messages")),
    limit: v.number(),
  },
  handler: async (ctx, { cursor, limit }) => {
    let query = ctx.db
      .query("messages")
      .withIndex("by_time")
      .order("desc");
    
    if (cursor) {
      const cursorDoc = await ctx.db.get(cursor);
      if (cursorDoc) {
        query = query.filter(q => 
          q.lt(q.field("createdAt"), cursorDoc.createdAt)
        );
      }
    }
    
    const messages = await query.take(limit + 1);
    const hasMore = messages.length > limit;
    const items = hasMore ? messages.slice(0, -1) : messages;
    
    return {
      items,
      hasMore,
      nextCursor: hasMore ? items[items.length - 1]._id : null,
    };
  },
});
```

---

## Common Patterns

### Row-Level Security

```typescript
import { customMutation } from "convex-helpers/server/customFunctions";
import { wrapDatabaseWriter } from "convex-helpers/server/rowLevelSecurity";

const mutationWithRLS = customMutation(mutation, {
  args: {},
  input: async (ctx) => ({
    ctx: {
      db: wrapDatabaseWriter(ctx, ctx.db, await rlsRules(ctx))
    },
    args: {},
  }),
});
```

### Webhooks with Actions

```typescript
export const handleStripeWebhook = action({
  args: { event: v.any() },
  handler: async (ctx, { event }) => {
    // Verify webhook signature
    const isValid = await verifyStripeSignature(event);
    if (!isValid) throw new Error("Invalid signature");
    
    // Process event
    switch (event.type) {
      case "payment_intent.succeeded":
        await ctx.runMutation(internal.payments.recordPayment, {
          userId: event.data.metadata.userId,
          amount: event.data.amount,
        });
        break;
    }
  },
});
```

---

## Resources

- Official Docs: https://docs.convex.dev
- GitHub: https://github.com/get-convex/convex-backend
- Discord Community: https://convex.dev/community
- Stack Posts: https://stack.convex.dev

## Quick Reference

### Common Commands
```bash
npx convex dev          # Start development server
npx convex deploy       # Deploy to production
npx convex data         # View database data
npx convex logs         # View function logs
```

### Type Imports
```typescript
import { Doc, Id } from "./_generated/dataModel";
import { api, internal } from "./_generated/api";
import { query, mutation, action } from "./_generated/server";
```
