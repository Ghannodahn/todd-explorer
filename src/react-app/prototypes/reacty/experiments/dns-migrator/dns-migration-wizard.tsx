import React, { useState, useMemo } from 'react'
import {
  Check,
  ChevronRight,
  AlertCircle,
  Copy,
  CheckCircle,
  RefreshCw,
  Globe
} from 'lucide-react'

// TypeScript interfaces
interface DnsRecord {
  type: string
  name: string
  content: string
  ttl: number
  priority?: number
  proxied?: boolean
}

// Create a new named type for domain registrars
type DomainRegistrar = 'Squarespace' | 'Google Domains' | 'Other'

interface Domain {
  name: string
  primary: boolean
  registrar: DomainRegistrar
  hasWixSite: boolean
  hasGoogleWorkspace: boolean
  currentNameservers: string[]
  dnsRecords: DnsRecord[]
}

interface MigrationState {
  step: number
  domains: Domain[]
  collectedInfo: boolean
  preparedDomains: boolean
  cloudflareAccount: boolean
  cloudflareZonesCreated: boolean
  workersConfigured: boolean
  cutoverExecuted: boolean
  validated: boolean
}

// Cloudflare nameservers
const CLOUDFLARE_NS = ['aida.ns.cloudflare.com', 'kip.ns.cloudflare.com']

// Utility components
const Button: React.FC<{
  onClick: () => void
  disabled?: boolean
  primary?: boolean
  children: React.ReactNode
}> = ({ onClick, disabled = false, primary = false, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 rounded-md px-4 py-2 font-medium ${
      primary
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
  >
    {children}
  </button>
)

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-4 overflow-hidden rounded-md bg-gray-900">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-gray-400">
        <span>Command</span>
        <button onClick={handleCopy} className="text-gray-400 hover:text-white">
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-gray-300">{code}</pre>
    </div>
  )
}

const Alert: React.FC<{
  type: 'info' | 'warning' | 'success'
  children: React.ReactNode
}> = ({ type, children }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  }

  return (
    <div className={`mb-4 rounded-md border p-3 ${styles[type]}`}>
      <div className="flex gap-2">
        {type === 'warning' && <AlertCircle size={20} />}
        {type === 'info' && <RefreshCw size={20} />}
        {type === 'success' && <Check size={20} />}
        <div>{children}</div>
      </div>
    </div>
  )
}

// Step components
const StepIntro: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div>
    <h2 className="mb-4 text-xl font-bold">DNS Migration Wizard</h2>
    <p className="mb-4">
      This wizard will guide you through migrating your domains from Squarespace
      to Cloudflare without disrupting your existing Wix website or Google
      Workspace services, while enabling Cloudflare Workers on specific
      subdomains.
    </p>

    <Alert type="info">
      <p>Before starting, please ensure you have:</p>
      <ul className="ml-5 mt-2 list-disc">
        <li>Access to your Squarespace Domains account</li>
        <li>A Cloudflare account (free tier is sufficient)</li>
        <li>Access to your Wix dashboard (if applicable)</li>
        <li>Access to your Google Workspace admin console (if applicable)</li>
      </ul>
    </Alert>

    <p className="mb-6">The migration will follow these steps:</p>
    <ol className="mb-6 ml-5 list-decimal space-y-2">
      <li>Collect information about your domains and services</li>
      <li>Prepare domains by adjusting TTL values</li>
      <li>Set up zones in Cloudflare (without changing nameservers yet)</li>
      <li>Configure Cloudflare Workers for your subdomains</li>
      <li>Execute the cut-over with minimal downtime</li>
      <li>Validate the migration was successful</li>
    </ol>

    <div className="flex justify-end">
      <Button onClick={onNext} primary>
        Start Migration <ChevronRight size={18} />
      </Button>
    </div>
  </div>
)

