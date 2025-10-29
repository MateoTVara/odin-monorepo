import { useRef, useEffect, useState } from 'react';
import './InputTechSkills.css'

export default function InputTechSkills({techSkill, updateSkills, onRemove, isActive, toggleActive}) {

  const inputRefs = useRef([]);
  const [justAdded, setJustAdded] = useState(false);

  function addSkill() {
    if (!isActive) toggleActive(); 
    updateSkills({
      ...techSkill,
      list: [...techSkill.list, ''],
    });
    setJustAdded(true);
  }

  useEffect(() => {
    if (justAdded && techSkill.list.length > 0) {
      inputRefs.current[techSkill.list.length - 1]?.focus();
      setJustAdded(false);
    }
  }, [techSkill.list.length, justAdded]);

  function removeSkill(id) {
    updateSkills({
      ...techSkill,
      list: techSkill.list.filter((_, i) => i !== id)
    })
  }
  
  function handleOnBlur(id) {
    if (!techSkill.list[id].trim()) removeSkill(id);
  }

  function handleOnChange(id, e) {
    updateSkills({
      ...techSkill,
      list: techSkill.list.map((skill, i) => id === i ? e.target.value : skill)
    })
  }

  function handleSkillNameChange(e) {
    updateSkills({
      ...techSkill,
      name: e.target.value,
    });
  }

  return (
    <div className="tech-skills-container">
      <div>
        <button onClick={toggleActive}>{isActive ? 'O' : '-'}</button>
        <input 
          type="text"
          value={techSkill.name}
          onChange={e => handleSkillNameChange(e)} 
        />
        <button onClick={onRemove}>X</button>
        <button onClick={addSkill}>+</button>
      </div>
      <ul className={isActive ? 'active' : ''}>
        {techSkill.list.map((skill, id) =>
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