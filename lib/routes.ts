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

// Validate a single route
export const validateRoute = (route: Route): boolean => {
  return (
    typeof route.path === 'string' &&
    route.path.trim() !== '' &&
    typeof route.usage === 'string' &&
    typeof route.project === 'string' &&
    typeof route.priority === 'number' &&
    Array.isArray(route.rule) &&
    route.rule.every((r) => typeof r === 'string') &&
    Array.isArray(route.testCases) &&
    route.testCases.every((tc) => typeof tc === 'string')
  );
};

// Validate all routes
export const validateRoutes = (routes: Routes): boolean => {
  return routes.every(validateRoute);
};

// Convert routes with IDs back to regular routes
export const convertRoutesWithIdToRoutes = (routes: RoutesWithId): Routes => {
  return routes.map(({ ...route }) => route);
};