# JSON Routes Config Editor

A Next.js application for managing and editing JSON route configurations.

## Features

- **CRUD Operations**: Create, Read, Update, Delete routes
- **Nested Editing**: Add/remove rules and test cases for each route
- **Data Validation**: Ensure valid JSON structure before saving
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Real-time Updates**: Save changes with a single click
- **Built-in API**: Uses Next.js Route Handlers for backend functionality

## Tech Stack

- **Next.js** (App Router, TypeScript)
- **shadcn/ui** + **Tailwind CSS** for UI
- **pnpm** for package management

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **View Routes**: The main page displays all routes from `config/routes.json`
2. **Edit Route**: Click on any route to expand and edit its details
3. **Add Route**: Click "Add New Route" to create a new route configuration
4. **Delete Route**: Click "Delete Route" to remove a route
5. **Add Rules/Test Cases**: Use the "Add Rule" or "Add Test Case" buttons to add items
6. **Save Changes**: Click "Save Changes" to write updates back to `config/routes.json`

## Project Structure

```
├── app/
│   ├── api/
│   │   └── routes/route.ts    # API endpoint for routes
│   └── page.tsx                # Main application page
├── components/                 # React components
│   ├── RouteForm.tsx           # Route editing form
│   ├── RouteList.tsx           # Route list display
│   ├── RuleEditor.tsx          # Rule editing component
│   ├── TestCaseEditor.tsx      # Test case editing component
│   └── ui/                     # shadcn/ui components
├── config/
│   └── routes.json             # Routes configuration file
├── lib/                        # Utility functions
└── types/                      # TypeScript type definitions
```

## Configuration File Format

The `config/routes.json` file contains an array of route objects with the following structure:

```json
[
  {
    "path": "/example/path",
    "usage": "Example usage",
    "project": "example-project",
    "priority": 1,
    "rule": ["^/example/path/"],
    "testCases": ["/example/path/test"]
  }
]
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
