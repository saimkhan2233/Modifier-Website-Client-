export default function AnimatedWords({ lines, active }) {
  return (
    <div className={`word-stack ${active ? "is-visible" : ""}`}>
      {lines.map((line) => (
        <span key={line} className="word-stack__line">
          <span>{line}</span>
        </span>
      ))}
    </div>
  );
}
