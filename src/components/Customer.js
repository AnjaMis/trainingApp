import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import Button from 'react-bootstrap/Button'

import AddCustomer from './AddCustomer'

function Customer() {
  const [customers, setCustomers] = useState([])

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
            //setMsg('Car deleted')
            //setOpen(true)
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
      .then((response) => fetchCustomers())
      .catch((err) => console.erros(err))
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
      width: 120,
      field: 'links.0.href',
      cellRendererFramework: (params) => (
        <Button variant="danger" onClick={() => deleteCustomer(params.value)}>
          Delete
        </Button>
      ),
    },
  ]
  return (
    <div>
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
    </div>
  )
}

export default Customer
