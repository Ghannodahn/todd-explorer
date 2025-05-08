import React, { useState, useEffect } from 'react'
import Match3Game from './experiments/match3/match3'
import DNSMigrationWizard from './experiments/dns-migrator/dns-migration-wizard'
import ReactyNav from './reacty-nav'
import ReactyContent from './reacty-content'
import { Experiment, ExperimentData } from './types'

// Component mapping to be used for dynamic imports
const componentMap: Record<string, React.ComponentType> = {
  'match3/match3': Match3Game,
  'dns-migrator/dns-migration-wizard': DNSMigrationWizard
}

const Reacty: React.FC = () => {
  // State to track the currently selected experiment
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(
    null
  )
  const [experiments, setExperiments] = useState<Experiment[]>([])

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
            component: componentMap[exp.componentPath]
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
    </div>
  )
}

export default Reacty
