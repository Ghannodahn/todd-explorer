export interface ExperimentData {
  id: string
  name: string
  description: string
  componentPath: string
  documentUrl: string
}

export interface Experiment {
  id: string
  name: string
  description: string
  component: React.ComponentType
  documentUrl: string
}
