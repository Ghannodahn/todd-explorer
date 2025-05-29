src\react-app\components\column-chart-types.ts:
⋮
│export interface ColumnChartProps {
│  // Data to display in the chart
│  data: Record<string, unknown>[];
│
│  // Configuration for the chart
│  config: {
│    // X-axis configuration
│    xAxis: {
│      dataKey: string;
│      label?: string;
⋮

src\react-app\components\column-chart.tsx:
⋮
│interface ColumnChartProps {
│  // Data to display in the chart
│  data: Record<string, unknown>[];
│
│  // Configuration for the chart
│  config: {
│    // X-axis configuration
│    xAxis: {
│      dataKey: string;
│      label?: string;
⋮

src\react-app\components\customer-data-chart.tsx:
⋮
│interface ChartConfig {
│  xAxis: {
│    dataKey: string;
│    label: string;
│    angle: number;
│  };
│  yAxis: {
│    label: string;
│    tickFormatter: (value: number) => string;
│  };
⋮

src\react-app\components\header.tsx:
⋮
│            <Submenu
│              items={submenuItems}
│              isOpen={submenuOpen}
│              isMobile={true}
│              onItemClick={() => {
│                setSubmenuOpen(false);
│                if (onClick) onClick();
⋮

src\react-app\components\ordering\ordering-category-table.tsx:
⋮
│interface OrderingCategoryTableProps {
│  category: string;
│  itemsByCategory: Record<string, Item[]>;
│  customerEstimate: number;
│  safetyBuffer: number;
│  numWeekends: number;
⋮

src\react-app\components\ordering\ordering.model.tsx:
⋮
│export interface CategorySubtotals {
│  totalItemCount: number;
│  totalProjectedSalesPerWeekend: number;
│  totalProjectedSales: number;
│  totalPurchaseUnits: number;
⋮
│export interface CategoryCalculation {
│  items: Item[];
│  subtotals: CategorySubtotals;
⋮

src\react-app\components\pricing\bundle-pricing-tile.tsx:
⋮
│interface BundlePricingTileProps {
│  useBundlePricing: boolean;
│  onBundlePricingChange: (value: boolean) => void;
│  pricePerSecondBag: number;
│  onPricePerSecondBagChange: (value: number) => void;
│  maxPrice: number;
│  formatValue: (value: number) => string;
⋮
│      <div className="flex items-center mb-1">
│        <input
│          type="checkbox"
│          id="bundlePricing"
│          checked={useBundlePricing}
│          onChange={(e) => onBundlePricingChange(e.target.checked)}
⋮

src\react-app\components\pricing\config-tile.tsx:
⋮
│interface ConfigTileProps {
│  title: string;
│  value: number;
│  min: number;
│  max: number;
│  step?: number;
│  onChange: (value: number) => void;
│  colorTheme: 'blue' | 'green' | 'purple' | 'cyan' | 'amber' | 'teal' | 'rose' | 'indigo' | 'emeral
│  formatValue: (value: number) => string;
│  icon?: React.ReactNode;
⋮

src\react-app\components\pricing\cost-breakdown-chart.tsx:
⋮
│interface CostBreakdownChartProps {
│  totalProductCost: number;
│  vendorFees: number;
│  profit: number;
│  laborCost: number;
│  totalRevenue: number;
⋮

src\react-app\components\pricing\floats\pricing-calculator-floats-kpis.tsx:
⋮
│export interface FloatCalculationResults {
│  totalFloats: number;
│  totalRevenue: number;
│  totalCosts: number;
│  netProfit: number;
│  marginPercent: number;
│  unitMarkup: number;
│  roi: number;
⋮

src\react-app\components\pricing\floats\pricing-calculator-floats-model.ts:
⋮
│export interface CostBreakdown {
│  product: number;
│  labor: number;
│  vendor: number;
│  total: number;
⋮
│export interface UnitEconomics {
│  costPerFloat: number;
│  profitPerFloat: number;
│  marginPercent: number;
⋮
│export interface Metrics {
│  totalRevenue: number;
│  costs: CostBreakdown;
│  netProfit: number;
│  profitMargin: number;
│  roi: number;
│  varieties: FloatVariety[];
│  unitEconomics: UnitEconomics;
⋮
│export interface CostPercentages {
│  product: number;
│  labor: number;
│  vendor: number;
│  profit: number;
⋮
│export function formatCurrency(value: number): string {
│  return new Intl.NumberFormat('en-US', {
│    style: 'currency',
│    currency: 'USD',
│    minimumFractionDigits: 0,
│    maximumFractionDigits: 0
│  }).format(value);
⋮
│export function formatPercentage(value: number): string {
│  return `${Math.round(value)}%`;
⋮

src\react-app\components\pricing\floats\pricing-calculator-floats.tsx:
⋮
│const FloatProfitabilityAnalyzer = () => {
│  // State for configuration sliders
│  const [floatPrice, setFloatPrice] = useState(14);
│  const [laborAttribution, setLaborAttribution] = useState(10);
│
│  // Calculate metrics using the model
│  const metrics = useMemo(() =>
│    calculateMetrics(floatPrice, laborAttribution),
│    [floatPrice, laborAttribution]
│  );
│
⋮
│  return (
│    <div className="w-full max-w-6xl mx-auto p-6 m-6 bg-white rounded-lg shadow-lg text-black">
│      {/* Title */}
│      <div className="text-center mb-6">
│        <h1 className="text-3xl font-bold text-gray-800">Float Profitability Analysis</h1>
│        <p className="text-gray-600 mt-2">Configure pricing and labor settings to optimize profitab
│      </div>
│
│      {/* Header with Configuration */}
│      <PricingCalculatorFloatsConfig
│        floatPrice={floatPrice}
│        setFloatPrice={setFloatPrice}
│        laborAttribution={laborAttribution}
│        setLaborAttribution={setLaborAttribution}
│        formatCurrency={formatCurrency}
│        formatPercentage={formatPercentage}
│      />
│
│      {/* Key Metrics Row */}
│      <FloatsKPIs
│        calculations={floatCalculations}
│        formatCurrency={formatCurrency}
│      />
│
│      {/* Cost Breakdown */}
│      <div className="bg-white border border-gray-200 rounded-lg p-6">
│        <h3 className="text-lg font-bold mb-4">Cost Breakdown</h3>
│
│        <CostBreakdownChart
│          totalProductCost={metrics.costs.product}
│          vendorFees={metrics.costs.vendor}
│          profit={Math.max(0, metrics.netProfit)}
│          laborCost={metrics.costs.labor}
│          totalRevenue={metrics.totalRevenue}
│        />
│      </div>
│
│      {/* Variety Breakdown */}
│      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
│        <h3 className="text-lg font-bold mb-4">Performance by Variety</h3>
│        <div className="grid grid-cols-3 gap-4">
│          {metrics.varieties.map((variety, index) => (
│            <div key={index} className="bg-gray-50 rounded-lg p-4">
│              <h4 className="font-semibold text-gray-700">{variety.name}</h4>
│              <div className="text-sm text-gray-600 mt-2 space-y-1">
│                <div>Units: {variety.units} ({variety.percentage}%)</div>
│                <div>Revenue: {formatCurrency(variety.revenue)}</div>
⋮

src\react-app\components\pricing\icecream\pricing-calculator-icecream-config.tsx:
⋮
│interface PricingCalculatorIcecreamConfigProps {
│  singleScoopPrice: number;
│  setSingleScoopPrice: (value: number) => void;
│  doubleScoopPrice: number;
│  setDoubleScoopPrice: (value: number) => void;
│  deluxePrice: number;
│  setDeluxePrice: (value: number) => void;
│  deluxeUpsell: number;
│  setDeluxeUpsell: (value: number) => void;
│  laborPercent: number;
⋮

src\react-app\components\pricing\icecream\pricing-calculator-icecream-model.tsx:
⋮
│export interface IceCreamCalculationInputs {
│  laborPercent: number;
│  deluxeUpsell: number;
│  avgStaff: number;
│  singleScoopPrice: number; // Replacing basePrice
│  doubleScoopPrice: number; // New input
│  doubleScoopChance: number; // The % of time the customer will get a double scoop instead of a sin
│  deluxePrice: number;
⋮
│export interface IceCreamCalculationResults {
│  revenue: number;
│  iceCreamCost: number;
│  laborCost: number;
│  vendorFees: number;
│  totalCost: number;
│  profit: number;
│  profitMargin: number;
│  roi: number;
│  singleScoopUnits: number;
⋮

src\react-app\components\pricing\kpi.tsx:
⋮
│export interface KPICardProps {
│  title: string;
│  value: string | ReactNode;
│  subtitle?: string;
│  icon: 'package' | 'dollar' | 'users' | 'calculator' | 'settings' | 'trending-up' | 'info' | 'shop
│        'bar-chart' | 'pie-chart' | 'calendar' | 'clock' | 'target' | 'award' | 'percent' | 'arrow-
│        'refresh-cw' | 'activity';
│  valueClassName?: string;
⋮

src\react-app\components\pricing\pricing-calculator-cheesecake.tsx:
⋮
│        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
│          <ConfigTile
│            title="Base Price"
│            value={basePrice}
│            min={8}
│            max={14}
│            step={0.50}
│            onChange={setBasePrice}
│            colorTheme="green"
│            formatValue={(value) => formatCurrency(value)}
⋮

src\react-app\components\pricing\pricing-calculator-cottoncandy-kpis.tsx:
⋮
│interface PricingCalculatorCottonCandyKPIsProps {
│  metrics: {
│    laborCostPerBag: number;
│    totalCostPerBag: number;
│    profitPerBag: number;
│    profitMargin: number;
│    totalRevenue: number;
│    totalProfit: number;
│    productMarkup: number;
│  };
⋮

src\react-app\components\pricing\pricing-calculator-drinks-config.tsx:
⋮
│interface PricingControlsProps {
│  laborPercent: number;
│  setLaborPercent: (value: number) => void;
│  sodaPrice: number;
│  setSodaPrice: (value: number) => void;
│  redBullPrice: number;
│  setRedBullPrice: (value: number) => void;
│  waterPrice: number;
│  setWaterPrice: (value: number) => void;
│  gatoradePrice: number;
⋮

src\react-app\components\pricing\pricing-calculator-drinks-kpis.tsx:
⋮
│interface PricingCalculatorDrinksKPIsProps {
│  calculations: {
│    totalRevenue: number;
│    totalCosts: number;
│    profit: number;
│    profitMargin: number;
│  };
⋮
│          value={`$${calculations.totalRevenue.toLocaleString()}`}
│          subtitle="Projected revenue from drink sales"
│          icon="dollar"
│        />
│
│        <KPICard
│          title="Total Costs"
│          value={`$${calculations.totalCosts.toLocaleString()}`}
│          subtitle="Combined operational expenses"
│          icon="settings"
│        />
│
│        <KPICard
│          title="Net Profit"
│          value={`$${calculations.profit.toLocaleString()}`}
│          subtitle="Revenue minus all costs"
│          icon="trending-up"
│        />
│
│        <KPICard
│          title="ROI"
⋮

src\react-app\components\pricing\pricing-calculator-nuts.tsx:
⋮
│              <li>Average Transaction Value: ${(results.revenue / (singlePercentage / 100 * TOTAL_B
│            </ul>
│          </div>
│        </div>
│      </div>
│
│      <div className="text-center text-xs text-gray-500">
│        <p>Powered by Teamatorium T9M Profitability Analysis</p>
│        <p>Based on 2,131 total projected bags | {formatCurrency(results.profit)} profit at {result
⋮

src\react-app\components\sales\sales-category-contribution.tsx:
⋮
│export default function SalesCategoryContribution() {
│  const [viewMode, setViewMode] = useState('units');
│
│  const dataKey = viewMode === 'units' ? 'value' : 'sales';
│  const percentageKey = viewMode === 'units' ? 'percentage' : 'salesPercentage';
│  const total = viewMode === 'units' ? totalUnits : totalSales;
│  const formatTotal = viewMode === 'units' ? `${total.toLocaleString()} units` : `$${total.toLocale
│
│  // Sort data by current view mode
│  const sortedData = [...categoryData].sort((a, b) => b[dataKey] - a[dataKey]);
│
⋮

src\react-app\utils\data-loader.ts:
⋮
│interface TableRow {
│  [key: string]: string | number;
⋮

src\react-app\utils\data-transformer.ts:
⋮
│export interface DailyData {
│  Date: string;
│  Customers: number;
│  Event?: string;
⋮
│export interface WeekendData {
│  Weekend: string;
│  WeekendLabel: string;
│  Friday: number;
│  Saturday: number;
│  Sunday: number;
│  Total: number;
│  Faire: string;
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
│interface Performance {
│    /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performan
│    readonly timeOrigin: number;
│    /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performan
│    now(): number;
⋮
│declare class File extends Blob {
│    constructor(bits: ((ArrayBuffer | ArrayBufferView) | string | Blob)[] | undefined, name: string
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/name) */
│    get name(): string;
│    /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/lastModified) */
│    get lastModified(): number;
⋮
│declare abstract class BaseAiTextGeneration {
│    inputs: AiTextGenerationInput;
│    postProcessedOutputs: AiTextGenerationOutput;
⋮
│declare namespace Cloudflare {
│    interface Env {
│    }
⋮