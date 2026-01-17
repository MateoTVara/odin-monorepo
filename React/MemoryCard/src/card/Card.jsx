export default function Card({id, name, image, onClick}) {
  return (
    <div
      id={id}
      className="flex flex-col px-3 pt-3 pb-1.5 border-2 border-slate-300 rounded-xl bg-slate-900"
      onClick={onClick}
    >
      <img src={image} alt={name} />
      <h2 className="lg:text-xl md:text-base text-center ">{name}</h2>
    </div>
  );
}