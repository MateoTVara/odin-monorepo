import { useState } from 'react'
import FormSection from './components/form_section/FormSection'
import InputGroup from './components/input_group/InputGroup'
import InputEduExp from './components/input_edu_exp/InputEduExp'
import CVEduExp from './components/cv_edu_exp/CVEduExp'
import './App.css'

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    github: '',
  });

  function handleInputGroupChange(e) {
    const mapper = {'full-name': 'fullName', email: 'email', phone: 'phone', github: 'github'}
    const id = e.target.id;
    setGeneralInfo({...generalInfo, [mapper[id]]: e.target.value})
  }



  const [educationalExps, setEducationalExps] = useState([]);
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
          <button onClick={addEducationExperience}>Add Experience</button>
          {educationalExps.map(exp => {
            return  <InputEduExp key={exp.id} eduExp={exp}
                    isActive={activeEduExp === exp.id}
                    onClick={() => {
                      activeEduExp === exp.id ? setActiveEduExp(null) : setActiveEduExp(exp.id)
                    }}
                    onChange={updateEducationExperience}
                    onRemove={() => removeEducationExperience(exp.id)}/>
          })}
        </FormSection>
        <FormSection className='work-exp' title='Work Experience'>

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
        </div>
      </section>
    </>
  )
}

export default App
