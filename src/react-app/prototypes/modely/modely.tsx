/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import React, { useState, useEffect, useRef } from 'react'
// Assuming you placed the json file in src/data/
// If your build setup supports direct JSON imports:
// import initialData from '/data/modely/todd-components.json'

// Define a type for position data for better clarity
type Position = {
  x: number
  y: number
  width: number
  height: number
}

type PositionsMap = {
  [key: string]: Position
}

// --- NEW: Function to calculate initial layout ---
async function applyLayout(
  m1Components: { id: string }[],
  m2Components: { id: string }[],
  layoutFilePath: string
): Promise<PositionsMap> {
  const initialPositions: PositionsMap = {}

  // Combine all components into a single array with version information
  const allComponents = [
    ...m1Components.map((comp) => ({ ...comp, version: 'm1' })),
    ...m2Components
      .filter((m2c) => !m1Components.some((m1c) => m1c.id === m2c.id))
      .map((comp) => ({ ...comp, version: 'm2-only' }))
  ]

  // Helper function for circular layout (kept local as it's specific to this calculation)
  const positionComponentsInCircle = (
    componentsToPosition: { id: string; version?: string }[],
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    const angleStep = (2 * Math.PI) / (componentsToPosition.length || 1) // Avoid division by zero

    componentsToPosition.forEach((component, index) => {
      if (!initialPositions[component.id]) {
        // Avoid overwriting if already positioned
        const angle = index * angleStep
        initialPositions[component.id] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          width: 140, // Default width
          height: 80 // Default height
        }
      }
    })
  }

  // Try to load layout data
  let layoutData = null
  try {
    const layoutResponse = await fetch(layoutFilePath)
    if (!layoutResponse.ok) {
      throw new Error(`HTTP error loading layout: ${layoutResponse.status}`)
    }
    layoutData = await layoutResponse.json()
  } catch (layoutError) {
    console.error('Failed to load layout data:', layoutError)
  }

  // Process all components in a single pass
  const unpositionedM1Components = []
  const m2OnlyComponents = []

  // First pass: Apply layout positions from file if available
  for (const component of allComponents) {
    const componentId = component.id

    // If layout data exists and has this component, use that position
    if (layoutData && layoutData[componentId]) {
      initialPositions[componentId] = { ...layoutData[componentId] }
    }
    // Otherwise, categorize for fallback positioning
    else {
      if (component.version === 'm1') {
        unpositionedM1Components.push(component)
      } else if (component.version === 'm2-only') {
        m2OnlyComponents.push(component)
      }
    }
  }

  // Apply fallback positioning for components not in the layout
  if (unpositionedM1Components.length > 0) {
    console.warn(
      'Some M1 components were not found in the layout file, applying circular fallback.',
      unpositionedM1Components.map((c) => c.id)
    )
    positionComponentsInCircle(unpositionedM1Components, 400, 300, 250)
  }

  // Position M2-only components separately
  if (m2OnlyComponents.length > 0) {
    positionComponentsInCircle(m2OnlyComponents, 700, 300, 150)
  }

  return initialPositions
} // --- END: New layout function ---

