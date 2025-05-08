// Define the ingredient type
export type IngredientProps = {
  iconColor: string
  bgColor: string
  amount: number
  letter: string
  name: string
  quantity: string
}

/**
 * Ingredient component for individual ingredient tiles
 */
const Ingredient = ({
  ingredient
}: {
  ingredient: IngredientProps
  index: number
}) => {
  return (
    <div
      className={`flex flex-col items-center rounded border border-stone-100 p-2 shadow-sm ${ingredient.bgColor}`}
    >
      <div
        className={`mb-1 flex size-5 items-center justify-center rounded text-xs text-white ${ingredient.iconColor}`}
      >
        {ingredient.letter}
      </div>
      <p className="w-full truncate text-center text-xs font-medium text-stone-800">
        {ingredient.name}
      </p>
      <p className="text-center text-xs text-stone-600">{ingredient.amount}</p>
    </div>
  )
}

export default Ingredient
