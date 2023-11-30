import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        fname: "",
        lname: "",
        username: "",
        password: "",
        department_id: "",
    });
    const [department, setDepartment] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
            .then(result => {
                if (result.data.Status) {
                    setDepartment(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee/' + id)
            .then(result => {
               
                setEmployee({
                    ...employee,
                    fname: result.data.Result[0].firstName,
                    lname: result.data.Result[0].lastName,
                    username: result.data.Result[0].userName,
                    department_id: result.data.Result[0].department_id,
                })
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/' + id, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border">
          <h3 className="text-center">Edit Employee</h3>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputFName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                placeholder="Enter Name"
                value={employee.fname}
                onChange={(e) =>
                  setEmployee({ ...employee, fname: e.target.value })
                }
              />
            </div>
            <div className="col-12" >
              <label For="inputLname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                placeholder="Enter Name"
                value={employee.lname}
                onChange={(e) =>
                  setEmployee({ ...employee, lname: e.target.value })
                }
              />
            </div>
            
            <div className="col-12">
              <label for="inputUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputUsername"
                placeholder="Enter Username"
                autoComplete="off"
                value={employee.username}
                onChange={(e) =>
                  setEmployee({ ...employee, username: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label for="department" className="form-label">
                Department
              </label>
              <select name="department" id="department" className="form-select"
                  onChange={(e) => setEmployee({...employee, department_id: e.target.value})}>
                {department.map((d) => {
                  return <option value={d.id}>{d.department}</option>;
                })}
              </select>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Edit Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default EditEmployee