import React from 'react';
import { Button } from '@/components/ui/button';
import { RouteWithId } from '@/types/routes';
import RouteForm from './RouteForm';
import { generateId } from '@/lib/routes';

interface RouteListProps {
  routes: RouteWithId[];
  onRoutesChange: (routes: RouteWithId[]) => void;
}

const RouteList: React.FC<RouteListProps> = ({ routes, onRoutesChange }) => {
  const handleAddRoute = () => {
    const newRoute: RouteWithId = {
      id: generateId(),
      path: '',
      usage: '',
      project: '',
      priority: 1,
      rule: [''],
      testCases: [''],
    };
    onRoutesChange([...routes, newRoute]);
  };

  const handleRouteChange = (updatedRoute: RouteWithId) => {
    const newRoutes = routes.map((route) =>
      route.id === updatedRoute.id ? updatedRoute : route
    );
    onRoutesChange(newRoutes);
  };

  const handleDeleteRoute = (id: string) => {
    const newRoutes = routes.filter((route) => route.id !== id);
    onRoutesChange(newRoutes);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Routes Configuration</h2>
        <Button type="button" onClick={handleAddRoute}>
          Add New Route
        </Button>
      </div>

      <div className="space-y-4">
        {routes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No routes found. Click &quot;Add New Route&quot; to get started.
          </div>
        ) : (
          routes.map((route) => (
            <RouteForm
              key={route.id}
              route={route}
              onRouteChange={handleRouteChange}
              onDeleteRoute={handleDeleteRoute}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RouteList;