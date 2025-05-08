import React from 'react'
import { Routes, Route } from 'react-router-dom'
//import ToddComponentViewer from '../../prototypes/modely/modely'
import TODDRecipeViewer from '../../prototypes/recipes/todd-recipes'
import PromptyHomepage from '../prompty/prompty-home'
import Home from './todd-home'
import ArtyExample from '../../prototypes/arty/arty-example'
//import Reacty from 'prototypes/reacty/reacty'
//import PromptyMcProjectFace from 'prototypes/prompty/projectface/prompty-gptproject'

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
        <Route path="/recipes/*" element={<TODDRecipeViewer />} />
        <Route path="/arty" element={<ArtyExample />} />
 
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
