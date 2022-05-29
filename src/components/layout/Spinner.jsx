import React from 'react'
import './Spinner.scss'
import logo from './assets/logo.svg'

export const Spinner = () => {
  return (
    <div className="spinner">
      <img src={logo} className="spinner-logo" alt="spinner" />
      <p>Loading</p>
    </div>
  )
}
