import React from 'react';
import { Button } from '@/components/ui/button';
import { RouteWithId } from '@/types/routes';
import RuleEditor from './RuleEditor';
import TestCaseEditor from './TestCaseEditor';

interface RouteFormProps {
  route: RouteWithId;
  onRouteChange: (route: RouteWithId) => void;
  onDeleteRoute: (id: string) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ route, onRouteChange, onDeleteRoute }) => {
  const handleChange = (field: keyof Omit<RouteWithId, 'id' | 'rule' | 'testCases'>, value: string | number) => {
    onRouteChange({
      ...route,
      [field]: value,
    });
  };

  const handleRulesChange = (rules: string[]) => {
    onRouteChange({
      ...route,
      rule: rules,
    });
  };

  const handleTestCasesChange = (testCases: string[]) => {
    onRouteChange({
      ...route,
      testCases: testCases,
    });
  };

  return (
    <div className="p-4 border rounded-lg mb-4 bg-card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Route Configuration</h3>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onDeleteRoute(route.id)}
        >
          Delete Route
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label htmlFor="path" className="text-sm font-medium">Path</label>
          <input
            id="path"
            type="text"
            value={route.path}
            onChange={(e) => handleChange('path', e.target.value)}
            placeholder="Enter path..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="usage" className="text-sm font-medium">Usage</label>
          <input
            id="usage"
            type="text"
            value={route.usage}
            onChange={(e) => handleChange('usage', e.target.value)}
            placeholder="Enter usage..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="project" className="text-sm font-medium">Project</label>
          <input
            id="project"
            type="text"
            value={route.project}
            onChange={(e) => handleChange('project', e.target.value)}
            placeholder="Enter project..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="priority" className="text-sm font-medium">Priority</label>
          <input
            id="priority"
            type="number"
            min="1"
            value={route.priority}
            onChange={(e) => handleChange('priority', parseInt(e.target.value) || 1)}
            placeholder="Enter priority..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <div className="space-y-4">
        <RuleEditor rules={route.rule} onRulesChange={handleRulesChange} />
        <TestCaseEditor testCases={route.testCases} onTestCasesChange={handleTestCasesChange} />
      </div>
    </div>
  );
};

export default RouteForm;