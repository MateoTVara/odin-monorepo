import { useState } from 'react'
import FormSection from './components/form_section/FormSection'
import InputGroup from './components/input_group/InputGroup'
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

  return (
    <>
      <header><h1>CV Generator</h1></header>
      <section className='form'>
        <FormSection className='general-info' title='General Information'>
          <InputGroup id="full-name" type="text" label="Full Name" 
                      value={generalInfo.name} onChange={handleInputGroupChange}/>
          <InputGroup id="email" type="email" label="Email" 
                      value={generalInfo.email} onChange={handleInputGroupChange}/>
          <InputGroup id="phone" type="tel" label="Phone Number"
                      value={generalInfo.phone} onChange={handleInputGroupChange}/>
          <InputGroup id="github" type="text" label="GitHub"
                      value={generalInfo.github} onChange={handleInputGroupChange}/>
        </FormSection>
        <FormSection className='educational-exp' title='Educational Experience'>

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
        </div>
      </section>
    </>
  )
}

export default App
