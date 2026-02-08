## What is TypeScript?

TypeScript is a **superset of JavaScript** that adds static typing, developed and maintained by Microsoft. Think of it as JavaScript with a type system—it compiles down to plain JavaScript.

```typescript
// JavaScript
let message = "Hello";
message = 123; // This works in JS, but might cause bugs

// TypeScript
let message: string = "Hello";
message = 123; // Error: Type 'number' is not assignable to type 'string'
```

## Why Use TypeScript?

🎯 **Catch Errors Early** - Find bugs during development, not in production  
📝 **Better Documentation** - Types serve as built-in documentation  
🔧 **Enhanced IDE Support** - Superior autocompletion and refactoring  
⚡ **Safer Refactoring** - Change code with confidence  
🔄 **Progressive Adoption** - Add types gradually to existing JS projects  

## Getting Started

### Installation
```bash
npm install -g typescript
# or
yarn global add typescript
```

### Your First TypeScript File
Create `hello.ts`:
```typescript
function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));
```

### Compilation
```bash
# Compile to JavaScript
tsc hello.ts

# Creates hello.js
```

## Core TypeScript Concepts

### Basic Types
```typescript
// Primitives
let isDone: boolean = false;
let count: number = 42;
let name: string = "TypeScript";

// Arrays
let numbers: number[] = [1, 2, 3];
let fruits: Array<string> = ["apple", "banana"];

// Tuples - Fixed length arrays
let person: [string, number] = ["Alice", 30];

// Enums
enum Color {
    Red,
    Green,
    Blue
}
let favorite: Color = Color.Green;

// Any - Opt-out of type checking
let uncertain: any = "could be anything";
uncertain = 42; // No error

// Unknown - Type-safe counterpart to 'any'
let notSure: unknown = "maybe a string";
// notSure.toUpperCase(); // Error - must check type first

// Void - No return value
function logMessage(): void {
    console.log("Message logged");
}

// Never - Function never returns
function throwError(message: string): never {
    throw new Error(message);
}
```

### Type Inference
TypeScript can often infer types automatically:
```typescript
let message = "Hello"; // TypeScript infers: string
let count = 42;        // TypeScript infers: number
let isActive = true;   // TypeScript infers: boolean
```

### Interfaces
Define the shape of objects:
```typescript
interface User {
    id: number;
    name: string;
    email?: string; // Optional property
    readonly createdAt: Date; // Cannot be modified after creation
}

const user: User = {
    id: 1,
    name: "John Doe",
    createdAt: new Date()
};

// user.createdAt = new Date(); // Error: readonly property
```

### Types vs Interfaces
```typescript
// Interface - extendable
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Type alias - for unions, primitives, tuples
type ID = number | string;
type Coordinates = [number, number];
type Pet = Dog | Cat;
```

### Functions with Types
```typescript
// Function declaration
function add(x: number, y: number): number {
    return x + y;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;

// Optional parameters
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}`;
}

// Default parameters
function createUser(name: string, role: string = "user"): User {
    return { name, role };
}

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}
```

### Generics
Create reusable, type-safe components:
```typescript
// Generic function
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("hello"); // Explicit type
let output2 = identity(42); // Type inference

// Generic interface
interface ApiResponse<T> {
    data: T;
    status: number;
}

const userResponse: ApiResponse<User> = {
    data: { id: 1, name: "Alice" },
    status: 200
};
```

## Advanced Features

### Union and Intersection Types
```typescript
// Union: value can be one of several types
type Status = "success" | "error" | "loading";
let currentStatus: Status = "loading";

// Intersection: combine multiple types
interface Employee {
    id: number;
    role: string;
}

interface Person {
    name: string;
    age: number;
}

type Staff = Employee & Person;

const staff: Staff = {
    id: 1,
    role: "developer",
    name: "Jane",
    age: 30
};
```

### Type Guards
```typescript
function isString(value: any): value is string {
    return typeof value === "string";
}

