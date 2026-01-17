import  './FormSection.css'
import Icon from '@mdi/react';

export default function FormSection({className, title, children, isActive, onClick, icon}) {
  return (
    <section className={`form-section ${className} ${isActive && 'active'}`}>
      <h2 onClick={onClick}>
        {icon && <Icon path={icon} size={1} />} {title}
      </h2>
      <div className={isActive ? 'active': ''}>{children}</div>
    </section>
  );
}