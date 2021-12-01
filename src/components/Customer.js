import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

function Customer() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err))
  }, [])

  const columns = [
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true },
    { field: 'city', width: 100, sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
  ]
  return (
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
  )
}

export default Customer
