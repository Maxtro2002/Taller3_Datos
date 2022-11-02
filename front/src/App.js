import './App.css';
import Avion from './componentes/Avion';
import Login from './componentes/Login';

function App() {
  return (
    <div className="App">
      <Login>
        <Avion></Avion> 
      </Login>
    </div>
  );
}

export default App;
