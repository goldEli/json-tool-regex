'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RouteWithId } from '@/types/routes';
import RouteList from '@/components/RouteList';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Home() {
  const [routes, setRoutes] = useState<RouteWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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
        setModalTitle('Error');
        setModalDescription('Failed to load routes. Please try again.');
        setIsSuccess(false);
        setShowModal(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Handle adding new route
  const handleAddRoute = () => {
    const newRoute: RouteWithId = {
      id: Math.random().toString(36).substr(2, 9),
      path: '',
      usage: '',
      project: '',
      priority: 1,
      rule: [''],
      testCases: [''],
    };
    setRoutes([...routes, newRoute]);
  };

  // Handle saving routes
  const handleSave = async () => {
    setSaving(true);

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
        
        let errorDescription = 'Failed to save routes';
        
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
          errorDescription = displayErrorMessages.join('\n');
        } else if (errorData.error) {
          errorDescription = errorData.error;
        }
        
        setModalTitle('Error');
        setModalDescription(errorDescription);
        setIsSuccess(false);
        setShowModal(true);
        
        throw new Error(errorDescription);
      }

      setModalTitle('Success');
      setModalDescription('Routes saved successfully!');
      setIsSuccess(true);
      setShowModal(true);
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
          {/* Header and Buttons */}
          <div className="sticky top-0 z-10 bg-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                JSON Routes Config Editor
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and edit your routes configuration
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                type="button"
                onClick={handleAddRoute}
                className="w-full sm:w-auto"
              >
                Add New Route
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          {/* Route List */}
          <div className="bg-gray-900 rounded-lg shadow-sm border p-6">
            <RouteList routes={routes} onRoutesChange={setRoutes} />
          </div>

          {/* Centered Modal for Success/Error Messages */}
          <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent className={isSuccess ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}>
              <AlertDialogHeader>
                <AlertDialogTitle className={isSuccess ? "text-green-400" : "text-red-400"}>
                  {modalTitle}
                </AlertDialogTitle>
                <AlertDialogDescription className={isSuccess ? "text-green-300" : "text-red-300"}>
                  {modalDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setShowModal(false)}>
                  OK
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
}