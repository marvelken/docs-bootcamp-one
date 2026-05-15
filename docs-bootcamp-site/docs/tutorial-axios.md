---
sidebar_position: 3
title: "Make Your First API Call with Axios"
---

# Make Your First API Call with Axios

Axios is a promise-based HTTP client for JavaScript and Node.js. It simplifies making API requests compared to the native fetch API by handling JSON parsing automatically, providing better error handling, and supporting request/response interceptors. This tutorial walks you through installing Axios, making GET and POST requests, and handling errors.

By the end, you'll be able to fetch data from any REST API and send data to one.

## Prerequisites

- **Node.js v18 or higher** installed. Run `node -v` to check.
- A **code editor** (VS Code recommended).
- Basic **JavaScript knowledge** (variables, functions, promises).

---

## Step 1: Set up the project

Create a new folder and initialize it:

```bash
mkdir axios-demo && cd axios-demo
npm init -y
```

**Expected output:**

```
Wrote to /axios-demo/package.json
```

---

## Step 2: Install Axios

```bash
npm install axios
```

**Expected output:**

```
added 7 packages in 2s
```

---

## Step 3: Make a GET request

Create a file called `index.js` and add the following:

```javascript
const axios = require("axios");

async function getUser() {
  const response = await axios.get(
    "https://api.github.com/users/marvelken"
  );
  console.log(response.data.login);
  console.log(response.data.public_repos);
}

getUser();
```

Run it:

```bash
node index.js
```

**Expected output:**

```
marvelken
57
```

Notice you didn't need to call `.json()` on the response. Axios parses JSON automatically and puts the result in `response.data`.

---

## Step 4: Add headers

Most APIs require specific headers. With Axios, pass them as a second argument:

```javascript
async function getUser() {
  const response = await axios.get(
    "https://api.github.com/users/marvelken",
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );
  console.log(response.data.name);
}

getUser();
```

**Expected output:**

```
Marvel Ken-Anele
```

---

## Step 5: Make a POST request

POST requests send data to an API. We'll use JSONPlaceholder, a free fake API for testing:

```javascript
async function createPost() {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      title: "My first post",
      body: "This was sent with Axios.",
      userId: 1,
    }
  );
  console.log(response.status);
  console.log(response.data);
}

createPost();
```

**Expected output:**

```
201
{
  title: 'My first post',
  body: 'This was sent with Axios.',
  userId: 1,
  id: 101
}
```

A `201` status code means the resource was created successfully. Axios places the request body directly as the second argument, no need to `JSON.stringify()` it.

---

## Step 6: Handle errors

Wrap your request in a `try/catch` block to handle failures:

```javascript
async function getUser() {
  try {
    const response = await axios.get(
      "https://api.github.com/users/thisuserdoesnotexist99999"
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data.message);
  }
}

getUser();
```

**Expected output:**

```
404
Not Found
```

When a request fails, Axios throws an error. The server's response is available at `error.response` — this includes the status code and the response body. This is different from `fetch`, where a 404 doesn't throw an error by default.

---

## Troubleshooting

### "Cannot find module 'axios'"

**Cause:** Axios isn't installed, or you're running the script from a different folder than where you ran `npm install`.

**Fix:** Make sure you're in the project folder (where `package.json` lives) and run `npm install axios` again.

### "TypeError: Cannot read properties of undefined (reading 'status')"

**Cause:** You're trying to access `error.response.status` but the error doesn't have a `response` property. This happens when the request never reached the server — for example, a network failure or a wrong URL like `htps://` instead of `https://`.

**Fix:** Check that `error.response` exists before accessing it:

```javascript
catch (error) {
  if (error.response) {
    console.log(error.response.status);
  } else {
    console.log(error.message);
  }
}
```

### "Request failed with status code 429"

**Cause:** You've hit the API's rate limit. GitHub allows 60 unauthenticated requests per hour.

**Fix:** Wait an hour, or add an authentication token to your headers to increase the limit to 5,000 requests per hour:

```javascript
headers: {
  Authorization: "Bearer YOUR_GITHUB_TOKEN",
}
```

---

## Annotated TypeScript Code Sample

Open the [TypeScript Playground](https://www.typescriptlang.org/play) and paste the following. Each line is commented to explain what it does for a beginner.

```typescript
// Define the shape of data we expect back from the API.
// An interface is like a contract -- it tells TypeScript what fields
// an object must have and what type each field is.
interface User {
  login: string;        // The user's GitHub username (text)
  id: number;           // A unique numeric ID assigned by GitHub
  public_repos: number; // How many public repositories the user has
  created_at: string;   // The date the account was created (ISO 8601 format)
}

// This function fetches a GitHub user's profile.
// "async" means this function does work that takes time (a network request)
// and returns a Promise -- a value that will arrive in the future.
async function getUser(username: string): Promise<User> {
  // "fetch" sends an HTTP request to the given URL.
  // "await" pauses execution until the request completes.
  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  // If the server returned an error status (like 404 Not Found),
  // we throw an error so the calling code knows something went wrong.
  if (!response.ok) {
    throw new Error(`User not found: ${response.status}`);
  }

  // Parse the response body from JSON text into a JavaScript object.
  // We tell TypeScript the result matches our User interface
  // using "as User" -- this is called a type assertion.
  const data: User = await response.json() as User;

  // Return the parsed user object to whoever called this function.
  return data;
}

// Call the function with a real GitHub username.
// ".then()" runs when the Promise resolves (succeeds).
// ".catch()" runs if anything threw an error.
getUser("marvelken")
  .then((user) => {
    // Log the user's name and repo count to the console.
    console.log(`${user.login} has ${user.public_repos} public repos`);
    console.log(`Account created: ${user.created_at}`);
  })
  .catch((error) => {
    // If the fetch failed or the user wasn't found, log the error.
    console.error(error.message);
  });
```

**What this code does:** It fetches your GitHub profile using the same API endpoint we documented in the Day 7 exercise, then prints your username, repo count, and account creation date to the console.

### Key TypeScript concepts demonstrated

- **Interfaces** define the expected shape of data.
- **Async/await** handles operations that take time (like network requests).
- **Type assertions** (`as User`) tell TypeScript what type a value is when it can't infer it.
- **Error handling** with `if (!response.ok)` and `.catch()` prevents silent failures.
