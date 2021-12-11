import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'

import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import ToastBody from 'react-bootstrap/ToastBody'

function Trainings() {
  const [trainings, setTrainings] = useState([])
  const [show, setShow] = useState(false)

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
            //setMsg('Car deleted')
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
        <Button variant="danger" onClick={() => deleteTraining(params.value)}>
          Delete
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
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <ToastBody>Training deleted!</ToastBody>
      </Toast>
    </div>
  )
}

export default Trainings
