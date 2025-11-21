import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from 'react-toastify';
import { AdminContext } from "../../context/AdminContext";
import axios from 'axios'


const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

        if(!docImg) {
            return toast.error('Image Not Selected')
        }

        const formData = new FormData()

        // append image
        formData.append("image", docImg);

        // append all doctor data
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("experience", experience);
        formData.append("fees", fees);
        formData.append("about", about);
        formData.append("speciality", speciality);
        formData.append("degree", degree);
        formData.append('address', JSON.stringify({line1: address1, line2:address2}));

        //print formdata
        formData.forEach((value,key) => {
            console.log(`${key} : ${value}`)
        })

        const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{aToken}})
        
        if(data.success) {
            toast.success(data.message)
            // reset all fields
            setDocImg(false);
            setName("");
            setEmail("");
            setPassword("");
            setExperience("1 Year");
            setFees("");
            setAbout("");
            setSpeciality("General Physician");
            setDegree("");
            setAddress1("");
            setAddress2("");
        } else {
            toast.error(data.message)
        }


    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="w-full m-5">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[85vh] overflow-y-scroll">
        {/* Upload Image */}
        <div className="flex items-center gap-4 mb-8 text-gray-600">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-start gap-10 text-gray-600">
          {/* Left section */}
          <div className="w-full md:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border border-gray-300 rounded px-3 py-2"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {Array.from({ length: 10 }, (_, i) => `${i + 1} Year`).map(
                  (year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                type="number"
                placeholder="fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Right section */}
          <div className="w-full md:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                className="border border-gray-300 rounded px-3 py-2"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Education"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
              <input
                className="border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="w-full md:flex-1 flex flex-col gap-4 text-gray-600">
          <p className="mt-6">About Doctor</p>
          <textarea
            placeholder="Write about doctor"
            rows={5}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-primary text-white mt-8 px-4 py-2 rounded-full">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
