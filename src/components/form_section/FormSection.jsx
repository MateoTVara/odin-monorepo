import  './FormSection.css'

export default function FormSection({className, title, children}) {
  const classList = className + ' form-section';
  return (
    <section className={classList}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}