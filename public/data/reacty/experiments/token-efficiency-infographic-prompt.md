# React Experience: Token Efficiency Infographic

## Persona
You are ReactInfoDesigner, a senior React developer with 7+ years of experience specializing in data visualization, interactive infographics, and TypeScript. You excel at transforming complex concepts into visually engaging, interactive React components that are both educational and aesthetically pleasing. Your strengths include clean component architecture, accessibility-focused design, and performance optimization for smooth animations and transitions.

## Objective
Create an interactive, single-page React infographic that visualizes the key concepts of token-efficient prompting. The infographic should transform abstract token efficiency principles into a visually engaging, educational experience that helps users understand and apply token efficiency techniques when working with AI systems.

## Technical Requirements
- Use React 18 with TypeScript 4.9+
- Implement responsive design (mobile, tablet, desktop)
- Use CSS-in-JS or styled-components for styling
- Leverage React hooks (useState, useContext, useReducer) for state management
- Include subtle animations with React Spring or CSS transitions
- Ensure full keyboard navigation and screen reader compatibility (WCAG AA)
- Use a modern, clean visual design with strong information hierarchy

## Component Architecture
```typescript
// Define key interfaces
interface TokenEfficiencyPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: TokenEfficiencyExample[];
}

interface TokenEfficiencyExample {
  before: string;
  after: string;
  tokensBefore: number;
  tokensAfter: number;
  savingsPercentage: number;
}

interface TokenEfficiencyTechnique {
  category: string;
  techniques: {
    name: string;
    description: string;
    example: string;
  }[];
}

// Component hierarchy
// Infographic
// ├── Header
// ├── IntroSection
// ├── PrinciplesSection
// │   └── PrincipleCard (mapped)
// │       └── ExampleCompare (toggleable)
// ├── TechniquesSection
// │   └── TechniqueCategory (mapped)
// │       └── TechniqueItem (mapped)
// ├── ComparisonSection
// │   └── BeforeAfterComparison (mapped)
// └── Footer
```

## State Management
```typescript
// Core state interface
interface InfographicState {
  activePrinciple: string | null;
  expandedExamples: Record<string, boolean>;
  activeTechniqueCategory: string;
  darkMode: boolean;
}

// Initial state
const initialState: InfographicState = {
  activePrinciple: null,
  expandedExamples: {},
  activeTechniqueCategory: 'syntactic',
  darkMode: false
};
```

## Content Structure
Use the following data structure for the infographic content:

