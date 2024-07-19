import './App.css';
import TicketTable from './components/TicketTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { DataProvider } from './context/DataContext';
import { RequireAuth } from 'react-auth-kit';
function App() {
  return (
    <DataProvider>
    <Router>
      <div className="App">
        <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <TicketTable/>
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>

        </Routes>
      </div>
    </Router>
    </DataProvider>
  );
}

export default App;
