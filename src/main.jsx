import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerRoot } from 'remotion'
import App from './App.jsx'
import { VideoPlayer } from './pages/Editor/components/VideoPlayer'
import './index.css'

// Register the VideoPlayer component with Remotion
registerRoot(VideoPlayer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)