import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'

function Trainings() {
  const [trainings, setTrainings] = useState([])
  // const [firstName, setFirstName] = useState([])
  // const [lastName, setLastName] = useState([])

  useEffect(() => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err))
  }, [])

  // const getCustomer = (url) => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFirstName(data.firstname)
  //       setLastName(data.lastname)
  //     })
  //     .catch((err) => console.error(err))

  //   return firstName + ' ' + lastName
  // }

  const columns = [
    { field: 'activity', sortable: true, filter: true },
    { field: 'duration', sortable: true, filter: true },
    {
      field: 'date',
      sortable: true,
      filter: true,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY hh:mm'),
    },
    {
      headerName: 'Customer first name',
      field: 'customer.firstname',
      sortable: true,
      filter: true,
    },

    {
      headerName: 'Customer last name',
      field: 'customer.lastname',
      sortable: true,
      filter: true,
    },
  ]

  return (
    <div
      className="ag-theme-alpine"
      style={{ marginTop: 100, height: 650, width: '90%', margin: 'auto' }}
    >
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={12}
        rowHeight={45}
      />{' '}
    </div>
  )
}

export default Trainings
