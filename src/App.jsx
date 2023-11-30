import './App.css'
import userRouterElements from './hooks/userRouterElements'

function App() {
    const routerElements = userRouterElements()
    return <div className=''>{routerElements}</div>
}

export default App
