import AnimatedWords from "./AnimatedWords";

export default function SectionHeading({ eyebrow, lines, active }) {
  return (
    <div>
      <p className="modifier-kicker reveal">{eyebrow}</p>
      <AnimatedWords active={active} lines={lines} />
    </div>
  );
}
