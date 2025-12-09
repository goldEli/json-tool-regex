import React from 'react';
import { Button } from '@/components/ui/button';

interface RuleEditorProps {
  rules: string[];
  onRulesChange: (rules: string[]) => void;
}

const RuleEditor: React.FC<RuleEditorProps> = ({ rules, onRulesChange }) => {
  const handleAddRule = () => {
    onRulesChange([...rules, '']);
  };

  const handleRemoveRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    onRulesChange(newRules);
  };

  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    onRulesChange(newRules);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Rules</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddRule}
        >
          Add Rule
        </Button>
      </div>
      <div className="space-y-1">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              placeholder="Enter rule..."
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon-sm"
              onClick={() => handleRemoveRule(index)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuleEditor;