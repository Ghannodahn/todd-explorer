import { useState, useEffect, ReactNode } from 'react'
import { IngredientProps } from './ingredient'
import { CookingStepProps } from './cooking-step'

type RecipeOption = {
  id: string
  title: string
  url: string
  category: string
}

type RecipeData = {
  title: string
  category: string
  description: string
  ingredients: IngredientProps[]
  cookingSteps: CookingStepProps[]
  equipment: string[]
  notes: string
  serving: string
}

interface RecipeLoaderProps {
  url: string
  children: (data: RecipeData | RecipeOption[]) => ReactNode
  type?: 'recipe' | 'index'
}

const RecipeLoader: React.FC<RecipeLoaderProps> = ({
  url,
  children,
  type = 'recipe'
}) => {
  const [data, setData] = useState<RecipeData | RecipeOption[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(
            `Failed to load data: ${response.status} ${response.statusText}`
          )
        }

        const jsonData = await response.json()

        // Sort recipes alphabetically by title when loading an index
        if (type === 'index' && Array.isArray(jsonData)) {
          const sortedData = [...jsonData].sort(
            (a: RecipeOption, b: RecipeOption) => a.title.localeCompare(b.title)
          )
          setData(sortedData)
        } else {
          setData(jsonData)
        }
      } catch (err) {
        console.error('Error loading recipe data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, type])

  if (isLoading) {
    return <div className="p-4 text-center text-amber-800">Loading...</div>
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
        Error: {error}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center text-amber-800">
        No data available
      </div>
    )
  }

  return <>{children(data)}</>
}

export default RecipeLoader
