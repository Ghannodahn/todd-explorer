import React from 'react'

export type CookingStepProps = {
  title: string
  time?: string
  instructions: string
  index: number
  isLast: boolean
}

const CookingStep: React.FC<CookingStepProps> = ({
  title,
  time,
  instructions,
  index,
  isLast
}) => {
  return (
    <div className="flex">
      <div className="mr-3 flex flex-col items-center">
        <div className="flex size-8 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
          {index + 1}
        </div>
        {!isLast && <div className="my-1 h-full w-px grow bg-stone-300"></div>}
      </div>
      <div className="mb-4">
        <h3 className="font-bold text-stone-800">
          {title}
          {time && (
            <span className="ml-1 text-xs font-normal text-stone-500">
              ({time})
            </span>
          )}
        </h3>
        <p className="text-sm text-stone-700">{instructions}</p>
      </div>
    </div>
  )
}
export default CookingStep
