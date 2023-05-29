import React from 'react'

function Navbar () {
  return (
    <>
      <nav className='navbar bg-light navbar-expand-lg'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'><span>Legendary motor</span></a>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='/' />
              </li>
            </ul>
            <form className='d-flex' role='search'>
              <input className='form-control me-2' type='search' placeholder='Buscar' aria-label='Buscar' />
              <button className='btn btn-outline-success' type='submit'>Buscar</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
