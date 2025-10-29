import { useRef, useEffect, useState } from 'react';
import './InputSkills.css'

export default function InputSkills({receivedSkill, updateSkills, onRemove, isActive, toggleActive, className}) {

  const inputRefs = useRef([]);
  const [justAdded, setJustAdded] = useState(false);

  function addSkill() {
    if (!isActive) toggleActive(); 
    updateSkills({
      ...receivedSkill,
      list: [...receivedSkill.list, ''],
    });
    setJustAdded(true);
  }

  useEffect(() => {
    if (justAdded && receivedSkill.list.length > 0) {
      inputRefs.current[receivedSkill.list.length - 1]?.focus();
      setJustAdded(false);
    }
  }, [receivedSkill.list.length, justAdded]);

  function removeSkill(id) {
    updateSkills({
      ...receivedSkill,
      list: receivedSkill.list.filter((_, i) => i !== id)
    })
  }
  
  function handleOnBlur(id) {
    if (!receivedSkill.list[id].trim()) removeSkill(id);
  }

  function handleOnChange(id, e) {
    updateSkills({
      ...receivedSkill,
      list: receivedSkill.list.map((skill, i) => id === i ? e.target.value : skill)
    })
  }

  function handleSkillNameChange(e) {
    updateSkills({
      ...receivedSkill,
      name: e.target.value,
    });
  }

  return (
    <div className={`${className} container`}>
      <div>
        <button onClick={toggleActive}>{isActive ? 'O' : '-'}</button>
        <input 
          type="text"
          value={receivedSkill.name}
          onChange={e => handleSkillNameChange(e)} 
        />
        <button onClick={onRemove}>X</button>
        <button onClick={addSkill}>+</button>
      </div>
      <ul className={isActive ? 'active' : ''}>
        {receivedSkill.list.map((skill, id) =>
          <li key={id}>
            <input
              ref={el => inputRefs.current[id] = el}
              value={skill} 
              onBlur={() => handleOnBlur(id)}
              onChange={(e) => handleOnChange(id, e)}
              style={{
                width: `${skill.length + 2.5}ch`
              }}
            />
            <button onClick={() => removeSkill(id)}>x</button>
          </li>
        )}
      </ul>
    </div>
  );
}