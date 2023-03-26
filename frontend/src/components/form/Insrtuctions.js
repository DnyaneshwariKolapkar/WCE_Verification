import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/style.css'

const Insrtuctions = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className='main-body'>
      <div className='procedure'>
        <h3>Procedure for Verification</h3>
        <div className='DOCUMENTS'>
          <ol>
            <li>
              Any agency or any bonafide student of Walchand College of Engineering, Sangli can apply for verification of University documents like degree certificate of passing, Grade card of any semester.
            </li>
            <li>
              The applicant can submit the documents by using this verification portal.
            </li>
            <li>
              Documents required for verification: Degree certificate of passing or Grade card of any semester (minimum one document).
            </li>
            <li>
              <b>
              The payment must be done online through net banking or UPI or cards.
              </b>
            </li>
            <i>Note- DDs and cheques are not allowed.</i>
            <li>
              After the payment procedure, the applicant will get acknowledgement of payment.
              Within one week, the applicant will get a certificate based on verification results and transaction analytics on the respective email.
            </li>
            <li>
              Within one week, the applicant will get a certificate based on verification results and transaction analytics on the respective email.
            </li>
            <li>
              <b>
                The fee for verification is Rs.900/-(Rupees Nine Hundred only)
                per student.
              </b>
            </li>
          </ol>
          <div className="button_next">
              <input type="submit" value="Next" onClick={ ()=> navigate("/DocUploader")}/>
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Insrtuctions
