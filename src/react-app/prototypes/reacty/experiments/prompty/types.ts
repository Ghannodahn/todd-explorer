// Token Efficiency Infographic Type Definitions
export interface TokenEfficiencyPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: TokenEfficiencyExample[];
}

export interface TokenEfficiencyExample {
  before: string;
  after: string;
  tokensBefore: number;
  tokensAfter: number;
  savingsPercentage: number;
}

export interface TokenEfficiencyTechnique {
  category: string;
  techniques: {
    name: string;
    description: string;
    example: string;
  }[];
}

export interface ComparisonExample {
  title: string;
  before: string;
  after: string;
  tokensBefore: number;
  tokensAfter: number;
  savingsPercentage: number;
}

export interface InfographicState {
  activePrinciple: string | null;
  expandedExamples: Record<string, boolean>;
  activeTechniqueCategory: string;
  darkMode: boolean;
}