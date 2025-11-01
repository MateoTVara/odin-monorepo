export default function Card({name, image}) {
  return (
    <div className="flex flex-col px-3 pt-3 pb-1.5 border-2 border-slate-300 rounded-xl bg-slate-900">
      <img src={image} alt={name} />
      <h2 className="text-xl text-center">{name}</h2>
    </div>
  );
}