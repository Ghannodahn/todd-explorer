// Tool data in JSON format for easy extraction to external file
import toolsData from './index.json'
import { ToolProps } from './prompty-tool'
import PromptyTile from './prompty-tile'

const tools = toolsData.data as ToolProps[]

// Main Homepage Component
const PromptyHomepage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="mb-6 py-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-blue-600">Prompty</h1>
        <p className="mx-auto max-w-xl px-4 text-slate-700">
          A handy toolkit for AI prompt engineering — create, refine, and
          improve your prompts across multiple platforms.
        </p>
      </header>

      {/* Tool Grid */}
      <main className="container mx-auto mb-8 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool: ToolProps) => (
            <PromptyTile key={tool.id} tool={tool} />
          ))}
        </div>

        {/* About Section */}
        <section className="mt-8 rounded-lg bg-gray-100 p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Why Choose Prompty?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-slate-700">
                Prompty is your comprehensive toolkit for AI prompt engineering,
                designed to help you harness the full potential of modern AI
                systems through strategic prompting.
              </p>
              <p className="text-slate-700">
                Whether you&apos;re crafting general prompts, conducting
                research, creating visual art, or managing complex projects, our
                specialized tools provide the structure and guidance you need.
              </p>
            </div>
            <div>
              <p className="mb-2 text-slate-700">
                With Prompty, you&apos;ll benefit from:
              </p>
              <div className="space-y-1">
                <div className="flex items-start">
                  <span className="mr-1 text-blue-600">✓</span>
                  <span className="text-slate-700">
                    Professional-grade prompt frameworks
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-1 text-blue-600">✓</span>
                  <span className="text-slate-700">
                    Best practices in behavior, intent & capability definition
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-1 text-blue-600">✓</span>
                  <span className="text-slate-700">
                    Cross-platform compatibility
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-1 text-blue-600">✓</span>
                  <span className="text-slate-700">
                    Modular, reusable instruction sets
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 py-6 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-2xl font-bold">Prompty</h2>
          <div className="mb-4 justify-center">
            A Creative-Enabling Endeavor by&nbsp;
            <a
              href="www.hcastleh.com"
              target="_blank"
              className="font-bold text-white hover:text-gray-300"
            >
              Highlands Castle Holdings
            </a>
            &nbsp;and&nbsp;
            <a
              href="www.bassicnerd.com"
              target="_blank"
              className="font-bold text-white hover:text-gray-300"
            >
              BassicNerd
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Highlands Castle Holdings. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default PromptyHomepage
