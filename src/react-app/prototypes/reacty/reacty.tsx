import React, { useState, useEffect, useRef } from 'react'
import Match3Game from './experiments/match3/match3'
import DNSMigrationWizard from './experiments/dns-migrator/dns-migration-wizard'
import PromptyBuilder from './experiments/prompty/prompty-builder'
import ReactyNav from './reacty-nav'
import ReactyContent from './reacty-content'
import { Experiment, ExperimentData } from './types'
import TokenEfficiencyInfographic from './experiments/prompty/token-efficiency-infographic'
import MarkdownViewer from '../../components/util/markdown-viewer'
import Resizer from '../../components/util/resizer'
import './reacty.css'

// Component mapping to be used for dynamic imports
const componentMap: Record<string, React.ComponentType> = {
  'match3/match3': Match3Game,
  'dns-migrator/dns-migration-wizard': DNSMigrationWizard,
  'prompty/prompty-builder': PromptyBuilder,
  'prompty/token-efficiency-infographic': TokenEfficiencyInfographic
}

const Reacty: React.FC = () => {
  // State to track the currently selected experiment
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(
    null
  )
  const [experiments, setExperiments] = useState<Experiment[]>([])
  // Initialize prompt area width from localStorage or default to 1/3 of viewport width
  const [promptAreaWidth, setPromptAreaWidth] = useState(() => {
    const savedWidth = localStorage.getItem('promptAreaWidth')
    return savedWidth ? parseInt(savedWidth, 10) : window.innerWidth / 3
  })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch experiments data using fetch API instead of import
    fetch('/data/reacty/experiments.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        // Transform the JSON data into the required format with component references
        const processedExperiments = data.map(
          (exp: ExperimentData) => ({
            id: exp.id,
            name: exp.name,
            description: exp.description,
            component: componentMap[exp.componentPath],
            documentUrl: exp.documentUrl
          })
        )
        setExperiments(processedExperiments)
      })
      .catch((error) => {
        console.error('Failed to load experiments:', error)
      })
  }, [])

  // Get the currently selected experiment object
  const currentExperiment = experiments.find(
    (exp) => exp.id === selectedExperiment
  )

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Navigation Sidebar */}
      <ReactyNav
        experiments={experiments}
        selectedExperiment={selectedExperiment}
        onSelectExperiment={setSelectedExperiment}
      />

      {/* Main Content Area */}
      <ReactyContent currentExperiment={currentExperiment} />

      {/* Resize Handle */}
      <Resizer 
        initialWidth={promptAreaWidth}
        onWidthChange={(newWidth) => {
          // Only update state when drag ends to avoid excessive rerenders
          setPromptAreaWidth(newWidth)
          // Save to localStorage for persistence between sessions
          localStorage.setItem('promptAreaWidth', newWidth.toString())
        }}
        containerRef={containerRef as React.RefObject<HTMLElement>}
        navWidth={containerRef.current?.firstChild?.nodeType === 1 
          ? (containerRef.current?.firstChild as HTMLElement).offsetWidth 
          : 0}
      />

      {/* Prompt Area */}
      {promptAreaWidth > 50 && currentExperiment && currentExperiment.documentUrl && (
        <div 
          className="bg-white p-4 overflow-auto"
          style={{ 
            width: `${promptAreaWidth}px`,
            // Remove transition to avoid fighting with direct DOM manipulation during drag
            // transition: 'width 0.1s ease-out'
          }}
        >
            <MarkdownViewer 
              contentUrl={currentExperiment.documentUrl}
              content="No data found." 
            />
        </div>
      )}
    </div>
  )
}

export default Reacty
