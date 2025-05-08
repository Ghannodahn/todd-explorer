import { ToolProps } from './prompty-tool'

// Define a type for feature items
type Feature = string

// Reusable PromptyTile component
const PromptyTile = ({ tool }: { tool: ToolProps }) => {
  // Maps for accent colors (header/icon) and background colors
  const accentColorMap: Record<string, string> = {
    'teal-spark': 'bg-emerald-500',
    'indigo-beam': 'bg-indigo-500',
    'fuchsia-pulse': 'bg-fuchsia-500',
    'amber-focus': 'bg-amber-500'
  }

  const bgColorMap: Record<string, string> = {
    'teal-spark': 'bg-emerald-50',
    'indigo-beam': 'bg-indigo-50',
    'fuchsia-pulse': 'bg-fuchsia-50',
    'amber-focus': 'bg-amber-50'
  }

  const accentColor = accentColorMap[tool.colorClass] || 'bg-blue-500'
  const bgColor = bgColorMap[tool.colorClass] || 'bg-blue-50'

  return (
    <a
      href={tool.ctaLink}
      target="_blank"
      className={`flex flex-col ${bgColor} cursor-pointer overflow-hidden rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-lg`}
      rel="noreferrer"
    >
      {/* Colored header */}
      <div className={`h-2 ${accentColor}`}></div>

      <div className="flex grow flex-col justify-center p-4">
        <div className="mb-4 flex items-center justify-center">
          {/* Icon */}
          <img src={tool.icon} className="w-1/2"></img>{' '}
        </div>
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-slate-800">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="mb-3 text-sm text-slate-600">{tool.description}</p>

        {/* Features */}
        <div className="mb-4 grow">
          {tool.features.map((feature: Feature, index) => (
            <div key={index} className="mb-1 flex items-start text-sm">
              <span className="mr-1 shrink-0 text-blue-600">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700">
          {tool.ctaText}
        </div>
      </div>
    </a>
  )
}

export default PromptyTile
