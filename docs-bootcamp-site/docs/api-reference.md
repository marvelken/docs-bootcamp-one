---
sidebar_position: 2
title: "GitHub API Reference"
---

# GitHub Users and Repositories API Reference

**Base URL:** `https://api.github.com`

All endpoints return JSON. Include the header `Accept: application/vnd.github+json` in every request.

---

## 1. Get a user

Retrieve public profile information for a GitHub user.

### Request

**Method:** `GET`
**URL:** `https://api.github.com/users/{username}`

#### Headers

| Header | Value | Required |
|--------|-------|----------|
| Accept | `application/vnd.github+json` | Yes |

#### Path parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| username | string | Yes | The handle of the GitHub user (e.g., `marvelken`). |

### Example request

```bash
curl -H "Accept: application/vnd.github+json" \
  https://api.github.com/users/marvelken
```

### Example response

**Status: 200 OK**

```json
{
  "login": "marvelken",
  "id": 85273989,
  "avatar_url": "https://avatars.githubusercontent.com/u/85273989?v=4",
  "html_url": "https://github.com/marvelken",
  "type": "User",
  "name": "Marvel Ken-Anele",
  "company": "Marvel ken",
  "bio": "Getting Better with this syntax each day.",
  "location": null,
  "public_repos": 57,
  "followers": 1,
  "following": 1,
  "created_at": "2021-06-03T05:20:39Z",
  "updated_at": "2026-04-29T21:11:47Z"
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| login | string | The user's GitHub username. |
| id | integer | Unique numeric identifier for the user. |
| avatar_url | string | URL to the user's profile image. |
| html_url | string | Link to the user's public GitHub profile page. |
| type | string | Account type. Usually "User" or "Organization". |
| name | string | The user's display name (can be null). |
| company | string | Company listed on the user's profile (can be null). |
| bio | string | Short biography from the user's profile (can be null). |
| location | string | Location listed on profile (can be null). |
| public_repos | integer | Number of public repositories. |
| followers | integer | Number of users following this account. |
| following | integer | Number of users this account follows. |
| created_at | string | ISO 8601 timestamp of when the account was created. |
| updated_at | string | ISO 8601 timestamp of the last profile update. |

### Error codes

| Status | Description |
|--------|-------------|
| 200 | Success. User data returned. |
| 404 | User not found. The username does not exist. |

---

## 2. Get a repository

Retrieve detailed information about a public GitHub repository.

### Request

**Method:** `GET`
**URL:** `https://api.github.com/repos/{owner}/{repo}`

#### Headers

| Header | Value | Required |
|--------|-------|----------|
| Accept | `application/vnd.github+json` | Yes |

#### Path parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| owner | string | Yes | The username or organization that owns the repo (e.g., `facebook`). |
| repo | string | Yes | The repository name (e.g., `react`). |

### Example request

```bash
curl -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/facebook/react
```

### Example response

**Status: 200 OK**

```json
{
  "id": 10270250,
  "name": "react",
  "full_name": "facebook/react",
  "html_url": "https://github.com/facebook/react",
  "description": "The library for web and native user interfaces.",
  "fork": false,
  "homepage": "https://react.dev",
  "language": "JavaScript",
  "stargazers_count": 245043,
  "watchers_count": 245043,
  "forks_count": 51045,
  "open_issues_count": 1301,
  "default_branch": "main",
  "license": { "key": "mit", "name": "MIT License", "spdx_id": "MIT" },
  "topics": ["declarative", "frontend", "javascript", "library", "react", "ui"],
  "created_at": "2013-05-24T16:15:54Z",
  "updated_at": "2026-05-15T18:45:19Z"
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| id | integer | Unique numeric identifier for the repository. |
| name | string | Repository name. |
| full_name | string | Full slug in owner/repo format. |
| html_url | string | Link to the repository on github.com. |
| description | string | Short description of the repository (can be null). |
| fork | boolean | Whether this repo is a fork of another. |
| homepage | string | Project homepage URL (can be null). |
| language | string | Primary programming language (can be null). |
| stargazers_count | integer | Number of stars. |
| watchers_count | integer | Number of watchers. |
| forks_count | integer | Number of forks. |
| open_issues_count | integer | Number of open issues and pull requests combined. |
| default_branch | string | Name of the default branch (usually main or master). |
| license | object | License information. Contains spdx\_id and name. |
| topics | array | List of topic tags applied to the repository. |
| created_at | string | ISO 8601 timestamp of repository creation. |
| updated_at | string | ISO 8601 timestamp of the last push or update. |

### Error codes

| Status | Description |
|--------|-------------|
| 200 | Success. Repository data returned. |
| 404 | Repository not found. Either the owner or repo name is incorrect, or the repo is private. |

---

## 3. List repository issues

Retrieve a list of issues for a given repository. Returns open issues by default. Supports filtering and pagination through query parameters.

### Request

**Method:** `GET`
**URL:** `https://api.github.com/repos/{owner}/{repo}/issues`

#### Headers

| Header | Value | Required |
|--------|-------|----------|
| Accept | `application/vnd.github+json` | Yes |

#### Path parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| owner | string | Yes | The username or organization that owns the repo. |
| repo | string | Yes | The repository name. |

#### Query parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| state | string | No | open | Filter by issue state. Options: `open`, `closed`, `all`. |
| labels | string | No | — | Comma-separated list of label names to filter by. |
| sort | string | No | created | Sort results by: `created`, `updated`, `comments`. |
| direction | string | No | desc | Sort direction: `asc` or `desc`. |
| per_page | integer | No | 30 | Number of results per page (max 100). |
| page | integer | No | 1 | Page number for pagination. |

### Example request

```bash
curl -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/facebook/react/issues?state=open&per_page=3"
```

### Example response

**Status: 200 OK**

```json
[
  {
    "id": 4450231280,
    "number": 36477,
    "title": "[react-compiler] Fix GeneratedSource Symbol leaking...",
    "state": "open",
    "html_url": "https://github.com/facebook/react/pull/36477",
    "user": { "login": "MD-Mushfiqur123", "id": 206438734 },
    "labels": [{ "name": "CLA Signed", "color": "e7e7e7" }],
    "created_at": "2026-05-15T00:10:46Z",
    "updated_at": "2026-05-15T00:10:52Z",
    "comments": 0
  }
]
```

### Response fields (per issue object)

| Field | Type | Description |
|-------|------|-------------|
| id | integer | Unique numeric identifier for the issue. |
| number | integer | Issue number within the repository. |
| title | string | Title of the issue. |
| state | string | Current state: `open` or `closed`. |
| html_url | string | Link to the issue on github.com. |
| user | object | Author of the issue. Contains `login` and `id`. |
| labels | array | List of labels applied. Each label has `name` and `color`. |
| created_at | string | ISO 8601 timestamp of when the issue was opened. |
| updated_at | string | ISO 8601 timestamp of the last update. |
| comments | integer | Number of comments on the issue. |

### Error codes

| Status | Description |
|--------|-------------|
| 200 | Success. Array of issue objects returned. |
| 404 | Repository not found. Either the owner or repo name is incorrect. |
| 422 | Invalid query parameter value (e.g., `state=banana` instead of `open`/`closed`/`all`). |

---

## Authentication note

All three endpoints above work without authentication for public data. However, unauthenticated requests are rate-limited to **60 requests per hour**. To increase this to **5,000 requests per hour**, include a personal access token:

```bash
curl -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/users/marvelken
```

Generate a token at [github.com/settings/tokens](https://github.com/settings/tokens).
