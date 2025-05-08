import { BrowserRouter } from 'react-router-dom'
import Header from './components/explorer/todd-header'
import Content from './components/explorer/todd-content'

function App() {
  return (
    <BrowserRouter>
      <div
        className="app"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%'
        }}
      >
        <Header />
        <div
          className="content"
          style={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <Content />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
