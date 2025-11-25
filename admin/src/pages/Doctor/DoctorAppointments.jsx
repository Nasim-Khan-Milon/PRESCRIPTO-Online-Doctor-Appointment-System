import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorAppointments = () => {

  const { dToken, appointments, getAllAppointments } = useContext(DoctorContext)

  useEffect(() => {
    if(dToken) {
      getAllAppointments()
    }
  }, [dToken])


  return (
    <div>
      
    </div>
  )
}

export default DoctorAppointments
