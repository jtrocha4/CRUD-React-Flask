import React from 'react'

function Table ({ dataDb, deleteData, setDataToEdit }) {
  const formCurrency = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  })

  return (
    <div>
      <table className='table table-hover align-middle text-center'>
        <thead className=''>
          <tr className='table-dark'>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Transmision</th>
            <th>Combustible</th>
            <th>Kilometraje</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            dataDb.map(el => (
              <tr key={el.id}>
                <td>{el.marca}</td>
                <td>{el.modelo}</td>
                <td>{el.año}</td>
                <td>{el.transmision}</td>
                <td>{el.combustible}</td>
                <td>{el.kilometraje}</td>
                <td>{formCurrency.format(el.precio)}</td>
                <td>
                  <div>
                    <button href='' className='btn btn-info mb-1' onClick={() => setDataToEdit(el)}>Editar</button>
                    <button className='btn btn-danger' onClick={() => { deleteData(el.id) }}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
