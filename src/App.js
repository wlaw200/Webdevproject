import Header from "./components/Header";
import Hero from "./components/Hero";
import './styles/App.css'
import "./styles/Hero.css";


const App = () => {
    return (
        <div id="app" className="App">
            <Header />
            <Hero />
        </div>
    )
}

export default App;