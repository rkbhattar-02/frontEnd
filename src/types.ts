export interface TestSet {
  id: string;
  name: string;
  description: string;
  testCases: TestCase[];
  createdAt: string;
  updatedAt: string;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  steps: TestStep[];
  tags: string[];
  status: 'draft' | 'ready' | 'running' | 'passed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface TestStep {
  id: string;
  type: 'keyword' | 'function' | 'assertion';
  action: string;
  parameters: Record<string, string>;
  expected: string;
}