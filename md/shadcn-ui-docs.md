# shadcn/ui Documentation

Comprehensive guide to shadcn/ui - beautifully designed, accessible UI components built with Radix UI and Tailwind CSS.

## Table of Contents
1. [What is shadcn/ui?](#what-is-shadcnui)
2. [Installation & Setup](#installation--setup)
3. [Components.json Configuration](#componentsjson-configuration)
4. [CLI Usage](#cli-usage)
5. [Theming & Customization](#theming--customization)
6. [Dark Mode](#dark-mode)
7. [Component Usage](#component-usage)
8. [Best Practices](#best-practices)

---

## What is shadcn/ui?

shadcn/ui is **NOT a component library** - it's a collection of re-usable components that you can copy and paste into your apps.

### Key Features

- **Own your code** - Components are copied into your project, not installed as a dependency
- **Customizable** - Modify the code however you want
- **Accessible** - Built on Radix UI primitives with ARIA compliance
- **Styled with Tailwind CSS** - Utility-first styling approach
- **TypeScript** - Full type safety
- **Framework agnostic** - Works with Next.js, Vite, Remix, Astro, and more

### Philosophy

Instead of installing components from `node_modules`, you:
1. Pick the components you need
2. Copy them into your project
3. Customize them to match your design
4. Own the code forever

---

## Installation & Setup

### Prerequisites

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Manual Installation (Vite/React)

1. **Install Dependencies**

```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot lucide-react
```

2. **Configure Tailwind CSS**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

3. **Add CSS Variables**

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

4. **Configure Path Aliases**

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```typescript
// vite.config.ts
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

5. **Create Utils File**

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Components.json Configuration

The `components.json` file holds configuration for your project.

### Full Configuration Example

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Configuration Options

| Option | Description | Values |
|--------|-------------|--------|
| `style` | Component style | `"default"`, `"new-york"` |
| `rsc` | React Server Components | `true`, `false` |
| `tsx` | Use TypeScript | `true`, `false` |
| `tailwind.config` | Path to Tailwind config | `"tailwind.config.js"` |
| `tailwind.css` | Path to CSS file | `"src/index.css"` |
| `tailwind.baseColor` | Base color theme | `"slate"`, `"gray"`, `"zinc"`, `"neutral"`, `"stone"` |
| `tailwind.cssVariables` | Use CSS variables | `true`, `false` |
| `aliases.components` | Components path alias | `"@/components"` |
| `aliases.utils` | Utils path alias | `"@/lib/utils"` |
| `iconLibrary` | Icon library | `"lucide"`, `"react-icons"` |

---

## CLI Usage

### Initialize shadcn/ui

```bash
npx shadcn@latest init
```

This will:
- Create `components.json`
- Setup Tailwind CSS
- Configure path aliases
- Add CSS variables

### Add Components

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog

# Add all components
npx shadcn@latest add --all
```

### Component Installation Process

When you run `npx shadcn@latest add button`, the CLI:
1. Downloads the Button component code
2. Installs required dependencies (e.g., `@radix-ui/react-slot`)
3. Places the component in `src/components/ui/button.tsx`
4. You can now import and use it: `import { Button } from "@/components/ui/button"`

### CLI Commands

```bash
npx shadcn@latest init          # Initialize project
npx shadcn@latest add [component]  # Add components
npx shadcn@latest diff [component] # Check for updates
```

---

## Theming & Customization

### Color System

shadcn/ui uses CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... more colors */
}
```

Colors are in **HSL format** without the `hsl()` wrapper:
- Format: `<hue> <saturation> <lightness>`
- Example: `222.2 84% 4.9%` → `hsl(222.2, 84%, 4.9%)`

### Customizing Colors

**Option 1: Use the Theme Generator**

Visit https://ui.shadcn.com/themes to generate custom themes.

**Option 2: Manual Customization**

```css
:root {
  --primary: 210 100% 50%;  /* Blue primary color */
  --primary-foreground: 0 0% 100%;  /* White text on primary */
}
```

### Base Color Options

Choose a base color when initializing:

```bash
npx shadcn@latest init
# Select base color: slate, gray, zinc, neutral, or stone
```

Each base color affects the overall aesthetic:
- **Slate**: Cool, professional
- **Gray**: Neutral, balanced
- **Zinc**: Modern, clean
- **Neutral**: Warm, approachable
- **Stone**: Earthy, natural

### Custom Themes

Create multiple themes:

```css
/* Red theme */
.theme-red {
  --primary: 0 84.2% 60.2%;
  --primary-foreground: 0 0% 98%;
}

/* Blue theme */
.theme-blue {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}
```

Apply themes dynamically:

```tsx
export function ThemeSwitcher() {
  const setTheme = (theme: string) => {
    document.documentElement.className = theme;
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuItem onClick={() => setTheme("theme-blue")}>
        Blue Theme
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("theme-red")}>
        Red Theme
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
```

---

## Dark Mode

### Setup with next-themes

1. **Install next-themes**

```bash
npm install next-themes
```

2. **Create Theme Provider**

```tsx
// src/components/theme-provider.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
```

3. **Wrap Your App**

```tsx
// src/main.tsx
import { ThemeProvider } from "@/components/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
    <App />
  </ThemeProvider>
);
```

4. **Create Mode Toggle Component**

```tsx
// src/components/mode-toggle.tsx
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## Component Usage

### Button Component

```tsx
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><Icon /></Button>
      
      <Button disabled>Disabled</Button>
      <Button loading>Loading...</Button>
    </>
  );
}
```

### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Form content */}
      </CardContent>
      <CardFooter>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
```

### Dialog Component

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  );
}
```

### Form Component with React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Toast Notifications

```tsx
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
```

---

## Best Practices

### 1. Use the `cn()` Utility

Always use the `cn()` utility for combining class names:

```tsx
import { cn } from "@/lib/utils";

export function MyComponent({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-md border border-slate-200 p-4",
        className
      )}
      {...props}
    />
  );
}
```

### 2. Customize Components After Installation

After adding a component, modify it to fit your needs:

```tsx
// src/components/ui/button.tsx
// Add new variant
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        // Add your custom variant
        custom: "bg-purple-500 text-white hover:bg-purple-600",
      },
    },
  }
);
```

### 3. Create Composed Components

Build higher-level components from shadcn/ui primitives:

```tsx
// src/components/user-card.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function UserCard({ user }) {
  return (
    <Card>
      <CardHeader>
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>View Profile</Button>
      </CardContent>
    </Card>
  );
}
```

### 4. Accessibility First

shadcn/ui components are accessible by default. Maintain this:

```tsx
// ✅ Good - Preserves accessibility
<Button aria-label="Close dialog" onClick={handleClose}>
  <X className="h-4 w-4" />
</Button>

// ❌ Bad - Removes accessibility
<div onClick={handleClose}>
  <X className="h-4 w-4" />
</div>
```

### 5. Keep Components in Sync

Periodically check for updates:

```bash
npx shadcn@latest diff button
```

### 6. Don't Fight the System

Work with CSS variables, not against them:

```css
/* ✅ Good - Uses theme variables */
.custom-element {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* ❌ Bad - Hard-coded colors */
.custom-element {
  background: #3b82f6;
  color: white;
}
```

---

## Common Patterns

### Loading States

```tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Button disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Loading..." : "Submit"}
    </Button>
  );
}
```

### Responsive Layouts

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

### Form Validation

```tsx
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
```

---

## Resources

- **Official Docs**: https://ui.shadcn.com
- **Component Examples**: https://ui.shadcn.com/examples
- **GitHub**: https://github.com/shadcn-ui/ui
- **Radix UI Docs**: https://radix-ui.com
- **Tailwind CSS Docs**: https://tailwindcss.com

## Quick Reference

### Common Commands
```bash
npx shadcn@latest init           # Initialize project
npx shadcn@latest add button     # Add button component
npx shadcn@latest add --all      # Add all components
npx shadcn@latest diff button    # Check for updates
```

### Import Patterns
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
```