const ToddComponentViewer = () => {
  // Component definitions will be loaded from the JSON data
  const [componentData, setComponentData] = useState({
    components: { m1: [], m2: [] },
    typeMapping: {},
    positions: {},
    subjectAreas: {}
  })
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const [, setError] = useState<string | null>(null) // Add error state

  // Active version state (m1 or m2)
  const [activeVersion, setActiveVersion] = useState('m2') // Change default from 'm1' to 'm2'

  // Active subject area (all, arena, optimizer)
  const [activeSubjectArea, setActiveSubjectArea] = useState('arena') // Change default from 'all' to 'arena'

  // Track positions of components
  const [positions, setPositions] = useState<PositionsMap>({}) // Use PositionsMap type

  // Track which component is being dragged
  const [draggingId, setDraggingId] = useState<string | null>(null) // Explicit type
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Interactive states
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  ) // Explicit type
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null) // Explicit type
  const [showConnectionsOnly, setShowConnectionsOnly] = useState(false)

  // Ref for the SVG element
  const svgRef = useRef<SVGSVGElement>(null) // Type the ref

  // Define subject areas
  const defineSubjectAreas = (components: { id: string }[]) => {
    // Consider defining a Component type
    // Arena subject area includes Arena and directly connected components
    // excluding Optimizer and its direct connections
    const arenaArea = {
      name: 'Arena Ecosystem',
      description: 'Components related to the Arena testing environment',
      components: [
        'arena',
        'challenge',
        'solution',
        'watcher',
        'judge',
        'conclusion',
        'library',
        'showman',
        'gptSolution',
        'toolSolution'
      ]
    }

    // Optimizer subject area includes Optimizer and directly connected components
    const optimizerArea = {
      name: 'Optimizer Ecosystem',
      description: 'Components related to the Optimizer improvement system',
      components: [
        'optimizer',
        'prompty',
        'tuner',
        'distiller',
        'integrator',
        'engineer',
        'gptSolution',
        'toolSolution',
        'recommender'
      ]
    }

    return {
      all: {
        name: 'Complete Architecture',
        description: 'All components in the TODD system',
        components: components.map((c) => c.id)
      },
      arena: arenaArea,
      optimizer: optimizerArea
    }
  }

  // Load component definitions and calculate initial layout
  useEffect(() => {
    const fetchDataAndLayout = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // 1. Fetch main component data
        const response = await fetch('/data/modely/todd-components.json') // Or the correct relative/absolute path
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // 2. Define Subject Areas (needs all components)
        const allComponents = [...data.components.m1, ...data.components.m2]
        const uniqueComponents = Array.from(
          new Map(allComponents.map((item) => [item.id, item])).values()
        )
        const subjectAreas = defineSubjectAreas(uniqueComponents)

        // 3. Calculate Initial Layout using the new function
        const initialPositions = await applyLayout(
          data.components.m1,
          data.components.m2,
          '/data/modely/todd-arena.layout.json' // Pass layout file path
        )

        // 4. Set Component Data State
        setComponentData({
          components: data.components, // Store original m1/m2 structure
          typeMapping: data.typeMapping,
          positions: initialPositions,
          subjectAreas
        })

        // 5. Set Positions State
        setPositions(initialPositions)
      } catch (e: unknown) {
        console.error('Failed to load component data or calculate layout:', e)
        setError(
          `Failed to load data or layout: ${
            e instanceof Error ? e.message : String(e)
          }`
        )
      } finally {
        setIsLoading(false)
      }
    }
    fetchDataAndLayout()
  }, []) // Keep dependency array empty as it runs once on mount

  // Grid snapping settings
  const [snapToGrid, setSnapToGrid] = useState(true)
  const gridSize = 10 // 10x10 pixel grid

  // Track if we're actually dragging vs just clicking
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef({ x: 0, y: 0 })

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<SVGGElement>, id: string) => {
    // Type the event
    const svg = svgRef.current
    if (!svg) return

    // Use getBoundingClientRect for more reliable coordinates relative to viewport
    const CTM = svg.getScreenCTM()
    if (!CTM) return

    const svgP = {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    }

    // Save initial position for determining whether a drag occurred
    dragStartPos.current = { x: e.clientX, y: e.clientY }

    const pos = positions[id]
    if (!pos) return // Check if position exists

    setDraggingId(id)
    setIsDragging(false) // Reset drag state
    setDragOffset({
      x: pos.x - svgP.x,
      y: pos.y - svgP.y
    })
  }

  // Handle mouse move for dragging
  const handleMouseMove = (e: MouseEvent) => {
    // Use global MouseEvent type
    if (draggingId && svgRef.current && positions[draggingId]) {
      // Check position exists
      // Calculate distance moved to determine if we're dragging
      const dx = Math.abs(e.clientX - dragStartPos.current.x)
      const dy = Math.abs(e.clientY - dragStartPos.current.y)

      // If moved more than 3 pixels, consider it a drag
      if (!isDragging && (dx > 3 || dy > 3)) {
        setIsDragging(true)
      }

      const svg = svgRef.current
      const CTM = svg.getScreenCTM()
      if (!CTM) return

      const svgP = {
        x: (e.clientX - CTM.e) / CTM.a,
        y: (e.clientY - CTM.f) / CTM.d
      }

      let newX = svgP.x + dragOffset.x
      let newY = svgP.y + dragOffset.y

      // Snap to grid if enabled
      if (snapToGrid) {
        newX = Math.round(newX / gridSize) * gridSize
        newY = Math.round(newY / gridSize) * gridSize
      }

      // Create new positions object immutably
      setPositions((prevPositions) => {
        const newPositions = { ...prevPositions }
        const currentComponentPos = newPositions[draggingId]

        // If we're dragging a component that's in the selection
        if (selectedComponents.includes(draggingId)) {
          const deltaX = newX - currentComponentPos.x
          const deltaY = newY - currentComponentPos.y

          // Update all selected components
          selectedComponents.forEach((id) => {
            if (newPositions[id]) {
              let updatedX = newPositions[id].x + deltaX
              let updatedY = newPositions[id].y + deltaY

              // Apply grid snapping if enabled
              if (snapToGrid) {
                updatedX = Math.round(updatedX / gridSize) * gridSize
                updatedY = Math.round(updatedY / gridSize) * gridSize
              }

              newPositions[id] = {
                ...newPositions[id],
                x: updatedX,
                y: updatedY
              }
            }
          })
        } else {
          // Just move the dragged component
          newPositions[draggingId] = {
            ...currentComponentPos,
            x: newX,
            y: newY
          }
        }
        return newPositions
      })
    }
  }

  // Handle mouse up to end dragging
  const handleMouseUp = (e: MouseEvent | React.MouseEvent<SVGSVGElement>) => {
    // Type the event
    if (draggingId) {
      // If we didn't drag (just clicked), select the component
      if (!isDragging) {
        // Simply select the component we started dragging
        console.log('Selecting component after click:', draggingId)
        handleComponentSelect(draggingId, e as React.MouseEvent<SVGGElement>)
      }

      // Reset dragging state
      setDraggingId(null)
      setIsDragging(false)
    }
  }

  // Get all active components based on the current version and subject area
  const getActiveComponents = () => {
    // Ensure componentData is loaded
    if (
      isLoading ||
      !componentData.components.m1 ||
      !componentData.components.m2
    ) {
      return []
    }

    let baseComponents = []

    // First, get components based on version
    if (activeVersion === 'm1') {
      baseComponents = componentData.components.m1
    } else {
      // For M2, combine M1 and M2, ensuring uniqueness by ID
      const combined = [
        ...componentData.components.m1,
        ...componentData.components.m2
      ]
      baseComponents = Array.from(
        new Map(combined.map((item) => [item.id, item])).values()
      )
    }

    // Filter by subject area (since 'all' is removed, we always filter)
    if (componentData.subjectAreas[activeSubjectArea]) {
      const areaComponentIds = new Set(
        componentData.subjectAreas[activeSubjectArea].components
      )
      return baseComponents.filter((c) => areaComponentIds.has(c.id))
    }

    return baseComponents
  }

  // Track multiple selected components
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]) // Explicit type

  // Handle component selection
  const handleComponentSelect = (
    componentId: string,
    e?: React.MouseEvent<SVGGElement>
  ) => {
    // Accept optional event
    const isShiftPressed =
      e?.shiftKey || (typeof window !== 'undefined' && window.event?.shiftKey) // Check shift key safely

    setSelectedComponents((prevSelected) => {
      if (isShiftPressed) {
        // Multi-select with Shift key
        if (prevSelected.includes(componentId)) {
          // If already selected, remove it
          return prevSelected.filter((id) => id !== componentId)
        } else {
          // Add to selection
          return [...prevSelected, componentId]
        }
      } else {
        // Single select without Shift
        if (prevSelected.length === 1 && prevSelected[0] === componentId) {
          // Deselect if already the only selected
          return []
        } else {
          // Select only this component
          console.log('showing component ' + componentId)
          return [componentId]
        }
      }
    })

    // Update single selected component for detail view only on single select actions
    if (!isShiftPressed) {
      setSelectedComponent((prev) =>
        prev === componentId ? null : componentId
      )
    } else {
      // If shift-clicking and nothing ends up selected, clear the detail view
      setSelectedComponents((currentSelected) => {
        if (currentSelected.length === 0) {
          setSelectedComponent(null)
        } else if (currentSelected.length === 1) {
          // If only one remains after shift-click, show its details
          setSelectedComponent(currentSelected[0])
        } else {
          // If multiple are selected, clear the single detail view
          setSelectedComponent(null)
        }
        return currentSelected // Return unchanged list for this check
      })
    }
  }

  // Handle component hover
  const handleComponentHover = (componentId: string | null) => {
    // Allow null for mouse leave
    setHoveredComponent(componentId)
  }

  // Handle component hover end
  const handleComponentHoverEnd = () => {
    setHoveredComponent(null)
  }

  // Get connected components for highlighting
  const getConnectedComponents = (componentId) => {
    if (!componentId) return []

    const component = getActiveComponents().find((c) => c.id === componentId)
    if (!component) return []

    // Get direct connections
    const directConnections = component.connections || []

    // Get components that connect to this component
    const incomingConnections = getActiveComponents()
      .filter((c) => c.connections?.includes(componentId))
      .map((c) => c.id)

    return [...new Set([...directConnections, ...incomingConnections])]
  }

  // Is this component new in M2?
  const isNewInM2 = (componentId) => {
    return (
      activeVersion === 'm2' &&
      !componentData.components.m1.some((c) => c.id === componentId) &&
      componentData.components.m2.some((c) => c.id === componentId)
    )
  }

  // Calculate the connection paths between components
  const getConnectionPath = (sourceId, targetId) => {
    // Skip if we don't have positions for these components yet
    if (!positions[sourceId] || !positions[targetId]) return ''

    const source = positions[sourceId]
    const target = positions[targetId]

    const sourceWidth = source.width || 140
    const sourceHeight = source.height || 80
    const targetWidth = target.width || 140
    const targetHeight = target.height || 80

    // Calculate center points
    const sourceX = source.x + sourceWidth / 2
    const sourceY = source.y + sourceHeight / 2
    const targetX = target.x + targetWidth / 2
    const targetY = target.y + targetHeight / 2

    // Direction vector
    const dx = targetX - sourceX
    const dy = targetY - sourceY
    const length = Math.sqrt(dx * dx + dy * dy)

    // Normalized direction
    const nx = dx / length
    const ny = dy / length

    // Find intersection with the rectangle's border
    // We'll adjust by using a slightly shorter line to accommodate the arrowhead
    const arrowHeadOffset = 5 // Offset to ensure arrowhead aligns with component edge

    // Calculate the intersections with the component borders
    let sourceIntersectX, sourceIntersectY, targetIntersectX, targetIntersectY

    // Find source component exit point
    if (Math.abs(nx) * sourceHeight > Math.abs(ny) * sourceWidth) {
      // Exiting through left or right edge
      const xSign = nx > 0 ? 1 : -1
      sourceIntersectX = sourceX + (xSign * sourceWidth) / 2
      sourceIntersectY = sourceY + ((ny / nx) * xSign * sourceWidth) / 2
    } else {
      // Exiting through top or bottom edge
      const ySign = ny > 0 ? 1 : -1
      sourceIntersectY = sourceY + (ySign * sourceHeight) / 2
      sourceIntersectX = sourceX + ((nx / ny) * ySign * sourceHeight) / 2
    }

    // Find target component entry point, adjusted for arrowhead
    if (Math.abs(nx) * targetHeight > Math.abs(ny) * targetWidth) {
      // Entering through left or right edge
      const xSign = nx > 0 ? 1 : -1
      targetIntersectX = targetX - (xSign * targetWidth) / 2
      targetIntersectY = targetY - ((ny / nx) * xSign * targetWidth) / 2
    } else {
      // Entering through top or bottom edge
      const ySign = ny > 0 ? 1 : -1
      targetIntersectY = targetY - (ySign * targetHeight) / 2
      targetIntersectX = targetX - ((nx / ny) * ySign * targetHeight) / 2
    }

    // Adjust target point to account for arrowhead size
    const adjustedTargetX = targetIntersectX - nx * arrowHeadOffset
    const adjustedTargetY = targetIntersectY - ny * arrowHeadOffset

    return `M ${sourceIntersectX} ${sourceIntersectY} L ${adjustedTargetX} ${adjustedTargetY}`
  }

  // Handle version change
  const handleVersionChange = (version) => {
    setActiveVersion(version)
    console.log('Setting positions.')
    console.log(positions)
    setPositions(componentData.positions)
  }

  // Handle subject area change
  const handleSubjectAreaChange = (area) => {
    setActiveSubjectArea(area)
    setPositions(componentData.positions)
  }

  // Reset positions
  const resetPositionsForCurrentSelection = () => {
    setPositions(componentData.positions)
  }

  // Reset positions
  const resetPositions = () => {
    resetPositionsForCurrentSelection()
  }

  // Find selected component details
  const selectedComponentDetails = selectedComponent
    ? getActiveComponents().find((c) => c.id === selectedComponent)
    : null

  // Handle global key events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle ESC key to deselect component
      if (e.key === 'Escape') {
        setSelectedComponent(null)
      }
    }

    // Add event listener
    window.addEventListener('keydown', handleKeyDown)

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // State for JSON editor modal
  const [showJsonEditor, setShowJsonEditor] = useState(false)
  const [jsonEditorContent, setJsonEditorContent] = useState('')

  // Handle opening the JSON editor
  const openJsonEditor = () => {
    // Convert current positions to formatted JSON
    const formattedJson = JSON.stringify(positions, null, 2)
    setJsonEditorContent(formattedJson)
    setShowJsonEditor(true)
  }

  // Handle saving JSON changes
  const saveJsonChanges = () => {
    try {
      // Parse the JSON from the editor
      const newPositions = JSON.parse(jsonEditorContent)

      // Apply the new positions
      setPositions(newPositions)

      // Close the modal
      setShowJsonEditor(false)
    } catch (error) {
      // Alert the user about invalid JSON
      alert(`Invalid JSON: ${error.message}`)
    }
  }

  // Handle closing the JSON editor without saving
  const closeJsonEditor = () => {
    setShowJsonEditor(false)
  }

  // Handle background click to deselect
  const handleBackgroundClick = (e) => {
    // Only handle direct clicks on the SVG background, not on components
    if (e.target === e.currentTarget) {
      setSelectedComponent(null)
      setSelectedComponents([])
    }
  }

  // Generate the SVG content
  const renderSVG = () => {
    const activeComponents = getActiveComponents()
    const connectedComponents = hoveredComponent
      ? getConnectedComponents(hoveredComponent)
      : selectedComponent && showConnectionsOnly
        ? getConnectedComponents(selectedComponent)
        : []

    return (
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleBackgroundClick}
        style={{ backgroundColor: '#fafafa' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="7"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 7 3.5, 0 7" fill="#555" />
          </marker>

          {/* Grid pattern definition */}
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* Grid background */}
        {snapToGrid && <rect width="800" height="600" fill="url(#grid)" />}

        {/* Render connections first */}
        {activeComponents.map((component) => {
          // Filter connections to only include visible components
          const visibleConnections = component.connections.filter((targetId) =>
            activeComponents.some((c) => c.id === targetId)
          )

          return visibleConnections.map((targetId) => {
            const isNewConnection =
              isNewInM2(component.id) || isNewInM2(targetId)
            const path = getConnectionPath(component.id, targetId)

            // Determine if this connection should be highlighted
            const isHighlighted =
              (hoveredComponent &&
                (component.id === hoveredComponent ||
                  targetId === hoveredComponent)) ||
              (selectedComponent &&
                showConnectionsOnly &&
                (component.id === selectedComponent ||
                  targetId === selectedComponent))

            // Apply extra styling for connections related to hovered/selected component
            const highlightStroke =
              hoveredComponent === component.id ||
              selectedComponent === component.id
                ? componentData.typeMapping[component.type]?.color || '#555'
                : componentData.typeMapping[
                    activeComponents.find((c) => c.id === targetId)?.type
                  ]?.color || '#555'

            return (
              <path
                key={`${component.id}-${targetId}`}
                d={path}
                stroke={
                  isHighlighted
                    ? highlightStroke
                    : isNewConnection
                      ? '#FF5722'
                      : '#555'
                }
                strokeWidth={isHighlighted ? '2.5' : '1.5'}
                strokeDasharray={isNewConnection ? '5,3' : 'none'}
                fill="none"
                markerEnd="url(#arrowhead)"
                opacity={
                  isHighlighted
                    ? '1'
                    : connectedComponents.length > 0 &&
                        !connectedComponents.includes(component.id) &&
                        !connectedComponents.includes(targetId)
                      ? '0.2'
                      : '0.7'
                }
              />
            )
          })
        })}

        {/* Render components */}
        {activeComponents.map((component) => {
          if (!positions[component.id]) return null

          const pos = positions[component.id]
          const isNew = isNewInM2(component.id)
          const typeInfo = componentData.typeMapping[component.type] || {}
          const color = typeInfo.color || '#999'

          // Special highlighting for focal components of subject areas
          const isFocalComponent =
            (activeSubjectArea === 'arena' && component.id === 'arena') ||
            (activeSubjectArea === 'optimizer' && component.id === 'optimizer')

          {
            /* Interactive states */
          }
          const isMultiSelected = selectedComponents.includes(component.id)
          const isHovered = hoveredComponent === component.id
          const isConnected = hoveredComponent
            ? getConnectedComponents(hoveredComponent).includes(component.id)
            : selectedComponent && showConnectionsOnly
              ? getConnectedComponents(selectedComponent).includes(component.id)
              : false

          // Apply opacity based on connection highlighting
          const componentOpacity =
            (hoveredComponent || (selectedComponent && showConnectionsOnly)) &&
            !isHovered &&
            !isMultiSelected &&
            !isConnected &&
            component.id !== hoveredComponent
              ? '0.4'
              : '1'

          return (
            <g
              key={component.id}
              data-component-id={component.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onMouseDown={(e) => {
                // If it's not a right-click, handle as drag
                if (e.button !== 2) {
                  handleMouseDown(e, component.id)
                  // Prevent default to avoid text selection
                  e.preventDefault()
                }
              }}
              onClick={(e) => {
                // Add direct click handler
                e.stopPropagation() // Prevent bubbling to background
                //if (!isDragging) {
                //  handleComponentSelect(component.id, e)
                //}
              }}
              onMouseEnter={() => handleComponentHover(component.id)}
              onMouseLeave={handleComponentHoverEnd}
              style={{
                cursor: draggingId === component.id ? 'grabbing' : 'pointer',
                transition: 'opacity 0.2s ease-in-out'
              }}
            >
              {/* Component shadow for selected/hovered state */}
              {(selectedComponents.includes(component.id) || isHovered) && (
                <rect
                  width="148"
                  height="88"
                  x="-4"
                  y="-4"
                  rx="12"
                  ry="12"
                  fill="none"
                  stroke={
                    selectedComponents.includes(component.id)
                      ? '#FFEB3B'
                      : isHovered
                        ? '#E0E0E0'
                        : 'transparent'
                  }
                  strokeWidth="2"
                  opacity="0.8"
                />
              )}

              {/* Component rectangle */}
              <rect
                width="140"
                height="80"
                rx="10"
                ry="10"
                fill={color}
                stroke={
                  selectedComponents.includes(component.id)
                    ? '#FFEB3B'
                    : isHovered
                      ? '#FFF'
                      : isFocalComponent
                        ? '#FFF'
                        : isNew
                          ? '#FF5722'
                          : '#000'
                }
                strokeWidth={
                  selectedComponents.includes(component.id) || isHovered
                    ? '3'
                    : isFocalComponent
                      ? '3'
                      : isNew
                        ? '2'
                        : '1'
                }
                strokeDasharray={isNew ? '5,3' : 'none'}
                opacity={componentOpacity}
              />

              {/* Component name */}
              <text
                x="70"
                y="30"
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
                fontSize={isFocalComponent ? '18' : '16'}
              >
                {component.name}
              </text>

              {/* Component type */}
              <text
                x="70"
                y="50"
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                «{component.type}»
              </text>

              {/* Drag handle visual indicator */}
              <rect
                x="55"
                y="65"
                width="30"
                height="5"
                rx="2"
                fill="rgba(255,255,255,0.7)"
              />
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header with controls */}
      <div className="bg-gray-800 p-3 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">TODD Architecture Viewer</h1>
            <p className="text-sm text-gray-300">
              Tool-Orchestrated Development & Diagnostics
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              className={`rounded px-3 py-1 text-sm ${
                activeVersion === 'm1' ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              onClick={() => handleVersionChange('m1')}
            >
              M1 Version
            </button>
            <button
              className={`rounded px-3 py-1 text-sm ${
                activeVersion === 'm2' ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              onClick={() => handleVersionChange('m2')}
            >
              M2 Version
            </button>
          </div>
        </div>

        {/* Subject Area Selector */}
        <div className="mt-2 flex space-x-2">
          <button
            className={`rounded px-3 py-1 text-sm ${
              activeSubjectArea === 'arena' ? 'bg-green-600' : 'bg-gray-600'
            }`}
            onClick={() => handleSubjectAreaChange('arena')}
          >
            Arena Ecosystem
          </button>
          <button
            className={`rounded px-3 py-1 text-sm ${
              activeSubjectArea === 'optimizer'
                ? 'bg-orange-600'
                : 'bg-gray-600'
            }`}
            onClick={() => handleSubjectAreaChange('optimizer')}
          >
            Optimizer Ecosystem
          </button>

          <div className="ml-auto flex items-center">
            <button
              className="mr-2 rounded bg-red-600 px-3 py-1 text-sm hover:bg-red-500"
              onClick={() => {
                // Clear selection
                setSelectedComponents([])
                setSelectedComponent(null)
              }}
              disabled={selectedComponents.length === 0}
            >
              Clear Selection ({selectedComponents.length})
            </button>
            <button
              className="mr-2 rounded bg-purple-600 px-3 py-1 text-sm hover:bg-purple-500"
              onClick={openJsonEditor}
            >
              Edit JSON
            </button>
            <button
              className="rounded bg-gray-600 px-3 py-1 text-sm hover:bg-gray-500"
              onClick={resetPositions}
            >
              Reset Layout
            </button>
            <label className="ml-2 flex items-center text-sm">
              <input
                type="checkbox"
                checked={snapToGrid}
                onChange={() => setSnapToGrid(!snapToGrid)}
                className="mr-1"
              />
              Grid Snap
            </label>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Main diagram area */}
        <div className="flex-1 overflow-hidden bg-white">{renderSVG()}</div>

        {/* Component details panel */}
        {selectedComponentDetails && (
          <div className="absolute inset-y-0 right-0 w-64 overflow-y-auto border-l border-gray-200 bg-white p-3 shadow-lg">
            <div
              className="mb-3 flex h-10 w-full items-center justify-center rounded font-bold text-white"
              style={{
                backgroundColor:
                  componentData.typeMapping[selectedComponentDetails.type]
                    ?.color || '#999'
              }}
            >
              {selectedComponentDetails.name}
            </div>

            {/* Interactive controls */}
            <div className="mb-3 flex items-center justify-between rounded bg-gray-100 p-1 text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showConnectionsOnly}
                  onChange={() => setShowConnectionsOnly(!showConnectionsOnly)}
                  className="mr-1"
                />
                Highlight Connections
              </label>
            </div>

            <div className="mb-3">
              <span className="text-xs text-gray-500">Type:</span>
              <p className="text-sm font-medium">
                {selectedComponentDetails.type}
              </p>
            </div>

            <div className="mb-3">
              <span className="text-xs text-gray-500">Description:</span>
              <p className="text-sm">{selectedComponentDetails.description}</p>
            </div>

            <div>
              <span className="text-xs text-gray-500">Connections:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedComponentDetails.connections.map((conn) => {
                  const connComponent = getActiveComponents().find(
                    (c) => c.id === conn
                  )
                  if (!connComponent) return null

                  return (
                    <span
                      key={conn}
                      className="cursor-pointer rounded-full px-2 py-1 text-xs text-white hover:opacity-80"
                      style={{
                        backgroundColor:
                          componentData.typeMapping[connComponent.type]
                            ?.color || '#999'
                      }}
                      onClick={() => {
                        // Switch to this component when clicked
                        setSelectedComponent(conn)
                      }}
                    >
                      {connComponent.name}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Incoming connections */}
            <div className="mt-3">
              <span className="text-xs text-gray-500">Referenced by:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {getActiveComponents()
                  .filter(
                    (c) => c.connections?.includes(selectedComponentDetails.id)
                  )
                  .map((incomingComp) => (
                    <span
                      key={incomingComp.id}
                      className="cursor-pointer rounded-full border px-2 py-1 text-xs hover:opacity-80"
                      style={{
                        borderColor:
                          componentData.typeMapping[incomingComp.type]?.color ||
                          '#999',
                        color:
                          componentData.typeMapping[incomingComp.type]?.color ||
                          '#999'
                      }}
                      onClick={() => {
                        // Switch to this component when clicked
                        setSelectedComponent(incomingComp.id)
                      }}
                    >
                      {incomingComp.name}
                    </span>
                  ))}
              </div>
            </div>

            {/* Component is new in M2 */}
            {isNewInM2(selectedComponentDetails.id) && (
              <div className="mt-3 rounded border border-orange-300 bg-orange-100 p-2 text-xs">
                This component is new in the M2 architecture.
              </div>
            )}

            {/* Close button */}
            <button
              className="absolute right-1 top-1 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedComponent(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center bg-gray-800 p-2 text-xs text-white">
        <div className="mr-4">Legend:</div>
        {Object.entries(componentData.typeMapping).map(([type, info]) => (
          <div key={type} className="mr-3 flex items-center">
            <div
              className="mr-1 size-3 rounded"
              style={{ backgroundColor: info.color }}
            ></div>
            <span>{type}</span>
          </div>
        ))}

        {activeVersion === 'm2' && (
          <div className="ml-2 flex items-center">
            <div className="mr-1 h-3 w-5 border border-dashed border-orange-500"></div>
            <span>New in M2</span>
          </div>
        )}

        <div className="ml-auto text-gray-300">
          Drag to reposition | Click to select | Shift+Click for multi-select
        </div>
      </div>

      {/* JSON Editor Modal */}
      {showJsonEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex size-3/4 max-w-4xl flex-col rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-bold">Edit Layout JSON</h2>
              <button
                onClick={closeJsonEditor}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grow overflow-hidden p-4">
              <textarea
                className="size-full min-h-[240px] rounded border border-gray-300 p-2 font-mono text-sm"
                value={jsonEditorContent}
                onChange={(e) => setJsonEditorContent(e.target.value)}
                spellCheck="false"
              />
            </div>
            <div className="flex justify-end border-t border-gray-200 p-4">
              <button
                onClick={closeJsonEditor}
                className="mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveJsonChanges}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToddComponentViewer
