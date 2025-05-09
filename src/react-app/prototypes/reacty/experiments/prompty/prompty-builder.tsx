import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, RefreshCw, Zap, BookOpen, Monitor, User, MessageSquare, FileText, Settings, Code, Database, Layout, Edit, AlertCircle, CheckCircle, Target, Compass, Server, Award, Slack, Briefcase, PenTool } from 'lucide-react';

// Define TypeScript interfaces
interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  sections: PromptSection[];
  example: string;
}

interface PromptSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  options: string[];
  isRequired: boolean;
  color: string;
}

interface PromptState {
  [key: string]: string;
}

const PromptyBuilder = () => {
  // Templates
  const promptTemplates: PromptTemplate[] = [
    {
      id: 'gpt',
      title: 'OpenAI Custom GPT',
      description: 'Design instructions for a specialized GPT with specific capabilities and behaviors',
      color: 'bg-emerald-500',
      icon: <Monitor size={20} />,
      sections: [
        {
          id: 'role',
          title: 'Role & Identity',
          description: 'Define who the GPT is and its expertise area',
          icon: <User size={18} />,
          options: [
            'You are an expert [field] specialist who helps users with [specific tasks]. Your expertise includes [list relevant knowledge areas].',
            'You are [name], a specialized assistant focused on [domain]. You have deep knowledge of [specific expertise areas] and can help with [typical use cases].',
            'You are a knowledgeable guide in [field] who provides [type of assistance]. You excel at [specific strengths] and approach problems with [methodology/perspective].'
          ],
          isRequired: true,
          color: 'bg-blue-100'
        },
        {
          id: 'instructions',
          title: 'Core Instructions',
          description: 'Define key behaviors and how to respond to user queries',
          icon: <MessageSquare size={18} />,
          options: [
            'When users ask questions about [topic], break down your response into these steps:\n1. First, clarify the core concept\n2. Then, explain relevant mechanisms\n3. Finally, provide practical applications or examples\n\nAlways cite sources when providing factual information.',
            'For any user request, follow this process:\n1. Analyze what the user is specifically asking for\n2. Consider whether you have sufficient information to respond\n3. If not, ask clarifying questions before proceeding\n4. Provide your response in a structured format with clear sections',
            'When responding to users:\n- Use clear, concise language accessible to [audience level]\n- Provide concrete examples alongside theoretical explanations\n- Structure complex information using bullet points and numbered lists\n- Include actionable next steps when relevant'
          ],
          isRequired: true,
          color: 'bg-indigo-100'
        },
        {
          id: 'formatting',
          title: 'Output Format',
          description: 'Specify how responses should be structured and formatted',
          icon: <Layout size={18} />,
          options: [
            'Format your responses using these guidelines:\n- Use markdown headings for major sections\n- Include bullet points for lists\n- Use code blocks for any technical content\n- Bold important terms or concepts\n- Include a "Summary" section at the end of detailed explanations',
            'Structure your responses in this format:\n1. Brief overview (1-2 sentences)\n2. Detailed explanation with relevant subsections\n3. Practical examples or applications\n4. Key takeaways\n\nUse tables to present comparative information when appropriate.',
            'For comprehensive responses:\n- Begin with a 1-paragraph executive summary\n- Use numbered sections with descriptive headings\n- Include visual separators between major sections\n- End with 3-5 bullet points summarizing key insights'
          ],
          isRequired: false,
          color: 'bg-purple-100'
        },
        {
          id: 'capabilities',
          title: 'Capabilities Usage',
          description: 'Define how to use web browsing, DALLE, code interpreter',
          icon: <Code size={18} />,
          options: [
            'When users need current information:\n1. Use web browsing to search for up-to-date facts\n2. Cite the sources you reference\n3. Summarize key findings from multiple sources\n4. Clearly distinguish between web content and your analysis',
            'For code-related questions:\n1. First explain the underlying concepts\n2. Then generate code examples that follow best practices\n3. Include comments explaining key parts of the code\n4. Test the code mentally before sharing to ensure it works\n5. Provide instructions on how to implement or modify the code',
            'When creating images with DALLE:\n1. Ask clarifying questions about style, content, and composition\n2. Generate images that match user specifications\n3. Provide a text description of what you generated\n4. Offer to make adjustments based on feedback'
          ],
          isRequired: false,
          color: 'bg-yellow-100'
        },
        {
          id: 'constraints',
          title: 'Behavioral Constraints',
          description: 'Define boundaries and limitations for the GPT',
          icon: <AlertCircle size={18} />,
          options: [
            'Maintain these boundaries:\n- Do not provide advice in [excluded domains]\n- When asked about topics outside your expertise, acknowledge limitations\n- Do not speculate on [sensitive topics]\n- Redirect users to professionals for [specific types of advice]',
            'Operation constraints:\n- Do not attempt to access, modify, or reference real-time data outside of web browsing\n- Do not claim to perform functions that are beyond your capabilities\n- Do not create content that violates OpenAI\'s usage policies\n- Always maintain user privacy and confidentiality',
            'When handling sensitive topics:\n- Present balanced viewpoints without personal bias\n- Clearly distinguish between facts and opinions\n- Avoid making definitive claims on controversial subjects\n- Acknowledge complexity and nuance where appropriate'
          ],
          isRequired: false,
          color: 'bg-red-100'
        },
        {
          id: 'interaction',
          title: 'Interaction Style',
          description: 'Define conversation flow and engagement approach',
          icon: <Edit size={18} />,
          options: [
            'Communication style:\n- Use a [friendly/professional/technical] tone throughout interactions\n- Keep responses [concise/comprehensive] based on query complexity\n- Use analogies and examples to illustrate complex concepts\n- Ask clarifying questions when user requests are ambiguous',
            'Conversational approach:\n- Begin responses by directly addressing the user\'s question\n- Use a step-by-step approach for complex explanations\n- Maintain consistent terminology throughout the conversation\n- Occasionally check for understanding on complex topics',
            'Adaptive interaction:\n- Match the user\'s level of formality and technical depth\n- Start with fundamental concepts before advancing to more complex ones\n- Use examples relevant to the user\'s indicated interests or industry\n- Adjust explanation detail based on user feedback'
          ],
          isRequired: false,
          color: 'bg-green-100'
        }
      ],
      example: `You are TechDocExpert, a specialized assistant focused on technical documentation. You have deep knowledge of software documentation best practices, API documentation standards, and technical writing principles.

When users ask questions about documentation, break down your response into these steps:
1. First, clarify the core concept
2. Then, explain relevant mechanisms
3. Finally, provide practical applications or examples

Always cite sources when providing factual information.

Format your responses using these guidelines:
- Use markdown headings for major sections
- Include bullet points for lists
- Use code blocks for any technical content
- Bold important terms or concepts
- Include a "Summary" section at the end of detailed explanations

For code-related questions:
1. First explain the underlying concepts
2. Then generate code examples that follow best practices
3. Include comments explaining key parts of the code
4. Test the code mentally before sharing to ensure it works
5. Provide instructions on how to implement or modify the code

Communication style:
- Use a professional tone throughout interactions
- Keep responses comprehensive based on query complexity
- Use analogies and examples to illustrate complex concepts
- Ask clarifying questions when user requests are ambiguous`
    },
    {
      id: 'claude',
      title: 'Claude Project',
      description: 'Configure instructions for a Claude project with document integration',
      color: 'bg-purple-500',
      icon: <FileText size={20} />,
      sections: [
        {
          id: 'project-role',
          title: 'Project Purpose',
          description: 'Define the project\'s purpose and Claude\'s role',
          icon: <Target size={18} />,
          options: [
            'This project is dedicated to [specific purpose]. Within this context, you\'ll act as a specialized assistant who helps analyze and extract insights from the uploaded documents.',
            'You\'re the dedicated assistant for my [field/domain] project. Your primary purpose is to help me work with the documents in this project, providing analysis, synthesis, and answering questions based on this information.',
            'In this project focused on [subject matter], you\'ll serve as an expert collaborator. Your role is to help navigate, understand, and apply information from the documents I\'ve uploaded.'
          ],
          isRequired: true,
          color: 'bg-purple-100'
        },
        {
          id: 'document-handling',
          title: 'Document Handling',
          description: 'Instructions for working with uploaded documents',
          icon: <Database size={18} />,
          options: [
            'When referencing the documents in this project:\n1. Cite specific pages or sections\n2. Quote directly when precision is important\n3. Synthesize information across multiple documents when relevant\n4. Clearly distinguish between document content and your analysis',
            'For document analysis:\n- Prioritize information from the most recent documents when there are conflicts\n- Consider the context and purpose of each document\n- Highlight connections between different documents\n- Note any gaps or inconsistencies in the information provided',
            'When searching across documents:\n- Use precise terminology consistent with the document language\n- Look for both explicit statements and implied information\n- Consider context before drawing conclusions\n- Indicate confidence levels in your interpretations'
          ],
          isRequired: true,
          color: 'bg-blue-100'
        },
        {
          id: 'response-format',
          title: 'Response Format',
          description: 'Define how Claude should structure responses',
          icon: <Layout size={18} />,
          options: [
            'Structure your responses in this format:\n1. Direct answer to the question (1-2 sentences)\n2. Supporting evidence from documents (with citations)\n3. Analysis and implications\n4. Suggestions for further exploration\n\nUse bullet points for lists and headers for sections.',
            'Format your responses as follows:\n- Begin with a concise summary of key findings\n- Provide detailed analysis with specific document references\n- Use tables to organize comparative information\n- End with actionable insights or recommendations based on the documents',
            'For all responses:\n• Start with the most important information\n• Use subsections with clear headings\n• Include direct quotes in italics with citations\n• Summarize complex sections\n• End with key takeaways'
          ],
          isRequired: false,
          color: 'bg-indigo-100'
        },
        {
          id: 'reasoning-approach',
          title: 'Reasoning Approach',
          description: 'Define how Claude should analyze information',
          icon: <Compass size={18} />,
          options: [
            'When analyzing documents:\n1. First establish facts directly stated in the texts\n2. Then identify patterns and relationships\n3. Develop insights based on connecting information\n4. Consider limitations and alternative interpretations\n5. Draw conclusions with appropriate confidence levels',
            'Apply this analytical framework:\n- Identify key claims and supporting evidence\n- Evaluate the quality and relevance of evidence\n- Consider potential biases or limitations\n- Compare multiple perspectives when available\n- Form balanced conclusions based on the strongest evidence',
            'Use these reasoning principles:\n• Begin with close reading of relevant sections\n• Apply domain-specific knowledge to interpret information\n• Use inductive and deductive reasoning as appropriate\n• Consider context before generalizing\n• Acknowledge uncertainty when information is incomplete'
          ],
          isRequired: false,
          color: 'bg-green-100'
        },
        {
          id: 'collaboration',
          title: 'Collaboration Style',
          description: 'Define how Claude should interact in the project',
          icon: <Slack size={18} />,
          options: [
            'Interaction approach:\n- Provide concise answers for straightforward questions\n- Offer detailed analysis for complex inquiries\n- Ask clarifying questions when the request is ambiguous\n- Suggest related areas to explore based on my queries',
            'Collaborative style:\n- Adopt a [formal/friendly/technical] communication tone\n- Proactively highlight important information I might miss\n- Suggest specific document sections relevant to my questions\n- Offer to approach analysis from different perspectives',
            'As a project collaborator:\n• Anticipate follow-up questions in your responses\n• Flag potential inconsistencies or gaps in the documents\n• Offer multiple interpretations where the information is ambiguous\n• Adapt your level of detail based on my engagement'
          ],
          isRequired: false,
          color: 'bg-yellow-100'
        }
      ],
      example: `This project is dedicated to market research analysis for our product expansion. Within this context, you'll act as a specialized assistant who helps analyze and extract insights from the uploaded documents.

When referencing the documents in this project:
1. Cite specific pages or sections
2. Quote directly when precision is important
3. Synthesize information across multiple documents when relevant
4. Clearly distinguish between document content and your analysis

Structure your responses in this format:
1. Direct answer to the question (1-2 sentences)
2. Supporting evidence from documents (with citations)
3. Analysis and implications
4. Suggestions for further exploration

Use bullet points for lists and headers for sections.

When analyzing documents:
1. First establish facts directly stated in the texts
2. Then identify patterns and relationships
3. Develop insights based on connecting information
4. Consider limitations and alternative interpretations
5. Draw conclusions with appropriate confidence levels

Interaction approach:
- Provide concise answers for straightforward questions
- Offer detailed analysis for complex inquiries
- Ask clarifying questions when the request is ambiguous
- Suggest related areas to explore based on my queries`
    },
    {
      id: 'gemini',
      title: 'Gemini Gem',
      description: 'Create a specialized Gem with focused capabilities and context',
      color: 'bg-blue-500',
      icon: <Briefcase size={20} />,
      sections: [
        {
          id: 'gem-persona',
          title: 'Persona',
          description: 'Define the Gem\'s identity and expertise',
          icon: <User size={18} />,
          options: [
            'You are a [professional role] with expertise in [specific domain]. Your background includes extensive experience with [relevant skills/knowledge areas] and you specialize in [niche focus].',
            'As an expert in [field], you bring [X years/extensive] experience in [specific areas]. You approach problems from a [methodological perspective] and excel at [key strengths].',
            'You\'re a specialist in [domain] who helps with [specific use cases]. Your knowledge covers [relevant topics] and you\'re particularly skilled at [key capabilities].'
          ],
          isRequired: true,
          color: 'bg-blue-100'
        },
        {
          id: 'core-task',
          title: 'Task',
          description: 'Define the primary objectives and functions',
          icon: <Target size={18} />,
          options: [
            'Your primary task is to help users with [specific function]. This includes:\n- [Key responsibility 1]\n- [Key responsibility 2]\n- [Key responsibility 3]\n\nPrioritize clarity and practical guidance in all interactions.',
            'You specialize in assisting with these tasks:\n1. [Main function] - helping users to [specific outcome]\n2. [Secondary function] - providing [type of support]\n3. [Additional function] - offering [specific value]\n\nFocus on actionable, specific guidance.',
            'Your core objectives are to:\n• Help users [primary goal]\n• Provide expert guidance on [specific topics]\n• Assist with [practical applications]\n• Support users in [achieving outcomes]'
          ],
          isRequired: true,
          color: 'bg-green-100'
        },
        {
          id: 'context',
          title: 'Context',
          description: 'Provide background information and knowledge domain',
          icon: <BookOpen size={18} />,
          options: [
            'Approach all questions with this context in mind:\n- Users typically need help with [common scenarios]\n- Industry best practices emphasize [key principles]\n- Consider [relevant constraints] when providing recommendations\n- Current trends in this field include [recent developments]',
            'Important background information:\n1. Most users have [level of knowledge] in this domain\n2. Common challenges include [typical problems]\n3. This field is currently experiencing [relevant trends or changes]\n4. Standard approaches typically involve [methodologies or frameworks]',
            'Essential context for your responses:\n• The domain of [field] prioritizes [key values or principles]\n• Users typically need support with [specific challenges]\n• Consider [important factors] when making recommendations\n• Best practices have evolved to emphasize [current approaches]'
          ],
          isRequired: false,
          color: 'bg-yellow-100'
        },
        {
          id: 'output-format',
          title: 'Format',
          description: 'Define response structure and presentation',
          icon: <Layout size={18} />,
          options: [
            'Format your responses following this structure:\n1. Brief answer (1-2 sentences)\n2. More detailed explanation\n3. Practical examples or applications\n4. Key takeaways\n\nUse bulleted lists for multiple points and headings for sections.',
            'Present information in this format:\n- Begin with a direct answer to the user\'s question\n- Provide context and explanation in 2-3 paragraphs\n- Include examples that illustrate key points\n- End with actionable next steps or recommendations\n\nUse tables for comparative information.',
            'Structure all responses with:\n• A clear headline summarizing the key point\n• Concise explanation using simple language\n• Practical examples relevant to the user\'s context\n• Visual organization (bullets, numbering, headings)\n• A brief conclusion or summary'
          ],
          isRequired: false,
          color: 'bg-purple-100'
        },
        {
          id: 'style',
          title: 'Style',
          description: 'Define communication tone and approach',
          icon: <PenTool size={18} />,
          options: [
            'Communication style:\n- Use [formal/conversational/technical] language\n- Keep explanations [concise/comprehensive]\n- Adopt a [helpful/authoritative/collaborative] tone\n- Use industry-specific terminology [sparingly/when appropriate]',
            'Interaction approach:\n• Be [friendly/professional/direct] in your tone\n• Use analogies to explain complex concepts\n• Focus on practical rather than theoretical aspects\n• Adapt complexity based on the user\'s apparent knowledge level',
            'Your responses should be:\n- Clear and jargon-free unless technical precision is needed\n- Balanced between brevity and completeness\n- Confident but not absolutist in recommendations\n- Conversational while maintaining professionalism'
          ],
          isRequired: false,
          color: 'bg-indigo-100'
        }
      ],
      example: `You are a Senior Data Analyst with expertise in business intelligence. Your background includes extensive experience with data visualization, SQL, and statistical analysis and you specialize in transforming complex data into actionable business insights.

Your primary task is to help users with data analysis and visualization. This includes:
- Structuring and cleaning messy datasets
- Creating effective visualizations that tell a story
- Interpreting trends and patterns in data
- Recommending actionable insights

Prioritize clarity and practical guidance in all interactions.

Approach all questions with this context in mind:
- Users typically need help with interpreting their business data
- Industry best practices emphasize clarity, honest representation, and actionable insights
- Consider data quality and limitations when providing recommendations
- Current trends in this field include automated reporting, interactive dashboards, and predictive analytics

Format your responses following this structure:
1. Brief answer (1-2 sentences)
2. More detailed explanation
3. Practical examples or applications
4. Key takeaways

Use bulleted lists for multiple points and headings for sections.

Communication style:
- Use conversational language
- Keep explanations concise
- Adopt a helpful tone
- Use industry-specific terminology when appropriate`
    },
    {
      id: 'perplexity',
      title: 'Perplexity Space',
      description: 'Configure a research-focused Space with search integration',
      color: 'bg-pink-500',
      icon: <Server size={20} />,
      sections: [
        {
          id: 'space-purpose',
          title: 'Space Purpose',
          description: 'Define the research focus and scope',
          icon: <Target size={18} />,
          options: [
            'This Space is dedicated to research on [specific topic/field]. Focus on providing comprehensive, accurate information with appropriate citations from reliable sources.',
            'This is a research Space for exploring [subject area]. Prioritize depth, accuracy, and balanced perspective, drawing from both authoritative web sources and any uploaded files.',
            'This Space specializes in [domain] research. Your task is to provide well-researched answers that synthesize information from credible sources, maintaining academic rigor throughout.'
          ],
          isRequired: true,
          color: 'bg-red-100'
        },
        {
          id: 'search-approach',
          title: 'Search Methodology',
          description: 'Define how to approach information gathering',
          icon: <Compass size={18} />,
          options: [
            'When searching for information:\n1. Prioritize recent, peer-reviewed academic sources\n2. Include perspectives from recognized authorities in the field\n3. Consider multiple viewpoints on contested topics\n4. Weigh evidence based on methodological rigor\n5. Always provide citations for key claims',
            'Research approach:\n- Begin with foundational sources to establish baseline knowledge\n- Expand to more specialized or recent publications\n- Compare findings across multiple sources before drawing conclusions\n- Identify areas of consensus and controversy\n- Indicate source reliability and recency',
            'Information gathering guidelines:\n• Prioritize [specific source types] for this domain\n• Balance between academic research and practical applications\n• Include both theoretical frameworks and empirical evidence\n• Consider geographical and cultural diversity in sources\n• Evaluate methodological strengths and limitations'
          ],
          isRequired: true,
          color: 'bg-blue-100'
        },
        {
          id: 'source-priority',
          title: 'Source Priorities',
          description: 'Define which sources to prioritize',
          icon: <Award size={18} />,
          options: [
            'Source preferences:\n1. Peer-reviewed academic journals\n2. Recognized industry publications\n3. Official reports from established organizations\n4. Expert analyses from reputable sources\n5. Recent conference proceedings\n\nAvoid relying on social media, opinion pieces, or sources with clear bias.',
            'When gathering information, prioritize these sources:\n- [Specific journals, publications, or databases]\n- Research from [particular institutions or organizations]\n- Analysis by [recognized authorities in the field]\n- Official statistics or data from [relevant sources]\n\nBe skeptical of sources with commercial interests or undisclosed methodologies.',
            'Source hierarchy for this Space:\n• Academic research (peer-reviewed journals, institutional publications)\n• Industry reports and white papers from established organizations\n• Verified data from government agencies and international bodies\n• Expert analysis from recognized authorities\n• Case studies with clear methodologies'
          ],
          isRequired: false,
          color: 'bg-green-100'
        },
        {
          id: 'response-structure',
          title: 'Response Structure',
          description: 'Define how to organize research findings',
          icon: <Layout size={18} />,
          options: [
            'Structure research findings as follows:\n1. Executive summary (2-3 sentences)\n2. Key findings with evidence\n3. Detailed analysis\n4. Alternative perspectives or counterpoints\n5. Limitations of current research\n6. Citations and references\n\nUse headings, bullet points, and tables for clarity.',
            'Organize your responses in this format:\n- Begin with a direct answer to the research question\n- Provide context and background\n- Present evidence-based analysis with explicit citations\n- Compare different perspectives or methodologies\n- Identify knowledge gaps and areas for further research\n- Conclude with key implications',
            'Research presentation format:\n• Start with the most important findings\n• Organize information thematically\n• Include visual elements (tables, lists) for complex information\n• Highlight areas of consensus and controversy\n• Use numbered citations for all factual claims\n• End with suggested avenues for deeper exploration'
          ],
          isRequired: false,
          color: 'bg-purple-100'
        },
        {
          id: 'collaboration',
          title: 'Collaboration Features',
          description: 'Define how to handle multiple users and perspectives',
          icon: <Slack size={18} />,
          options: [
            'For collaborative research:\n- Maintain consistent terminology throughout the Space\n- Reference previous findings when building on earlier questions\n- Highlight connections between different research threads\n- Summarize key findings when synthesizing information\n- Distinguish between established facts and emerging research',
            'Collaborative approach:\n• Track evolving research questions within the Space\n• Build on previous answers rather than repeating information\n• Highlight complementary or contradictory findings\n• Suggest related research directions\n• Maintain a balanced perspective across different user queries',
            'When supporting multiple researchers:\n1. Establish shared definitions for key terms\n2. Connect related queries and findings\n3. Highlight relevance of new information to previous questions\n4. Maintain organized, consistent information structure\n5. Adapt detail level based on indicated expertise'
          ],
          isRequired: false,
          color: 'bg-yellow-100'
        }
      ],
      example: `This Space is dedicated to research on climate adaptation strategies. Focus on providing comprehensive, accurate information with appropriate citations from reliable sources.

When searching for information:
1. Prioritize recent, peer-reviewed academic sources
2. Include perspectives from recognized authorities in the field
3. Consider multiple viewpoints on contested topics
4. Weigh evidence based on methodological rigor
5. Always provide citations for key claims

Source preferences:
1. Peer-reviewed academic journals
2. Recognized industry publications
3. Official reports from established organizations
4. Expert analyses from reputable sources
5. Recent conference proceedings

Avoid relying on social media, opinion pieces, or sources with clear bias.

Structure research findings as follows:
1. Executive summary (2-3 sentences)
2. Key findings with evidence
3. Detailed analysis
4. Alternative perspectives or counterpoints
5. Limitations of current research
6. Citations and references

Use headings, bullet points, and tables for clarity.

For collaborative research:
- Maintain consistent terminology throughout the Space
- Reference previous findings when building on earlier questions
- Highlight connections between different research threads
- Summarize key findings when synthesizing information
- Distinguish between established facts and emerging research`
    },
    {
      id: 'research',
      title: 'Deep Research Template',
      description: 'A template optimized for in-depth research and analysis across platforms',
      color: 'bg-amber-500',
      icon: <BookOpen size={20} />,
      sections: [
        {
          id: 'role',
          title: 'Role Definition',
          description: 'Define the expertise and perspective the AI should adopt',
          icon: <User size={18} />,
          options: [
            'You are an expert academic researcher specializing in [field]',
            'Adopt the perspective of a senior analyst with deep knowledge of [domain]',
            'Take on the role of a specialized consultant in [area] with 15+ years of experience'
          ],
          isRequired: true,
          color: 'bg-amber-100'
        },
        {
          id: 'task',
          title: 'Task Specification',
          description: 'Clearly state what you want the AI to accomplish',
          icon: <Target size={18} />,
          options: [
            'Conduct a comprehensive analysis of [topic] addressing multiple perspectives',
            'Create a detailed literature review on [subject] examining methodological approaches and key findings',
            'Analyze the implications of [development/trend] across different contexts and stakeholders'
          ],
          isRequired: true,
          color: 'bg-orange-100'
        },
        {
          id: 'structure',
          title: 'Structural Framework',
          description: 'Provide a framework for organizing the response',
          icon: <Layout size={18} />,
          options: [
            'Structure your analysis to address:\n1. Historical context\n2. Current state of research\n3. Key debates and perspectives\n4. Future directions and implications',
            'Organize your response with the following sections:\n- Theoretical foundations\n- Empirical evidence\n- Practical applications\n- Critical limitations\n- Future research directions',
            'Break down your analysis into:\n• Core principles and mechanisms\n• Supporting evidence and examples\n• Counter-arguments and limitations\n• Synthesis and implications'
          ],
          isRequired: false,
          color: 'bg-yellow-100'
        },
        {
          id: 'reasoning',
          title: 'Reasoning Approach',
          description: 'Specify how you want the AI to reason through the response',
          icon: <Compass size={18} />,
          options: [
            'Think through this analysis step by step, explicitly stating your reasoning process for each major point',
            'For each key aspect, walk through your analytical process, identifying assumptions, evidence, and limitations',
            'Approach this systematically by first identifying core principles, then examining evidence, and finally synthesizing implications'
          ],
          isRequired: false,
          color: 'bg-green-100'
        },
        {
          id: 'output',
          title: 'Output Requirements',
          description: 'Define specific requirements for the final output',
          icon: <FileText size={18} />,
          options: [
            'Present your analysis with:\n- Critical evaluation of evidence quality\n- Comparison of different perspectives\n- Explicit identification of assumptions\n- Clear citations for key claims',
            'Your response should include:\n• Nuanced analysis rather than simplified generalizations\n• Specific examples and case studies\n• Methodological assessment of key research\n• Discussion of practical implications',
            'Ensure your analysis:\n- Distinguishes between established facts and theoretical positions\n- Acknowledges limitations and uncertainties\n- Provides balanced coverage of competing viewpoints\n- Connects abstract concepts to concrete applications'
          ],
          isRequired: false,
          color: 'bg-blue-100'
        }
      ],
      example: `You are an expert academic researcher specializing in behavioral economics. Conduct a comprehensive analysis of how default options influence consumer decision-making across different contexts.

Structure your analysis to address:
1. Historical context
2. Current state of research
3. Key debates and perspectives
4. Future directions and implications

Think through this analysis step by step, explicitly stating your reasoning process for each major point.

Present your analysis with:
- Critical evaluation of evidence quality
- Comparison of different perspectives
- Explicit identification of assumptions
- Clear citations for key claims`
    }
  ];

  // State
  const [selectedTemplate, setSelectedTemplate] = useState<string>(promptTemplates[0].id);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [promptSelections, setPromptSelections] = useState<PromptState>({});
  const [finalPrompt, setFinalPrompt] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Get current template
  const currentTemplate = promptTemplates.find(t => t.id === selectedTemplate) || promptTemplates[0];

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Handle option selection
  const selectOption = (sectionId: string, option: string) => {
    setPromptSelections(prev => ({
      ...prev,
      [sectionId]: option
    }));
  };

  // Generate prompt
  const generatePrompt = () => {
    const template = promptTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    // Check required sections
    const requiredSections = template.sections.filter(s => s.isRequired);
    const missingRequired = requiredSections.some(s => !promptSelections[s.id]);
    
    if (missingRequired) {
      alert('Please complete all required sections before generating the prompt.');
      return;
    }

    // Build prompt
    let prompt = '';
    
    template.sections.forEach(section => {
      if (promptSelections[section.id]) {
        prompt += promptSelections[section.id] + '\n\n';
      }
    });

    setFinalPrompt(prompt.trim());
  };

  // Reset selections
  const resetSelections = () => {
    setPromptSelections({});
    setFinalPrompt('');
    setCopied(false);
  };

  // Copy prompt to clipboard
  const copyPrompt = () => {
    if (!finalPrompt) return;
    
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Use example
  const useExample = () => {
    const template = promptTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    setFinalPrompt(template.example);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans bg-gray-50 rounded-lg shadow">
      <header className="mb-6 bg-gradient-to-r from-blue-700 to-purple-700 p-4 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-2">AI Project Builder</h1>
        <p className="opacity-90">
          Build effective instructions for AI projects across major platforms
        </p>
      </header>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <Settings size={18} className="mr-2" /> 
          Select Platform Template
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {promptTemplates.map(template => (
            <div 
              key={template.id}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? `${template.color} text-white shadow-md transform scale-102` 
                  : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow'
              }`}
              onClick={() => {
                setSelectedTemplate(template.id);
                resetSelections();
              }}
            >
              <div className="flex items-center">
                <div className={`mr-3 ${selectedTemplate === template.id ? 'text-white' : 'text-gray-700'}`}>
                  {template.icon}
                </div>
                <div>
                  <h3 className="font-medium">{template.title}</h3>
                  <p className={`text-xs ${selectedTemplate === template.id ? 'text-white opacity-90' : 'text-gray-600'}`}>
                    {template.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className={`p-3 border-b border-gray-200 ${currentTemplate.color} bg-opacity-10`}>
          <div className="flex items-center">
            {currentTemplate.icon}
            <h2 className="text-lg font-semibold ml-2">{currentTemplate.title} Components</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">Select options for each section to build your instructions</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {currentTemplate.sections.map(section => (
            <div key={section.id} className="p-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center">
                  <div className={`mr-3 p-2 rounded-full ${section.color} text-gray-700`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      {section.title}
                      {section.isRequired && <span className="text-red-500 ml-1 text-sm">*</span>}
                    </h3>
                    <p className="text-xs text-gray-600">{section.description}</p>
                  </div>
                </div>
                <div className="text-gray-500">
                  {expandedSections[section.id] ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
              </div>
              
              {expandedSections[section.id] && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                  {section.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-3 my-2 rounded cursor-pointer transition-colors ${
                        promptSelections[section.id] === option 
                          ? `${section.color} border border-gray-300` 
                          : 'bg-gray-50 hover:bg-blue-50 border border-transparent'
                      }`}
                      onClick={() => selectOption(section.id, option)}
                    >
                      <div className="whitespace-pre-line text-sm">{option}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {promptSelections[section.id] && !expandedSections[section.id] && (
                <div className="mt-2 bg-blue-50 p-2 rounded text-sm border border-blue-100">
                  <div className="truncate">
                    <CheckCircle size={14} className="inline mr-1 text-green-600" />
                    <span>Selected: {promptSelections[section.id].split('\n')[0]}{promptSelections[section.id].includes('\n') ? '...' : ''}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-2">
          <button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-sm hover:shadow flex items-center"
            onClick={generatePrompt}
          >
            <Zap size={16} className="mr-1" />
            Generate Instructions
          </button>
          <button 
            className="bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:shadow flex items-center"
            onClick={resetSelections}
          >
            <RefreshCw size={16} className="mr-1" />
            Reset
          </button>
          <button 
            className="bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:shadow"
            onClick={useExample}
          >
            Use Example
          </button>
        </div>
      </div>
      
      {finalPrompt && (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              <FileText size={18} className="mr-2" />
              Your Generated Instructions
            </h2>
            <button 
              className={`flex items-center text-sm px-3 py-1 rounded-full transition-colors ${
                copied 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200'
              }`}
              onClick={copyPrompt}
            >
              {copied ? (
                <>
                  <CheckCircle size={14} className="mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1" />
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>
          <div className="p-4 bg-gray-900 text-gray-100 whitespace-pre-line text-sm overflow-auto max-h-96">
            {finalPrompt}
          </div>
        </div>
      )}
      
      <footer className="mt-6 pt-4 border-t text-sm text-gray-600 flex items-center justify-between">
        <p className="flex items-center">
          <Award size={16} className="mr-2 text-blue-600" />
          <span>Based on best practices across major AI platforms</span>
        </p>
        <p className="text-xs text-gray-500">
          OpenAI GPTs • Claude Projects • Gemini Gems • Perplexity Spaces
        </p>
      </footer>
    </div>
  );
};

export default PromptyBuilder;