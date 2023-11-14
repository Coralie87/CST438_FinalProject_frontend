import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import EditExamPrac from './EditExamPrac';
import AddExamPrac from './AddExamPrac';



// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//
function ListExamPrac(props) {

  const [ExamPracs, setExamPracs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchExamPracs();
  }, [] )
 
  const fetchExamPracs = () => {
    console.log("fetchExamPracs");
    fetch(`${SERVER_URL}/ExamPrac`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("ExamPrac length "+data.length);
      setExamPracs(data);
     }) 
    .catch(err => console.error(err)); 
  }

  const  addExamPrac = (ExamPrac_id) => {
    setMessage('');
    console.log("start addExamPrac"); 
    fetch(`${SERVER_URL}/ExamPrac/course/${ExamPrac_id}`,
    { 
        method: 'POST', 
    })
    .then(res => {
        if (res.ok) {
        console.log("addExamPrac ok");
        setMessage("ExamPrac added.");
        fetchExamPracs();
        } else {
        console.log('error addExamPrac ' + res.status);
        setMessage("Error. "+res.status);
        }})
    .catch(err => {
        console.error("exception addExamPrac "+ err);
        setMessage("Exception. "+err);
    })
}
  
  const deleteExamPrac = (event) => {
    const row_id = event.target.parentNode.parentNode.rowIndex - 1;
    const id = ExamPracs[row_id].id;
    console.log("delete ExamPrac "+id);
    fetch(`${SERVER_URL}/ExamPrac/${id}`, 
      {  
        method: 'DELETE', 
      } 
    )
    .then((response) => { 
      if (response.ok) {
          setMessage('ExamPrac deleted.');
          fetchExamPracs();
      } else {
          setMessage("ExamPrac delete failed.");
      }
   } )
  .catch((err) =>  { setMessage('Error. '+err) } );
  }

  
    const headers = ['ExamPrac Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>ExamPracs</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {ExamPracs.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.ExamPracName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeExamPrac/${ExamPracs[idx].id}`} >Grade</Link>
                      </td>
                      <td><EditExamPrac ExamPrac={ExamPracs[idx]} onClose={fetchExamPracs} /></td>
                      <td><button type="button" margin="auto" onClick={deleteExamPrac}>Delete</button></td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <AddExamPrac onClose={fetchExamPracs}/>
          </div>
      </div>
    )
}  
export default ListExamPrac;
