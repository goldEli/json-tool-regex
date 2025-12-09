# Switch Application to Permanent Night Mode

## Overview
I'll implement permanent night mode by removing theme switching functionality and hardcoding dark theme throughout the application.

## Implementation Steps

### 1. Update Theme Provider and Layout
- Remove `useTheme` hook usage from `components/ui/sonner.tsx`
- Hardcode `dark` theme in the Toaster component
- Update `app/layout.tsx` to remove any theme-related providers if present
- Set dark theme as default in metadata if needed

### 2. Update Component Styling
- Ensure all components use dark mode classes
- Remove any conditional theming logic
- Verify Tailwind dark mode variants are properly applied

### 3. Check for Theme Toggle Functionality
- Search for any theme toggle components or buttons
- Remove any theme switching logic from the codebase
- Ensure no remaining references to light mode exist

### 4. Verify Dark Mode Compatibility
- Check that all text and background colors are readable in dark mode
- Ensure form elements, buttons, and interactive components look correct
- Verify that toast notifications and other UI elements display properly in dark mode

## Files to Update
- `components/ui/sonner.tsx` - Hardcode dark theme for toasts
- `app/layout.tsx` - Remove theme provider if present
- Any files containing theme toggle functionality
- Any components with conditional theming logic

## Technical Details
- Use Tailwind CSS dark mode variants
- Hardcode `dark` theme in all theme-related components
- Remove `next-themes` dependency if no longer needed
- Ensure consistent dark mode styling throughout the application