import { useRef, useEffect, useState } from 'react';
import { mdiArrowRightDropCircleOutline, mdiCloseCircleOutline, mdiPlus, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
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
        <button onClick={toggleActive}>
          <Icon path={mdiArrowRightDropCircleOutline}
            size={1}
            color="white"
            rotate={isActive ? 90 : 0}
          />
        </button>
        <input 
          type="text"
          value={receivedSkill.name}
          onChange={e => handleSkillNameChange(e)} 
        />
        <button onClick={onRemove}>
          <Icon path={mdiCloseCircleOutline}
            size={1}
            color='#c9184a'
          />
        </button>
        <button onClick={addSkill}>
          <Icon path={mdiPlus}
            size={1}
            color='#a7c957'
          />
        </button>
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
                width: `${skill.length*0.8 + 2.5}ch`
              }}
            />
            <button onClick={() => removeSkill(id)}>
              <Icon path={mdiClose}
                size={0.6}
                color='black'
              />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}