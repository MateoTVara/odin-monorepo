import './CVEduExp.css';

export default function CVEduExp({exp}) {
  return (
    <div className="edu-exp-cv">
      <h3>{exp.schoolName}</h3>
      <p>{exp.titleOfStudy}</p>
      <p>{exp.startDate} {exp.endDate && '-'} {exp.endDate}</p>
    </div>
  );
}