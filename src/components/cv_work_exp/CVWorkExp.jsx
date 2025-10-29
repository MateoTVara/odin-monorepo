import './CVWorkExp.css'

export default function CVWorkExp({exp}) {
  return (
    <div className='work-exp-cv'>
      <h3>{exp.companyName}</h3>
      <p>{exp.positionTitle}</p>
      <p>{exp.startDate} - {!(exp.startDate) ? '' : !(exp.endDate) ? 'Present' : exp.endDate}</p>
      <p>{exp.responsabilities}</p>
    </div>
  );
}