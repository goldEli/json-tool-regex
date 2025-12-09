import React from 'react';
import { RouteWithId } from '@/types/routes';
import RouteForm from './RouteForm';

interface RouteListProps {
  routes: RouteWithId[];
  onRoutesChange: (routes: RouteWithId[]) => void;
}

const RouteList: React.FC<RouteListProps> = ({ routes, onRoutesChange }) => {
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
      <h2 className="text-2xl font-bold">Routes Configuration</h2>

      <div className="space-y-4">
        {routes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No routes found. Click &quot;Add New Route&quot; to get started.
          </div>
        ) : (
          routes.map((route, index) => (
            <RouteForm
              key={route.id}
              route={route}
              index={index + 1}
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