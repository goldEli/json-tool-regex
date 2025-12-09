# Implement Confirm Modal and Fix Route Index Error Messages

## Overview
I'll implement two features: replacing toast notifications with a confirm modal for save operations, and fixing the route index mismatch in error messages.

## Implementation Steps

### 1. Add Confirm Modal to Main Page
- Import AlertDialog components from shadcn/ui
- Add state for controlling the confirm dialog
- Replace the direct save call with a dialog trigger
- Implement dialog content with confirmation message
- Add confirm and cancel actions

### 2. Fix Route Index Error Messages
- Modify the validation logic to use the original index (not sorted index) for error messages
- Update the API to return error messages with the correct route index
- Ensure the client-side error display shows the correct index that matches the UI

### 3. Update Error Handling
- Remove toast.error calls and replace with appropriate UI feedback
- Show success message in the dialog or as a simple message
- Ensure error messages correctly reference the route indices shown in the UI

### 4. Update Success Feedback
- Implement a success message display after saving
- Remove toast.success calls

## Files to Update
- `app/page.tsx` - Add confirm modal and update save logic
- `lib/routes.ts` - Fix validation to use correct indices
- `app/api/routes/route.ts` - Update API to return correct route indices
- Remove sonner import if no longer needed

## Technical Details
- Use shadcn/ui AlertDialog components for the confirm modal
- Ensure route indices in error messages match the UI display
- Implement proper state management for the dialog
- Maintain a smooth user experience with clear feedback

## Expected Behavior
- Clicking "Save Changes" opens a confirm dialog
- Confirming saves the changes with proper success/error feedback
- Error messages reference the correct route indices
- No more toast notifications
- Better user control over save operations