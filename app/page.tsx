'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RouteWithId } from '@/types/routes';
import RouteList from '@/components/RouteList';

export default function Home() {
  const [routes, setRoutes] = useState<RouteWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Fetch routes from API on initial load
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/api/routes');
        if (!response.ok) {
          throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        setRoutes(data);
      } catch (err) {
        setErrorMessages(['Failed to load routes. Please try again.']);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Handle saving routes
  const handleSave = async () => {
    setSaving(true);
    setErrorMessages([]);
    setShowSuccess(false);

    try {
      // Sort routes by priority before sending to API (ascending order)
      const sortedRoutes = [...routes].sort((a, b) => a.priority - b.priority);

      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sortedRoutes),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Map error indices to match the UI display (not sorted order)
          const displayErrorMessages = errorData.errors.map((error: string) => {
            // Extract the route number from the error message and convert to display index
            return error.replace(/Route (\d+):/, (match, routeNumber) => {
              // Find the corresponding route in the original list
              const routeIndex = parseInt(routeNumber) - 1;
              const originalRoute = sortedRoutes[routeIndex];
              if (originalRoute) {
                // Find the index in the original (unsorted) list
                const displayIndex = routes.findIndex(r => r.id === originalRoute.id) + 1;
                return `Route ${displayIndex}:`;
              }
              return match;
            });
          });
          setErrorMessages(displayErrorMessages);
        } else {
          // Show general error
          setErrorMessages([errorData.error || 'Failed to save routes']);
        }
        
        throw new Error(errorData.error || 'Failed to save routes');
      }

      setShowSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading routes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 font-sans">
      <main className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Header and Save Button */}
          <div className="sticky top-0 z-10 bg-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                JSON Routes Config Editor
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and edit your routes configuration
              </p>
            </div>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

          {/* Status Messages */}
          {showSuccess && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-md">
              Routes saved successfully!
            </div>
          )}

          {errorMessages.length > 0 && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-md">
              <h3 className="font-medium mb-2">Validation Errors:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Route List */}
          <div className="bg-gray-900 rounded-lg shadow-sm border p-6">
            <RouteList routes={routes} onRoutesChange={setRoutes} />
          </div>
        </div>
      </main>
    </div>
  );
}