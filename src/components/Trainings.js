import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'

import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

function Trainings() {
  const [trainings, setTrainings] = useState([])
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetchTrainings()
  }, [])

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err))
  }

  const deleteTraining = (url) => {
    if (window.confirm('Are you sure?')) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + url, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setMsg('Car deleted')
            setShow(true)
            fetchTrainings()
          } else {
            alert('Something went wrong!')
          }
        })
        .catch((err) => console.error(err))
    }
  }

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

    {
      headerName: '',
      sortable: false,
      filter: false,
      width: 120,
      field: 'id',
      cellRendererFramework: (params) => (
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => deleteTraining(params.value)}
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
          </svg>
        </Button>
      ),
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
      <Toast
        message={msg}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>Alert</Toast.Header>
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
    </div>
  )
}

export default Trainings
