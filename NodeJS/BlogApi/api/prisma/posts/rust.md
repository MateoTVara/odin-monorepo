## What is Rust?

Rust is a **systems programming language** that runs blazingly fast, prevents segfaults, and guarantees thread safety. It achieves what C/C++ do but with memory safety guarantees and a powerful type system.

```rust
// Memory safety without garbage collection
fn main() {
    let mut s = String::from("hello");
    s.push_str(", world!");
    println!("{}", s);
    // Memory automatically cleaned up when 's' goes out of scope
}
```

## Why Rust? The Key Advantages

⚡ **Performance** - Comparable to C/C++, zero-cost abstractions  
🛡️ **Memory Safety** - No null pointers, no dangling pointers, no data races  
🔒 **Fearless Concurrency** - Compile-time guarantees for thread safety  
🔧 **Modern Tooling** - Excellent package manager, linter, and formatter  
📚 **Great Documentation** - Comprehensive docs and helpful compiler messages  
🎯 **Wide Adoption** - Used by Microsoft, Google, Amazon, Facebook, and more  

## Getting Started

### Installation
```bash
# Install Rust via rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Verify installation
rustc --version
cargo --version
```

### Your First Rust Program
Create `main.rs`:
```rust
fn main() {
    println!("Hello, Rust!");
}
```

Compile and run:
```bash
rustc main.rs  # Compile
./main         # Run

# Or use Cargo (recommended)
cargo new hello_rust
cd hello_rust
cargo run      # Build and run
```

## Core Rust Concepts

### Variables and Mutability
```rust
fn main() {
    // Immutable by default
    let x = 5;
    // x = 6; // Error: cannot assign twice to immutable variable
    
    // Mutable variable
    let mut y = 5;
    y = 6; // OK
    
    // Constants (must have type annotation)
    const MAX_POINTS: u32 = 100_000;
    
    // Shadowing (redeclaring variable)
    let spaces = "   ";
    let spaces = spaces.len(); // Changes type: &str -> usize
}
```

### Data Types
```rust
// Scalar Types
let integer: i32 = 42;      // Signed 32-bit integer
let unsigned: u64 = 42;     // Unsigned 64-bit integer
let float: f64 = 3.14;      // 64-bit floating point
let boolean: bool = true;   // Boolean
let character: char = '🚀'; // Unicode scalar value

// Compound Types
let tuple: (i32, f64, char) = (500, 6.4, 'z');
let (x, y, z) = tuple;      // Destructuring
let five_hundred = tuple.0; // Access by index

let array: [i32; 5] = [1, 2, 3, 4, 5]; // Fixed-size array
let first = array[0];
let same_values = [3; 5]; // [3, 3, 3, 3, 3]
```

### Functions
```rust
// Function definition
fn add(x: i32, y: i32) -> i32 {
    x + y  // No semicolon = implicit return
}

// Statements vs Expressions
fn five() -> i32 {
    5  // Expression (returns value)
}

fn print_number(x: i32) {
    println!("The number is: {}", x); // Statement (no return)
}
```

## Ownership: Rust's Secret Sauce

### The Rules
1. Each value has an owner
2. Only one owner at a time
3. Value is dropped when owner goes out of scope

```rust
fn main() {
    // String is heap-allocated
    let s1 = String::from("hello");
    let s2 = s1; // s1 is MOVED to s2, s1 is no longer valid
    
    // println!("{}", s1); // Error: value borrowed after move
    
    // Clone for deep copy
    let s3 = String::from("world");
    let s4 = s3.clone(); // Both s3 and s4 are valid
    println!("s3 = {}, s4 = {}", s3, s4);
}
```

### References and Borrowing
```rust
fn main() {
    let s1 = String::from("hello");
    
    // Immutable reference (borrowing)
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
    
    // Mutable reference
    let mut s2 = String::from("hello");
    change(&mut s2);
    
    // Only ONE mutable reference at a time
    let r1 = &mut s2;
    // let r2 = &mut s2; // Error: cannot borrow as mutable more than once
}
```

### The Slice Type
```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    
    &s[..]
}

fn main() {
    let s = String::from("hello world");
    let word = first_word(&s);
    println!("First word: {}", word); // "hello"
}
```

## Structs: Creating Custom Types
```rust
// Define a struct
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

// Create an instance
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

// Mutable struct
let mut user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername"),
    active: true,
    sign_in_count: 1,
};
user2.email = String::from("newemail@example.com");

// Struct update syntax
let user3 = User {
    email: String::from("third@example.com"),
    username: String::from("thirduser"),
    ..user1  // Fill rest from user1
};

// Tuple structs
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);
```

### Methods and Associated Functions
```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Method (takes &self parameter)
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    
    // Associated function (no self parameter)
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };
    
    println!("Area: {}", rect.area());
    
    let square = Rectangle::square(10);
}
```

## Enums and Pattern Matching
```rust
// Define an enum
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {
        // Method implementation
    }
}

// The Option enum (no null values!)
enum Option<T> {
    Some(T),
    None,
}

// Pattern Matching with match
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
    }
}

// if let syntax (syntactic sugar for match)
let some_value = Some(3);
if let Some(3) = some_value {
    println!("three");
}
```

## Error Handling
```rust
// Recoverable errors with Result<T, E>
enum Result<T, E> {
    Ok(T),
    Err(E),
}

use std::fs::File;
use std::io::ErrorKind;

fn open_file() {
    let f = File::open("hello.txt");
    
    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening file: {:?}", other_error)
            }
        },
    };
}

// Propagating errors with ?
fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}

// Unrecoverable errors with panic!
fn dangerous_operation() {
    if bad_condition {
        panic!("Something went terribly wrong!");
    }
}
```

