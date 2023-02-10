import React from 'react'
import axios from 'axios'
import '../../assets/style.css'

const DocUploader = () => {
  const [orgEmail, setOrgEmail] = React.useState('')
  const [name, setname] = React.useState('')
  const [photo, setPhoto] = React.useState('')
  const [identity, setIdentity] = React.useState('')
  const [cert, setCert] = React.useState('')
  const [gradeCard, setGradeCard] = React.useState('')

  const handleSubmit = async () => {
    try {
      if (orgEmail && name && photo && identity && cert && gradeCard) {
        const formData = new FormData();
        formData.append('orgEmail', orgEmail);
        formData.append('name', name);
        formData.append('photo', photo);
        formData.append('identity', identity);
        formData.append('cert', cert);
        for (let i = 0; i < gradeCard.length; i++) {
          formData.append('gradeCard', gradeCard[i]);
        }
        // log the form data
        console.log(gradeCard);
        console.log(photo);

        const res = await axios.post('http://localhost:5000/verification/insertstudent', formData);
        console.log(res);
        if(res.status === 200){
          alert('Student added successfully')
        }
        else{
          alert('Error in adding student')
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="container">
        <div className="title">Document upload form</div>
        <div className="content">
          <div className='div-form'>
            <div className="user-details">
              <div className="input-box">
                <div className="details">Email of Agency</div>
                <input type="text" placeholder="Enter your email" required value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} />
              </div>
              <div className="input-box">
                <div className="details">Name of Student</div>
                <input type="text" placeholder="Enter student name" required value={name} onChange={(e) => setname(e.target.value)} />
              </div>
              <div className="input-image">
                <div className="photo">Passport size photo</div>
                <input type="file" accept='image/*' required onChange={(e) => setPhoto(e.target.files[0])} />
              </div>
              <div className="input-image">
                <div className="photo">Proof of identity</div>
                <input type="file" required  onChange={(e) => setIdentity(e.target.files[0])} />
              </div>
              <div className="input-image">
                <div className="photo">Degree certificate</div>
                <input type="file" required onChange={(e) => setCert(e.target.files[0])} />
              </div>
              <div className="input-image">
                <div className="photo">Grade cards (All 8 semesters)</div>
                {/* <input type="file" required/> */}
                {/* <div style={{ fontWeight: "500" }}>Grade cards (All 8 semesters)</div> */}
                <input type="file" required onChange={(e) => setGradeCard(e.target.files)} multiple />

              </div>
              {/* <div className="input-file">
                <div className="file">I</div>
                append this to GradeCard
                <input type="file" required onChange={(e) => setGradeCard(e.target.files)} multiple />
              </div> */}
              {/* <div className="input-file">
                <div className="file">II</div>
                <input type="file"  />
              </div>
              <div className="input-file">
                <div className="file">III</div>
                <input type="file" />
              </div>
              <div className="input-file">
                <div className="file">IV</div>
                <input type="file" />
              </div>
              <div className="input-file">
                <div className="file">V</div>
                <input type="file"  />
              </div>
              <div className="input-file">
                <div className="file">VI</div>
                <input type="file" />
              </div>
              <div className="input-file">
                <div className="file">VII</div>
                <input type="file"  />
              </div>
              <div className="input-file">
                <div className="file">VIII</div>
                <input type="file" />
              </div> */}
            </div>
            {/* <div className="button">
              <input type="submit" value="Add student" />
            </div> */}
            <div className="button">
              <input type="submit" value="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DocUploader