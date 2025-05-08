import { Brain, Zap, GitMerge, ArrowRightCircle } from 'lucide-react'

const TODDAbout = () => {
  const features = [
    {
      icon: <Brain size={24} />,
      title: 'Arena',
      description: 'Compare AI solutions across defined challenges'
    },
    {
      icon: <Zap size={24} />,
      title: 'Results',
      description: 'Autonomously improve performance and accuracy'
    },
    {
      icon: <GitMerge size={24} />,
      title: 'Evolve',
      description: 'Self-learning architecture that grows with use'
    }
  ]

  return (
    <div
      style={{ height: '100%' }}
      className="flex flex-col items-center justify-center bg-gradient-to-b from-green-900 to-green-800 p-6"
    >
      <div className="w-full max-w-4xl">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">TODD</h1>
          <p className="text-lg text-green-100">
            Tool-Orchestrated Development & Diagnostics
          </p>
          <p className="mx-auto mt-3 max-w-xl text-green-200">
            A self-evolving system that tests, compares, and improves AI
            solutions through intelligent agent collaboration.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-green-700 bg-green-800 p-6 shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md"
            >
              <div className="mb-4 flex justify-center text-green-300">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-center text-lg font-medium text-green-100">
                {feature.title}
              </h3>
              <p className="text-center text-sm text-green-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="flex items-center rounded-md bg-green-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-green-500">
            <span className="mr-2">Explore Architecture</span>
            <ArrowRightCircle size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
export default TODDAbout
