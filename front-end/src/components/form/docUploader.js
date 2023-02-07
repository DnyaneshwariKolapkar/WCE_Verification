import React from 'react'
import '../../assets/style.css'

const DocUploader = () => {
  return (
    <>
      <div className="container">
        <div className="title">Document upload form</div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <div className="details">Email of Agency</div>
                <input type="text" placeholder="Enter your email" required />
              </div>
              <div className="input-box">
                <div className="details">Name of Student</div>
                <input type="text" placeholder="Enter student name" required />
              </div>
              <div className="input-image">
                <div className="photo">Passport size photo</div>
                <input type="file" required />
              </div>
              <div className="input-image">
                <div className="photo">Proof of identity</div>
                <input type="file" required />
              </div>
              <div className="input-image">
                <div className="photo">Degree certificate</div>
                <input type="file" required />
              </div>
              <div className="input-box">
                <div className="details"></div><br />
                {/* <input type="file" required/> */}
                <div style={{ fontWeight: "500" }}>Grade cards (All 8 semesters)</div>
              </div>
              <div className="input-file">
                <div className="file">I</div>
                <input type="file" required />
              </div>
              <div className="input-file">
                <div className="file">II</div>
                <input type="file" required />
              </div>
              <div className="input-file">
                <div className="file">III</div>
                <input type="file" required />
              </div>
              <div className="input-file">
                <div className="file">IV</div>
                <input type="file" required />
              </div>
              <div className="input-file">
                <div className="file">V</div>
                <input type="file" required />
              </div>
              <div className="input-file">
                <div className="file">VI</div>
                <input type="file" required />
              </div>
              <div className="input-file">
                <div className="file">VII</div>
                <input type="file" required />
              </div>
              <div className="input-file">
                <div className="file">VIII</div>
                <input type="file" required />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Add student" />
            </div>
            <div className="button">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DocUploader