function process(input: string | number) {
    if (isString(input)) {
        // TypeScript knows input is string here
        console.log(input.toUpperCase());
    } else {
        // TypeScript knows input is number here
        console.log(input.toFixed(2));
    }
}
```

### Utility Types
Built-in type transformations:
```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// Partial - all properties optional
const updateTodo: Partial<Todo> = {
    completed: true
};

// Readonly - cannot be modified
const immutableTodo: Readonly<Todo> = {
    title: "Learn TypeScript",
    description: "Study types and interfaces",
    completed: false
};

// Pick - select specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit - remove specific properties
type TodoInfo = Omit<Todo, "completed">;

// Record - object with specific key/value types
type UserRoles = Record<string, string>;
```

## TypeScript Configuration

### tsconfig.json
Create a `tsconfig.json` file for project settings:
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

### Common Compiler Options
- `target`: JavaScript version to compile to (ES5, ES2020, etc.)
- `strict`: Enable all strict type-checking options
- `noImplicitAny`: Error on expressions with implied 'any' type
- `strictNullChecks`: Ensure null/undefined safety
- `noUnusedLocals`: Error on unused local variables

## Working with JavaScript

### Type Declaration Files (.d.ts)
Add types to existing JavaScript libraries:
```typescript
// types.d.ts
declare module "untyped-library" {
    export function doSomething(): void;
    export const version: string;
}
```

### Using DefinitelyTyped
For popular libraries, install type definitions:
```bash
npm install --save-dev @types/react
npm install --save-dev @types/lodash
```

## Common Patterns and Best Practices

### 1. Avoid `any` Type
```typescript
// Instead of:
function process(data: any) { /* ... */ }

// Use:
function process<T>(data: T) { /* ... */ }
// or be specific:
function process(data: unknown) { /* ... */ }
```

### 2. Use Type Aliases for Complex Types
```typescript
type UserConfig = {
    id: number;
    preferences: {
        theme: "light" | "dark";
        notifications: boolean;
    };
};
```

### 3. Leverage Type Inference
```typescript
// Let TypeScript infer return types
function createUser(name: string, age: number) {
    return {
        name,
        age,
        isAdult: age >= 18
    };
}
// TypeScript knows the return type is:
// { name: string; age: number; isAdult: boolean; }
```

## TypeScript in Different Environments

### TypeScript with React
```typescript
import React, { useState } from 'react';

interface Props {
    title: string;
    initialCount?: number;
}

const Counter: React.FC<Props> = ({ title, initialCount = 0 }) => {
    const [count, setCount] = useState<number>(initialCount);
    
    return (
        <div>
            <h1>{title}</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};
```

### TypeScript with Node.js
```typescript
import express, { Request, Response } from 'express';

interface UserRequest extends Request {
    user?: {
        id: number;
        name: string;
    };
}

const app = express();

app.get('/user/:id', (req: UserRequest, res: Response) => {
    const userId = parseInt(req.params.id);
    // Type-safe parameter access
});
```

## Learning Path

1. **Start Small**: Add types to existing JavaScript
2. **Use Strict Mode**: Enable `strict: true` in tsconfig.json
3. **Practice**: Build small projects with TypeScript
4. **Explore Advanced Types**: Learn generics, conditional types
5. **Contribute**: Add types to open source projects

## Resources
- 📚 [Official Handbook](https://www.typescriptlang.org/docs/)
- 🏃 [TypeScript Playground](https://www.typescriptlang.org/play)
- 📖 [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- 🎓 [Total TypeScript Course](https://totaltypescript.com/)
- 💬 [TypeScript Community](https://github.com/microsoft/TypeScript)

## Common Errors & Solutions

```typescript
// Error: Object is possibly 'undefined'
function getLength(str?: string) {
    // Fix: Use optional chaining or null check
    return str?.length || 0;
}

// Error: Type 'string | null' is not assignable
function process(input: string | null) {
    // Fix: Type guard
    if (input !== null) {
        console.log(input.toUpperCase());
    }
}
```

TypeScript is a journey from "writing JavaScript" to "designing with types." Start with basic annotations, gradually embrace more advanced features, and you'll build more robust, maintainable applications. Happy typing! ⌨️🚀