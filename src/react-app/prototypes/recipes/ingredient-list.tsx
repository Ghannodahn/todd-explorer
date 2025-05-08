import React from 'react'
import Ingredient, { IngredientProps } from './ingredient'
interface IngredientListProps {
  ingredients: IngredientProps[]
}

/**
 * IngredientList component to display the grid of ingredients
 */
const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <h2 className="mb-3 border-b border-stone-200 pb-1 text-lg font-semibold text-amber-800">
        Ingredients
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {ingredients.map((ingredient, index) => (
          <Ingredient key={index} ingredient={ingredient} index={index} />
        ))}
      </div>
    </div>
  )
}

export default IngredientList
