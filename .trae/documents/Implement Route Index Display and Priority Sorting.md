# Implement Route Index Display and Priority Sorting

## Overview
I'll implement two features: displaying route indices in form titles and sorting routes by priority when saving to the API.

## Implementation Steps

### 1. Update RouteForm Component
- Modify `RouteFormProps` interface to include an `index` prop
- Update the component to display the index in the title, e.g., "Route 1 Configuration"
- Ensure the index starts from 1 for better user experience

### 2. Update RouteList Component
- Modify the `RouteList` component to pass the index to each `RouteForm`
- Calculate the index based on the route's position in the array
- Ensure the index is correctly updated when routes are added, removed, or reordered

### 3. Update Save Functionality
- Modify the `handleSave` function in `app/page.tsx` to sort routes by priority before sending to API
- Implement sorting from lowest to highest priority (assuming lower numbers = higher priority)
- Ensure the sort happens just before the API call to maintain client-side display order

## Files to Update
- `components/RouteForm.tsx` - Add index prop and display in title
- `components/RouteList.tsx` - Pass index to RouteForm components
- `app/page.tsx` - Add sorting by priority in handleSave

## Technical Details
- Use TypeScript interfaces to ensure type safety
- Implement array.sort() with a custom comparator for priority sorting
- Maintain 1-based indexing for user-friendly display
- Ensure the sorting only affects the data sent to the API, not the client-side display order

## Expected Behavior
- Each route form will display its index in the title
- When saving, routes will be sorted by priority in the saved file
- Client-side display order remains unchanged for editing convenience