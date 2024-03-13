import { useState } from "react";
import axios from 'axios';
function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    gender: '',
    date_of_birth: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  //for image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  }

  const addData = async (formData) => {
    try {
      let fn = new FormData();
      fn.append('name', formData.name);
      fn.append('age', formData.age);
      fn.append('email', formData.email);
      fn.append('gender', formData.gender);
      fn.append('date_of_birth', formData.date_of_birth);
      fn.append('image', formData.image);
      const response = await axios.post('http://127.0.0.1:8000/api/students', fn);
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    //adding the data on submit
    addData(formData);
  }

  return (
    <>
      <form action="" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        Name<br />
        <input type="name" id="name" placeholder="Enter name"
          value={formData.name} onChange={handleChange}
          required /> <br />
        Age <br />
        <input type="number" id="age" placeholder="Enter age"
          value={formData.age} onChange={handleChange}
          required /> <br />
        Email <br />
        <input type="email" className="form-control" id="email" placeholder="Enter email"
          value={formData.email} onChange={handleChange}
          required /> <br />
        Gender <br />
        <input type="radio" id="gender" value='male'
          checked={formData.gender === 'male'} onChange={handleChange} />Male
        <input type="radio" id="gender" value='female'
          checked={formData.gender === 'female'} onChange={handleChange} />Female <br />
        Date of Birth <br />
        <input type="date" id="date_of_birth"
          value={formData.date_of_birth} onChange={handleChange} /> <br />
        Image <br />
        <input type="file" id="image" onChange={handleImageChange} /> <br />
        <button type="submit">Submit</button>
      </form>

    </>

  )
}

export default App
