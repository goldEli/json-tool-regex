import { NextRequest, NextResponse } from 'next/server';
import { Routes } from '@/types/routes';
import { addIdsToRoutes, validateRoutesWithErrors } from '@/lib/routes';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ROUTES_FILE_PATH = path.join(process.cwd(), 'config', 'routes.json');

// Read routes from the config file
const readRoutes = (): Routes => {
  try {
    const content = readFileSync(ROUTES_FILE_PATH, 'utf-8');
    return JSON.parse(content) as Routes;
  } catch (error) {
    console.error('Error reading routes file:', error);
    return [];
  }
};

// Write routes to the config file
const writeRoutes = (routes: Routes): void => {
  try {
    writeFileSync(ROUTES_FILE_PATH, JSON.stringify(routes, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing routes file:', error);
    throw new Error('Failed to write routes file');
  }
};

export async function GET() {
  try {
    const routes = readRoutes();
    const routesWithIds = addIdsToRoutes(routes);
    return NextResponse.json(routesWithIds);
  } catch {
    return NextResponse.json({ error: 'Failed to read routes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate that we received an array of routes
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
    
    // Remove IDs from routes before validation and writing
    const routesWithoutIds = body.map(({ ...route }) => route) as Routes;
    
    // Validate each route with detailed error messages
    const { isValid, errors } = validateRoutesWithErrors(routesWithoutIds);
    if (!isValid) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });
    }
    
    // Write the routes to the file
    writeRoutes(routesWithoutIds);
    
    return NextResponse.json({ message: 'Routes updated successfully' });
  } catch (error) {
    console.error('Error updating routes:', error);
    return NextResponse.json({ error: 'Failed to update routes' }, { status: 500 });
  }
}
