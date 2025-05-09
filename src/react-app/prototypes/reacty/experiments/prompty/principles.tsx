import React, { useEffect, useRef, useState } from 'react';
import { TokenEfficiencyPrinciple, TokenEfficiencyExample, InfographicState } from './types';

// Token Visualization Component
const TokenVisualization: React.FC<{ 
  before: number;
  after: number;
  animationTrigger: boolean;
}> = ({ before, after, animationTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const savingsPercent = Math.round(((before - after) / before) * 100);
  
  // Animation effect
  useEffect(() => {
    if (animationTrigger) {
      let animationFrame: number;
      let startTime: number | null = null;
      const duration = 1000; // 1 second animation
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        
        setProgress(newProgress);
        
        if (newProgress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    } else {
      setProgress(0);
    }
  }, [animationTrigger]);
  
  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const innerWidth = width - (padding * 2);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(padding, 30, innerWidth, 30);
    
    // Before tokens
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(padding, 30, innerWidth, 30);
    
    // After tokens (with animation)
    const afterWidth = innerWidth * (after / before);
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(padding, 30, afterWidth * progress, 30);
    
    // Labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(`Before: ${before} tokens`, padding, 20);
    ctx.fillText(`After: ${Math.round(after * progress)} tokens`, padding + afterWidth * progress, 75);
    
    // Savings label (appears at end of animation)
    if (progress > 0.9) {
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#27ae60';
      ctx.fillText(`${savingsPercent}% Savings`, width - padding - 100, 75);
    }
  }, [before, after, progress, savingsPercent]);
  
  return (
    <div className="token-visualization">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={100}
        aria-label={`Token visualization showing ${savingsPercent}% reduction from ${before} to ${after} tokens`}
      />
    </div>
  );
};

// Example Compare Component
const ExampleCompare: React.FC<{ 
  example: TokenEfficiencyExample;
  isExpanded: boolean;
}> = ({ example, isExpanded }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className={`example-compare ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="example-columns">
        <div className="example-column before">
          <h4>Before: {example.tokensBefore} tokens</h4>
          <pre>{example.before}</pre>
        </div>
        <div className="example-column after">
          <h4>After: {example.tokensAfter} tokens</h4>
          <pre>{example.after}</pre>
        </div>
      </div>
      <TokenVisualization 
        before={example.tokensBefore} 
        after={example.tokensAfter} 
        animationTrigger={isExpanded && hovered} 
      />
    </div>
  );
};

// Principle Card Component
export const PrincipleCard: React.FC<{ 
  principle: TokenEfficiencyPrinciple;
  isActive: boolean;
  isExampleExpanded: boolean;
  onClick: () => void;
  onToggleExample: () => void;
  darkMode: boolean;
}> = ({ 
  principle, 
  isActive, 
  isExampleExpanded, 
  onClick, 
  onToggleExample,
  darkMode
}) => {
  return (
    <div 
      className={`principle-card ${isActive ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
      onClick={onClick}
    >
      <div className="principle-header">
        <span className="principle-icon">{principle.icon}</span>
        <h3>{principle.title}</h3>
      </div>
      <p>{principle.description}</p>
      
      {isActive && principle.examples.length > 0 && (
        <div className="principle-examples">
          <button 
            className="toggle-example" 
            onClick={(e) => {
              e.stopPropagation();
              onToggleExample();
            }}
            aria-expanded={isExampleExpanded}
          >
            {isExampleExpanded ? 'Hide Example' : 'Show Example'} 
          </button>
          
          {isExampleExpanded && (
            <ExampleCompare 
              example={principle.examples[0]} 
              isExpanded={isExampleExpanded} 
            />
          )}
        </div>
      )}
    </div>
  );
};

// Principles Section Component
export const PrinciplesSection: React.FC<{ 
  state: InfographicState;
  data: { principles: TokenEfficiencyPrinciple[] };
  setActivePrinciple: (id: string) => void;
  toggleExample: (id: string) => void;
}> = ({ 
  state, 
  data,
  setActivePrinciple, 
  toggleExample 
}) => {
  return (
    <section className={`principles-section ${state.darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h2>5 Core Principles</h2>
        <div className="principles-grid">
          {data.principles.map(principle => (
            <PrincipleCard
              key={principle.id}
              principle={principle}
              isActive={state.activePrinciple === principle.id}
              isExampleExpanded={!!state.expandedExamples[principle.id]}
              onClick={() => setActivePrinciple(principle.id)}
              onToggleExample={() => toggleExample(principle.id)}
              darkMode={state.darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};