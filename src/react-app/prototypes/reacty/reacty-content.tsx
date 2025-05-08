import React from 'react'
import { Experiment } from './reacty-nav'

interface ReactyContentProps {
  currentExperiment: Experiment | undefined
}

const ReactyContent: React.FC<ReactyContentProps> = ({ currentExperiment }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        height: '100%'
      }}
    >
      {currentExperiment ? (
        <div>
          {/* Render the selected component */}
          {React.createElement(currentExperiment.component)}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
            textAlign: 'center',
            color: '#64748b'
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
            Welcome to Reacty
          </h2>
          <p>Select an experiment from the sidebar to get started</p>
        </div>
      )}
    </div>
  )
}

export default ReactyContent
