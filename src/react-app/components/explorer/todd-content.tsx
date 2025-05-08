import React from 'react'
import { Routes, Route } from 'react-router-dom'
//import ToddComponentViewer from '../../prototypes/Modely/Modely'
//import TODDRecipeViewer from '../../prototypes/Recipes/todd-recipes'
import PromptyHomepage from '../prompty/prompty-home'
import Home from './todd-home'
//import ArtyExample from 'prototypes/Arty/arty-example'
//import Reacty from 'prototypes/Reacty/reacty'
//import PromptyMcProjectFace from 'prototypes/Prompty/projectface/prompty-gptproject'

const Content: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        overflow: 'auto'
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompty" element={<PromptyHomepage />} />

        <Route
          path="/*"
          element={
            <div className="p-4">
              <h1 className="mb-4 text-xl font-bold">Page Not Found</h1>
              <p>The requested view doesn't exist.</p>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default Content
