import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  TokenEfficiencyPrinciple, 
  TokenEfficiencyTechnique,
  ComparisonExample,
  InfographicState } from './types'
import './token-efficiency-infographic.css'
import { PrinciplesSection } from './principles';

// === COMPONENT DEFINITIONS ===

// Header Component
const Header: React.FC<{ darkMode: boolean; toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`header ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h1>Token Efficiency Infographic</h1>
        <p>Interactive guide to creating more effective AI prompts with fewer tokens</p>
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

// Intro Section Component
const IntroSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <section className={`intro-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h2>Why Token Efficiency Matters</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>💰 Reduced Costs</h3>
            <p>Most AI services charge per token - using fewer tokens saves money</p>
          </div>
          <div className="benefit-card">
            <h3>⚡ Faster Responses</h3>
            <p>Fewer tokens means quicker AI processing and response times</p>
          </div>
          <div className="benefit-card">
            <h3>🎯 Enhanced Focus</h3>
            <p>Focusing on essentials improves AI understanding and relevance</p>
          </div>
          <div className="benefit-card">
            <h3>📚 More Content</h3>
            <p>Efficient prompting allows more content within context windows</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Technique Item Component
const TechniqueItem: React.FC<{ 
  technique: { name: string; description: string; example: string };
  darkMode: boolean;
}> = ({ technique, darkMode }) => {
  return (
    <div className={`technique-item ${darkMode ? 'dark' : 'light'}`}>
      <h4>{technique.name}</h4>
      <p>{technique.description}</p>
      <div className="technique-example">
        <small>Example:</small>
        <code>{technique.example}</code>
      </div>
    </div>
  );
};

// Techniques Section Component
const TechniquesSection: React.FC<{ 
  state: InfographicState;
  data: { techniques: TokenEfficiencyTechnique[] };
  setActiveCategory: (category: string) => void;
}> = ({ 
  state, 
  data,
  setActiveCategory 
}) => {
  const activeCategory = data.techniques.find(t => t.category === state.activeTechniqueCategory);
  
  return (
    <section className={`techniques-section ${state.darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h2>Practical Techniques</h2>
        
        <div className="technique-tabs">
          <button 
            className={state.activeTechniqueCategory === 'syntactic' ? 'active' : ''}
            onClick={() => setActiveCategory('syntactic')}
          >
            Syntactic Optimization
          </button>
          <button 
            className={state.activeTechniqueCategory === 'structural' ? 'active' : ''}
            onClick={() => setActiveCategory('structural')}
          >
            Structural Efficiency
          </button>
          <button 
            className={state.activeTechniqueCategory === 'content' ? 'active' : ''}
            onClick={() => setActiveCategory('content')}
          >
            Content Reduction
          </button>
        </div>
        
        <div className="techniques-grid">
          {activeCategory?.techniques.map((technique, index) => (
            <TechniqueItem 
              key={index}
              technique={technique}
              darkMode={state.darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Before/After Slider Component
const BeforeAfterSlider: React.FC<{ 
  example: ComparisonExample;
  darkMode: boolean;
}> = ({ example, darkMode }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const formatTokenCount = (count: number) => {
    return count.toLocaleString();
  };
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newPosition = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    }
  }, []);
  
  const handleMouseUp = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [handleMouseMove]);
  
  const handleMouseDown = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
      window.addEventListener('mouseup', handleMouseUp);
    }
  }, [handleMouseMove, handleMouseUp]);
  
  useEffect(() => {
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);
  
  return (
    <div 
      className={`before-after-slider ${darkMode ? 'dark' : 'light'}`}
      ref={containerRef}
    >
      <h3>{example.title}</h3>
      <div className="slider-container">
        <div className="before-container" style={{ width: `${sliderPosition}%` }}>
          <pre className="before-content">{example.before}</pre>
          <div className="token-label">
            {formatTokenCount(example.tokensBefore)} tokens
          </div>
        </div>
        <div className="after-container" style={{ width: `${100 - sliderPosition}%` }}>
          <pre className="after-content">{example.after}</pre>
          <div className="token-label">
            {formatTokenCount(example.tokensAfter)} tokens
          </div>
        </div>
        <div 
          className="slider-handle"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="slider-line"></div>
          <div className="slider-grip"></div>
        </div>
      </div>
      <div className="savings-indicator">
        <span className="savings-percentage">{example.savingsPercentage}%</span> token reduction
      </div>
    </div>
  );
};
// Comparison Section Component
const ComparisonSection: React.FC<{ 
  darkMode: boolean; 
  data: { examples: ComparisonExample[] };
}> = ({ darkMode, data }) => {
  return (
    <section className={`comparison-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h2>Before & After Examples</h2>
        <p className="section-intro">Drag the slider to compare verbose prompts with their token-efficient equivalents</p>
        
        <div className="comparisons-container">
          {data.examples.map((example, index) => (
            <BeforeAfterSlider 
              key={index}
              example={example}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Canvas Visualization Component
const TokenBudgetVisualization: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  
  // Define the sections of the token budget visualization
  const budgetSections = useMemo(() => [
    { name: "Essential Instructions", percentage: 30, color: "#3498db" },
    { name: "Context & Background", percentage: 15, color: "#2ecc71" },
    { name: "Examples & Templates", percentage: 20, color: "#9b59b6" },
    { name: "Parameters & Constraints", percentage: 25, color: "#e67e22" },
    { name: "Error Handling", percentage: 10, color: "#f1c40f" }
  ], []);
  
  // Helper function to check if mouse is over a section
  const isMouseOverSection = (
    x: number, 
    y: number, 
    centerX: number, 
    centerY: number, 
    radius: number, 
    startAngle: number, 
    endAngle: number
  ) => {
    // Convert mouse position to relative to center
    const dx = x - centerX;
    const dy = y - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= radius) {
      // Calculate angle in radians
      let angle = Math.atan2(dy, dx);
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      
      // Check if angle is within section
      return angle >= startAngle && angle <= endAngle;
    }
    
    return false;
  };
  
  // Handle mouse move to detect hovering over sections
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    let hoveredIndex = null;
    let startAngle = 0;
    
    for (let i = 0; i < budgetSections.length; i++) {
      const section = budgetSections[i];
      const endAngle = startAngle + (section.percentage / 100) * 2 * Math.PI;
      
      if (isMouseOverSection(x, y, centerX, centerY, radius, startAngle, endAngle)) {
        hoveredIndex = i;
        break;
      }
      
      startAngle = endAngle;
    }
    
    setHoveredSection(hoveredIndex);
  }, [budgetSections]);
  
  // Draw the pie chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw title
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = darkMode ? '#ffffff' : '#333333';
    ctx.textAlign = 'center';
    ctx.fillText('Token Budget Allocation', centerX, 30);
    
    // Draw pie chart
    let startAngle = 0;
    
    for (let i = 0; i < budgetSections.length; i++) {
      const section = budgetSections[i];
      const endAngle = startAngle + (section.percentage / 100) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill with color or highlight if hovered
      if (hoveredSection === i) {
        ctx.fillStyle = darkMode 
          ? `${section.color}cc` // Semi-transparent in dark mode
          : section.color;
          
        // Draw section slightly larger when hovered
        ctx.save();
        ctx.translate(centerX, centerY);
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const offsetX = Math.cos(midAngle) * 10;
        const offsetY = Math.sin(midAngle) * 10;
        ctx.translate(offsetX, offsetY);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle - midAngle, endAngle - midAngle);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        
        // Draw label for hovered section
        const labelRadius = radius + 30;
        const labelX = centerX + Math.cos(midAngle) * labelRadius;
        const labelY = centerY + Math.sin(midAngle) * labelRadius;
        
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = darkMode ? '#ffffff' : '#333333';
        ctx.textAlign = 'center';
        ctx.fillText(section.name, labelX, labelY);
        
        ctx.font = '12px Arial';
        ctx.fillText(`${section.percentage}%`, labelX, labelY + 20);
      } else {
        ctx.fillStyle = darkMode 
          ? `${section.color}99` // More transparent in dark mode
          : `${section.color}cc`; // Semi-transparent in light mode
        ctx.fill();
      }
      
      // Draw border
      ctx.strokeStyle = darkMode ? '#333333' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      startAngle = endAngle;
    }
    
    // Draw legend if no section is hovered
    if (hoveredSection === null) {
      const legendX = 50;
      let legendY = height - 120;
      
      for (const section of budgetSections) {
        // Draw color box
        ctx.fillStyle = section.color;
        ctx.fillRect(legendX, legendY, 15, 15);
        
        // Draw border
        ctx.strokeStyle = darkMode ? '#333333' : '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(legendX, legendY, 15, 15);
        
        // Draw text
        ctx.font = '12px Arial';
        ctx.fillStyle = darkMode ? '#ffffff' : '#333333';
        ctx.textAlign = 'left';
        ctx.fillText(`${section.name} (${section.percentage}%)`, legendX + 25, legendY + 12);
        
        legendY += 25;
      }
    }
    
  }, [darkMode, hoveredSection, budgetSections]);
  
  return (
    <section className={`canvas-visualization-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <canvas 
          ref={canvasRef}
          width={600}
          height={400}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredSection(null)}
          aria-label="Interactive pie chart showing token budget allocation"
          role="img"
        />
      </div>
    </section>
  );
};
// Footer Component
const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <footer className={`footer ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <p>Interactive Token Efficiency Infographic</p>
        <p><small>Created with React and TypeScript</small></p>
      </div>
    </footer>
  );
};

// Main Infographic Component
const TokenEfficiencyInfographic: React.FC = () => {
  // State initialization
  const [state, setState] = useState<InfographicState>({
    activePrinciple: null,
    expandedExamples: {},
    activeTechniqueCategory: 'syntactic',
    darkMode: false
  });
  
  // Data loading state
  const [data, setData] = useState<{
    principles: TokenEfficiencyPrinciple[],
    techniques: TokenEfficiencyTechnique[],
    examples: ComparisonExample[]
  }>({
    principles: [],
    techniques: [],
    examples: []
  });
  
  // Load data from external JSON file
  useEffect(() => {
    fetch('/data/prompty/token-efficiency-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonData => {
        setData(jsonData);
      })
      .catch(error => {
        console.error('Error loading token efficiency data:', error);
      });
  }, []);

  // Event handlers
  const setActivePrinciple = (id: string) => {
    setState(prev => ({
      ...prev,
      activePrinciple: prev.activePrinciple === id ? null : id
    }));
  };
  
  const toggleExample = (id: string) => {
    setState(prev => ({
      ...prev,
      expandedExamples: {
        ...prev.expandedExamples,
        [id]: !prev.expandedExamples[id]
      }
    }));
  };
  
  const setActiveCategory = (category: string) => {
    setState(prev => ({
      ...prev,
      activeTechniqueCategory: category
    }));
  };
  
  const toggleDarkMode = () => {
    setState(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };
  
  return (
    <div className={`infographic-container ${state.darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header darkMode={state.darkMode} toggleDarkMode={toggleDarkMode} />
      <IntroSection darkMode={state.darkMode} />
      <PrinciplesSection 
        state={state} 
        data={data}
        setActivePrinciple={setActivePrinciple} 
        toggleExample={toggleExample}
      />
      <TokenBudgetVisualization darkMode={state.darkMode} />
      <TechniquesSection 
        state={state} 
        data={data}
        setActiveCategory={setActiveCategory}
      />
      <ComparisonSection darkMode={state.darkMode} data={data} />
      <Footer darkMode={state.darkMode} />
    </div>
  );
};

export default TokenEfficiencyInfographic;