## Common Collections

### Vectors
```rust
// Create a vector
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3]; // Macro for initialization

// Access elements
let third: &i32 = &v[2]; // Panics if out of bounds
let third: Option<&i32> = v.get(2); // Returns Option

// Iteration
for i in &v {
    println!("{}", i);
}

for i in &mut v {
    *i += 50; // Dereference to modify
}
```

### Strings
```rust
// String vs &str
let s1 = String::from("hello");
let s2 = "world"; // &str

// Concatenation
let s3 = s1 + &s2; // s1 is moved here

// Formatting
let s = format!("{}-{}", s2, s3);

// Slicing (be careful with Unicode!)
let hello = "Здравствуйте";
let s = &hello[0..4]; // First 4 bytes
```

### Hash Maps
```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

// Insert values
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

// Access values
let team_name = String::from("Blue");
let score = scores.get(&team_name); // Returns Option<&V>

// Update values
scores.entry(String::from("Blue")).or_insert(50); // Insert if not exists

// Iteration
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

## Generic Types, Traits, and Lifetimes

### Generics
```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}
```

### Traits: Defining Shared Behavior
```rust
// Define a trait
pub trait Summary {
    fn summarize(&self) -> String;
    
    // Default implementation
    fn default_summary(&self) -> String {
        String::from("(Read more...)")
    }
}

// Implement trait for a type
struct NewsArticle {
    headline: String,
    location: String,
    author: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

// Trait bounds
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Multiple trait bounds
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {
    // Function body
}

// where clause for cleaner syntax
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    // Function body
}
```

### Lifetimes
```rust
// Lifetime annotations ensure references are valid
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

// Lifetime in structs
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
    
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

## Testing in Rust
```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
    
    #[test]
    #[should_panic(expected = "Divide by zero")]
    fn divide_by_zero() {
        let result = 1 / 0;
    }
    
    #[test]
    fn result_test() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
}
```

## Cargo: Rust's Package Manager

### Cargo.toml (Project Manifest)
```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
reqwest = { version = "0.11", features = ["json"] }

[dev-dependencies]
mockall = "0.11"
```

### Common Cargo Commands
```bash
cargo new project_name      # Create new project
cargo build                # Build project
cargo run                  # Build and run
cargo check                # Check code without building
cargo test                 # Run tests
cargo doc --open           # Build and open documentation
cargo fmt                  # Format code
cargo clippy               # Lint code
cargo publish              # Publish to crates.io
```

## Concurrency in Rust

### Threads
```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    
    handle.join().unwrap(); // Wait for thread to finish
}
```

### Message Passing
```rust
use std::sync::mpsc; // Multiple Producer, Single Consumer
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });
    
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

### Shared-State Concurrency
```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("Result: {}", *counter.lock().unwrap());
}
```

## Async/Await (Asynchronous Rust)
```rust
use tokio; // Add tokio to dependencies

#[tokio::main]
async fn main() {
    let result = fetch_data().await;
    println!("Result: {:?}", result);
}

async fn fetch_data() -> Result<String, reqwest::Error> {
    let body = reqwest::get("https://www.rust-lang.org")
        .await?
        .text()
        .await?;
    Ok(body)
}
```

## Common Patterns and Best Practices

### 1. Use `Result` over `panic!`
```rust
// Instead of:
fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        panic!("Division by zero!");
    }
    a / b
}

// Prefer:
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}
```

### 2. Leverage Pattern Matching
```rust
match some_result {
    Ok(value) => process(value),
    Err(e) => handle_error(e),
}
```

### 3. Use Iterators
```rust
// Instead of:
let mut v = vec![1, 2, 3];
for i in 0..v.len() {
    v[i] *= 2;
}

// Use:
let v: Vec<i32> = vec![1, 2, 3].iter().map(|x| x * 2).collect();
```

## Learning Resources

- 📚 [The Rust Book](https://doc.rust-lang.org/book/) - Official book
- 🎓 [Rust by Example](https://doc.rust-lang.org/rust-by-example/) - Learn by example
- 🔧 [Rustlings](https://github.com/rust-lang/rustlings) - Small exercises
- 💬 [Rust Community](https://www.rust-lang.org/community) - Discord, forums, users groups
- 🚀 [Are We Web Yet?](https://www.arewewebyet.org/) - Rust for web development
- 🎮 [Are We Game Yet?](https://arewegameyet.rs/) - Rust for game development

## Common Error Messages (and What They Mean)

```
error[E0382]: borrow of moved value: `s1`
// Solution: Use references or clone the value

error[E0502]: cannot borrow `x` as mutable because it is also borrowed as immutable
// Solution: Ensure mutable and immutable borrows don't overlap

error[E0277]: the trait bound `T: std::fmt::Display` is not satisfied
// Solution: Add trait bounds to your generic types
```

## Project Ideas for Beginners

1. **Command-line tools** (grep clone, todo app)
2. **Web server** with Actix or Rocket
3. **Game** with ggez or Bevy
4. **Systems utility** (process monitor, file organizer)
5. **WebAssembly module** for web apps

Rust has a steep learning curve, but the compiler is your best friend—it catches bugs before they happen. Embrace the borrow checker, learn from error messages, and you'll write systems-level code with confidence. Welcome to the Rust community! 🦀🚀