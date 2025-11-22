import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  // const [userData, setUserData] = useState({
  //   name: "Edward Vincent",
  //   image: assets.profile_pic,
  //   email: 'richardjameswap@gmail.com',
  //   phone: '+1 123 456 7890',
  //   address: {
  //     line1: "57th Cross, Richmond",
  //     line2: "Circle, Church Road, London"
  //   },
  //   gender: 'Male',
  //   dob: '2000-01-20'
  // })

  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {

    try {

      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers: {token}})

      if(data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }


  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
      {
        isEdit
        ? <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image || null} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        : <img className='w-36 rounded' src={userData.image} alt="" />
      }
      

      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
      }
      <hr className='bg-[#ADADAD] h-[1px] border-none' />

      <div>
        <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input type="text" value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} className='bg-gray-50 max-w-52'/>
              : <p className='text-blue-500'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input type="text" value={userData.address.line1} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} className='bg-gray-50'/>
                <br />
                <input type="text" value={userData.address.line2} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} className='bg-gray-50'/>
              </p>
              : <p className='text-blue-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      <div>
        <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
        
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select value={userData.gender} onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} className='max-w-20 bg-gray-50'>
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-500'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input type="date" value={userData.dob} onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} className='max-w-28 bg-gray-50'/>
              : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
            ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>
              Save Information
            </button>
            : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>
              Edit
            </button>
        }
      </div>
    </div>
  )
}

export default MyProfile
