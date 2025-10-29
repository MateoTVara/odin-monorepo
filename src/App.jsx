import './App.css'
import { useState } from 'react'
import FormSection from './components/form_section/FormSection'
import InputGroup from './components/input_group/InputGroup'
import InputEduExp from './components/input_edu_exp/InputEduExp'
import CVEduExp from './components/cv_edu_exp/CVEduExp'
import InputWorkExp from './components/input_work_exp/InputWorkExp'
import CVWorkExp from './components/cv_work_exp/CVWorkExp'
import InputSkills from './components/input_skills/InputSkills'

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    fullName: 'Torres Vara Mateo Nicolas',
    email: 'torresvaramateo@gmail.com',
    phone: '+51 999999999',
    github: 'github.com/MateoTVara',
  });

  function handleInputGroupChange(e) {
    const mapper = {'full-name': 'fullName', email: 'email', phone: 'phone', github: 'github'}
    const id = e.target.id;
    setGeneralInfo({...generalInfo, [mapper[id]]: e.target.value})
  }



  const [educationalExps, setEducationalExps] = useState([
    {
      id: 1,
      schoolName: 'Universidad Tecnológica del Perú',
      titleOfStudy: "Bachelor in System's Engineering",
      startDate: '2024-08-01',
      endDate: '',
    },
    {
      id: 2,
      schoolName: 'IDAT',
      titleOfStudy: 'Technician in Systems and Information Development',
      startDate: '2022-06-01',
      endDate: '2024-03-01',
    }
  ]);
  const [activeEduExp, setActiveEduExp] = useState(null);

  function addEducationExperience() {
    const newId = educationalExps.length === 0 ? 0 : educationalExps[educationalExps.length - 1].id + 1
    setEducationalExps([
      ...educationalExps,
      {
        id: newId,
        schoolName: '',
        titleOfStudy: '',
        startDate: '',
        endDate: '',
      }
    ]);
    setActiveEduExp(newId);
  }

  function updateEducationExperience(updatedExp) {
    setEducationalExps(educationalExps =>
      educationalExps.map(e => e.id === updatedExp.id ? updatedExp : e)
    );
  }
  
  function removeEducationExperience(id) {setEducationalExps(educationalExps.filter(exp  => exp.id !== id))};



  const [workingExps, setWorkingExps] = useState([
    {
      id: 1,
      companyName: 'Placeholder',
      positionTitle: 'Placeholder',
      responsabilities: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio perspiciatis deleniti distinctio ducimus praesentium? Cupiditate iure expedita natus, aliquam adipisci, exercitationem eius ex dolore doloremque quod eos enim amet quibusdam?',
      startDate: '2023-05-03',
      endDate: '',
    }
  ]);
  const [activeWorkExp, setActiveWorkExp] = useState(null);

  function addWorkingExperience() {
    const newId = workingExps.length === 0 ? 0 : workingExps[workingExps.length - 1].id + 1;
    setWorkingExps([
      ...workingExps,
      {
        id: newId,
        companyName: '',
        positionTitle: '',
        responsabilities: '',
        startDate: '',
        endDate: '',
      }
    ]);
    setActiveWorkExp(newId)
  }

  function updateWorkingExperience(updatedExp) {
    setWorkingExps(workingExps => 
      workingExps.map(e => e.id === updatedExp.id ? updatedExp : e)
    );
  }

  function removeWorkingExperience(id) {setWorkingExps(workingExps.filter(exp => exp.id !== id))};



  const [technicalSkills, setTechnicalSkills] = useState([
    {
      id: 1,
      name: 'Programming Languages',
      list: ['JavaScript', 'Python', 'Java']
    },
    {
      id: 2,
      name: 'Frameworks/Libraries',
      list: ['Django', 'Spring', 'React']
    },
    {
      id: 3,
      name: 'Dev Tools',
      list: ['Git', 'Postman']
    }
  ]);

  const [activeTechSkill, setActiveTechSkill] = useState(null);

  function addTechnicalSkills() {
    const newId = technicalSkills.length === 0 ? 0 : technicalSkills[technicalSkills.length - 1].id + 1;
    const input = document.querySelector('#input-skill-set');
    const newName = input.value;
    if (!input.value) return;
    input.value = '';
    setTechnicalSkills([
      ...technicalSkills,
      {
        id: newId,
        name: newName,
        list: []
      }
    ])
  }

  function updateTechnicalSkills(updatedSkill) {
    setTechnicalSkills(prevSet =>
      prevSet.map(skill => skill.id === updatedSkill.id ? updatedSkill : skill)
    );
  }

  function removeTechnicalSkills(id) {setTechnicalSkills(technicalSkills.filter(skills => skills.id !== id))};



  const [otherSkills, setOtherSkills] = useState([
    {
      id: 1,
      name: 'Languages',
      list: ['Spanish', 'English']
    },
    {
      id: 2,
      name: 'Certifications',
      list: [
        'NDG Linux Essentials course in the Cisco Networking Academy',
        'PCAP: Programming Essentials in Python'
      ]
    },
    {
      id: 3,
      name: 'Others',
      list: ['CSS', 'HTML', 'LaTeX']
    }
  ]);

  const [activeOtherSkill, setActiveOtherSkill] = useState(null);

  function addOtherSkills() {
    const newId = otherSkills.length === 0 ? 0 : otherSkills[otherSkills.length - 1].id + 1;
    const input = document.querySelector("#input-other-skill-set");
    const newName = input.value;
    if (!input.value) return;
    input.value = '';
    setOtherSkills([
      ...otherSkills,
      {
        id: newId,
        name: newName,
        list: [],
      },
    ])
    console.log('otherSkills after add:', [...otherSkills, { id: newId, name: newName, list: [] }]);
  }

  function updateOtherSkills(updatedSkill) {
    setOtherSkills(prevSet => 
      prevSet.map(skill => skill.id === updatedSkill.id ? updatedSkill : skill)
    );
  }

  function removeOtherSkills(id) {setOtherSkills(otherSkills.filter(skills => skills.id !== id))};



  return (
    <>
      <header><h1>CV Generator</h1></header>
      <section className='form'>
        <FormSection className='general-info' title='General Information'>
          <InputGroup id="full-name" type="text" label="Full Name" 
                      value={generalInfo.fullName} onChange={handleInputGroupChange}/>
          <InputGroup id="email" type="email" label="Email" 
                      value={generalInfo.email} onChange={handleInputGroupChange}/>
          <InputGroup id="phone" type="tel" label="Phone Number"
                      value={generalInfo.phone} onChange={handleInputGroupChange}/>
          <InputGroup id="github" type="text" label="GitHub"
                      value={generalInfo.github} onChange={handleInputGroupChange}/>
        </FormSection>
        <FormSection className='educational-exp' title='Educational Experience'>
          {educationalExps.map(exp => {
            return  <InputEduExp key={exp.id} eduExp={exp}
                    isActive={activeEduExp === exp.id}
                    onClick={() => {
                      activeEduExp === exp.id ? setActiveEduExp(null) : setActiveEduExp(exp.id)
                    }}
                    onChange={updateEducationExperience}
                    onRemove={() => removeEducationExperience(exp.id)}/>
          })}
          <button onClick={addEducationExperience}>Add Experience</button>
        </FormSection>
        <FormSection className='work-exp' title='Work Experience'>
          {workingExps.map(exp => {
            return  <InputWorkExp key={exp.id} workExp={exp}
                    isActive={exp.id === activeWorkExp}
                    onClick={() => {
                      activeWorkExp === exp.id ? setActiveWorkExp(null) : setActiveWorkExp(exp.id)
                    }}
                    onChange={updateWorkingExperience}
                    onRemove={() => removeWorkingExperience(exp.id)}/>
          })}
          <button onClick={addWorkingExperience}>Add Experience</button>
        </FormSection>
        <FormSection className='technical-skills' title='Technical Skills'>
          {technicalSkills.map(skill => 
            <InputSkills
              className='tech-skills-container'
              key={skill.id} receivedSkill={skill} 
              updateSkills={updateTechnicalSkills}
              onRemove={() => removeTechnicalSkills(skill.id)}
              isActive={activeTechSkill === skill.id}
              toggleActive={() => {
                activeTechSkill === skill.id ? setActiveTechSkill(null) : setActiveTechSkill(skill.id);
              }}
            />
          )}
          <div className='actions'>
            <input type="text" id='input-skill-set'/>
            <button onClick={() => addTechnicalSkills()}>Add More</button>
          </div>
        </FormSection>

        <FormSection className='other-skills' title='Aditional Information'>
          {otherSkills.map(skill =>
            <InputSkills
              className='other-skills-container'
              key={skill.id} receivedSkill={skill}
              updateSkills={updateOtherSkills}
              onRemove={() => removeOtherSkills(skill.id)}
              isActive={activeOtherSkill === skill.id}
              toggleActive={() => {
                activeOtherSkill === skill.id ? setActiveOtherSkill(null) : setActiveOtherSkill(skill.id);
              }}
            />
          )}
          <div className='actions'>
            <input type="text" id='input-other-skill-set'/>
            <button onClick={() => addOtherSkills()}>Add More</button>
          </div>
        </FormSection>

      </section>
      <section className='curriculum'>
        <div className='curriculum-page'>
          <h2 className='full-name'>{generalInfo.fullName}</h2>
          <section className='general-info'>
            <p className='email'>{generalInfo.email}</p>
            <p className='phone'>{generalInfo.phone}</p>
            <p className='github'>{generalInfo.github}</p>
          </section>
          {educationalExps.length > 0 && <h2>Educational Experience</h2>}
          <section className='educational-exp'>
            {educationalExps.map(exp => <CVEduExp key={exp.id} exp={exp}/>)}
          </section>
          {workingExps.length > 0 && <h2>Working Experience</h2>}
          <section className='working-exp'>
            {workingExps.map(exp => <CVWorkExp key={exp.id} exp={exp}/>)}
          </section>
          {technicalSkills.length > 0 && <h2>Technical Skills</h2>}
          <section className='technical-skills'>
            <ul>
              {technicalSkills.map(skill => <li><b>{skill.name}</b>: {skill.list.join(', ')}</li>)}
            </ul>
          </section>

          {otherSkills.length > 0 && <h2>Aditional Information</h2>}
          <section className='other-skills'>
            <ul>
              {otherSkills.map(skill => <li><b>{skill.name}</b>: {skill.list.join(', ')}</li>)}
            </ul>
          </section>

        </div>
      </section>
    </>
  )
}

export default App
