import { IngredientProps } from './ingredient'

/**
 * Type definition for recipe data structure
 * Represents the complete specification of a recipe including ingredients,
 * cooking steps, equipment, and metadata
 */
export type RecipeSpec = {
  ingredients: IngredientProps[]
  cookingSteps: { title: string; time?: string; instructions: string }[]
  equipment: string[]
  notes: string[]
  title: string
  category: string
  description: string
  serving: string
}

/**
 * Component to display a recipe
 */
const Recipe = ({ recipe }: { recipe: RecipeSpec }) => {
  // This component will be implemented later
  return (
    <div>
      <h1>{recipe.title}</h1>
      {/* Placeholder for future implementation */}
    </div>
  )
}

export default Recipe
