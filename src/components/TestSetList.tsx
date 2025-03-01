import React, { useState } from 'react';
import { FileText, Plus, ChevronRight, Play, Square, Trash2, Lock } from 'lucide-react';
import type { TestSet, TestCase } from '../types';

interface TestSetListProps {
  selectedTestSet: TestSet | null;
  onSelectTestCase: (testCase: TestCase) => void;
  onCreateTestCase: () => void;
}

export function TestSetList({ selectedTestSet, onSelectTestCase, onCreateTestCase }: TestSetListProps) {
  const [selectedTestCases, setSelectedTestCases] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  if (!selectedTestSet) {
    return (
      <div className="border-r border-gray-200 w-72 p-4 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Select a test set to view cases</p>
      </div>
    );
  }

  const toggleTestCase = (id: string) => {
    const newSelected = new Set(selectedTestCases);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTestCases(newSelected);
  };

  const handleDeleteTestCases = () => {
    if (selectedTestCases.size === 0) {
      showMessage('Please select a test case');
      return;
    }
    showMessage(`Deleting ${selectedTestCases.size} test case(s)`);
  };

  const handlePlayTestCases = () => {
    if (selectedTestCases.size === 0) {
      showMessage('Please select a test case');
      return;
    }
    showMessage('This will run the selected test case(s)');
  };

  const handleStopTestCases = () => {
    if (selectedTestCases.size === 0) {
      showMessage('Please select a test case');
      return;
    }
    showMessage('This will stop execution of the selected test case(s)');
  };

  const handleLockTestCases = () => {
    if (selectedTestCases.size === 0) {
      showMessage('Please select a test case');
      return;
    }
    showMessage('This will lock the selected test case(s) from editing');
  };

  const showMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="border-r border-gray-200 w-72 p-4 bg-gray-50 overflow-y-auto relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{selectedTestSet.name}</h2>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={onCreateTestCase}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors group relative flex-1 flex items-center justify-center"
            title="New Test Case"
          >
            <Plus className="w-5 h-5" />
            <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              New Test Case
            </span>
          </button>
          <button 
            onClick={handlePlayTestCases}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors group relative flex-1 flex items-center justify-center"
            title="Execute Test Case"
          >
            <Play className="w-5 h-5" />
            <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Execute Test Case
            </span>
          </button>
          <button 
            onClick={handleStopTestCases}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors group relative flex-1 flex items-center justify-center"
            title="Stop Execution"
          >
            <Square className="w-5 h-5" />
            <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Stop Execution
            </span>
          </button>
          <button 
            onClick={handleDeleteTestCases}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors group relative flex-1 flex items-center justify-center"
            title="Delete Test Case"
          >
            <Trash2 className="w-5 h-5" />
            <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Delete Test Case
            </span>
          </button>
          <button 
            onClick={handleLockTestCases}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors group relative flex-1 flex items-center justify-center"
            title="Lock Test Case"
          >
            <Lock className="w-5 h-5" />
            <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Lock Test Case
            </span>
          </button>
        </div>
      </div>
      
      <div className="space-y-1">
        {selectedTestSet.testCases.map((testCase) => (
          <div
            key={testCase.id}
            className="flex items-center gap-2 p-2 rounded hover:bg-white transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedTestCases.has(testCase.id)}
              onChange={() => toggleTestCase(testCase.id)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <button
              onClick={() => onSelectTestCase(testCase)}
              className="flex-1 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <div className="font-medium">{testCase.name}</div>
                <div className="text-sm text-gray-500">{testCase.description.slice(0, 50)}...</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700 transition-opacity duration-300">
          {popupMessage}
        </div>
      )}
    </div>
  );
}