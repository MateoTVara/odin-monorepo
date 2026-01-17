import './App.css'
import mockData from './assets/data/mockData.json'
import { useState } from 'react'
import FormSection from './components/form_section/FormSection'
import InputGroup from './components/input_group/InputGroup'
import InputEduExp from './components/input_edu_exp/InputEduExp'
import CVEduExp from './components/cv_edu_exp/CVEduExp'
import InputWorkExp from './components/input_work_exp/InputWorkExp'
import CVWorkExp from './components/cv_work_exp/CVWorkExp'
import InputSkills from './components/input_skills/InputSkills'

import Icon from '@mdi/react'
import {
  mdiEmail, mdiPhone, mdiGithub,
  mdiLinkedin, mdiWeb, mdiDownload,
  mdiClose, mdiAccountCircle, mdiSchool,
  mdiBriefcase, mdiXml, mdiInformationOutline
} from '@mdi/js'

import jsPDF from 'jspdf'

function App() {

  const doc = new jsPDF();

  const [generalInfo, setGeneralInfo] = useState(mockData.generalInfo);
  const [activeSections, setActiveSections] = useState([]);

  function handleInputGroupChange(e) {
    const mapper = {
      'full-name': 'fullName', email: 'email',
      phone: 'phone', github: 'github',
      linkedin: 'linkedin', portfolio: 'portfolio',
      profile: 'profile'
    };
    const id = e.target.id;
    setGeneralInfo({...generalInfo, [mapper[id]]: e.target.value})
  }



  const [educationalExps, setEducationalExps] = useState(mockData.educationalExps);
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



  const [workingExps, setWorkingExps] = useState(mockData.workingExps);
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



  const [technicalSkills, setTechnicalSkills] = useState(mockData.technicalSkills);
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



  const [otherSkills, setOtherSkills] = useState(mockData.otherSkills);
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



  const [preview, setPreview] = useState(false);



  return (
    <>
      <header><h1>CV Generator</h1></header>
      <section className='form'>
        <FormSection 
          className='general-info'
          title='General Information'
          icon={mdiAccountCircle}
          isActive={activeSections.includes(1)}
          onClick={() => setActiveSections(
            activeSections.includes(1) ? 
              activeSections.filter(section => section !== 1) : 
              [...activeSections, 1]
          )}
        >
          <InputGroup id="full-name" type="text" label="Full Name" 
                      value={generalInfo.fullName} onChange={handleInputGroupChange}/>
          <InputGroup id="email" type="email" label="Email" 
                      value={generalInfo.email} onChange={handleInputGroupChange}/>
          <InputGroup id="phone" type="tel" label="Phone Number"
                      value={generalInfo.phone} onChange={handleInputGroupChange}/>
          <InputGroup id="github" type="text" label="GitHub"
                      value={generalInfo.github} onChange={handleInputGroupChange}/>
          <InputGroup id="linkedin" type="text" label="LinkedIn"
                      value={generalInfo.linkedin} onChange={handleInputGroupChange}/>
          <InputGroup id="portfolio" type="text" label="Portfolio"
                      value={generalInfo.portfolio} onChange={handleInputGroupChange}/>
          <div className='input-group'>
            <label htmlFor="profile">Profile</label>
            <textarea id="profile" value={generalInfo.profile} onChange={handleInputGroupChange}></textarea>
          </div>
        </FormSection>

        <FormSection
          className='educational-exp' 
          title='Educational Experience'
          icon={mdiSchool}
          isActive={activeSections.includes(2)}
          onClick={() => setActiveSections(
            activeSections.includes(2) ? 
              activeSections.filter(section => section !== 2) : 
              [...activeSections, 2]
          )}
        >
          {educationalExps.map(exp => 
            <InputEduExp 
              key={exp.id} eduExp={exp}
              isActive={activeEduExp === exp.id}
              onClick={() => {activeEduExp === exp.id ? setActiveEduExp(null) : setActiveEduExp(exp.id)}}
              onChange={updateEducationExperience}
              onRemove={() => removeEducationExperience(exp.id)}
            />
          )}
          <button onClick={addEducationExperience}>Add Experience</button>
        </FormSection>

        <FormSection
          className='work-exp'
          title='Work Experience'
          icon={mdiBriefcase}
          isActive={activeSections.includes(3)}
          onClick={() => setActiveSections(
            activeSections.includes(3) ? 
              activeSections.filter(section => section !== 3) : 
              [...activeSections, 3]
          )}
        >
          {workingExps.map(exp => 
            <InputWorkExp 
              key={exp.id} workExp={exp}
              isActive={exp.id === activeWorkExp}
              onClick={() => {activeWorkExp === exp.id ? setActiveWorkExp(null) : setActiveWorkExp(exp.id)}}
              onChange={updateWorkingExperience}
              onRemove={() => removeWorkingExperience(exp.id)}
            />
          )}
          <button onClick={addWorkingExperience}>Add Experience</button>
        </FormSection>

        <FormSection 
          className='technical-skills'
          title='Technical Skills'
          icon={mdiXml}
          isActive={activeSections.includes(4)}
          onClick={() => setActiveSections(
            activeSections.includes(4) ? 
              activeSections.filter(section => section !== 4) : 
              [...activeSections, 4]
          )}
        >
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

        <FormSection
          className='other-skills'
          title='Aditional Information'
          icon={mdiInformationOutline}
          isActive={activeSections.includes(5)}
          onClick={() => setActiveSections(
            activeSections.includes(5) ? 
              activeSections.filter(section => section !== 5) : 
              [...activeSections, 5]
          )}
        >
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

        <div className='form-actions'>
          <button onClick={() => {preview ? setPreview(false) : setPreview(true)}}>Show Preview</button>
        </div>

      </section>
      <section className={`curriculum ${preview ? 'active' : ''}`}>
        <div className='curriculum-page'>

          <h1 className='full-name'>{generalInfo.fullName}</h1>
          <section className='general-info'>
            {generalInfo.email && <p className='email'><Icon path={mdiEmail} size={0.5}/>{generalInfo.email}</p>}
            {generalInfo.phone && <p className='phone'><Icon path={mdiPhone} size={0.5}/>{generalInfo.phone}</p>}
            {generalInfo.github && <a href={generalInfo.github} target="_blank" rel="noopener noreferrer"><Icon path={mdiGithub} size={0.5}/>GitHub</a>}
            {generalInfo.linkedin && <a href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer"><Icon path={mdiLinkedin} size={0.5}/>LinkedIn</a>}
            {generalInfo.portfolio && <a href={generalInfo.portfolio} target="_blank" rel="noopener noreferrer"><Icon path={mdiWeb} size={0.5}/>Portfolio</a>}
          </section>

          <h2>Profile</h2>
          <section className='profile'>
            {generalInfo.profile && <p className='profile'>{generalInfo.profile}</p>}
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
              {technicalSkills.map(skill => <li key={skill.id}><b>{skill.name}</b>: {skill.list.join(', ')}</li>)}
            </ul>
          </section>

          {otherSkills.length > 0 && <h2>Aditional Information</h2>}
          <section className='other-skills'>
            <ul>
              {otherSkills.map(skill => <li key={skill.id}><b>{skill.name}</b>: {skill.list.join(', ')}</li>)}
            </ul>
          </section>

        </div>

        <div className='actions'>
          <button className='download' onClick={
            () => {
              doc.html(document.querySelector('.curriculum-page'), {
                callback: function (doc) {
                  if (doc.getNumberOfPages() > 1) doc.deletePage(doc.getNumberOfPages());
                  doc.save('cv.pdf');
                },
                width: doc.internal.pageSize.getWidth(),
                windowWidth: document.querySelector('.curriculum-page').scrollWidth
              });
            }
          }><Icon path={mdiDownload} size={1} color='white'/></button>

          <button className='close' onClick={() => setPreview(false)}>
            <Icon path={mdiClose} size={1} color='white'/>
          </button>
        </div>
      </section>
    </>
  )
}

export default App