const StepCollectInfo: React.FC<{
  domains: Domain[]
  onDomainsChange: (domains: Domain[]) => void
  onNext: () => void
  onPrev: () => void
}> = ({ domains, onDomainsChange, onNext, onPrev }) => {
  // Default example domains from the document
  const useExampleDomains = () => {
    onDomainsChange([
      {
        name: 'highlandscastleholdings.com',
        primary: true,
        registrar: 'Squarespace',
        hasWixSite: true,
        hasGoogleWorkspace: true,
        currentNameservers: [
          'ns1.squarespacedns.com',
          'ns2.squarespacedns.com',
          'ns3.squarespacedns.com',
          'ns4.squarespacedns.com'
        ],
        dnsRecords: []
      },
      {
        name: 'hcastleh.com',
        primary: false,
        registrar: 'Squarespace',
        hasWixSite: false,
        hasGoogleWorkspace: true,
        currentNameservers: [
          'ns1.squarespacedns.com',
          'ns2.squarespacedns.com',
          'ns3.squarespacedns.com',
          'ns4.squarespacedns.com'
        ],
        dnsRecords: []
      }
    ])
  }
  const [newDomain, setNewDomain] = useState('')
  const [showDomainForm, setShowDomainForm] = useState(false)

  const addDomain = () => {
    if (newDomain && !domains.some((d) => d.name === newDomain)) {
      onDomainsChange([
        ...domains,
        {
          name: newDomain,
          primary: domains.length === 0,
          registrar: 'Squarespace',
          hasWixSite: false,
          hasGoogleWorkspace: false,
          currentNameservers: [],
          dnsRecords: []
        }
      ])
      setNewDomain('')
      setShowDomainForm(false)
    }
  }

  const removeDomain = (name: string) => {
    onDomainsChange(domains.filter((d) => d.name !== name))
  }

  const updateDomain = (index: number, updates: Partial<Domain>) => {
    const newDomains = [...domains]
    newDomains[index] = { ...newDomains[index], ...updates }
    onDomainsChange(newDomains)
  }

  const allDomainsValid =
    domains.length > 0 &&
    domains.every((d) => d.name && d.currentNameservers.length > 0)

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Step 1: Collect Domain Information
      </h2>

      <div className="mb-6">
        <h3 className="mb-2 font-medium">Your Domains</h3>

        {domains.length === 0 ? (
          <div className="rounded-lg border border-dashed py-8 text-center">
            <p className="mb-4 text-gray-500">No domains added yet</p>
            <div className="flex flex-col items-center gap-3">
              <Button onClick={() => setShowDomainForm(true)} primary>
                Add Domain
              </Button>
              <button
                onClick={useExampleDomains}
                className="text-sm text-blue-600 hover:underline"
              >
                Use example domains from configgy document
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {domains.map((domain, index) => (
              <div key={domain.name} className="rounded-lg border p-4">
                <div className="mb-3 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={20} />
                    <h4 className="font-medium">{domain.name}</h4>
                    {domain.primary && (
                      <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        Primary
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeDomain(domain.name)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Registrar
                    </label>
                    <select
                      value={domain.registrar}
                      onChange={(e) =>
                        updateDomain(index, {
                          registrar: e.target.value as DomainRegistrar
                        })
                      }
                      className="w-full rounded border p-2"
                    >
                      <option value="Squarespace">Squarespace</option>
                      <option value="Google Domains">Google Domains</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Domain Role
                    </label>
                    <select
                      value={domain.primary ? 'primary' : 'alias'}
                      onChange={(e) => {
                        if (e.target.value === 'primary') {
                          // Update all domains to non-primary first
                          const updatedDomains = domains.map((d) => ({
                            ...d,
                            primary: false
                          }))
                          updatedDomains[index].primary = true
                          onDomainsChange(updatedDomains)
                        } else {
                          updateDomain(index, { primary: false })
                        }
                      }}
                      className="w-full rounded border p-2"
                    >
                      <option value="primary">Primary Domain</option>
                      <option value="alias">Alias Domain</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`wix-${domain.name}`}
                        checked={domain.hasWixSite}
                        onChange={(e) =>
                          updateDomain(index, { hasWixSite: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`wix-${domain.name}`}>Has Wix Site</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`google-${domain.name}`}
                        checked={domain.hasGoogleWorkspace}
                        onChange={(e) =>
                          updateDomain(index, {
                            hasGoogleWorkspace: e.target.checked
                          })
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`google-${domain.name}`}>
                        Has Google Workspace
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Current Nameservers
                    <span className="ml-1 text-xs text-gray-500">
                      (one per line)
                    </span>
                  </label>
                  <textarea
                    value={domain.currentNameservers.join('\n')}
                    onChange={(e) =>
                      updateDomain(index, {
                        currentNameservers: e.target.value
                          .split('\n')
                          .filter((ns) => ns.trim())
                      })
                    }
                    placeholder="ns1.googledomains.com
ns2.googledomains.com"
                    className="h-24 w-full rounded border p-2"
                  />
                  <div className="mt-1 flex justify-between">
                    <div className="text-sm text-gray-500">
                      Enter each nameserver on a new line
                    </div>
                    <button
                      onClick={() => {
                        updateDomain(index, {
                          currentNameservers: [
                            'ns1.squarespacedns.com',
                            'ns2.squarespacedns.com',
                            'ns3.squarespacedns.com',
                            'ns4.squarespacedns.com'
                          ]
                        })
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Use Squarespace defaults
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      DNS Records
                      <span className="ml-1 text-xs text-gray-500">
                        (will be imported from Google Domains later)
                      </span>
                    </label>
                    <button className="text-sm text-blue-600 hover:underline">
                      Import Records
                    </button>
                  </div>
                  <div className="rounded-lg border bg-gray-50 p-4 text-center text-gray-500">
                    DNS records will be imported during the next step
                  </div>
                </div>
              </div>
            ))}

            {!showDomainForm && (
              <button
                onClick={() => setShowDomainForm(true)}
                className="w-full rounded-lg border border-dashed py-2 text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                + Add Another Domain
              </button>
            )}
          </div>
        )}

        {showDomainForm && (
          <div className="mt-4 rounded-lg border p-4">
            <h4 className="mb-3 font-medium">Add New Domain</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="example.com"
                className="flex-1 rounded border p-2"
              />
              <Button onClick={addDomain} primary>
                Add
              </Button>
              <Button onClick={() => setShowDomainForm(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev}>Back</Button>
        <Button onClick={onNext} primary disabled={!allDomainsValid}>
          Next <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

const StepPrepareDomains: React.FC<{
  domains: Domain[]
  onNext: () => void
  onPrev: () => void
}> = ({ domains, onNext, onPrev }) => {
  const [domainsReady, setDomainsReady] = useState<{ [key: string]: boolean }>(
    {}
  )

  const allDomainsReady = useMemo(() => {
    return domains.every((domain) => domainsReady[domain.name])
  }, [domains, domainsReady])

  const markDomainReady = (domainName: string, isReady: boolean) => {
    setDomainsReady((prev) => ({
      ...prev,
      [domainName]: isReady
    }))
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Step 2: Prepare Domains</h2>

      <Alert type="info">
        <p>
          In this step, you&apos;ll need to update the TTL (Time To Live) values
          for your DNS records to minimize downtime during the migration. A
          lower TTL means DNS changes propagate faster.
        </p>
      </Alert>

      <div className="my-6 space-y-4">
        {domains.map((domain) => (
          <div key={domain.name} className="rounded-lg border p-4">
            <div className="mb-4 flex items-center gap-2">
              <Globe size={20} />
              <h3 className="font-medium">{domain.name}</h3>
              {domainsReady[domain.name] && (
                <span className="ml-auto flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                  <Check size={14} /> Ready
                </span>
              )}
            </div>

            <ol className="ml-5 list-decimal space-y-3">
              <li>
                <p>
                  Log in to your Squarespace account and navigate to{' '}
                  <strong>Settings → Domains</strong>
                </p>
              </li>
              <li>
                <p>
                  Select the domain <strong>{domain.name}</strong>
                </p>
              </li>
              <li>
                <p>
                  Go to <strong>DNS Settings</strong>
                </p>
              </li>
              <li>
                <p>For each DNS record:</p>
                <ul className="ml-5 mt-1 list-disc">
                  <li>
                    Click the <strong>Edit</strong> button
                  </li>
                  <li>
                    Set the TTL to <strong>300 seconds</strong> (5 minutes)
                  </li>
                  <li>Save the changes</li>
                </ul>
              </li>
              <li>
                <p>Export your DNS records (for reference):</p>
                <ul className="ml-5 mt-1 list-disc">
                  <li>
                    Take screenshots or copy the information for each record
                  </li>
                  <li>
                    Ensure you capture ALL records (A, AAAA, CNAME, MX, TXT,
                    etc.)
                  </li>
                </ul>
              </li>
              <li>
                <p>Verify the TTL changes have been saved for all records</p>
              </li>
              <li>
                <p>
                  Wait at least 24 hours for the TTL changes to propagate
                  <span className="ml-1 text-yellow-600">
                    (important to avoid downtime)
                  </span>
                </p>
              </li>
            </ol>

            <div className="mt-6">
              <div className="mb-2 font-medium">Verify TTL Changes</div>
              <CodeBlock
                code={`dig ${domain.name} +nocmd +noall +answer +ttlid`}
              />
              <p className="mb-4 text-sm text-gray-600">
                The command above should show TTL values of 300 or less for your
                records.
              </p>

              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id={`ready-${domain.name}`}
                  checked={!!domainsReady[domain.name]}
                  onChange={(e) =>
                    markDomainReady(domain.name, e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor={`ready-${domain.name}`}>
                  I&apos;ve updated the TTL values and waited 24 hours
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev}>Back</Button>
        <Button onClick={onNext} primary disabled={!allDomainsReady}>
          Next <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

const StepCloudflareSetup: React.FC<{
  domains: Domain[]
  onNext: () => void
  onPrev: () => void
}> = ({ domains, onNext, onPrev }) => {
  const [cloudflareDomains, setCloudflareDomains] = useState<{
    [key: string]: boolean
  }>({})

  const allDomainsAdded = useMemo(() => {
    return domains.every((domain) => cloudflareDomains[domain.name])
  }, [domains, cloudflareDomains])

  const markDomainAdded = (domainName: string, isAdded: boolean) => {
    setCloudflareDomains((prev) => ({
      ...prev,
      [domainName]: isAdded
    }))
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Step 3: Configure Cloudflare</h2>

      <Alert type="warning">
        <p>
          <strong>Important:</strong> In this step, we&apos;ll add your domains
          to Cloudflare WITHOUT changing your nameservers yet. This allows us to
          set everything up before the actual migration.
        </p>
      </Alert>

      <div className="my-6 space-y-4">
        {domains.map((domain) => (
          <div key={domain.name} className="rounded-lg border p-4">
            <div className="mb-4 flex items-center gap-2">
              <Globe size={20} />
              <h3 className="font-medium">{domain.name}</h3>
              {cloudflareDomains[domain.name] && (
                <span className="ml-auto flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                  <Check size={14} /> Added to Cloudflare
                </span>
              )}
            </div>

            <ol className="ml-5 list-decimal space-y-3">
              <li>
                <p>
                  Log in to your Cloudflare account at{' '}
                  <a
                    href="https://dash.cloudflare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    dash.cloudflare.com
                  </a>
                </p>
              </li>
              <li>
                <p>
                  Click <strong>Add a Site</strong> and enter{' '}
                  <strong>{domain.name}</strong>
                </p>
              </li>
              <li>
                <p>
                  Select the <strong>Free plan</strong> (unless you need
                  additional features)
                </p>
              </li>
              <li>
                <p>
                  <strong>Important:</strong> When Cloudflare asks you to change
                  your nameservers, <strong>DO NOT</strong> do it yet. Just note
                  the Cloudflare nameservers for later use:
                </p>
                <div className="mt-1 rounded bg-gray-100 p-3 font-mono">
                  {CLOUDFLARE_NS.map((ns) => (
                    <div key={ns}>{ns}</div>
                  ))}
                </div>
              </li>
              <li>
                <p>
                  Skip the nameserver change step for now and continue to DNS
                  Records
                </p>
              </li>
              <li>
                <p>
                  Verify that Cloudflare has detected your existing DNS records
                </p>
                <div className="mt-1">
                  {domain.hasWixSite && (
                    <Alert type="info">
                      <p>
                        For Wix websites, make sure the following records are
                        present:
                      </p>
                      <ul className="ml-5 mt-1 list-disc">
                        <li>A records for @ (root domain)</li>
                        <li>CNAME record for www</li>
                        <li>
                          Set the proxy status to <strong>DNS only</strong>{' '}
                          (gray cloud) for Wix records
                        </li>
                      </ul>
                    </Alert>
                  )}

                  {domain.hasGoogleWorkspace && (
                    <Alert type="info">
                      <p>
                        For Google Workspace, ensure these records are present:
                      </p>
                      <ul className="ml-5 mt-1 list-disc">
                        <li>MX records with correct priorities</li>
                        <li>TXT records for SPF, DKIM, and DMARC</li>
                        <li>Any CNAME records for Google services</li>
                      </ul>
                    </Alert>
                  )}
                </div>
              </li>
              <li>
                <p>Add a new CNAME record for the todd subdomain:</p>
                <table className="mt-1 min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Type</th>
                      <th className="border p-2 text-left">Name</th>
                      <th className="border p-2 text-left">Target</th>
                      <th className="border p-2 text-left">TTL</th>
                      <th className="border p-2 text-left">Proxy Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">CNAME</td>
                      <td className="border p-2">todd</td>
                      <td className="border p-2">{domain.name}</td>
                      <td className="border p-2">Auto</td>
                      <td className="border p-2">Proxied (orange cloud)</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <p>
                  If this is an alias domain ({!domain.primary && domain.name}),
                  set up a redirect rule:
                </p>
                <ul className="ml-5 mt-1 list-disc">
                  <li>
                    Go to <strong>Rules</strong> →{' '}
                    <strong>Bulk Redirects</strong>
                  </li>
                  <li>
                    Create a 301 redirect from {domain.name}
                    {domains.find((d) => d.primary)?.name}/$1
                  </li>
                </ul>
              </li>
            </ol>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id={`cf-${domain.name}`}
                checked={!!cloudflareDomains[domain.name]}
                onChange={(e) => markDomainAdded(domain.name, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`cf-${domain.name}`}>
                I&apos;ve added this domain to Cloudflare and verified all DNS
                records
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev}>Back</Button>
        <Button onClick={onNext} primary disabled={!allDomainsAdded}>
          Next <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

const StepConfigureWorkers: React.FC<{
  domains: Domain[]
  onNext: () => void
  onPrev: () => void
}> = ({ domains, onNext, onPrev }) => {
  const [workersConfigured, setWorkersConfigured] = useState(false)

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Step 4: Configure Cloudflare Workers
      </h2>

      <p className="mb-6">
        Now you&apos;ll configure a Cloudflare Worker and bind it to the todd.*
        subdomains for each of your domains.
      </p>

      <div className="mb-6 rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Worker Setup Instructions</h3>

        <ol className="ml-5 list-decimal space-y-3">
          <li>
            <p>
              Go to the <strong>Workers & Pages</strong> section in your
              Cloudflare dashboard
            </p>
          </li>
          <li>
            <p>
              Click <strong>Create application</strong> and select{' '}
              <strong>Create Worker</strong>
            </p>
          </li>
          <li>
            <p>Give your worker a name (e.g., &quot;todd-worker&quot;)</p>
          </li>
          <li>
            <p>
              Replace the default code with your worker code or use the simple
              example below:
            </p>
            <CodeBlock
              code={`
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello from Cloudflare Worker!', {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
};`}
            />
          </li>
          <li>
            <p>
              Click <strong>Save and Deploy</strong>
            </p>
          </li>
          <li>
            <p>
              Once deployed, navigate to <strong>Triggers</strong> →{' '}
              <strong>Custom Domains</strong>
            </p>
          </li>
          <li>
            <p>For each of your domains, add the todd subdomain:</p>
            <ul className="ml-5 mt-1 list-disc">
              {domains.map((domain) => (
                <li key={domain.name}>
                  <code className="rounded bg-gray-100 px-1 py-0.5">
                    todd.{domain.name}
                  </code>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p>
              Cloudflare will automatically generate and configure SSL
              certificates
            </p>
          </li>
          <li>
            <p>
              <strong>Note:</strong> Your worker won&apos;t be accessible yet
              since the domains are still using Google&apos;s nameservers. This
              is expected and we&apos;ll complete the migration in the next
              step.
            </p>
          </li>
        </ol>

        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            id="workers-configured"
            checked={workersConfigured}
            onChange={(e) => setWorkersConfigured(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="workers-configured">
            I&apos;ve configured the Cloudflare Worker and added all custom
            domains
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev}>Back</Button>
        <Button onClick={onNext} primary disabled={!workersConfigured}>
          Next <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

const StepCutover: React.FC<{
  domains: Domain[]
  onNext: () => void
  onPrev: () => void
}> = ({ domains, onNext, onPrev }) => {
  const [nameserversUpdated, setNameserversUpdated] = useState<{
    [key: string]: boolean
  }>({})

  const allDomainsUpdated = useMemo(() => {
    return domains.every((domain) => nameserversUpdated[domain.name])
  }, [domains, nameserversUpdated])

  const markDomainUpdated = (domainName: string, isUpdated: boolean) => {
    setNameserversUpdated((prev) => ({
      ...prev,
      [domainName]: isUpdated
    }))
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Step 5: Execute Cut-over</h2>

      <Alert type="warning">
        <p>
          <strong>Caution:</strong> This is the critical step where we change
          nameservers. It&apos;s recommended to perform this during a
          low-traffic period. Thanks to the TTL adjustments in previous steps,
          the downtime should be minimal (usually under 5 minutes as stated in
          the migration plan).
        </p>
      </Alert>

      <div className="my-6 space-y-4">
        {domains.map((domain) => (
          <div key={domain.name} className="rounded-lg border p-4">
            <div className="mb-4 flex items-center gap-2">
              <Globe size={20} />
              <h3 className="font-medium">{domain.name}</h3>
              {nameserversUpdated[domain.name] && (
                <span className="ml-auto flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                  <Check size={14} /> Nameservers Updated
                </span>
              )}
            </div>

            <ol className="ml-5 list-decimal space-y-3">
              <li>
                <p>
                  Log in to your Squarespace account and navigate to{' '}
                  <strong>Settings → Domains</strong>
                </p>
              </li>
              <li>
                <p>
                  Select the domain <strong>{domain.name}</strong>
                </p>
              </li>
              <li>
                <p>
                  Go to <strong>DNS Settings</strong> and click on{' '}
                  <strong>Nameservers</strong>
                </p>
              </li>
              <li>
                <p>
                  Select <strong>Use custom nameservers</strong>
                </p>
              </li>
              <li>
                <p>
                  Replace the current nameservers with Cloudflare&apos;s
                  nameservers:
                </p>
                <div className="mt-1 rounded bg-gray-100 p-3 font-mono">
                  {CLOUDFLARE_NS.map((ns) => (
                    <div key={ns}>{ns}</div>
                  ))}
                </div>
              </li>
              <li>
                <p>Save the changes</p>
              </li>
              <li>
                <p>
                  Monitor the nameserver propagation using the following
                  command:
                </p>
                <CodeBlock code={`dig NS ${domain.name} +short`} />
                <p className="text-sm text-gray-600">
                  The command should eventually show Cloudflare nameservers.
                </p>
              </li>
            </ol>

            <div className="mt-4">
              <p className="mb-2">
                To monitor propagation in real-time, run this PowerShell command
                as specified in the migration plan:
              </p>
              <CodeBlock
                code={`
while ($true) {
    Resolve-DnsName ${domain.name} -Type NS
    Start-Sleep 30
}`}
              />
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id={`ns-${domain.name}`}
                checked={!!nameserversUpdated[domain.name]}
                onChange={(e) =>
                  markDomainUpdated(domain.name, e.target.checked)
                }
                className="mr-2"
              />
              <label htmlFor={`ns-${domain.name}`}>
                I&apos;ve updated the nameservers for this domain
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev}>Back</Button>
        <Button onClick={onNext} primary disabled={!allDomainsUpdated}>
          Next <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

const StepValidate: React.FC<{
  domains: Domain[]
  onNext: () => void
  onPrev: () => void
}> = ({ domains, onNext, onPrev }) => {
  const [validationChecks, setValidationChecks] = useState<{
    nameservers: false
    worker: false
    wix: false
    google: false
    redirect: false
  }>({
    nameservers: false,
    worker: false,
    wix: false,
    google: false,
    redirect: false
  })

  const allChecksCompleted = useMemo(() => {
    return Object.values(validationChecks).every((check) => check)
  }, [validationChecks])

  const updateCheck = (checkName: string, value: boolean) => {
    setValidationChecks((prev) => ({
      ...prev,
      [checkName]: value
    }))
  }

  const primaryDomain = domains.find((d) => d.primary)
  const aliasDomains = domains.filter((d) => !d.primary)
  const hasWixSite = domains.some((d) => d.hasWixSite)
  const hasGoogleWorkspace = domains.some((d) => d.hasGoogleWorkspace)

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Step 6: Validate Migration</h2>

      <p className="mb-6">
        Now that you&apos;ve updated the nameservers, let&apos;s verify that
        everything is working correctly. Check each of the following items:
      </p>

      <div className="mb-6 space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="mb-3 font-medium">Nameserver Verification</h3>
          <p className="mb-2">
            Ensure all domains are using Cloudflare nameservers:
          </p>

          {domains.map((domain) => (
            <div key={domain.name} className="mb-2">
              <CodeBlock code={`dig NS ${domain.name} +short`} />
              <p className="text-sm text-gray-600">
                Should show: {CLOUDFLARE_NS.join(', ')}
              </p>
            </div>
          ))}

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="check-nameservers"
              checked={validationChecks.nameservers}
              onChange={(e) => updateCheck('nameservers', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="check-nameservers">
              All domains are using Cloudflare nameservers
            </label>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-3 font-medium">Cloudflare Worker Access</h3>
          <p className="mb-2">
            Verify your worker is accessible on all todd subdomains:
          </p>

          <ul className="mb-4 ml-5 list-disc">
            {domains.map((domain) => (
              <li key={domain.name}>
                <a
                  href={`https://todd.${domain.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://todd.{domain.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="check-worker"
              checked={validationChecks.worker}
              onChange={(e) => updateCheck('worker', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="check-worker">
              Worker is accessible on all todd subdomains
            </label>
          </div>
        </div>

        {hasWixSite && (
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-medium">Wix Website Access</h3>
            <p className="mb-2">Verify your Wix website is still accessible:</p>

            <ul className="mb-4 ml-5 list-disc">
              <li>
                <a
                  href={`https://www.${primaryDomain?.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.{primaryDomain?.name}
                </a>
              </li>
              <li>
                <a
                  href={`https://${primaryDomain?.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://{primaryDomain?.name}
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="check-wix"
                checked={validationChecks.wix}
                onChange={(e) => updateCheck('wix', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="check-wix">Wix website is accessible</label>
            </div>
          </div>
        )}

        {hasGoogleWorkspace && (
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-medium">Google Workspace Verification</h3>
            <p className="mb-4">
              Verify your Google Workspace services are working:
            </p>

            <ol className="ml-5 list-decimal space-y-2">
              <li>
                Send a test email to and from your Google Workspace email
                addresses
              </li>
              <li>
                Verify Google services like Drive, Calendar, etc. are accessible
              </li>
              <li>
                Check for any alerts in the Google Workspace admin console
              </li>
            </ol>

            <p className="mb-2 mt-3">
              You can also verify your DNS records using MX Toolbox:
            </p>
            <a
              href={`https://mxtoolbox.com/SuperTool.aspx?action=mx%3a${primaryDomain?.name}&run=toolpage`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-blue-600 hover:underline"
            >
              Check MX Records
            </a>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="check-google"
                checked={validationChecks.google}
                onChange={(e) => updateCheck('google', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="check-google">
                Google Workspace services are functioning properly
              </label>
            </div>
          </div>
        )}

        {aliasDomains.length > 0 && (
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-medium">Domain Alias Redirection</h3>
            <p className="mb-2">
              Verify that alias domains redirect to the primary domain:
            </p>

            <ul className="mb-4 ml-5 list-disc">
              {aliasDomains.map((domain) => (
                <li key={domain.name}>
                  <a
                    href={`https://${domain.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://{domain.name}
                  </a>
                  {' should redirect to '}
                  <a
                    href={`https://${primaryDomain?.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://{primaryDomain?.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="check-redirect"
                checked={validationChecks.redirect}
                onChange={(e) => updateCheck('redirect', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="check-redirect">
                Alias domains redirect correctly
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev}>Back</Button>
        <Button onClick={onNext} primary disabled={!allChecksCompleted}>
          Finish <Check size={18} />
        </Button>
      </div>
    </div>
  )
}

const StepComplete: React.FC<{
  onReset: () => void
}> = ({ onReset }) => {
  return (
    <div>
      <div className="mb-6 text-center">
        <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Migration Complete!</h2>
        <p className="text-gray-600">
          Congratulations! You&apos;ve successfully migrated your domains to
          Cloudflare and configured Cloudflare Workers on your subdomains.
        </p>
      </div>

      <div className="mb-6 rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-medium">Reference Documentation</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Squarespace Resources</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="https://support.squarespace.com/hc/en-us/articles/206543637"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Squarespace Domains DNS overview
                </a>
              </li>
              <li>
                <a
                  href="https://support.squarespace.com/hc/en-us/articles/205812378"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Squarespace &quot;Forward to URL&quot;
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Cloudflare Resources</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="https://developers.cloudflare.com/workers/platform/custom-domains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Cloudflare Workers → Custom Domains
                </a>
              </li>
              <li>
                <a
                  href="https://developers.cloudflare.com/dns/zone-setups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Cloudflare DNS zone setups (Full vs. Partial)
                </a>
              </li>
              <li>
                <a
                  href="https://developers.cloudflare.com/rules/bulk-redirects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Cloudflare Bulk Redirect Rules
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Other Service Documentation</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="https://support.wix.com/en/article/adding-or-updating-records-in-your-wix-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Wix DNS requirements
                </a>
              </li>
              <li>
                <a
                  href="https://support.google.com/a/answer/174125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Workspace MX & SPF records
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Alert type="success">
        <p>Your migration is complete, but remember:</p>
        <ul className="ml-5 mt-2 list-disc">
          <li>Keep your Cloudflare login credentials secure</li>
          <li>Periodically review your DNS settings</li>
          <li>Monitor your Cloudflare Worker performance</li>
        </ul>
      </Alert>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h3 className="mb-2 font-medium text-yellow-800">Rollback Plan</h3>
        <p className="mb-2 text-yellow-800">
          If a critical failure occurs, you can quickly revert by changing the
          nameservers back to Squarespace:
        </p>
        <ol className="ml-5 list-decimal text-yellow-800">
          <li>Return to Squarespace Domains → Nameservers</li>
          <li>Select &quot;Use Squarespace nameservers&quot;</li>
          <li>
            Thanks to the low TTL (300 seconds), restoration should be nearly
            immediate
          </li>
        </ol>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={onReset} primary>
          Start New Migration
        </Button>
      </div>
    </div>
  )
}

const DNSMigrationWizard: React.FC = () => {
  const [state, setState] = useState<MigrationState>({
    step: 0,
    domains: [],
    collectedInfo: false,
    preparedDomains: false,
    cloudflareAccount: false,
    cloudflareZonesCreated: false,
    workersConfigured: false,
    cutoverExecuted: false,
    validated: false
  })

  const resetWizard = () => {
    setState({
      step: 0,
      domains: [],
      collectedInfo: false,
      preparedDomains: false,
      cloudflareAccount: false,
      cloudflareZonesCreated: false,
      workersConfigured: false,
      cutoverExecuted: false,
      validated: false
    })
  }

  const nextStep = () => {
    setState((prev) => ({ ...prev, step: prev.step + 1 }))
  }

  const prevStep = () => {
    setState((prev) => ({ ...prev, step: Math.max(0, prev.step - 1) }))
  }

  const updateDomains = (domains: Domain[]) => {
    setState((prev) => ({ ...prev, domains }))
  }

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return <StepIntro onNext={nextStep} />
      case 1:
        return (
          <StepCollectInfo
            domains={state.domains}
            onDomainsChange={updateDomains}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 2:
        return (
          <StepPrepareDomains
            domains={state.domains}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <StepCloudflareSetup
            domains={state.domains}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <StepConfigureWorkers
            domains={state.domains}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 5:
        return (
          <StepCutover
            domains={state.domains}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 6:
        return (
          <StepValidate
            domains={state.domains}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 7:
        return <StepComplete onReset={resetWizard} />
      default:
        return <StepIntro onNext={nextStep} />
    }
  }

  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-slate-50 p-20">
      {state.step > 0 && state.step < 7 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              'Info',
              'Prepare',
              'Cloudflare',
              'Workers',
              'Cutover',
              'Validate'
            ].map((label, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full ${
                      state.step > index + 1
                        ? 'bg-green-600 text-white'
                        : state.step === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {state.step > index + 1 ? <Check size={16} /> : index + 1}
                  </div>
                  <span className="mt-1 text-xs">{label}</span>
                </div>
                {index < 5 && (
                  <div
                    className={`h-1 w-full ${
                      state.step > index + 1 ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {renderStep()}
    </div>
  )
}

export default DNSMigrationWizard
