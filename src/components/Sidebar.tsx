import React, { useState } from 'react';
import { FolderTree, GitBranch, Settings, Play, Plus, Square, Trash2, Lock, Github as Git, Construction } from 'lucide-react';
import type { TestSet } from '../types';

interface SidebarProps {
  testSets: TestSet[];
  selectedTestSet: TestSet | null;
  onSelectTestSet: (testSet: TestSet) => void;
  onCreateTestSet: () => void;
}

export function Sidebar({ testSets, selectedTestSet, onSelectTestSet, onCreateTestSet }: SidebarProps) {
  const [selectedTestSets, setSelectedTestSets] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const toggleTestSet = (id: string) => {
    const newSelected = new Set(selectedTestSets);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTestSets(newSelected);
  };

  const handleDeleteTestSets = () => {
    if (selectedTestSets.size === 0) {
      showMessage('Please select a test set');
      return;
    }
    // Here we'll implement the actual deletion later
    showMessage(`Deleting ${selectedTestSets.size} test set(s)`);
  };

  const handlePlayTestSets = () => {
    if (selectedTestSets.size === 0) {
      showMessage('Please select a test set');
      return;
    }
    showMessage('This will run the selected test set(s)');
  };

  const handleStopTestSets = () => {
    if (selectedTestSets.size === 0) {
      showMessage('Please select a test set');
      return;
    }
    showMessage('This will stop execution of the selected test set(s)');
  };

  const handleLockTestSets = () => {
    if (selectedTestSets.size === 0) {
      showMessage('Please select a test set');
      return;
    }
    showMessage('This will lock the selected test set(s) from editing');
  };

  const showMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col relative">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FolderTree className="w-6 h-6" />
          Test Manager
        </h1>
      </div>
      
      <div className="flex-1 p-4">
        <div className="bg-gray-800 p-2 rounded-lg mb-4">
          <div className="flex items-center justify-between gap-2">
            <button 
              onClick={onCreateTestSet}
              className="p-2 hover:bg-gray-700 rounded-full border border-gray-600 transition-colors group relative flex-1 flex items-center justify-center"
              title="New Test Set"
            >
              <Plus className="w-5 h-5" />
              <span className="absolute hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                New Test Set
              </span>
            </button>
            <button 
              onClick={handlePlayTestSets}
              className="p-2 hover:bg-gray-700 rounded-full border border-gray-600 transition-colors group relative flex-1 flex items-center justify-center"
              title="Execute Test Set"
            >
              <Play className="w-5 h-5" />
              <span className="absolute hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Execute Test Set
              </span>
            </button>
            <button 
              onClick={handleStopTestSets}
              className="p-2 hover:bg-gray-700 rounded-full border border-gray-600 transition-colors group relative flex-1 flex items-center justify-center"
              title="Stop Execution"
            >
              <Square className="w-5 h-5" />
              <span className="absolute hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Stop Execution
              </span>
            </button>
            <button 
              onClick={handleDeleteTestSets}
              className="p-2 hover:bg-gray-700 rounded-full border border-gray-600 transition-colors group relative flex-1 flex items-center justify-center"
              title="Delete Test Set"
            >
              <Trash2 className="w-5 h-5" />
              <span className="absolute hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Delete Test Set
              </span>
            </button>
            <button 
              onClick={handleLockTestSets}
              className="p-2 hover:bg-gray-700 rounded-full border border-gray-600 transition-colors group relative flex-1 flex items-center justify-center"
              title="Lock Test Set"
            >
              <Lock className="w-5 h-5" />
              <span className="absolute hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Lock Test Set
              </span>
            </button>
          </div>
        </div>
        
        <div className="space-y-1">
          {testSets.map((testSet) => (
            <div
              key={testSet.id}
              className={`flex items-center gap-2 p-2 rounded transition-colors ${
                selectedTestSet?.id === testSet.id ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTestSets.has(testSet.id)}
                onChange={() => toggleTestSet(testSet.id)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <button
                onClick={() => onSelectTestSet(testSet)}
                className="flex-1 flex items-center gap-2 text-left"
              >
                <FolderTree className="w-4 h-4" />
                {testSet.name}
              </button>
            </div>
          ))}
        </div>

        <nav className="space-y-2 mt-8">
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
            <Play className="w-4 h-4" />
            Test Runner
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
            <Git className="w-4 h-4" />
            Commit to Git
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
            <Construction className="w-4 h-4" />
            Run Jenkins Build
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
            <Settings className="w-4 h-4" />
            Settings
          </a>
        </nav>
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