import { Route, Routes, RoutesWithId } from '@/types/routes';

// Generate a unique ID for new routes
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Add IDs to routes for client-side management
export const addIdsToRoutes = (routes: Routes): RoutesWithId => {
  return routes.map((route, index) => ({
    ...route,
    id: `${index}-${generateId().substr(0, 5)}`,
  }));
};

// Remove IDs from routes before writing to file
export const removeIdsFromRoutes = (routes: RoutesWithId): Routes => {
  return routes.map(({ ...route }) => route);
};

// Validate a single route and return detailed errors
export const validateRoute = (route: Route): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check required fields are not empty
  if (typeof route.path !== 'string' || route.path.trim() === '') {
    errors.push('Path is required and must be a non-empty string');
  }

  if (typeof route.usage !== 'string' || route.usage.trim() === '') {
    errors.push('Usage is required and must be a non-empty string');
  }

  if (typeof route.project !== 'string' || route.project.trim() === '') {
    errors.push('Project is required and must be a non-empty string');
  }

  if (typeof route.priority !== 'number' || route.priority < 1) {
    errors.push('Priority must be a positive number');
  }

  // Check rule array is valid and not empty
  if (!Array.isArray(route.rule)) {
    errors.push('Rule must be an array');
  } else {
    if (route.rule.length === 0) {
      errors.push('At least one rule is required');
    }
    if (!route.rule.every((r) => typeof r === 'string' && r.trim() !== '')) {
      errors.push('All rules must be non-empty strings');
    }
  }

  // Check test cases array is valid
  if (!Array.isArray(route.testCases)) {
    errors.push('Test cases must be an array');
  } else {
    if (!route.testCases.every((tc) => typeof tc === 'string')) {
      errors.push('All test cases must be strings');
    }
  }

  // Validate test cases against rules
  if (Array.isArray(route.rule) && Array.isArray(route.testCases)) {
    for (const testCase of route.testCases) {
      if (testCase.trim() === '') continue;
      
      let matches = false;
      for (const rule of route.rule) {
        try {
          const regex = new RegExp(rule);
          if (regex.test(testCase)) {
            matches = true;
            break;
          }
        } catch {
          errors.push(`Invalid regex rule: ${rule}`);
          break;
        }
      }
      
      if (!matches) {
        errors.push(`Test case "${testCase}" does not match any rule`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate all routes and return detailed errors
export const validateRoutesWithErrors = (routes: Routes): { isValid: boolean; errors: string[] } => {
  const allErrors: string[] = [];

  routes.forEach((route, index) => {
    const { isValid, errors } = validateRoute(route);
    if (!isValid) {
      allErrors.push(`Route ${index + 1}: ${errors.join(', ')}`);
    }
  });

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};

// Validate all routes (backward compatible)
export const validateRoutes = (routes: Routes): boolean => {
  return routes.every((route) => validateRoute(route).isValid);
};

// Convert routes with IDs back to regular routes
export const convertRoutesWithIdToRoutes = (routes: RoutesWithId): Routes => {
  return routes.map(({ ...route }) => route);
};