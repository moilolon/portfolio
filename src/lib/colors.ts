// Translucent version of a technology colour for chip backgrounds.
// color-mix also works with CSS variables such as var(--foreground), unlike appending a hex alpha.
export const tint = (color: string, percent = 12) => `color-mix(in srgb, ${color} ${percent}%, transparent)`;