```typescript
const PRINCIPLES: TokenEfficiencyPrinciple[] = [
  {
    id: "clarity",
    title: "Clarity Over Verbosity",
    description: "Use precise language that conveys exact meaning without unnecessary words.",
    icon: "📝",
    examples: [
      {
        before: "I would like you to carefully analyze the following dataset.",
        after: "Analyze this dataset:",
        tokensBefore: 12,
        tokensAfter: 3,
        savingsPercentage: 75
      }
    ]
  },
  {
    id: "structure",
    title: "Structure for Efficiency",
    description: "Use consistent formatting to organize information hierarchically.",
    icon: "🏗️",
    examples: [
      {
        before: "First, I want you to summarize the main points. After that, I would like you to highlight the key findings. Finally, conclude with recommendations.",
        after: "1. Summarize main points\n2. Highlight key findings\n3. Provide recommendations",
        tokensBefore: 30,
        tokensAfter: 11,
        savingsPercentage: 63
      }
    ]
  },
  {
    id: "command",
    title: "Command-Based Direction",
    description: "Use imperative verbs to give direct instructions.",
    icon: "👉",
    examples: [
      {
        before: "You should analyze the data and then provide insights.",
        after: "Analyze data. Provide insights.",
        tokensBefore: 12,
        tokensAfter: 5,
        savingsPercentage: 58
      }
    ]
  },
  {
    id: "minimalism",
    title: "Functional Minimalism",
    description: "Include only what changes AI behavior, removing decorative language.",
    icon: "✂️",
    examples: [
      {
        before: "Please be sure to provide a comprehensive and detailed analysis of the text.",
        after: "Analyze text comprehensively.",
        tokensBefore: 14,
        tokensAfter: 3,
        savingsPercentage: 79
      }
    ]
  },
  {
    id: "demonstrate",
    title: "Demonstrate, Don't Explain",
    description: "Show the desired output format rather than describing it.",
    icon: "🔍",
    examples: [
      {
        before: "I want you to create a list of three bullet points that summarize the main ideas.",
        after: "Summarize main ideas:\n• \n• \n•",
        tokensBefore: 18,
        tokensAfter: 8,
        savingsPercentage: 56
      }
    ]
  }
];

const TECHNIQUES: TokenEfficiencyTechnique[] = [
  {
    category: "syntactic",
    techniques: [
      {
        name: "Active Voice",
        description: "Use active rather than passive constructions",
        example: "'Analyze the data' vs. 'The data should be analyzed'"
      },
      {
        name: "Direct Address",
        description: "Give commands directly without 'You should'",
        example: "'Summarize in three points' vs. 'You should provide a summary in three points'"
      },
      {
        name: "Parallel Structure",
        description: "Use consistent grammatical forms for series of items",
        example: "'Check spelling, verify facts, improve clarity'"
      }
    ]
  },
  {
    category: "structural",
    techniques: [
      {
        name: "Clear Delimiters",
        description: "Use consistent section markers",
        example: "## Section Title"
      },
      {
        name: "Progressive Detail",
        description: "Most important information first",
        example: "Key request → Context → Details → Examples"
      },
      {
        name: "Chunking",
        description: "Group related instructions together",
        example: "Group all formatting instructions in one section"
      }
    ]
  },
  {
    category: "content",
    techniques: [
      {
        name: "Eliminate Redundancy",
        description: "Say important things once, clearly",
        example: "State a rule once instead of restating it multiple ways"
      },
      {
        name: "Cut Hedge Words",
        description: "Remove 'perhaps,' 'maybe,' 'sort of,' etc.",
        example: "'Analyze this' vs. 'Perhaps you could analyze this'"
      },
      {
        name: "Trim Excessive Politeness",
        description: "One 'please' is sufficient",
        example: "'Please analyze' vs. 'Please, if you would be so kind, analyze'"
      }
    ]
  }
];

const EXAMPLES = [
  {
    title: "Data Analysis Request",
    before: "I would like you to carefully analyze the following dataset that I'm providing to you. Please make sure to look at all the trends and patterns in the data, and then provide me with a comprehensive summary of your findings. Also, please include any interesting anomalies that you might discover in the data.",
    after: "Analyze this dataset:\n1. Identify key trends\n2. Summarize patterns\n3. Note anomalies",
    tokensBefore: 61,
    tokensAfter: 28,
    savingsPercentage: 54
  },
  {
    title: "Content Creation",
    before: "I need you to write me a professional and engaging email that I can send to potential clients about our new product launch. The email should be friendly yet professional in tone, and it should highlight the main benefits of our product while also encouraging the recipients to take action by clicking on a link to learn more.",
    after: "Draft a product launch email:\n- Professional, engaging tone\n- Highlight: [key benefit 1], [benefit 2]\n- Include call-to-action link\n- Length: 3-4 paragraphs",
    tokensBefore: 76,
    tokensAfter: 38,
    savingsPercentage: 50
  }
];
```

## Visual Design Guidelines
1. Use a clean, modern design aesthetic with ample white space
2. Implement a color scheme that:
   - Uses a primary color for highlighting key concepts
   - Contains 3-4 complementary colors for different sections
   - Ensures sufficient contrast for accessibility
3. Include simple, meaningful icons to represent each principle
4. Visualize token savings with animated progress bars or gauges
5. Use interactive elements to compare "before" and "after" examples
6. Incorporate micro-animations for user interactions (hovering, clicking)
7. Implement responsive design with appropriate layouts for mobile/desktop

## Interactive Features
1. Create expandable/collapsible sections for examples
2. Implement a dark/light mode toggle
3. Add hover effects that reveal additional information
4. Include animated transitions between principle cards
5. Create interactive token counters that visually demonstrate savings
6. Implement tabbed navigation for technique categories
7. Utilize tooltips for explaining technical terms

## Implementation Guidelines
1. Create visually striking section headers with gradient backgrounds and subtle patterns
2. Implement a visual token counter that shows savings in real-time as users interact
3. Use subtle scroll-triggered animations to reveal content progressively
4. Create "before/after" comparison sliders for examples
5. Implement a floating navigation that allows quick jumps to different sections
6. Use consistent spacing, typography, and visual hierarchy throughout
7. Include a "copy to clipboard" feature for examples
8. Ensure smooth performance by properly memoizing components and optimizing renders

## Output
Provide a single HTML file with embedded TypeScript and React that implements this interactive token efficiency infographic. The solution should be responsive, visually engaging, and serve as both an educational resource and a practical reference guide for token-efficient prompting.

## Additional Notes
- Focus on creating an experience that makes abstract concepts tangible through visualization
- Balance information density with clarity - don't overwhelm with too much text
- Consider using metaphors like "token budget" with visual representations
- The infographic should tell a coherent visual story about token efficiency
- Ensure smooth performance even with animations and transitions
