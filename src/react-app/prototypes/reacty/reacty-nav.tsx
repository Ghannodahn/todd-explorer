import React from 'react'

// Defining the experiment interface (either import from a shared types file or define here)
export interface Experiment {
  id: string
  name: string
  description: string
  component: React.ComponentType
}

interface ReactyNavProps {
  experiments: Experiment[]
  selectedExperiment: string | null
  onSelectExperiment: (id: string) => void
}

const ReactyNav: React.FC<ReactyNavProps> = ({
  experiments,
  selectedExperiment,
  onSelectExperiment
}) => {
  return (
    <div
      style={{
        width: '300px',
        borderRight: '1px solid #e2e8f0',
        background: '#f8fafc',
        padding: '20px',
        overflowY: 'auto',
        height: '100%'
      }}
    >
      <div>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#475569',
            marginBottom: '10px'
          }}
        >
          React Experiments
        </h2>
        <ul style={{ listStyle: 'none' }}>
          {experiments.map((experiment) => (
            <li
              key={experiment.id}
              onClick={() => onSelectExperiment(experiment.id)}
              style={{
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '6px',
                cursor: 'pointer',
                background:
                  selectedExperiment === experiment.id
                    ? '#e2e8f0'
                    : 'transparent',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedExperiment !== experiment.id) {
                  e.currentTarget.style.background = '#f1f5f9'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedExperiment !== experiment.id) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {experiment.name}
              </div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                {experiment.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ReactyNav
