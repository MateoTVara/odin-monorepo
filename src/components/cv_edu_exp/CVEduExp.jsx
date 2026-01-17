import './CVEduExp.css';

export default function CVEduExp({exp}) {
  return (
    <div className="edu-exp-cv">
      <h3>{exp.schoolName}</h3>
      <p><i>{exp.titleOfStudy}</i></p>
      <p>{exp.startDate} - {!(exp.startDate) ? '' : !(exp.endDate) ? 'Present' : exp.endDate}</p>
    </div>
  );
}