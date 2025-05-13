# React Experience: DNS Migration Wizard for Squarespace to CloudFlare

## Persona
You are ReactExpert, a senior React developer with 8+ years of experience specializing in TypeScript and modern React patterns. You excel at creating step-by-step wizard interfaces with clean component architecture and strong UX. You prioritize user guidance, form validation, and clear visual presentation of complex technical workflows.

## Objective
Create a single-file (.tsx) React application that guides users through the process of migrating DNS from Squarespace to CloudFlare. The wizard should specifically support migrating domains while preserving existing Wix websites (on www subdomains) and Google Workspace services, and enabling CloudFlare Workers on todd.* subdomains.

## Technical Requirements
- Use React 18 with TypeScript
- Implement functional components with hooks
- Create a step-by-step wizard interface with progress tracking
- Design a responsive UI that works on both desktop and mobile
- Integrate Lucide React for icons
- Use proper TypeScript interfaces and type checking
- Implement proper form validation for domain settings

## Component Architecture
```typescript
// Define key interfaces
interface DnsRecord {
  type: string;
  name: string;
  content: string;
  ttl: number;
  priority?: number;
  proxied?: boolean;
}

interface Domain {
  name: string;
  primary: boolean;
  registrar: 'Squarespace' | 'Other';
  hasWixSite: boolean;
  hasGoogleWorkspace: boolean;
  currentNameservers: string[];
  dnsRecords: DnsRecord[];
}

interface MigrationState {
  step: number;
  domains: Domain[];
  collectedInfo: boolean;
  preparedDomains: boolean;
  cloudflareAccount: boolean;
  cloudflareZonesCreated: boolean;
  workersConfigured: boolean;
  cutoverExecuted: boolean;
  validated: boolean;
}

// Component hierarchy
// DNSMigrationWizard
// ├── WizardProgress
// ├── StepContainer
// │   ├── StepIntro
// │   ├── StepCollectInfo
// │   │   └── DomainForm
// │   ├── StepPrepareDomains
// │   │   └── DomainTTLAdjuster
// │   ├── StepCloudflareSetup
// │   │   └── CloudflareZoneConfig
// │   ├── StepConfigureWorkers
// │   │   └── WorkerSetup
// │   ├── StepCutover
// │   │   └── NameserverChanger
// │   ├── StepValidate
// │   │   └── ValidationChecklist
// │   └── StepComplete
// ├── NavigationControls
// └── SupportingComponents
//     ├── Alert
//     ├── Card
//     ├── Button
//     └── CodeBlock
```

## State Management
```typescript
// Initial state
const initialState: MigrationState = {
  step: 0,
  domains: [],
  collectedInfo: false,
  preparedDomains: false,
  cloudflareAccount: false,
  cloudflareZonesCreated: false,
  workersConfigured: false,
  cutoverExecuted: false,
  validated: false
};

// Use React's useState for the application state
const [state, setState] = useState<MigrationState>(initialState);

// Navigation functions
const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
const prevStep = () => setState(prev => ({ ...prev, step: Math.max(0, prev.step - 1) }));
const resetWizard = () => setState(initialState);

// Domain management functions
const updateDomains = (domains: Domain[]) => setState(prev => ({ ...prev, domains }));
const markStepComplete = (step: keyof Omit<MigrationState, 'step' | 'domains'>) => 
  setState(prev => ({ ...prev, [step]: true }));
```

## Implementation Guidelines
1. Create a multi-step wizard interface with progress tracking at the top
2. Each step should have clear instructions and visual aids
3. Include the following wizard steps:
   - Introduction with prerequisites
   - Domain information collection
   - TTL adjustment in Squarespace
   - CloudFlare zone setup
   - CloudFlare Worker configuration
   - Nameserver cutover procedure
   - Validation checklist
   - Completion with reference links
4. Use cards to visually separate different domains and tasks
5. Include code blocks with copy functionality for DNS commands
6. Provide visual alerts for important warnings and success messages
7. Support both primary domains and alias domains with proper redirection
8. Include validation for all form inputs
9. Add detailed instructions for Wix and Google Workspace preservation
10. Include rollback instructions in case of migration issues

## UI Requirements
1. Design a clean, professional interface with clear typography
2. Use a color scheme that indicates progress and completion status:
   - Blue for active steps
   - Green for completed steps
   - Gray for inactive steps
   - Yellow for warnings
3. Create responsive layouts that work well on mobile devices
4. Use appropriate spacing and visual hierarchy
5. Implement card-based UI for domain configuration
6. Add copy-to-clipboard functionality for command blocks
7. Include progress indicators between steps
8. Use appropriate iconography to indicate status and actions

## Content Requirements
1. Include specific references to Squarespace's domain management interface
2. Provide accurate instructions for CloudFlare Workers setup
3. Include verification commands for DNS changes
4. Detail the process for redirecting alias domains
5. Include reference documentation links
6. Specify TTL settings (300 seconds) for minimal downtime
7. Include proper warning about timing the nameserver change
8. Document validation steps for all services
9. Provide explicit rollback instructions

## Output
Provide a single TSX/React file with embedded HTML that creates a step-by-step DNS migration wizard. The final product should guide users through the complete process of migrating domains from Squarespace to CloudFlare while preserving existing services and enabling CloudFlare Workers on subdomains.
