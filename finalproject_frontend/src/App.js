import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListExamPrac from './components/ListExamPrac';
import GradeExamPrac from './components/GradeExamPrac';
import Login from './components/Login';
import AddExamPrac from './components/AddExamPrac';
import ListExamPrac from './components/ListExamPrac';
import GradeExamPrac from './components/GradeExamPrac';
import AddExamPrac from './components/AddExamPrac';

function App() {
  return (
    <div className="App">
      <h2>CookBook</h2>
      <BrowserRouter>
          <div>
          <nav>
            <Link to="/">ExamPrac</Link> |
            <Link to="/admin">Admin</Link> |
            <Link to="/login">Login</Link>  
          </nav>
            <Switch>
            <Route exact path="/" component={ListExamPrac} />
            <Route path="/schedule" component={GradeExamPrac} />
            <Route path="/admin" component={AddExamPrac} />
            <Route path="/login" component={Login} /> 
            <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;