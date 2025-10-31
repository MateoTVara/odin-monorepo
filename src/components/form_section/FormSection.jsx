import  './FormSection.css'

export default function FormSection({className, title, children, isActive, onClick}) {
  return (
    <section className={`form-section ${className} ${isActive && 'active'}`}>
      <h2 onClick={onClick}>{title}</h2>
      <div className={isActive ? 'active': ''}>{children}</div>
    </section>
  );
}