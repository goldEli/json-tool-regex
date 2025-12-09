import React from 'react';
import { Button } from '@/components/ui/button';

interface TestCaseEditorProps {
  testCases: string[];
  onTestCasesChange: (testCases: string[]) => void;
}

const TestCaseEditor: React.FC<TestCaseEditorProps> = ({ testCases, onTestCasesChange }) => {
  const handleAddTestCase = () => {
    onTestCasesChange([...testCases, '']);
  };

  const handleRemoveTestCase = (index: number) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    onTestCasesChange(newTestCases);
  };

  const handleTestCaseChange = (index: number, value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index] = value;
    onTestCasesChange(newTestCases);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Test Cases</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddTestCase}
        >
          Add Test Case
        </Button>
      </div>
      <div className="space-y-1">
        {testCases.map((testCase, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={testCase}
              onChange={(e) => handleTestCaseChange(index, e.target.value)}
              placeholder="Enter test case..."
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon-sm"
              onClick={() => handleRemoveTestCase(index)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseEditor;