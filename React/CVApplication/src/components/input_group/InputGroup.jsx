import './InputGroup.css'

export default function InputGroup({id, type, label, value, onChange}) {
  
  return (
    <div className='input-group'>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange}/>
    </div>
  );
}