
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Employee from './components/Employee'
import Department from './components/Department'
import Profile from './components/Profile'
import AddDepartment from './components/AddDepartment'
import AddEmployee from './components/AddEmployee'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/adminlogin' element={<Login />}></Route>
    <Route path='/dashboard' element={<Dashboard />}>
      <Route path='/dashboard/employee' element={<Employee />}></Route>
      <Route path='/dashboard/department' element={<Department />}></Route>
      <Route path='/dashboard/profile' element={<Profile />}></Route>
      <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
      <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
      
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
