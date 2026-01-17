import './InputEduExp.css';
import InputGroup from '../input_group/InputGroup';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline } from '@mdi/js';

export default function InputEduExp({eduExp, onRemove, onChange, isActive, onClick}) {
  function handleInputChange(e) {
    const mapper = {
      'school-name': 'schoolName',
      'title-of-study': 'titleOfStudy',
      'start-date': 'startDate',
      'end-date': 'endDate'
    }
    const id = e.target.id
    onChange({...eduExp, [mapper[id]]: e.target.value});
  }

  

  return (
    <div className="edu-exp-container" id={eduExp.id}>
      <div className={`edu-exp-card ${isActive && "active"}`} onClick={onClick}>
        <div className='content'>
          <h3>{eduExp.schoolName}</h3>
          <p>{eduExp.titleOfStudy}</p>
          <p>{eduExp.startDate} {eduExp.endDate && '-'} {eduExp.endDate}</p>
        </div>
        <button onClick={onRemove}>
          <Icon 
            path={mdiCloseCircleOutline} 
            size={1} 
            color='#c9184a'
          />
        </button>
      </div>
      <form className={`edu-exp-form ${isActive && "active"}`}>
        <InputGroup id="school-name" type="text" label="School Name"
                    value={eduExp.schoolName} onChange={handleInputChange} />
        <InputGroup id="title-of-study" type="text" label="Title of Study"
                    value={eduExp.titleOfStudy} onChange={handleInputChange} />
        <InputGroup id="start-date" type="date" label="Start Date"
                    value={eduExp.startDate} onChange={handleInputChange} />
        <InputGroup id="end-date" type="date" label="End Date"
                    value={eduExp.endDate} onChange={handleInputChange} />
      </form>
    </div>
  );
}