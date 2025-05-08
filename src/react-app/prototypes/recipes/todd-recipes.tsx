import { useState } from 'react'
import IngredientList from './ingredient-list'
import CookingStep from './cooking-step'
import RecipeLoader from './recipe-loader'

const TODDRecipeViewer = () => {
  const [currentRecipeUrl, setCurrentRecipeUrl] = useState<string>('')

  return (
    <div className="flex w-full gap-4 p-4">
      {/* Recipe list loader */}
      <RecipeLoader url="/data/recipes/index.json" type="index">
        {(recipeOptions) => {
          // Set initial recipe if none is selected
          if (
            !currentRecipeUrl &&
            Array.isArray(recipeOptions) &&
            recipeOptions.length > 0
          ) {
            // Use setTimeout to avoid state update during render
            setTimeout(() => setCurrentRecipeUrl(recipeOptions[0].url), 0)
          }

          return (
            <>
              {/* Left sidebar/well with recipe list */}
              <div className="w-64 shrink-0 rounded-lg border-l-4 border-amber-700 bg-stone-50 p-4 shadow-lg">
                <h2 className="mb-4 border-b border-amber-200 pb-2 text-lg font-semibold text-amber-800">
                  Recipe Collection
                </h2>
                <ul className="space-y-2">
                  {Array.isArray(recipeOptions) &&
                    recipeOptions.map((recipe) => (
                      <li key={recipe.id}>
                        <button
                          onClick={() => setCurrentRecipeUrl(recipe.url)}
                          className={`w-full rounded-md p-2 text-left transition ${
                            currentRecipeUrl === recipe.url
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-100 text-stone-700 hover:bg-amber-50'
                          }`}
                        >
                          <div className="font-medium">{recipe.title}</div>
                          <div className="text-xs">{recipe.category}</div>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Recipe display area */}
              {currentRecipeUrl && (
                <RecipeLoader url={currentRecipeUrl} type="recipe">
                  {(recipeData) => {
                    if (!Array.isArray(recipeData)) {
                      const {
                        ingredients,
                        cookingSteps,
                        equipment,
                        notes,
                        title,
                        category,
                        description,
                        serving
                      } = recipeData

                      return (
                        <div className="flex w-full max-w-3xl flex-col rounded-lg border-l-4 border-amber-700 bg-stone-50 p-4 shadow-lg">
                          <div className="mb-2 flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-amber-800">
                              {title}
                            </h1>
                            <div className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                              {category}
                            </div>
                          </div>

                          <p className="mb-4 border-b border-stone-200 pb-2 text-sm italic text-stone-700">
                            {description}
                          </p>

                          {/* Main content grid */}
                          <div className="grid grid-cols-1 gap-4">
                            {/* Ingredients section */}
                            <IngredientList ingredients={ingredients} />

                            {/* Equipment section */}
                            <div className="rounded-lg bg-white p-3 shadow">
                              <h2 className="mb-3 border-b border-stone-200 pb-1 text-lg font-semibold text-amber-800">
                                Equipment
                              </h2>
                              <div className="flex flex-wrap gap-2">
                                {equipment.map((item, index) => (
                                  <div
                                    key={index}
                                    className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-800"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Steps section */}
                            <div className="rounded-lg bg-white p-3 shadow">
                              <h2 className="mb-3 border-b border-stone-200 pb-1 text-lg font-semibold text-amber-800">
                                Traditional Method
                              </h2>

                              <div className="mt-4 space-y-2">
                                {cookingSteps.map((step, index) => (
                                  <CookingStep
                                    key={index}
                                    title={step.title}
                                    instructions={step.instructions}
                                    time={step.time}
                                    index={index}
                                    isLast={index === cookingSteps.length - 1}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          <div className="mt-4 rounded-lg bg-amber-50 p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="font-semibold text-amber-800">
                                  Recipe Notes:
                                </span>
                                <p className="mt-1 text-sm text-stone-700">
                                  {notes}
                                </p>
                              </div>
                              {serving && (
                                <div className="rounded border border-amber-100 bg-white px-2 py-1 text-xs text-amber-800 shadow-sm">
                                  {serving}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-2 text-center text-xs italic text-stone-500">
                            This recipe follows traditional preparation methods
                            with authentic ingredients.
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                </RecipeLoader>
              )}
            </>
          )
        }}
      </RecipeLoader>
    </div>
  )
}

export default TODDRecipeViewer
