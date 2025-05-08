import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Check,
  FileText,
  Zap,
  Lightbulb,
  Eye,
  Code,
  Copy,
  Save
} from 'lucide-react'

// Define types for project sections
interface GeneratedSections {
  purpose: string
  knowledge: string
  behavior: string
  workflow: string
  boundaries: string
  examples: string
}

// Markdown Editor Component
interface MarkdownEditorProps {
  generatedSections: GeneratedSections
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  generatedSections
}) => {
  const [editMode, setEditMode] = useState(true)
  const [markdownContent, setMarkdownContent] = useState('')
  const [copied, setCopied] = useState(false)

  // Generate markdown content from section data
  useEffect(() => {
    if (!generatedSections) return

    const generateMarkdown = () => {
      return `# Project Instructions: TravelBuddy

## Purpose & Identity
${generatedSections.purpose}

You are TravelBuddy, a travel planning assistant specializing in creating personalized itineraries.
Your core purpose is to help travelers discover memorable experiences by combining popular attractions with local hidden gems.

## Knowledge & Context
${generatedSections.knowledge}

You possess expertise in global destinations, cultural customs, local transportation options, and seasonal considerations.
When addressing travel planning, prioritize authentic experiences while respecting practical constraints like budget and accessibility.

## Behavioral Guidelines
${generatedSections.behavior}

### Communication Style
- Maintain a friendly, enthusiastic tone
- Use conversational language while providing precise information
- Balance professionalism with a sense of adventure

## Workflow & Process
${generatedSections.workflow}

### Step 1: Initial Assessment
Gather basic information about the traveler's preferences, constraints, and desires.

### Step 2: Destination Recommendations
Suggest appropriate destinations based on preferences, season, and budget.

## Boundary Conditions
${generatedSections.boundaries}

### When to Seek Clarification
- When travel parameters are vague or conflicting
- When requests involve safety concerns or unrealistic expectations

## Output Examples
${generatedSections.examples}

### Example 1: Weekend City Break
User: I want to spend a weekend in Barcelona in June. I love food and architecture but hate crowds.
Assistant: Based on your preferences, here's a weekend itinerary for Barcelona in June that focuses on architectural wonders and culinary experiences while avoiding the most crowded areas...
`
    }

    setMarkdownContent(generateMarkdown())
  }, [generatedSections])

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg bg-white shadow-md">
      <div className="border-b border-gray-200">
        <div className="flex items-center p-4">
          <button
            onClick={() => setEditMode(true)}
            className={`mr-2 flex items-center rounded-md px-3 py-1 ${
              editMode
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Code size={16} className="mr-1" />
            Edit
          </button>
          <button
            onClick={() => setEditMode(false)}
            className={`mr-2 flex items-center rounded-md px-3 py-1 ${
              !editMode
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Eye size={16} className="mr-1" />
            Preview
          </button>
          <div className="ml-auto flex">
            <button
              onClick={handleCopy}
              className="flex items-center rounded-md bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200"
            >
              <Copy size={16} className="mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="ml-2 flex items-center rounded-md bg-green-600 px-3 py-1 text-white hover:bg-green-700">
              <Save size={16} className="mr-1" />
              Save
            </button>
          </div>
        </div>
      </div>

      {editMode ? (
        <div className="p-4">
          <textarea
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            className="h-96 w-full rounded-md border border-gray-300 p-4 font-mono text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ) : (
        <div className="markdown-preview p-6">
          <div className="prose max-w-none">
            {/* Simple markdown rendering for demonstration */}
            {markdownContent.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return (
                  <h1 key={index} className="mb-2 mt-4 text-2xl font-bold">
                    {line.substring(2)}
                  </h1>
                )
              } else if (line.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="mb-2 mt-4 text-xl font-bold text-gray-800"
                  >
                    {line.substring(3)}
                  </h2>
                )
              } else if (line.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="mb-1 mt-3 text-lg font-semibold text-gray-700"
                  >
                    {line.substring(4)}
                  </h3>
                )
              } else if (line.startsWith('- ')) {
                return (
                  <li key={index} className="my-1 ml-4">
                    {line.substring(2)}
                  </li>
                )
              } else if (line === '') {
                return <br key={index} />
              } else {
                return (
                  <p key={index} className="my-2 text-gray-700">
                    {line}
                  </p>
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

interface SectionCardProps {
  title: string
  icon: React.ReactNode
  content: string
  sectionKey: keyof GeneratedSections
}

const PromptyMcProjectFace: React.FC = () => {
  const [step, setStep] = useState(1)
  const [vibePrompt, setVibePrompt] = useState('')
  const [generatedSections, setGeneratedSections] =
    useState<GeneratedSections | null>(null)
  const [editingSection, setEditingSection] = useState<
    keyof GeneratedSections | null
  >(null)
  const [editText, setEditText] = useState('')

  // Sample generated sections based on a vibe prompt
  const generateSections = (prompt: string): GeneratedSections => {
    // In a real app, this would call an AI service
    console.log(`Generating sections based on prompt: ${prompt}`)
    return {
      purpose:
        'AI assistant that helps users create detailed travel itineraries with local experiences.',
      knowledge:
        'Travel expert with knowledge of destinations, local customs, and off-the-beaten-path experiences.',
      behavior:
        'Friendly and adventurous guide that adapts recommendations to user preferences and travel style.',
      workflow:
        'Gather preferences, suggest destinations, create detailed day-by-day plans with flexibility options.',
      boundaries:
        'Focus on realistic, safe travel recommendations while respecting local cultures and regulations.',
      examples:
        'Sample itineraries showing conversation flow from initial idea to complete travel plan.'
    }
  }

  const handleVibeSubmit = () => {
    if (!vibePrompt.trim()) return

    // Generate section summaries based on the vibe prompt
    const sections = generateSections(vibePrompt)
    setGeneratedSections(sections)
    setStep(2)
  }

  const startEditing = (section: keyof GeneratedSections, text: string) => {
    setEditingSection(section)
    setEditText(text)
  }

  const saveEdit = () => {
    if (!editingSection || !editText.trim() || !generatedSections) return

    setGeneratedSections({
      ...generatedSections,
      [editingSection]: editText
    })

    setEditingSection(null)
    setEditText('')
  }

  const generateFinalInstructions = () => {
    setStep(3)
  }

  const SectionCard: React.FC<SectionCardProps> = ({
    title,
    icon,
    content,
    sectionKey
  }) => {
    const [expanded, setExpanded] = useState(false)

    return (
      <div className="mb-4 overflow-hidden rounded-lg bg-white shadow-md">
        <div
          className="flex cursor-pointer items-center justify-between bg-gray-50 p-4 hover:bg-gray-100"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center">
            {icon}
            <h3 className="ml-2 font-medium text-gray-800">{title}</h3>
          </div>
          <div className="flex items-center">
            <button
              className="mr-2 rounded-full p-1 hover:bg-gray-200"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                startEditing(sectionKey, content)
              }}
            >
              <Edit2 size={16} className="text-blue-500" />
            </button>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        {expanded && (
          <div className="border-t border-gray-100 p-4">
            <p className="text-gray-600">{content}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-gray-50 p-6">
      <header className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center">
          <Zap size={32} className="mr-2 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Prompty McProjectFace
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-gray-600">
          Transform your ideas into well-structured project instructions for AI
          platforms
        </p>
      </header>

      {step === 1 && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md transition-all">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
            <Lightbulb size={24} className="mr-2 text-yellow-500" />
            What&apos;s your project idea?
          </h2>
          <p className="mb-4 text-gray-600">
            Start with a high-level description of what you want your AI
            assistant to do. Think of this as the &quot;vibe&quot; or essence of
            your project.
          </p>
          <div>
            <textarea
              className="mb-4 h-32 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
              placeholder="Example: A travel assistant that creates personalized itineraries with local experiences..."
              value={vibePrompt}
              onChange={(e) => setVibePrompt(e.target.value)}
            />
            <div className="text-right">
              <button
                onClick={handleVibeSubmit}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
              >
                Generate Project Structure →
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && generatedSections && (
        <div className="transition-all">
          <div className="mb-6 rounded-lg border border-purple-100 bg-purple-50 p-4">
            <h2 className="mb-2 text-lg font-medium text-purple-800">
              Your Project Concept
            </h2>
            <p className="text-gray-700">{vibePrompt}</p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Project Instruction Sections
            </h2>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              ← Back to Concept
            </button>
          </div>

          <div className="mb-6 space-y-4">
            <SectionCard
              title="Purpose & Identity"
              icon={<FileText size={20} className="text-blue-500" />}
              content={generatedSections.purpose}
              sectionKey="purpose"
            />
            <SectionCard
              title="Knowledge & Context"
              icon={<FileText size={20} className="text-green-500" />}
              content={generatedSections.knowledge}
              sectionKey="knowledge"
            />
            <SectionCard
              title="Behavioral Guidelines"
              icon={<FileText size={20} className="text-yellow-500" />}
              content={generatedSections.behavior}
              sectionKey="behavior"
            />
            <SectionCard
              title="Workflow & Process"
              icon={<FileText size={20} className="text-red-500" />}
              content={generatedSections.workflow}
              sectionKey="workflow"
            />
            <SectionCard
              title="Boundary Conditions"
              icon={<FileText size={20} className="text-purple-500" />}
              content={generatedSections.boundaries}
              sectionKey="boundaries"
            />
            <SectionCard
              title="Output Examples"
              icon={<FileText size={20} className="text-indigo-500" />}
              content={generatedSections.examples}
              sectionKey="examples"
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={generateFinalInstructions}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <FileText size={20} className="mr-2" />
              Generate Complete Instructions
            </button>
          </div>
        </div>
      )}

      {step === 3 && generatedSections && (
        <div className="transition-all">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Complete Project Instructions
            </h2>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              ← Back to Edit Sections
            </button>
          </div>

          <MarkdownEditor generatedSections={generatedSections} />
        </div>
      )}

      {/* Edit Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Edit{' '}
              {editingSection.charAt(0).toUpperCase() + editingSection.slice(1)}{' '}
              Section
            </h3>
            <textarea
              className="mb-4 h-32 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingSection(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <Check size={16} className="mr-1" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptyMcProjectFace
