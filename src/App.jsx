import Header from './components/Header';
// Before: import About from '../pages/About.js';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}
