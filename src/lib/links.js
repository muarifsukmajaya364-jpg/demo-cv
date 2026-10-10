export const socialMeta = {
  instagram: { label: "Instagram", icon: "instagram" },
  discord:   { label: "Discord",   icon: "discord" },
  whatsapp:  { label: "WhatsApp",  icon: "whatsapp" },
  email:     { label: "Email",     icon: "email" },
};

export function socialHref(key, value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (key === "whatsapp") {
    if (trimmed.startsWith("http")) {
      return trimmed;
    }
    const clean = trimmed.startsWith("+") ? trimmed.slice(1) : trimmed;
    let digits = clean.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("0")) {
      digits = "62" + digits.slice(1);
    }
    return `https://wa.me/${digits}`;
  }

  if (key === "email") {
    if (trimmed.toLowerCase().startsWith("mailto:")) {
      return trimmed;
    }
    return `mailto:${trimmed}`;
  }

  return trimmed;
}

export function instagramHref(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) {
    return trimmed;
  }
  const handle = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
  return `https://instagram.com/${handle}`;
}
