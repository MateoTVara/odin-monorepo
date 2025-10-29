import './InputWorkExp.css'
import InputGroup from "../input_group/InputGroup";

export default function InputWorkExp({workExp, onRemove, onChange, isActive, onClick}) {
  function handleInputChange(e) {
    const mapper = {
      'company-name': 'companyName',
      'position-title': 'positionTitle',
      responsabilities: 'responsabilities',
      'start-date': 'startDate',
      'end-date': 'endDate', 
    }
    const id = e.target.id;
    onChange({...workExp, [mapper[id]]: e.target.value});
  }
  
  return (
    <div className="work-exp-container" id={workExp.id}>
      <div className="work-exp-card" onClick={onClick}>
        <div className="content">
          <h3>{workExp.companyName}</h3>
          <h4>{workExp.positionTitle}</h4>
          <p>{workExp.startDate} {workExp.endDate && '-'} {workExp.endDate}</p>
        </div>
        <button onClick={onRemove}>X</button>
      </div>
      <form className={`work-exp-form ${isActive && 'active'} `}>
        <InputGroup id='company-name' type='text' label='Company Name' 
                    value={workExp.companyName} onChange={handleInputChange}/>
        <InputGroup id='position-title' type='text' label='Position Title'
                    value={workExp.positionTitle} onChange={handleInputChange}/>
        <InputGroup id='start-date' type='date' label='Start Date'
                    value={workExp.startDate} onChange={handleInputChange}/>
        <InputGroup id='end-date' type='date' label='End Date' 
                    value={workExp.endDate} onChange={handleInputChange}/>
        <div>
          <label htmlFor="responsabilities">Responsabilities</label>
          <textarea name="responsabilities" id="responsabilities" onChange={handleInputChange}></textarea>
        </div>
      </form>
    </div>
  );
}