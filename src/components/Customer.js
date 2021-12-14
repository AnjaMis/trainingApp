import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import AddCustomer from './AddCustomer'
import AddTraining from './AddTraining'
import EditCustomer from './EditCustomer'

import { CSVLink } from 'react-csv'

function Customer() {
  const [customers, setCustomers] = useState([])
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err))
  }

  const deleteCustomer = (url) => {
    if (window.confirm('Are you sure?')) {
      fetch(url, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            setMsg('Customer deleted')
            setShow(true)
            fetchCustomers()
          } else {
            alert('Something went wrong!')
          }
        })
        .catch((err) => console.error(err))
    }
  }

  const addCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        fetchCustomers()
        setMsg('Customer added')
        setShow(true)
      })
      .catch((err) => console.error(err))
  }

  const addTraining = (link, training) => {
    fetch(link, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(training),
    })
      .then((response) => {
        //Trainings.fetchTrainings())
        fetchCustomers()
        setMsg('Training added')
        setShow(true)
      })
      .catch((err) => console.error(err))
  }

  const editCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        fetchCustomers()
        setMsg('Customer edited')
        setShow(true)
      })
      .catch((err) => console.error(err))
  }

  const columns = [
    { field: 'firstname', width: 120, sortable: true, filter: true },
    { field: 'lastname', width: 150, sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', width: 100, sortable: true, filter: true },
    { field: 'city', width: 100, sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },

    {
      headerName: '',
      sortable: false,
      filter: false,
      width: 80,
      field: 'links.0.href',
      cellRendererFramework: (params) => (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => deleteCustomer(params.value)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>{' '}
        </Button>
      ),
    },

    {
      headerName: '',
      sortable: false,
      filter: false,
      width: 80,
      field: 'links.0.href',
      cellRendererFramework: (params) => (
        <AddTraining addTraining={addTraining} row={params} />
      ),
    },

    {
      headerName: '',
      sortable: false,
      filter: false,
      width: 80,
      field: 'links.0.href',
      cellRendererFramework: (params) => (
        <EditCustomer editCustomer={editCustomer} row={params} />
      ),
    },
  ]
  return (
    <div>
      <CSVLink
        data={customers}
        separator=";"
        style={{
          marginLeft: '-1100px',
          color: '#b0b7df',
          fontWeight: '500',
          fontSize: '19px',
          marginTop: '10px',
          padding: '100px',
        }}
      >
        Export CSV
      </CSVLink>
      <AddCustomer addCustomer={addCustomer} />
      <p> </p>
      <div
        className="ag-theme-alpine"
        style={{ marginTop: 100, height: 600, width: '90%', margin: 'auto' }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          rowHeight={50}
        />
      </div>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        message={msg}
      >
        {msg}
      </Toast>
    </div>
  )
}

export default Customer
