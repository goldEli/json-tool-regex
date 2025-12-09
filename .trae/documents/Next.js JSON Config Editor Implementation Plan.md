# Next.js JSON Config Editor Implementation Plan

## Overview
I'll implement a full-stack Next.js application to edit the `config/routes.json` file with the following features:

## Implementation Steps

### 1. Type Definitions
- Create `types/routes.ts` to define the data structure for routes
- Define interfaces for Route, Rule, TestCase, etc.

### 2. API Route Handler
- Create `app/api/routes/route.ts` to handle:
  - GET: Read `config/routes.json` and return as JSON
  - POST: Validate and write updated routes back to `config/routes.json`
  - Add input validation using TypeScript interfaces

### 3. Frontend Components
- Create `components/RouteList.tsx` to display the list of routes
- Create `components/RouteForm.tsx` for editing individual routes
- Create `components/RuleEditor.tsx` for adding/removing rules
- Create `components/TestCaseEditor.tsx` for adding/removing test cases
- Use shadcn/ui components (Button, Input, Textarea, etc.)
- Implement form validation

### 4. Main Page
- Update `app/page.tsx` to integrate all components
- Add save functionality with API call
- Implement loading and error states

### 5. Utility Functions
- Create `lib/routes.ts` for:
  - Reading/writing routes file
  - Validating route data
  - Generating unique IDs for new routes

## Key Features
- **CRUD Operations**: Create, Read, Update, Delete routes
- **Nested Editing**: Add/remove rules and test cases
- **Data Validation**: Ensure valid JSON structure
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Real-time Updates**: Save changes with a single click

## Technical Details
- **Next.js App Router** for API and page routing
- **TypeScript** for type safety
- **shadcn/ui** for consistent UI components
- **Tailwind CSS** for styling
- **File System API** for reading/writing JSON files

## Files to Create/Update
- `types/routes.ts` - Type definitions
- `app/api/routes/route.ts` - API endpoint
- `components/RouteList.tsx` - Route list component
- `components/RouteForm.tsx` - Route editing form
- `components/RuleEditor.tsx` - Rule editor
- `components/TestCaseEditor.tsx` - Test case editor
- `lib/routes.ts` - Utility functions
- `app/page.tsx` - Main page
- Update `README.md` - Add running instructions

## Running the Application
The application will be run using pnpm:
```
pnpm install && pnpm dev
```