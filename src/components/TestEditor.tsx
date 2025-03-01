import React, { useState, useEffect, useRef } from 'react';
import { Play, Save, Plus, Trash2 } from 'lucide-react';

// Mock data for demonstration
const KEYWORDS = [
  'click',
  'type',
  'assert',
  'waitFor',
  'navigate',
  'select',
  'hover',
  'scroll',
  'dragAndDrop',
];

const OBJECTS = [
  'loginButton',
  'emailInput',
  'passwordInput',
  'submitButton',
  'errorMessage',
  'userMenu',
  'logoutButton',
];

export function TestEditor() {
  const [testContent, setTestContent] = useState(`# Test Case: User Login

Description:
Verify that users can successfully log in with valid credentials

Steps:
1. Navigate to "/login"
2. Type "test@example.com" into "#email"
3. Type "password123" into "#password"
4. Click "Sign In" button
5. Assert URL is "/dashboard"
6. Assert text "Welcome back" is visible

Tags: authentication, smoke-test
Expected Result: User should be logged in and redirected to dashboard`);
  
  const [showKeywords, setShowKeywords] = useState(false);
  const [showObjects, setShowObjects] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setShowKeywords(true);
        setShowObjects(false);
        setSelectedIndex(0);
      } else if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        setShowObjects(true);
        setShowKeywords(false);
        setSelectedIndex(0);
      }

      if (showKeywords || showObjects) {
        const items = showKeywords ? KEYWORDS : OBJECTS;
        
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % items.length);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
            break;
          case 'Enter':
            e.preventDefault();
            const selectedItem = items[selectedIndex];
            if (selectedItem) {
              insertAtCursor(selectedItem);
            }
            break;
          case 'Escape':
            e.preventDefault();
            setShowKeywords(false);
            setShowObjects(false);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showKeywords, showObjects, selectedIndex]);

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const newContent = 
      testContent.substring(0, cursorPosition.start) + 
      text + 
      testContent.substring(cursorPosition.end);
    
    setTestContent(newContent);
    setShowKeywords(false);
    setShowObjects(false);
    
    // Calculate new cursor position
    const newPosition = cursorPosition.start + text.length;
    
    // Update state
    setTestContent(newContent);
    setCursorPosition({ start: newPosition, end: newPosition });
    
    // Update textarea cursor position
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    });
  };

  const handleSelectionChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      setCursorPosition({
        start: textarea.selectionStart,
        end: textarea.selectionEnd
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Test Case Editor</h2>
          <p className="text-sm text-gray-600">Press Ctrl+K for keywords, Ctrl+O for objects</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Run Tests
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto relative">
        <div className="h-full flex flex-col">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={testContent}
              onChange={(e) => setTestContent(e.target.value)}
              onSelect={handleSelectionChange}
              className="w-full h-full p-4 font-mono text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="# Test Case Title..."
            />
            
            {showKeywords && (
              <div 
                className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
                style={{
                  top: `${textareaRef.current?.offsetTop || 0}px`,
                  left: `${textareaRef.current?.offsetLeft || 0}px`
                }}
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2">Keywords (↑↓ to navigate, Enter to select)</h3>
                <div className="space-y-1">
                  {KEYWORDS.map((keyword, index) => (
                    <button
                      key={keyword}
                      onClick={() => insertAtCursor(keyword)}
                      className={`w-full text-left p-2 text-green-600 rounded ${
                        selectedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {showObjects && (
              <div 
                className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
                style={{
                  top: `${textareaRef.current?.offsetTop || 0}px`,
                  left: `${textareaRef.current?.offsetLeft || 0}px`
                }}
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2">Objects (↑↓ to navigate, Enter to select)</h3>
                <div className="space-y-1">
                  {OBJECTS.map((object, index) => (
                    <button
                      key={object}
                      onClick={() => insertAtCursor(object)}
                      className={`w-full text-left p-2 text-purple-600 rounded ${
                        selectedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      {object}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Reference</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><kbd className="px-2 py-1 bg-white border rounded-md">Ctrl + K</kbd> for keywords (green)</p>
              <p><kbd className="px-2 py-1 bg-white border rounded-md">Ctrl + O</kbd> for objects (purple)</p>
              <p><kbd className="px-2 py-1 bg-white border rounded-md">↑↓</kbd> to navigate list</p>
              <p><kbd className="px-2 py-1 bg-white border rounded-md">Enter</kbd> to select</p>
              <p><kbd className="px-2 py-1 bg-white border rounded-md">Esc</kbd> to close</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}