import modifierLogo from "../assets/modifier-marketing-logo.png";

export default function BrandLogo({ compact = false }) {
  return (
    <img
      className={`modifier-logo ${compact ? "modifier-logo--compact" : ""}`}
      src={modifierLogo}
      alt="Modifier Marketing (PVT) Ltd."
    />
  );
}
