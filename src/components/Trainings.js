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
    fetch('https://customerrest.herokuapp.com/api/trainings')
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
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

  const formatDate = function (date) {
    return dayjs(date.value).format('DD/MM/YY')
  }

  const columns = [
    { field: 'activity', sortable: true, filter: true },
    { field: 'duration', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true, valueGetter: formatDate },
    {
      headerName: 'Customer',
      field: 'content.links[2].href',
      sortable: true,
      filter: true,
      //cellRendererFramework: (params) => getCustomer(params),
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
