/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import React, { useState } from 'react';
import AmwayBusinessOverview from './amway-business-overview.md?raw';
import AmwayBusinessStrategy from './amway-business-strategy.md?raw';
import PVBVExplainer from './pv-bv-explainer';
import AmwaySuccessPathways from './amway-success-pathways';
import { marked } from 'marked';
import './amwayy.css';

// Define content types
type ContentItem = {
  id: string;
  title: string;
  type: 'markdown' | 'component';
  content: string | React.ComponentType;
};

const AmwayyHome: React.FC = () => {
  // Content items with direct imports
  const contentItems: ContentItem[] = [
    {
      id: 'overview',
      title: 'Amway Business Overview',
      type: 'markdown',
      content: AmwayBusinessOverview
    },
    {
      id: 'strategy',
      title: 'Amway Business Strategy',
      type: 'markdown',
      content: AmwayBusinessStrategy
    },
    {
      id: 'pv-bv',
      title: 'PV/BV System Explained',
      type: 'component',
      content: PVBVExplainer
    },
    {
      id: 'success-pathways',
      title: 'Success Pathways',
      type: 'component',
      content: AmwaySuccessPathways
    }
  ];

  // State for selected content
  const [selectedContentId, setSelectedContentId] = useState<string>('overview');
  const currentContent = contentItems.find(item => item.id === selectedContentId);

  // Render content based on its type
  const renderContent = () => {
    if (!currentContent) return <div>No content selected</div>;

    if (currentContent.type === 'markdown') {
      // Directly render markdown content
      // The assumption is that markdown files are processed by the build system
      // and their content is available as a string
    const content = currentContent.content as string;
      return (
        <div 
          className="markdown-content p-6"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
      );
    } else if (currentContent.type === 'component') {
      // Render React component
      const Component = currentContent.content as React.ComponentType;
      return <Component />;
    }

    return <div>Unknown content type</div>;
  };

  return (
    <div className="flex h-screen bg-white">
        <style jsx global>{`
            .markdown-content h1 {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
        `}</style>

      {/* Left sidebar with table of contents */}
      <div className="w-64 bg-blue-800 text-white overflow-y-auto">
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Amway Knowledge Base</h1>
        </div>
        <nav className="p-2">
          <ul>
            {contentItems.map(item => (
              <li key={item.id} className="mb-1">
                <button
                  onClick={() => setSelectedContentId(item.id)}
                  className={`w-full text-left p-3 rounded transition-colors ${
                    selectedContentId === item.id
                      ? 'bg-blue-600 font-semibold'
                      : 'hover:bg-blue-700'
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Right content area */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
};

export default AmwayyHome;