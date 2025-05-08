/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useState, useEffect } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Droplets,
  Beaker,
  Shield,
  Wrench,
  BookOpen,
  PenTool,
  Package,
  Link
} from 'lucide-react'
import React from 'react'

// Define a unified Material interface that works for both use cases
interface Material {
  // Original MaterialCard properties
  color: string
  icon: React.ReactElement<IconProps>
  title: string
  details: string
  
  // Additional properties from the data source
  id: string | number
  iconName?: string // Optional as it's used to generate the icon
}

// Material Card Component (Small Square Tiles)
const MaterialCard = ({ material }: { material: Material }) => {
  // Doubled the size by adjusting aspect-square and adding more padding
  return (
    <div
      className="flex aspect-square flex-col items-center justify-between rounded-md p-4 text-center shadow-sm"
      style={{ backgroundColor: material.color }}
    >
      <div
        className="mb-2 rounded-full bg-white p-2"
        style={{ color: '#4f46e5' }}
      >
        {React.cloneElement(material.icon, { size: 32 })}
        {/* Doubled icon size */}
      </div>
      <h3 className="text-sm font-bold leading-tight text-white">
        {material.title}
      </h3>
      <p className="text-xs leading-tight text-white opacity-90 sm:hidden md:block md:text-sm">
        {material.details.split('. ').join('.\n')}
        {/* Adding line breaks between sentences */}
      </p>
    </div>
  )
}
// Process Step Component
interface Step {
  id: number
  title: string
  details: string[]
}

