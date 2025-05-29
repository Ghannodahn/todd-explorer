src\react-app\components\prompty\prompty-tool.ts:
⋮
│export interface ToolProps {
│  id: string
│  colorClass: string
│  icon: string
│  name: string
│  description: string
│  features: string[]
│  ctaLink: string
│  ctaText: string
⋮

src\react-app\components\util\markdown-viewer.tsx:
⋮
│interface MarkdownViewerProps {
│  content: string
│  contentUrl?: string
⋮

src\react-app\components\util\resizer.tsx:
⋮
│interface ResizerProps {
│  initialWidth: number;
│  minWidth?: number;
│  maxWidth?: number;
│  onWidthChange: (newWidth: number) => void;
│  containerRef: React.RefObject<HTMLElement>;
│  navWidth?: number;
│  direction?: 'horizontal' | 'vertical';
⋮

src\react-app\prototypes\amwayy\amway-success-pathways.tsx:
⋮
│const AmwaySuccessPathways = () => {
│  const [selectedTab, setSelectedTab] = useState('overview');
│  const [selectedStrategy, setSelectedStrategy] = useState('product');
│  const [monthlyHours, setMonthlyHours] = useState(40);
│  const [skillPreference, setSkillPreference] = useState(5);
│  const [timeHorizon, setTimeHorizon] = useState(12);
│
│  // Calculate recommended strategy based on inputs
│  const calculateStrategy = () => {
│    // Simplistic algorithm that weights factors
⋮
│  return (
│    <div className="flex flex-col max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
│      {/* Main Header */}
│      <div className="bg-blue-800 text-white p-6">
│        <h1 className="text-3xl font-bold mb-2">Amway Success Pathways</h1>
│        <p className="text-lg opacity-90">Interactive Strategy Visualizer for IBO Growth Planning</
│      </div>
│
│      {/* Navigation Tabs */}
│      <div className="bg-blue-700 text-white flex">
│        <button
│          onClick={() => setSelectedTab('overview')}
│          className={`py-3 px-6 ${selectedTab === 'overview' ? 'bg-white text-blue-800 font-bold' :
│        >
│          Pathways Overview
│        </button>
│        <button
│          onClick={() => setSelectedTab('calculator')}
│          className={`py-3 px-6 ${selectedTab === 'calculator' ? 'bg-white text-blue-800 font-bold'
│        >
│          Strategy Calculator
│        </button>
│        <button
│          onClick={() => setSelectedTab('leadership')}
⋮
│          Leadership Track
│        </button>
│        <button
│          onClick={() => setSelectedTab('niches')}
⋮
│      {/* Content Area */}
│      <div className="p-6">
│        {/* Overview Tab */}
│        {selectedTab === 'overview' && (
│          <div>
│            <h2 className="text-2xl font-bold text-blue-800 mb-4">Three Paths to Amway Success</h2>
│            <p className="mb-6 text-gray-700">
│              Amway offers multiple pathways to build a business. Understanding which approach
⋮
│                    Build your business through product expertise, customer relationships, and reta
│                  </p>
│                  <div className="space-y-2">
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Income Speed:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
│                      </div>
│                    </div>
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Scalability:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-green-500 h-2 rounded-full w-2/5"></div>
│                      </div>
│                    </div>
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Time Required:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-green-500 h-2 rounded-full w-3/5"></div>
│                      </div>
│                    </div>
│                  </div>
│                  <div className="mt-4">
│                    <button
│                      onClick={() => setSelectedStrategy('product')}
│                      className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 fon
│                    >
│                      Explore This Path
│                    </button>
⋮
│                    Create a scalable organization through recruiting, mentoring, and leadership de
│                  </p>
│                  <div className="space-y-2">
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Income Speed:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-purple-500 h-2 rounded-full w-2/5"></div>
│                      </div>
│                    </div>
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Scalability:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-purple-500 h-2 rounded-full w-4/5"></div>
│                      </div>
│                    </div>
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Time Required:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-purple-500 h-2 rounded-full w-4/5"></div>
│                      </div>
│                    </div>
│                  </div>
│                  <div className="mt-4">
│                    <button
│                      onClick={() => setSelectedStrategy('team')}
│                      className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 f
│                    >
│                      Explore This Path
│                    </button>
⋮
│                    Balance product sales with selective recruiting for a sustainable, diversified
│                  </p>
│                  <div className="space-y-2">
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Income Speed:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
│                      </div>
│                    </div>
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Scalability:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
│                      </div>
│                    </div>
│                    <div className="flex items-center">
│                      <div className="w-24 text-sm font-medium">Time Required:</div>
│                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
│                        <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
│                      </div>
│                    </div>
│                  </div>
│                  <div className="mt-4">
│                    <button
│                      onClick={() => setSelectedStrategy('hybrid')}
│                      className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-
│                    >
│                      Explore This Path
│                    </button>
⋮

src\react-app\prototypes\amwayy\amwayy.tsx:
⋮
│type ContentItem = {
│  id: string;
│  title: string;
│  type: 'markdown' | 'component';
│  content: string | React.ComponentType;
⋮
│const AmwayyHome: React.FC = () => {
│  // Content items with direct imports
│  const contentItems: ContentItem[] = [
│    {
│      id: 'overview',
│      title: 'Amway Business Overview',
│      type: 'markdown',
│      content: AmwayBusinessOverview
│    },
│    {
⋮
│  return (
│    <div className="flex h-screen bg-white">
│        <style jsx global>{`
│            .markdown-content h1 {
│                font-size: 2rem;
│                margin-bottom: 1rem;
│            }
│        `}</style>
│
│      {/* Left sidebar with table of contents */}
│      <div className="w-64 bg-blue-800 text-white overflow-y-auto">
│        <div className="p-4 border-b border-blue-700">
│          <h1 className="text-xl font-bold">Amway Knowledge Base</h1>
│        </div>
│        <nav className="p-2">
│          <ul>
│            {contentItems.map(item => (
│              <li key={item.id} className="mb-1">
│                <button
│                  onClick={() => setSelectedContentId(item.id)}
│                  className={`w-full text-left p-3 rounded transition-colors ${
│                    selectedContentId === item.id
│                      ? 'bg-blue-600 font-semibold'
│                      : 'hover:bg-blue-700'
│                  }`}
│                >
⋮

src\react-app\prototypes\arty\arty-example.tsx:
⋮
│interface Material {
│  // Original MaterialCard properties
│  color: string
│  icon: React.ReactElement<IconProps>
│  title: string
│  details: string
│
│  // Additional properties from the data source
│  id: string | number
│  iconName?: string // Optional as it's used to generate the icon
⋮
│  interface Material {
│    id: string | number
│    iconName: string
│    text: string
⋮
│  interface Step {
│    id: string | number
│    title: string
│    description: string
⋮

src\react-app\prototypes\modely\modely.tsx:
⋮
│type Position = {
│  x: number
│  y: number
│  width: number
│  height: number
⋮
│type PositionsMap = {
│  [key: string]: Position
⋮

src\react-app\prototypes\prompty\projectface\prompty-gptproject.tsx:
⋮
│interface GeneratedSections {
│  purpose: string
│  knowledge: string
│  behavior: string
│  workflow: string
│  boundaries: string
│  examples: string
⋮

src\react-app\prototypes\prototypes.tsx:
⋮
│interface Prototype {
│  iconName: string
│  title: string
│  description: string
│  path: string
⋮

src\react-app\prototypes\reacty\experiments\dns-migrator\dns-migration-wizard.tsx:
⋮
│type DomainRegistrar = 'Squarespace' | 'Google Domains' | 'Other'
│
⋮

src\react-app\prototypes\reacty\experiments\match3\match3.tsx:
⋮
│type TileType = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'
│
⋮
│interface Position {
│  row: number
│  col: number
⋮

src\react-app\prototypes\reacty\experiments\prompty\prompty-builder.tsx:
⋮
│interface PromptTemplate {
│  id: string;
│  title: string;
│  description: string;
│  color: string;
│  icon: React.ReactNode;
│  sections: PromptSection[];
│  example: string;
⋮
│interface PromptSection {
│  id: string;
│  title: string;
│  description: string;
│  icon: React.ReactNode;
│  options: string[];
│  isRequired: boolean;
│  color: string;
⋮
│interface PromptState {
│  [key: string]: string;
⋮
│            <div
│              key={template.id}
│              className={`p-3 rounded-lg cursor-pointer transition-all ${
│                selectedTemplate === template.id
│                  ? `${template.color} text-white shadow-md transform scale-102`
│                  : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow'
│              }`}
│              onClick={() => {
│                setSelectedTemplate(template.id);
│                resetSelections();
⋮
│                    <div
│                      key={index}
│                      className={`p-3 my-2 rounded cursor-pointer transition-colors ${
│                        promptSelections[section.id] === option
│                          ? `${section.color} border border-gray-300`
│                          : 'bg-gray-50 hover:bg-blue-50 border border-transparent'
│                      }`}
│                      onClick={() => selectOption(section.id, option)}
⋮

src\react-app\prototypes\reacty\experiments\prompty\types.ts:
⋮
│export interface TokenEfficiencyPrinciple {
│  id: string;
│  title: string;
│  description: string;
│  icon: string;
│  examples: TokenEfficiencyExample[];
⋮
│export interface TokenEfficiencyExample {
│  before: string;
│  after: string;
│  tokensBefore: number;
│  tokensAfter: number;
│  savingsPercentage: number;
⋮
│export interface TokenEfficiencyTechnique {
│  category: string;
│  techniques: {
│    name: string;
│    description: string;
│    example: string;
│  }[];
⋮
│export interface ComparisonExample {
│  title: string;
│  before: string;
│  after: string;
│  tokensBefore: number;
│  tokensAfter: number;
│  savingsPercentage: number;
⋮
│export interface InfographicState {
│  activePrinciple: string | null;
│  expandedExamples: Record<string, boolean>;
│  activeTechniqueCategory: string;
│  darkMode: boolean;
⋮

src\react-app\prototypes\reacty\reacty-content.tsx:
⋮
│interface ReactyContentProps {
│  currentExperiment: Experiment | undefined
⋮

src\react-app\prototypes\reacty\reacty-nav.tsx:
⋮
│export interface Experiment {
│  id: string
│  name: string
│  description: string
│  component: React.ComponentType
⋮
│interface ReactyNavProps {
│  experiments: Experiment[]
│  selectedExperiment: string | null
│  onSelectExperiment: (id: string) => void
⋮

src\react-app\prototypes\reacty\types.ts:
│export interface ExperimentData {
⋮
│export interface Experiment {
│  id: string
│  name: string
│  description: string
│  component: React.ComponentType
│  documentUrl: string
⋮

src\react-app\prototypes\recipes\cooking-step.tsx:
⋮
│export type CookingStepProps = {
│  title: string
│  time?: string
│  instructions: string
│  index: number
│  isLast: boolean
⋮

src\react-app\prototypes\recipes\ingredient-list.tsx:
⋮
│interface IngredientListProps {
│  ingredients: IngredientProps[]
⋮

src\react-app\prototypes\recipes\ingredient.tsx:
⋮
│export type IngredientProps = {
│  iconColor: string
│  bgColor: string
│  amount: number
│  letter: string
│  name: string
│  quantity: string
⋮

src\react-app\prototypes\recipes\recipe-loader.tsx:
⋮
│type RecipeOption = {
│  id: string
│  title: string
│  url: string
│  category: string
⋮

src\react-app\prototypes\recipes\recipe.tsx:
⋮
│export type RecipeSpec = {
│  ingredients: IngredientProps[]
│  cookingSteps: { title: string; time?: string; instructions: string }[]
│  equipment: string[]
│  notes: string[]
│  title: string
│  category: string
│  description: string
│  serving: string
⋮

src\react-app\prototypes\recipes\todd-recipes.tsx:
⋮
│                      <li key={recipe.id}>
│                        <button
│                          onClick={() => setCurrentRecipeUrl(recipe.url)}
⋮

worker-configuration.d.ts:
⋮
│declare namespace Cloudflare {
│       interface Env {
│       }
│}
│interface Env extends Cloudflare.Env {}
│
⋮
│interface Console {
│    "assert"(condition?: boolean, ...data: any[]): void;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/clear_static) */
│    clear(): void;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/count_static) */
│    count(label?: string): void;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/countreset_static) */
│    countReset(label?: string): void;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/debug_static) */
│    debug(...data: any[]): void;
⋮
│    time(label?: string): void;
⋮
│declare namespace WebAssembly {
│    class CompileError extends Error {
│        constructor(message?: string);
│    }
│    class RuntimeError extends Error {
│        constructor(message?: string);
│    }
│    type ValueType = "anyfunc" | "externref" | "f32" | "f64" | "i32" | "i64" | "v128";
│    interface GlobalDescriptor {
│        value: ValueType;
⋮
│    type ImportExportKind = "function" | "global" | "memory" | "table";
⋮
│interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
│    DOMException: typeof DOMException;
│    WorkerGlobalScope: typeof WorkerGlobalScope;
│    btoa(data: string): string;
│    atob(data: string): string;
│    setTimeout(callback: (...args: any[]) => void, msDelay?: number): number;
│    setTimeout<Args extends any[]>(callback: (...args: Args) => void, msDelay?: number, ...args: Ar
│    clearTimeout(timeoutId: number | null): void;
│    setInterval(callback: (...args: any[]) => void, msDelay?: number): number;
│    setInterval<Args extends any[]>(callback: (...args: Args) => void, msDelay?: number, ...args: A
⋮
│declare function setTimeout(callback: (...args: any[]) => void, msDelay?: number): number;
│/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/setTimeout) */
│declare function setTimeout<Args extends any[]>(callback: (...args: Args) => void, msDelay?: number
⋮
│interface TestController {
│}
│interface ExecutionContext {
│    waitUntil(promise: Promise<any>): void;
│    passThroughOnException(): void;
│    props: any;
⋮
│interface StructuredSerializeOptions {
│    transfer?: any[];
⋮
│declare abstract class PromiseRejectionEvent extends Event {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent/promise) */
│    readonly promise: Promise<any>;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent/reason) */
│    readonly reason: any;
│}
│declare abstract class Navigator {
│    sendBeacon(url: string, body?: (ReadableStream | string | (ArrayBuffer | ArrayBufferView) | Blo
│    readonly userAgent: string;
│    readonly hardwareConcurrency: number;
⋮
│interface Performance {
│    /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performan
│    readonly timeOrigin: number;
│    /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performan
│    now(): number;
│}
│interface AlarmInvocationInfo {
│    readonly isRetry: boolean;
│    readonly retryCount: number;
│}
│interface Cloudflare {
│    readonly compatibilityFlags: Record<string, boolean>;
⋮
│interface DurableObjectId {
│    toString(): string;
│    equals(other: DurableObjectId): boolean;
│    readonly name?: string;
⋮
│type DurableObjectJurisdiction = "eu" | "fedramp";
⋮
│interface DurableObjectState {
│    waitUntil(promise: Promise<any>): void;
│    readonly id: DurableObjectId;
│    readonly storage: DurableObjectStorage;
│    container?: Container;
│    blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
│    acceptWebSocket(ws: WebSocket, tags?: string[]): void;
│    getWebSockets(tag?: string): WebSocket[];
│    setWebSocketAutoResponse(maybeReqResp?: WebSocketRequestResponsePair): void;
│    getWebSocketAutoResponse(): WebSocketRequestResponsePair | null;
⋮
│interface DurableObjectListOptions {
│    start?: string;
│    startAfter?: string;
│    end?: string;
│    prefix?: string;
│    reverse?: boolean;
│    limit?: number;
│    allowConcurrency?: boolean;
│    noCache?: boolean;
│}
│interface DurableObjectGetOptions {
│    allowConcurrency?: boolean;
│    noCache?: boolean;
│}
│interface DurableObjectGetAlarmOptions {
│    allowConcurrency?: boolean;
│}
│interface DurableObjectPutOptions {
│    allowConcurrency?: boolean;
│    allowUnconfirmed?: boolean;
│    noCache?: boolean;
│}
│interface DurableObjectSetAlarmOptions {
│    allowConcurrency?: boolean;
│    allowUnconfirmed?: boolean;
⋮
│declare class Event {
│    constructor(type: string, init?: EventInit);
│    /**
│     * Returns the type of event, e.g. "click", "hashchange", or "submit".
│     *
│     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)
│     */
│    get type(): string;
│    /**
│     * Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PH
⋮
│    get currentTarget(): EventTarget | undefined;
⋮
│    get target(): EventTarget | undefined;
⋮
│declare abstract class AbortSignal extends EventTarget {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_static) */
│    static abort(reason?: any): AbortSignal;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static) */
│    static timeout(delay: number): AbortSignal;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/any_static) */
│    static any(signals: AbortSignal[]): AbortSignal;
│    /**
│     * Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwis
│     *
⋮
│interface Scheduler {
│    wait(delay: number, maybeOptions?: SchedulerWaitOptions): Promise<void>;
⋮
│declare class Blob {
│    constructor(type?: ((ArrayBuffer | ArrayBufferView) | string | Blob)[], options?: BlobOptions);
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/size) */
│    get size(): number;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/type) */
│    get type(): string;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/slice) */
│    slice(start?: number, end?: number, type?: string): Blob;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/arrayBuffer) */
│    arrayBuffer(): Promise<ArrayBuffer>;
⋮
│declare class File extends Blob {
│    constructor(bits: ((ArrayBuffer | ArrayBufferView) | string | Blob)[] | undefined, name: string
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/name) */
│    get name(): string;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/lastModified) */
│    get lastModified(): number;
⋮
│declare abstract class CacheStorage {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CacheStorage/open) */
│    open(cacheName: string): Promise<Cache>;
│    readonly default: Cache;
⋮
│interface CacheQueryOptions {
│    ignoreMethod?: boolean;
⋮
│declare abstract class CryptoKey {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/type) */
│    readonly type: string;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/extractable) */
│    readonly extractable: boolean;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/algorithm) */
│    readonly algorithm: CryptoKeyKeyAlgorithm | CryptoKeyAesKeyAlgorithm | CryptoKeyHmacKeyAlgorith
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/usages) */
│    readonly usages: string[];
⋮
│interface CryptoKeyKeyAlgorithm {
│    name: string;
⋮
│interface ContentOptions {
│    html?: boolean;
│}
│declare class HTMLRewriter {
│    constructor();
│    on(selector: string, handlers: HTMLRewriterElementContentHandlers): HTMLRewriter;
│    onDocument(handlers: HTMLRewriterDocumentContentHandlers): HTMLRewriter;
│    transform(response: Response): Response;
⋮
│interface Element {
│    tagName: string;
│    readonly attributes: IterableIterator<string[]>;
│    readonly removed: boolean;
│    readonly namespaceURI: string;
│    getAttribute(name: string): string | null;
│    hasAttribute(name: string): boolean;
│    setAttribute(name: string, value: string): Element;
│    removeAttribute(name: string): Element;
│    before(content: string | ReadableStream | Response, options?: ContentOptions): Element;
│    after(content: string | ReadableStream | Response, options?: ContentOptions): Element;
⋮
│interface EndTag {
│    name: string;
│    before(content: string | ReadableStream | Response, options?: ContentOptions): EndTag;
│    after(content: string | ReadableStream | Response, options?: ContentOptions): EndTag;
│    remove(): EndTag;
│}
│interface Comment {
│    text: string;
│    readonly removed: boolean;
│    before(content: string, options?: ContentOptions): Comment;
│    after(content: string, options?: ContentOptions): Comment;
│    replace(content: string, options?: ContentOptions): Comment;
│    remove(): Comment;
│}
│interface Text {
│    readonly text: string;
│    readonly lastInTextNode: boolean;
│    readonly removed: boolean;
│    before(content: string | ReadableStream | Response, options?: ContentOptions): Text;
│    after(content: string | ReadableStream | Response, options?: ContentOptions): Text;
│    replace(content: string | ReadableStream | Response, options?: ContentOptions): Text;
│    remove(): Text;
│}
│interface DocumentEnd {
│    append(content: string, options?: ContentOptions): DocumentEnd;
⋮
│type HeadersInit = Headers | Iterable<Iterable<string>> | Record<string, string>;
⋮
│interface Response extends Body {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/clone) */
│    clone(): Response;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/status) */
│    status: number;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/statusText) */
│    statusText: string;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/headers) */
│    headers: Headers;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/ok) */
⋮
│interface RequestInit<Cf = CfProperties> {
│    /* A string to set request's method. */
│    method?: string;
│    /* A Headers object, an object literal, or an array of two-item arrays to set request's headers
│    headers?: HeadersInit;
│    /* A BodyInit object or null to set request's body. */
│    body?: BodyInit | null;
│    /* A string indicating whether request follows redirects, results in an error upon encountering
│    redirect?: string;
│    fetcher?: (Fetcher | null);
⋮
│type QueueContentType = "text" | "bytes" | "json" | "v8";
⋮
│interface QueueRetryOptions {
│    delaySeconds?: number;
⋮
│interface ScheduledController {
│    readonly scheduledTime: number;
│    readonly cron: string;
│    noRetry(): void;
⋮
│interface StreamPipeOptions {
│    /**
│     * Pipes this readable stream to a given writable stream destination. The way in which the pipi
│     *
│     * Piping a stream will lock it for the duration of the pipe, preventing any other consumer fro
│     *
│     * Errors and closures of the source and destination streams propagate as follows:
│     *
│     * An error in this source readable stream will abort destination, unless preventAbort is truth
│     *
⋮
│interface ReadableStream<R = any> {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/locked) */
│    get locked(): boolean;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/cancel) */
│    cancel(reason?: any): Promise<void>;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/getReader) */
│    getReader(): ReadableStreamDefaultReader<R>;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/getReader) */
│    getReader(options: ReadableStreamGetReaderOptions): ReadableStreamBYOBReader;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/pipeThrough) */
⋮
│declare abstract class ReadableByteStreamController {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/byob
│    get byobRequest(): ReadableStreamBYOBRequest | null;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/desi
│    get desiredSize(): number | null;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/clos
│    close(): void;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/enqu
│    enqueue(chunk: ArrayBuffer | ArrayBufferView): void;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/erro
⋮
│declare abstract class WritableStreamDefaultController {
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/s
│    get signal(): AbortSignal;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/e
│    error(reason?: any): void;
⋮
│declare class WritableStream<W = any> {
│    constructor(underlyingSink?: UnderlyingSink, queuingStrategy?: QueuingStrategy);
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/locked) */
│    get locked(): boolean;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/abort) */
│    abort(reason?: any): Promise<void>;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/close) */
│    close(): Promise<void>;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/getWriter) */
│    getWriter(): WritableStreamDefaultWriter<W>;
⋮
│interface IdentityTransformStreamQueuingStrategy {
│    highWaterMark?: (number | bigint);
│}
│interface ReadableStreamValuesOptions {
│    preventCancel?: boolean;
⋮
│interface QueuingStrategyInit {
│    /**
│     * Creates a new ByteLengthQueuingStrategy with the provided high water mark.
│     *
│     * Note that the provided high water mark will not be validated ahead of time. Instead, if it i
│     */
│    highWaterMark: number;
│}
│interface ScriptVersion {
│    id?: string;
│    tag?: string;
│    message?: string;
⋮
│interface TraceItemFetchEventInfoRequest {
│    readonly cf?: any;
│    readonly headers: Record<string, string>;
│    readonly method: string;
│    readonly url: string;
│    getUnredacted(): TraceItemFetchEventInfoRequest;
⋮
│declare class URLSearchParams {
│    constructor(init?: (Iterable<Iterable<string>> | Record<string, string> | string));
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/size) */
│    get size(): number;
│    /**
│     * Appends a specified key/value pair as a new search parameter.
│     *
│     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/append)
│     */
│    append(name: string, value: string): void;
⋮
│interface URLPatternComponentResult {
│    input: string;
│    groups: Record<string, string>;
⋮
│interface WebSocket extends EventTarget<WebSocketEventMap> {
│    accept(): void;
│    /**
│     * Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer,
│     *
│     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/send)
│     */
│    send(message: (ArrayBuffer | ArrayBufferView) | string): void;
│    /**
│     * Closes the WebSocket connection, optionally using code as the the WebSocket connection close
⋮
│interface SocketOptions {
│    secureTransport?: string;
│    allowHalfOpen: boolean;
│    highWaterMark?: (number | bigint);
⋮
│declare abstract class BaseAiTextEmbeddings {
│    inputs: AiTextEmbeddingsInput;
│    postProcessedOutputs: AiTextEmbeddingsOutput;
⋮
│declare abstract class BaseAiTextGeneration {
│    inputs: AiTextGenerationInput;
│    postProcessedOutputs: AiTextGenerationOutput;
⋮
│declare abstract class BaseAiTextToImage {
│    inputs: AiTextToImageInput;
│    postProcessedOutputs: AiTextToImageOutput;
⋮
│type GatewayOptions = {
│    id: string;
│    cacheKey?: string;
│    cacheTtl?: number;
│    skipCache?: boolean;
│    metadata?: Record<string, number | string | boolean | null | bigint>;
│    collectLog?: boolean;
⋮
│type AutoRagAiSearchRequest = AutoRagSearchRequest & {
│    stream?: boolean;
⋮
│declare abstract class D1PreparedStatement {
│    bind(...values: unknown[]): D1PreparedStatement;
│    first<T = unknown>(colName: string): Promise<T | null>;
│    first<T = Record<string, unknown>>(): Promise<T | null>;
│    run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
│    all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
│    raw<T = unknown[]>(options: {
│        columnNames: true;
│    }): Promise<[
│        string[],
⋮
│interface EmailMessage {
│    /**
│     * Envelope From attribute of the email message.
│     */
│    readonly from: string;
│    /**
│     * Envelope To attribute of the email message.
│     */
│    readonly to: string;
⋮
│interface ForwardableEmailMessage extends EmailMessage {
│    /**
│     * Stream of the email message content.
│     */
│    readonly raw: ReadableStream<Uint8Array>;
│    /**
│     * An [Headers object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).
│     */
│    readonly headers: Headers;
│    /**
⋮
│interface ImagesBinding {
│    /**
│     * Get image metadata (type, width and height)
│     * @throws {@link ImagesError} with code 9412 if input is not an image
│     * @param stream The image bytes
│     */
│    info(stream: ReadableStream<Uint8Array>): Promise<ImageInfoResponse>;
│    /**
│     * Begin applying a series of transformations to an image
│     * @param stream The image bytes
⋮
│    input(stream: ReadableStream<Uint8Array>): ImageTransformer;
│}
│interface ImageTransformer {
│    /**
│     * Apply transform next, returning a transform handle.
│     * You can then apply more transformations, draw, or retrieve the output.
│     * @param transform
│     */
│    transform(transform: ImageTransform): ImageTransformer;
│    /**
│     * Draw an image on this transformer, returning a transform handle.
│     * You can then apply more transformations, draw, or retrieve the output.
⋮
│declare namespace Cloudflare {
│    interface Env {
│    }
⋮
│declare namespace TailStream {
│    interface Header {
│        readonly name: string;
│        readonly value: string;
│    }
│    interface FetchEventInfo {
│        readonly type: "fetch";
│        readonly method: string;
│        readonly url: string;
│        readonly cfJson: string;
⋮
│    type EventOutcome = "ok" | "canceled" | "exception" | "unknown" | "killSwitch" | "daemonDown" |
│    interface ScriptVersion {
│        readonly id: string;
│        readonly tag?: string;
│        readonly message?: string;
⋮
│interface VectorizeQueryOptions {
│    topK?: number;
│    namespace?: string;
│    returnValues?: boolean;
│    returnMetadata?: boolean | VectorizeMetadataRetrievalLevel;
│    filter?: VectorizeVectorMetadataFilter;
⋮