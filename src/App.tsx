import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TestSetList } from './components/TestSetList';
import { TestEditor } from './components/TestEditor';
import type { TestSet, TestCase } from './types';

// Mock data for initial development
const mockTestSets: TestSet[] = [
  {
    id: '1',
    name: 'Login Flow Tests',
    description: 'Test cases for user authentication',
    testCases: [
      {
        id: '1',
        name: 'Valid Login',
        description: 'Test successful login with valid credentials',
        steps: [],
        tags: ['authentication', 'smoke-test'],
        status: 'ready',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Invalid Password',
        description: 'Test login failure with invalid password',
        steps: [],
        tags: ['authentication', 'negative-test'],
        status: 'ready',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'User Registration',
    description: 'Test cases for new user registration',
    testCases: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function App() {
  const [testSets, setTestSets] = useState<TestSet[]>(mockTestSets);
  const [selectedTestSet, setSelectedTestSet] = useState<TestSet | null>(null);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [showNewTestSetDialog, setShowNewTestSetDialog] = useState(false);
  const [showNewTestCaseDialog, setShowNewTestCaseDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleCreateTestSet = () => {
    setNewItemName('');
    setShowNewTestSetDialog(true);
  };

  const handleCreateTestCase = () => {
    setNewItemName('');
    setShowNewTestCaseDialog(true);
  };

  const confirmTestSetCreation = () => {
    const newTestSet: TestSet = {
      id: String(testSets.length + 1),
      name: newItemName || `New Test Set ${testSets.length + 1}`,
      description: 'Description of the new test set',
      testCases: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTestSets([...testSets, newTestSet]);
    setSelectedTestSet(newTestSet);
    setShowNewTestSetDialog(false);
  };

  const confirmTestCaseCreation = () => {
    if (!selectedTestSet) return;

    const newTestCase: TestCase = {
      id: String(selectedTestSet.testCases.length + 1),
      name: newItemName || `New Test Case ${selectedTestSet.testCases.length + 1}`,
      description: 'Description of the new test case',
      steps: [],
      tags: [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTestSet = {
      ...selectedTestSet,
      testCases: [...selectedTestSet.testCases, newTestCase]
    };

    setTestSets(testSets.map(ts => 
      ts.id === selectedTestSet.id ? updatedTestSet : ts
    ));
    setSelectedTestSet(updatedTestSet);
    setSelectedTestCase(newTestCase);
    setShowNewTestCaseDialog(false);
  };

  return (
    <div className="flex h-screen bg-white relative">
      <Sidebar 
        testSets={testSets}
        selectedTestSet={selectedTestSet}
        onSelectTestSet={setSelectedTestSet}
        onCreateTestSet={handleCreateTestSet}
      />
      <TestSetList 
        selectedTestSet={selectedTestSet}
        onSelectTestCase={setSelectedTestCase}
        onCreateTestCase={handleCreateTestCase}
      />
      <TestEditor />

      {/* New Test Set Dialog */}
      {showNewTestSetDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Test Set</h2>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter test set name"
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewTestSetDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmTestSetCreation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Test Case Dialog */}
      {showNewTestCaseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Test Case</h2>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter test case name"
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewTestCaseDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmTestCaseCreation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;