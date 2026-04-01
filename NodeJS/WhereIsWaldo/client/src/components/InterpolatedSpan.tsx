interface Props {
  text: string;
  colors: string[];
}

export default function InterpolatedSpan({ text, colors }: Props) {
  const characters = Array.from(text);

  return (
    <span>
      {characters.map((char, index) => {
        const color = colors[index % colors.length];

        return (
          <span key={index} style={{ color }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}