export interface Route {
  path: string;
  usage: string;
  project: string;
  priority: number;
  rule: string[];
  testCases: string[];
}

export interface RouteWithId extends Route {
  id: string;
}

export type Routes = Route[];

export type RoutesWithId = RouteWithId[];