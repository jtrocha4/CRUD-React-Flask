import React, { useEffect, useState } from 'react'

const initialForm = {
  id: null,
  marca: '',
  modelo: '',
  año: '',
  transmision: '',
  combustible: '',
  kilometraje: '',
  precio: ''
}

function Formulario ({ createData, updateData, dataToEdit, setDataToEdit }) {
  const [form, setForm] = useState(initialForm)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit)
      setEditMode(true)
    } else {
      setForm(initialForm)
      setEditMode(false)
    }
  }, [dataToEdit])

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const handleSelect = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.id != null) {
      updateData(form)
    } else {
      createData(form)
      setForm(initialForm)
    }
  }

  const handleCancel = () => {
    setForm(initialForm)
    setEditMode(false)
    setDataToEdit(null)
  }

  return (
    <div>
      <form action='' method='POST' onSubmit={handleSubmit}>
        <h1>{!editMode ? 'Registrar vehiculo' : 'Editar vehiculo'}</h1>
        <div className='mt-3 mb-3'>
          <input className='form-control' type='text' placeholder='Marca del vehiculo' name='marca' onChange={handleChange} value={form.marca} required />
        </div>
        <div className='mb-3'>
          <input className='form-control' type='text' placeholder='Modelo del vehiculo' name='modelo' onChange={handleChange} value={form.modelo} required />
        </div>
        <div className='mb-3'>
          <input className='form-control' type='text' placeholder='Año del vehiculo' name='año' onChange={handleChange} value={form.año} required />
        </div>
        <div className='mb-3'>
          <select name='transmision' id='' className='form-select' onChange={handleSelect} value={form.transmision} required>
            <option value=''>Transmision del vehiculo</option>
            <option value='Manual'>Manual</option>
            <option value='Automatica'>Automatica</option>
          </select>
        </div>
        <div className='mb-3'>
          <select name='combustible' id='' className='form-select' onChange={handleSelect} value={form.combustible} required>
            <option value=''>Tipo de combustible</option>
            <option value='Gasolina'>Gasolina</option>
            <option value='Diesel'>Diesel</option>
          </select>
        </div>
        <div className='mb-3'>
          <input className='form-control' type='number' placeholder='Kilometraje del vehiculo' name='kilometraje' onChange={handleChange} value={form.kilometraje} required />
        </div>
        <div className='mb-3'>
          <input className='form-control' type='number' placeholder='Precio del vehiculo' name='precio' onChange={handleChange} value={form.precio} required />
        </div>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button className='btn btn-secondary' type='button' onClick={() => { handleCancel() }}>Cancelar</button>
          <button className='btn btn-success' type='submit'>
            {!editMode ? 'Registrar' : 'Editar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Formulario
