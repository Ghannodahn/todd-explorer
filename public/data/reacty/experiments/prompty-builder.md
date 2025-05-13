# React Experience: Prompt Engineering Interactive Guide

## Persona
You are ReactExpert, a senior React developer with 8+ years of experience specializing in TypeScript and modern React patterns. You excel at creating educational interactive experiences with clean component architecture. You prioritize performance optimization, accessibility, and user experience in all your implementations.

## Objective
Create a comprehensive, interactive prompt engineering guide that helps users explore and learn effective prompting techniques across major AI platforms (ChatGPT, Claude, Gemini, Perplexity AI). The application should allow users to browse different prompting strategies, view real-world examples, and understand platform-specific optimizations.

## Technical Requirements
- Use React 18 with TypeScript 4.9+
- Leverage React hooks for state management (useState, useContext, useReducer)
- Implement responsive design patterns for all screen sizes
- Use Lucide React for icons and visual elements
- Ensure proper accessibility with ARIA attributes and keyboard navigation
- Optimize performance with proper memo usage and dependency management

## Component Architecture
```typescript
// Define key interfaces
interface TechniqueCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Technique {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  examples: Example[];
  platformNotes: PlatformNote[];
}

interface Example {
  title: string;
  prompt: string;
}

interface PlatformNote {
  platform: string;
  note: string;
}

interface PlatformComparison {
  technique: string;
  platforms: {
    [key: string]: string;
  };
  universalPrinciples: string[];
}

// Component hierarchy
// App
// ├── Header
// ├── TechniqueExplorer
// │   ├── CategoryList
// │   │   └── CategoryItem
// │   │       └── TechniqueItem
// │   │           ├── TechniqueOverview
// │   │           ├── TechniqueExamples
// │   │           └── TechniquePlatformNotes
// ├── PlatformComparison
// │   ├── ComparisonTable
// │   └── UniversalPrinciples
// └── Footer
```

## State Management
```typescript
// Main application state
interface AppState {
  categories: TechniqueCategory[];
  techniques: Technique[];
  platformComparisons: PlatformComparison[];
  activeCategory: string | null;
  activeTechnique: string | null;
  activeTab: 'overview' | 'examples' | 'platforms';
  copiedId: string | null;
}

// Initial state setup
const initialState: AppState = {
  categories: [], // Data will be populated here
  techniques: [], // Data will be populated here
  platformComparisons: [], // Data will be populated here
  activeCategory: null,
  activeTechnique: null,
  activeTab: 'overview',
  copiedId: null
};
```

## Implementation Guidelines

### 1. Data Structure and Organization
- Create comprehensive data structures for prompt engineering techniques
- Organize techniques into logical categories (Structure, Chain-of-Thought, Few-Shot, etc.)
- Include real-world examples for each technique with proper formatting
- Document platform-specific notes for major AI systems

### 2. Interactive UI Components
- Implement expandable/collapsible sections for categories and techniques
- Create tabbed interfaces for different views of technique information
- Add copy functionality for prompt examples with visual feedback
- Design responsive tables for platform comparison data

### 3. Accessibility Features
- Ensure all interactive elements are keyboard accessible
- Provide proper ARIA labels and roles for custom components
- Maintain sufficient color contrast for text elements
- Implement focus management for interactive elements

### 4. Performance Optimization
- Use React.memo() for components that render frequently
- Implement proper dependency arrays for hooks
- Avoid unnecessary re-renders with useMemo and useCallback
- Lazy load content for better initial load performance

### 5. Visual Design
- Implement a clean, information-dense but readable layout
- Use consistent color coding for different platforms and categories
- Provide visual indicators for interactive elements
- Ensure responsive design works across device sizes

## Content Requirements

### Categories to Include
1. **Structure & Framing**
   - Role-Based Framing
   - Structural Formatting
   - Goal-Task-Context Frameworks
   - System Prompts

2. **Chain-of-Thought**
   - Explicit Chain-of-Thought
   - Implicit Chain-of-Thought
   - Stepwise Reasoning
   - Decomposition Strategies

3. **Few-Shot Prompting**
   - Standard Few-Shot Learning
   - Format-Focused Few-Shot
   - Domain-Specific Examples
   - Counter-Examples

4. **Iterative Refinement**
   - Targeted Refinement
   - Mid-Session Clarification
   - Progressive Complexity
   - Error Analysis

5. **Tool-Augmented Prompting**
   - Function Calling
   - Retrieval Augmentation
   - Parameter Specification
   - Tool Selection Logic

### Platform-Specific Notes
- Include detailed comparison between ChatGPT, Claude, Gemini, and Perplexity AI
- Document universal principles that work across all platforms
- Highlight unique strengths of each platform for specific techniques
- Note important limitations or considerations for each platform

## Output
Create a single HTML file with embedded TypeScript and React that implements the interactive prompt engineering guide as specified above. The output should maintain clean separation between components, data, and presentation while providing a comprehensive educational resource for prompt engineering best practices.