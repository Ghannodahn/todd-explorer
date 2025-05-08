# Recipe Infographic Design Pattern

## Overview

This document describes the design pattern for creating consistent, visually appealing recipe infographics. The pattern was developed and refined through the creation of a traditional Ragù alla Bolognese infographic that emphasizes culinary authenticity while maintaining a space-efficient presentation.

## Core Design Principles

- **Single-viewport design**: All essential information is visible without scrolling or toggling between views
- **Visual categorization**: Color-coding system for ingredient types
- **Component-based structure**: Reusable, data-driven components for scalability
- **Culinary authenticity**: Emphasis on traditional methods and cultural context
- **Space-efficiency**: Compact presentation suitable for space-constrained environments

## Layout Structure

The infographic uses a responsive grid layout with the following key sections:

1. **Header**: Recipe title, cultural designation
2. **Introduction**: Brief description emphasizing authenticity
3. **Main Content**: Two-column layout (1:2 ratio)
   - Ingredients (left column)
   - Step-by-step method (right column, spanning 2 columns on larger screens)
4. **Footer**: Equipment list, additional notes

## Ingredient Representation

Ingredients are displayed as a grid of color-coded tiles with the following characteristics:

### Visual Design
- **Compact square tiles**: Minimal footprint with just enough space for essential information
- **Moderate spacing**: `gap-3` between tiles for visual clarity
- **Internal padding**: `p-2` for comfortable content spacing
- **Grid adaptability**: 3 columns on mobile, 4 columns on larger screens
- **Subtle shadows**: `shadow-sm` for subtle depth

### Color System
Ingredients are color-coded by category using Tailwind CSS classes:
- **Meat/Protein**: 
  - Background: `bg-red-50` (light red)
  - Icon: `bg-red-800` (dark red)
- **Vegetables/Produce**: 
  - Background: `bg-green-50` (light green)
  - Icon: `bg-green-800` (dark green)
- **Liquids/Dairy**: 
  - Background: `bg-yellow-50` (light yellow)
  - Icon: `bg-amber-600` (golden amber)

### Content Structure
Each ingredient tile contains:
- **Icon**: Small square with the ingredient's first letter (or custom letter)
- **Name**: Ingredient name in `text-xs` size
- **Amount**: Measurement in `text-xs` size

## Cooking Steps Representation

The cooking process is displayed in a vertical timeline with these characteristics:

### Visual Design
- **Step indicators**: Numbered circles with consistent color (`bg-red-700`)
- **Vertical timeline**: Connecting lines between steps
- **Clear headings**: Each step has a title and optional time indicator
- **Concise instructions**: Brief but informative text for each step

### Data Structure
Each cooking step is structured with these properties:
- `title`: Name of the cooking phase
- `time`: Duration (optional)
- `instructions`: Detailed cooking instructions

### Component Implementation
Steps are rendered through a reusable `CookingStep` component that accepts:
- `step`: The step data object
- `index`: Numerical position
- `isLast`: Boolean flag to handle the last item differently

## Contextual Information

The infographic includes important contextual elements:

- **Cultural authentication**: Notes about the official recipe registration
- **Equipment requirements**: Space-efficient cooking equipment list
- **Traditional variations**: Notes about optional ingredients

## Implementation Details

### React Component Structure

```jsx
// Main component
const RecipeInfographic = ({ recipeData }) => {
  return (
    <div className="flex flex-col bg-stone-50 rounded-lg shadow-lg p-4 w-full max-w-3xl mx-auto border-l-4 border-red-800">
      {/* Header */}
      {/* Main content grid */}
      {/* Footer */}
    </div>
  );
};

// Reusable step component
const CookingStep = ({ step, index, isLast }) => {
  return (
    <div className="flex">
      {/* Step number and timeline */}
      {/* Step content */}
    </div>
  );
};
```

### Data Structure

The component expects data in this structure:

```javascript
const recipeData = {
  title: "Recipe Name",
  subtitle: "Cultural Origin",
  description: "Brief authentic description",
  
  ingredients: [
    { 
      name: 'Ingredient Name',
      amount: 'Quantity',
      category: 'meat|vegetable|liquid',
      iconColor: 'bg-color-class',
      bgColor: 'bg-color-class',
      note: 'Usage note',
      letter: 'Letter for icon'
    },
    // More ingredients...
  ],
  
  cookingSteps: [
    {
      title: 'Step Name',
      time: 'Duration',
      instructions: 'Detailed instructions'
    },
    // More steps...
  ],
  
  equipment: ["Equipment 1", "Equipment 2"],
  additionalNotes: "Cultural or contextual notes"
};
```

## Design Considerations for Application

When applying this pattern to new recipes, consider these guidelines:

1. **Maintain color consistency**: Use the established color system for ingredient categories
2. **Preserve density**: Keep tiles compact to fit many ingredients
3. **Prioritize authenticity**: Include cultural/traditional context when relevant
4. **Adapt to recipe complexity**: For recipes with more steps, consider condensing some phases
5. **Space efficiency**: Always consider how the recipe works in space-constrained environments
6. **Responsive adjustments**: Test grid layouts at different breakpoints

## Examples

### Ragù alla Bolognese

The prototype infographic features:
- 8 color-coded ingredients (meat, vegetables, liquids)
- 5 distinct cooking steps
- Traditional Emilian context
- Equipment optimized for space constraints

## Best Practices

1. **Ingredient organization**: Group ingredients by their use in the recipe
2. **Step granularity**: Balance between too many steps and too few
3. **Color signaling**: Use colors consistently to convey meaning
4. **Typography hierarchy**: Maintain clear size differences between headings and body text
5. **White space**: Use moderate spacing for readability without wasting space

## Technical Implementation

For implementation in a React environment:
- Use Tailwind CSS for styling
- Leverage grid layout for responsive design
- Structure data separately from presentation
- Create reusable components for scalability
- Use explicit color classes rather than inline styles

## Future Enhancements

Potential improvements to consider:
1. **Printable version**: Optimize layout for printing
2. **Variable serving sizes**: Dynamic calculation of ingredient amounts
3. **Step details expansion**: Optional detailed views for complex steps
4. **Ingredient substitutions**: Alternative options for dietary restrictions
5. **Timing indicators**: Visual representation of total cooking time
6. **Equipment visualization**: Small icons for required tools

---

This design pattern should be consistently applied across all recipe infographics to maintain a cohesive visual language while allowing for content flexibility based on each recipe's unique requirements.
