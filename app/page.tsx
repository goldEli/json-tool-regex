'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RouteWithId } from '@/types/routes';
import RouteList from '@/components/RouteList';

export default function Home() {
  const [routes, setRoutes] = useState<RouteWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        setError('Failed to load routes. Please try again.');
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
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routes),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save routes');
      }

      setSuccess('Routes saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save routes. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading routes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8 font-sans">
      <main className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Header and Save Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white">
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
          <div className="space-y-2">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {success}
              </div>
            )}
          </div>

          {/* Route List */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6">
            <RouteList routes={routes} onRoutesChange={setRoutes} />
          </div>
        </div>
      </main>
    </div>
  );
}