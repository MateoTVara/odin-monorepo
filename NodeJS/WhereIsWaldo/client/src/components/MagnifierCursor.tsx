interface Props {
  size: number;
  zoom: number;
  hoverPosition: { x: number, y: number };
  imageUrl: string;
  imageRef: React.RefObject<HTMLImageElement>;
}

export default function MagnifierCursor({ size, zoom, hoverPosition, imageUrl, imageRef }: Props) {
  const width = imageRef.current?.clientWidth ?? 0;
  const height = imageRef.current?.clientHeight ?? 0;

  return (
    <div
      className="absolute rounded-full border-2 border-white shadow-xl pointer-events-none flex items-center justify-center text-white text-xl"
      style={{
        width: size,
        height: size,
        left: hoverPosition.x,
        top: hoverPosition.y,
        transform: "translate(-50%, -50%)",
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${width * zoom}px ${height * zoom}px`,
        backgroundPosition: `
          ${-hoverPosition.x * zoom + size / 2}px 
          ${-hoverPosition.y * zoom + size / 2}px`
      }}
    >
      <div className="relative w-4 h-4">
        <div className="absolute w-full h-0.5 bg-white top-1/2 -translate-y-1/2"></div>
        <div className="absolute h-full w-0.5 bg-white left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  )
}