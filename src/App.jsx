import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import './App.css'
import Formulario from './components/Formulario'
import Table from './components/Table'
import Navbar from './components/Navbar'

function App () {
  const [dataDb, setDataDb] = useState([])
  const [dataToEdit, setDataToEdit] = useState(null)

  const getData = async () => {
    const res = await fetch(`${API_URL}/`)
    const data = await res.json()
    setDataDb(data)
  }

  useEffect(() => {
    getData()
  }, [API_URL])

  const createData = async (data) => {
    const res = await fetch(`${API_URL}/registrarVehiculo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const resData = await res.json()
    setDataDb([...dataDb, data])
    Swal.fire({
      icon: 'success',
      title: resData.message
    })
  }

  const deleteData = async (id) => {
    Swal.fire({
      title: 'Estas seguro de que quieres eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${API_URL}/eliminarVehiculo/${id}`)
        const resData = await res.json()
        getData()
        Swal.fire({
          icon: 'success',
          title: resData.message
        })
      }
    })
  }

  const updateData = async (data) => {
    const res = await fetch(`${API_URL}/editarVehiculo/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const resData = await res.json()
    console.log(resData)
    Swal.fire({
      icon: 'success',
      title: resData.message
    })
    getData()
  }

  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col'>
            <div className='div-form'>
              <Formulario createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
            </div>
          </div>
          <div className='col'>
            <div className='div-table'>
              <Table dataDb={dataDb} deleteData={deleteData} setDataToEdit={setDataToEdit} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