const ProcessStep = ({
  step,
  isExpanded,
  toggleExpand
}: {
  step: Step
  isExpanded: boolean
  toggleExpand: (id: number) => void
}) => {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-md">
      {' '}
      {/* Doubled vertical margin */}
      <div
        className="flex cursor-pointer items-center justify-between p-6 hover:bg-indigo-50"
        onClick={() => toggleExpand(step.id)}
      >
        <div className="flex items-center">
          <div
            className="mr-6 flex size-16 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: '#4f46e5' }}
          >
            {' '}
            {/* Doubled size and margin */}
            <span className="text-lg font-bold">{step.id}</span>{' '}
            {/* Increased text size */}
          </div>
          <h3 className="text-xl font-bold" style={{ color: '#4338ca' }}>
            {step.title}
          </h3>{' '}
          {/* Increased text size */}
        </div>
        {isExpanded ? <ChevronUp size={40} /> : <ChevronDown size={40} />}{' '}
        {/* Doubled icon size */}
      </div>
      {isExpanded && (
        <div className="border-t p-6 pt-0" style={{ borderColor: '#e0e7ff' }}>
          {' '}
          {/* Doubled padding */}
          <ul className="space-y-4 text-base">
            {' '}
            {/* Doubled spacing, increased text size */}
            {step.details.map((detail, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-4 mt-1" style={{ color: '#6366f1' }}>
                  •
                </span>{' '}
                {/* Doubled margin */}
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} // Technique Tile Component
interface Technique {
  title: string
  detail: string
}

const TechniqueTile = ({ technique }: { technique: Technique }) => {
  // Add line breaks to the details
  const formattedDetail = technique.detail.split('. ').join('.\n\n')

  return (
    <div
      className="h-full rounded-lg bg-white p-6 shadow-md"
      style={{ borderLeft: '4px solid #818cf8' }}
    >
      {' '}
      {/* Doubled border and padding */}
      <h4 className="mb-4 text-base font-semibold" style={{ color: '#4338ca' }}>
        {' '}
        {/* Doubled margin, increased text size */}
        {technique.title}
      </h4>
      <p className="whitespace-pre-line text-sm">{formattedDetail}</p>{' '}
      {/* Added whitespace-pre-line for line breaks */}
    </div>
  )
}
// InfoSection Component with Links
interface IconProps {
  size?: number;
  color?: string;
  // Add other props that your icons might use
}

interface InfoSectionProps {
  title: string
  items: Array<string | { url: string; text: string }>
  icon: React.ReactElement<IconProps>;
  hasLinks?: boolean
}

const InfoSection = ({
  title,
  items,
  icon,
  hasLinks = false
}: InfoSectionProps) => {
  return (
    <div className="h-full rounded-lg bg-white p-6 shadow-md">
      {' '}
      {/* Doubled padding */}
      <div className="mb-4 flex items-center">
        {' '}
        {/* Doubled margin */}
        <div
          className="mr-4 rounded p-2"
          style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}
        >
          {' '}
          {/* Doubled margin and padding */}
          {React.cloneElement(icon, { size: 36 })}{' '}
          {/* Doubled icon size */}
        </div>
        <h3 className="text-base font-bold" style={{ color: '#1e40af' }}>
          {title}
        </h3>{' '}
        {/* Increased text size */}
      </div>
      <ul className="space-y-2 text-sm">
        {' '}
        {/* Doubled spacing */}
        {!hasLinks &&
          !hasLinks &&
          items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 mt-1" style={{ color: '#6366f1' }}>
                •
              </span>
              <span className="whitespace-pre-line">
                {typeof item === 'string'
                  ? item.split('. ').join('.\n\n')
                  : item.text.split('. ').join('.\n\n')}
              </span>
            </li>
          ))}
        {hasLinks &&
          items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 mt-1" style={{ color: '#6366f1' }}>
                •
              </span>
              <a
                href={(item as { url: string }).url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-pre-line hover:underline"
                style={{ color: '#2563eb' }}
              >
                {(item as { text: string }).text.split('. ').join('.\n\n')}
                <Link size={16} className="ml-2 inline-block" />{' '}
                {/* Increased icon size */}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}
// Main FolkArt Infographic Component
const FolkArtInfographic = () => {
  interface Material {
    id: string | number
    iconName: string
    text: string
  }

  interface Step {
    id: string | number
    title: string
    description: string
  }

  interface InfographicData {
    materials: Material[]
    process: Step[]
    techniques: any[]
    maintenance: string[]
    references: Array<{ text: string; url: string }>
  }

  // Add state for infographic data
  const [infographicData, setInfographicData] = useState<InfographicData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Track expanded state for all process steps
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>(
    {}
  )

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch('/data/arty/arty-example.json')
        
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        setInfographicData(data)
      } catch (err) {
        console.error('Error loading infographic data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Icon mapping function to convert string icon names to components
  const getIconComponent = (iconName: string, size: number = 48) => {
    /* Doubled default icon size */
    const iconMap: Record<string, React.ReactElement> = {
      Droplets: <Droplets size={size} />,
      Beaker: <Beaker size={size} />,
      Shield: <Shield size={size} />,
      PenTool: <PenTool size={size} />,
      Package: <Package size={size} />,
      Wrench: <Wrench size={size} />
    }
    return iconMap[iconName] || <Package size={size} />
  }

  // Toggle individual step
  const toggleStep = (stepId: string | number) => {
    setExpandedSteps((prev: Record<string | number, boolean>) => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
  }

  // Expand all steps
  const expandAll = () => {
    if (!infographicData) return
    
    const allExpanded: Record<number, boolean> = {}
    infographicData.process.forEach((step: Step) => {
      allExpanded[step.id as number] = true
    })
    setExpandedSteps(allExpanded)
  }

  // Collapse all steps
  const collapseAll = () => {
    setExpandedSteps({})
  }

  // Check if all steps are expanded
  const areAllExpanded = infographicData?.process?.every(
    (step: Step) => expandedSteps[step.id as keyof typeof expandedSteps]
  ) || false

  // Add loading state
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-indigo-50">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <p className="text-lg text-indigo-700">Loading infographic data...</p>
      </div>
    </div>
  }

  // Add error state
  if (error) {
    return <div className="flex h-screen items-center justify-center bg-indigo-50">
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 shadow-md">
        <p className="text-lg text-red-700">Error: {error}</p>
      </div>
    </div>
  }

  // Add check for missing data
  if (!infographicData) {
    return <div className="flex h-screen items-center justify-center bg-indigo-50">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-8 shadow-md">
        <p className="text-lg text-amber-700">No infographic data available</p>
      </div>
    </div>
  }

  // Transform materials data to include React components
  const materialsWithIcons = infographicData.materials.map((material: Material) => ({
    ...material,
    icon: getIconComponent(material.iconName)
  }))

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eef2ff' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-8 py-6 text-white shadow-md"
        style={{ backgroundColor: '#3730a3' }}
      >
        {' '}
        {/* Doubled padding */}
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-bold">
            {' '}
            {/* Increased text size */}
            FolkArt Multi-Surface Acrylic Paint Application
          </h1>
          <div className="hidden text-base md:block">
            {' '}
            {/* Increased text size */}
            Titanium White + Textile Medium & Sealer
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-8">
        {' '}
        {/* Doubled padding */}
        {/* Materials Section */}
        <div className="mb-12">
          {' '}
          {/* Doubled margin */}
          <h2
            className="mb-6 flex items-center text-2xl font-bold"
            style={{ color: '#1e40af' }}
          >
            {' '}
            {/* Doubled margin, increased text size */}
            <Package size={40} className="mr-4" />{' '}
            {/* Doubled icon size and margin */}
            Materials
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {' '}
            {/* Reduced columns to account for larger sizes, doubled gap */}
            {materialsWithIcons.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
        {/* Process Section */}
        <div className="mb-12">
          {' '}
          {/* Doubled margin */}
          <div className="mb-6 flex items-center justify-between">
            {' '}
            {/* Doubled margin */}
            <h2
              className="flex items-center text-2xl font-bold"
              style={{ color: '#1e40af' }}
            >
              {' '}
              {/* Increased text size */}
              <Wrench size={40} className="mr-4" />{' '}
              {/* Doubled icon size and margin */}
              Application Process
            </h2>
            <button
              onClick={areAllExpanded ? collapseAll : expandAll}
              className="flex items-center rounded-full px-6 py-2 text-sm text-white hover:bg-[#4338ca]"
              style={{
                backgroundColor: '#4f46e5'
              }}
            >
              {areAllExpanded ? (
                <>
                  <ChevronUp size={28} className="mr-2" />{' '}
                  {/* Doubled icon size and margin */}
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDown size={28} className="mr-2" />{' '}
                  {/* Doubled icon size and margin */}
                  Expand All
                </>
              )}
            </button>
          </div>
          {infographicData.process.map((step) => (
            <ProcessStep
              key={step.id}
              step={step}
              isExpanded={!!expandedSteps[step.id]}
              toggleExpand={toggleStep}
            />
          ))}
        </div>
        {/* Techniques Section */}
        <div className="mb-12">
          {' '}
          {/* Doubled margin */}
          <h2
            className="mb-6 flex items-center text-2xl font-bold"
            style={{ color: '#1e40af' }}
          >
            {' '}
            {/* Doubled margin, increased text size */}
            <PenTool size={40} className="mr-4" />{' '}
            {/* Doubled icon size and margin */}
            Application Techniques
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {' '}
            {/* Reduced columns, doubled gap */}
            {infographicData.techniques.map((technique) => (
              <TechniqueTile key={technique.id} technique={technique} />
            ))}
          </div>
        </div>
        {/* Info Sections */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {' '}
          {/* Doubled margin and gap */}
          <InfoSection
            title="Maintenance"
            items={infographicData.maintenance}
            icon={<Wrench size={36} />}
          />
          <InfoSection
            title="References"
            items={infographicData.references}
            icon={<BookOpen size={36} />}
            hasLinks={true}
          />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-4 text-center text-sm text-white"
        style={{ backgroundColor: '#3730a3' }}
      >
        {' '}
        {/* Doubled padding, increased text size */}© 2025 FolkArt Application
        Guide | Created for artists and crafters
      </footer>
    </div>
  )
}

export default FolkArtInfographic
