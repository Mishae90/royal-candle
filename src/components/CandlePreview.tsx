import { useId, useState } from "react";
import type { CandleConfig } from "../data/catalog";
import { getOption } from "../data/catalog";
import { FlameIcon } from "./Ornaments";

interface Props {
  config: CandleConfig;
  className?: string;
  lit?: boolean;
  interactive?: boolean;
}

/* ---------- small building blocks ---------- */

function Blossom({ x, y, r, c1, c2, rot = 0 }: { x: number; y: number; r: number; c1: string; c2: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-r * 0.62} rx={r * 0.44} ry={r * 0.66} transform={`rotate(${a})`} fill={c1} stroke="#ffffff" strokeOpacity={0.5} strokeWidth={0.6} />
      ))}
      <circle r={r * 0.3} fill={c2} />
    </g>
  );
}

function Leaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return <ellipse cx={x} cy={y} rx={9 * s} ry={3.6 * s} transform={`rotate(${rot} ${x} ${y})`} fill="#a9b394" opacity={0.85} />;
}

function MiniFlame({ x, y, s, lit, gid }: { x: number; y: number; s: number; lit: boolean; gid: string }) {
  if (!lit) return <line x1={x} y1={y} x2={x} y2={y + 8 * s} stroke="#7a6b52" strokeWidth={1.6} strokeLinecap="round" />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cy={-14} rx={20} ry={26} fill={`url(#${gid}-glow)`} className="flame-glow" />
      <g className="flame-flicker">
        <path d="M0 -34 C7 -22 10 -12 0 -2 C-10 -12 -7 -22 0 -34 Z" fill={`url(#${gid}-flame)`} />
        <path d="M0 -24 C4 -17 5.5 -10 0 -4 C-5.5 -10 -4 -17 0 -24 Z" fill="#fff3d8" opacity={0.95} />
        <ellipse cy={-8} rx={2.4} ry={4} fill="#f6c65b" />
      </g>
      <line y1={0} y2={7} stroke="#7a6b52" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

function OrthodoxCross({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#a5854a" strokeWidth={2.3} strokeLinecap="round" fill="none">
      <line x1={0} y1={0} x2={0} y2={30} />
      <line x1={-5} y1={5.5} x2={5} y2={5.5} />
      <line x1={-8.5} y1={11.5} x2={8.5} y2={11.5} />
      <line x1={-6.5} y1={25} x2={6.5} y2={20.5} />
    </g>
  );
}

function LatinCross({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#a5854a" strokeWidth={2.3} strokeLinecap="round" fill="none">
      <line x1={0} y1={0} x2={0} y2={27} />
      <line x1={-8} y1={8} x2={8} y2={8} />
    </g>
  );
}

function Bear({ x, y, ribbon }: { x: number; y: number; ribbon: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={-4} rx={30} ry={7} fill="#33302a" opacity={0.07} />
      {/* ears */}
      <circle cx={-13} cy={-70} r={7.5} fill="#e8d7bd" stroke="#cdb390" strokeWidth={1} />
      <circle cx={13} cy={-70} r={7.5} fill="#e8d7bd" stroke="#cdb390" strokeWidth={1} />
      <circle cx={-13} cy={-70} r={3.4} fill="#d9c2a0" />
      <circle cx={13} cy={-70} r={3.4} fill="#d9c2a0" />
      {/* body */}
      <ellipse cx={0} cy={-24} rx={23} ry={21} fill="#e8d7bd" stroke="#cdb390" strokeWidth={1} />
      <ellipse cx={0} cy={-20} rx={12} ry={11} fill="#f3e7d2" />
      {/* arms */}
      <ellipse cx={-21} cy={-28} rx={7.5} ry={13} transform="rotate(24 -21 -28)" fill="#e2cfae" stroke="#cdb390" strokeWidth={1} />
      <ellipse cx={21} cy={-28} rx={7.5} ry={13} transform="rotate(-24 21 -28)" fill="#e2cfae" stroke="#cdb390" strokeWidth={1} />
      {/* feet */}
      <ellipse cx={-13} cy={-7} rx={10} ry={7} fill="#e2cfae" stroke="#cdb390" strokeWidth={1} />
      <ellipse cx={13} cy={-7} rx={10} ry={7} fill="#e2cfae" stroke="#cdb390" strokeWidth={1} />
      {/* head */}
      <circle cx={0} cy={-56} r={19} fill="#eedec6" stroke="#cdb390" strokeWidth={1} />
      <ellipse cx={0} cy={-50} rx={8.5} ry={6.5} fill="#f7eedb" />
      <circle cx={0} cy={-53} r={2} fill="#6b5942" />
      <circle cx={-7} cy={-59} r={1.8} fill="#4a3f30" />
      <circle cx={7} cy={-59} r={1.8} fill="#4a3f30" />
      {/* ribbon at neck */}
      <path d={`M-9 -41 C-3 -38 3 -38 9 -41 L7 -36 C2 -34 -2 -34 -7 -36 Z`} fill={ribbon} />
      <circle cx={0} cy={-37.5} r={2.6} fill={ribbon} stroke="#ffffff" strokeOpacity={0.4} strokeWidth={0.8} />
    </g>
  );
}

function DoveCharm({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1.25)`}>
      <path
        d="M-9 2 C-3 -6 5 -7 10 -4 C7 -2.5 6 -1 5.8 1 C9 1.5 11.5 0.5 13 -1.5 C12 3.5 8 6.5 2.5 6.5 C0.5 9 -2.5 10 -6 10 C-4 8 -3.4 6.4 -3.3 5 C-6.5 5 -8.5 3.8 -9 2 Z"
        fill="#fbf7ee"
        stroke="#b39455"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <circle cx={7.6} cy={-2.4} r={0.7} fill="#8a7448" />
    </g>
  );
}

/* ---------- main component ---------- */

export default function CandlePreview({ config, className = "", lit: initialLit = true, interactive = false }: Props) {
  const [zoom, setZoom] = useState(1);
  const [lit, setLit] = useState(initialLit);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  const candle = getOption("candle", config.candle) ?? { id: "classic", name: "", price: 0, swatch: "#f6f0e2", swatch2: "#fffdf5" };
  const ribbon = getOption("ribbon", config.ribbon) ?? { id: "champagne", name: "", price: 0, swatch: "#dcc49a", swatch2: "#ecdcbc" };
  const flower = config.flower !== "none" ? getOption("flower", config.flower) : undefined;
  const towel = config.towel !== "none" ? getOption("towel", config.towel) : undefined;

  const royal = candle.id === "royal";
  const w = royal ? 118 : 86;
  const h = royal ? 372 : 330;
  const bottom = 620;
  const top = bottom - h;
  const bandY = top + Math.round(h * 0.42);
  const bandH = royal ? 30 : 26;
  const cx = 320;

  const wax = candle.swatch ?? "#f6f0e2";
  const waxHi = candle.swatch2 ?? "#fffdf5";
  const rb = ribbon.swatch ?? "#dcc49a";
  const rbHi = ribbon.swatch2 ?? "#ecdcbc";
  const fc1 = flower?.swatch ?? "#e2b3a9";
  const fc2 = flower?.swatch2 ?? "#f3d9d2";

  const nameColorHex = config.nameColor === "gold" ? "#a5854a" : config.nameColor === "rose" ? "#c08b7e" : "#8a7a63";
  const showName = config.nameOn && config.childName.trim().length > 0;
  const nameLen = config.childName.trim().length;
  const script = config.nameFont === "script";
  const nameSize = script ? (nameLen <= 8 ? 33 : nameLen <= 11 ? 26 : 21) : nameLen <= 8 ? 25 : nameLen <= 11 ? 20 : 16;
  const nameY = bandY + bandH + (royal ? 74 : 66);

  const gid = `rc${uid}`;
  const towelX = config.toy === "bear" ? 526 : 508;

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 640 800" className="h-auto w-full" role="img" aria-label={`Preview of your Royal Candle: ${candle.name}${showName ? `, engraved “${config.childName.trim()}”` : ""}`}>
        <defs>
          <linearGradient id={`${gid}-wax`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={wax} />
            <stop offset="0.32" stopColor={waxHi} />
            <stop offset="0.6" stopColor={waxHi} />
            <stop offset="1" stopColor={wax} />
          </linearGradient>
          <linearGradient id={`${gid}-ribbon`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={rb} />
            <stop offset="0.45" stopColor={rbHi} />
            <stop offset="1" stopColor={rb} />
          </linearGradient>
          <linearGradient id={`${gid}-brass`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e2cd9f" />
            <stop offset="0.5" stopColor="#c2a365" />
            <stop offset="1" stopColor="#a5854a" />
          </linearGradient>
          <linearGradient id={`${gid}-ceramic`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e6dcc6" />
            <stop offset="0.5" stopColor="#f7f0df" />
            <stop offset="1" stopColor="#e2d7bf" />
          </linearGradient>
          <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#f7d488" stopOpacity="0.75" />
            <stop offset="0.55" stopColor="#f2c96e" stopOpacity="0.28" />
            <stop offset="1" stopColor="#f2c96e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gid}-halo`} cx="0.5" cy="0.42" r="0.6">
            <stop offset="0" stopColor="#f5e8c8" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#f5e8c8" stopOpacity="0.28" />
            <stop offset="1" stopColor="#f5e8c8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${gid}-flame`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f9df9e" />
            <stop offset="0.55" stopColor="#eeb45c" />
            <stop offset="1" stopColor="#d98f3e" />
          </linearGradient>
        </defs>

        <g style={{ transform: `scale(${zoom})`, transformOrigin: "320px 460px", transition: "transform .6s cubic-bezier(.19,.7,.22,1)" }}>
          {/* ambient arch + halo */}
          <path d={`M ${cx - 132} 648 V 330 A 132 132 0 0 1 ${cx + 132} 330 V 648`} fill="#f3ead6" opacity={0.35} />
          <path d={`M ${cx - 132} 648 V 330 A 132 132 0 0 1 ${cx + 132} 330 V 648`} fill="none" stroke="#b39455" strokeOpacity={0.3} strokeWidth={1.2} />
          <path d={`M ${cx - 118} 648 V 336 A 118 118 0 0 1 ${cx + 118} 336 V 648`} fill="none" stroke="#b39455" strokeOpacity={0.16} strokeWidth={1} />
          <ellipse cx={cx} cy={420} rx={230} ry={270} fill={`url(#${gid}-halo)`} />

          {/* ground shadow */}
          <ellipse cx={cx} cy={650} rx={180} ry={20} fill="#33302a" opacity={0.08} />
          {towel && <ellipse cx={towelX} cy={648} rx={78} ry={12} fill="#33302a" opacity={0.06} />}

          {/* attendant tapers */}
          {config.extra === "tapers" && (
            <g>
              {[
                { x: cx - 96, th: 186 },
                { x: cx + 96, th: 214 },
              ].map((t, i) => {
                const tTop = 606 - t.th;
                return (
                  <g key={i}>
                    <rect x={t.x - 8} y={tTop} width={16} height={t.th} rx={7} fill={`url(#${gid}-wax)`} />
                    <ellipse cx={t.x} cy={tTop + 4} rx={8} ry={3.4} fill={waxHi} />
                    <MiniFlame x={t.x} y={tTop - 6} s={0.62} lit={lit} gid={gid} />
                  </g>
                );
              })}
            </g>
          )}

          {/* holder — back parts */}
          {config.holder === "brass" && <ellipse cx={cx} cy={618} rx={94} ry={14} fill={`url(#${gid}-brass)`} />}
          {config.holder === "ceramic" && <ellipse cx={cx} cy={566} rx={80} ry={12} fill="#efe7d4" stroke="#ddd2b8" strokeWidth={1} />}

          {/* ---------- candle body ---------- */}
          <g>
            <rect x={cx - w / 2} y={top} width={w} height={h} rx={13} fill={`url(#${gid}-wax)`} />
            <rect x={cx - w / 2} y={top} width={w} height={h} rx={13} fill="none" stroke="#d8cbae" strokeOpacity={0.55} strokeWidth={1} />
            <ellipse cx={cx} cy={top + 7} rx={w / 2 - 3} ry={9} fill={waxHi} />
            <ellipse cx={cx} cy={top + 7} rx={w / 2 - 3} ry={9} fill="none" stroke="#cbbd9e" strokeOpacity={0.5} strokeWidth={0.8} />
            <rect x={cx - w / 2 + 11} y={top + 26} width={9} height={h - 60} rx={4.5} fill="#ffffff" opacity={0.35} />

            {/* wick + flame */}
            <MiniFlame x={cx} y={top - 12} s={1} lit={lit} gid={gid} />

            {/* ribbon */}
            <rect x={cx - w / 2 - 1} y={bandY} width={w + 2} height={bandH} fill={`url(#${gid}-ribbon)`} />
            <rect x={cx - w / 2 - 1} y={bandY + 5} width={w + 2} height={3} fill="#ffffff" opacity={0.4} />
            {config.bow === "band" && (
              <g>
                <rect x={cx - w / 2 - 1} y={bandY + bandH + 7} width={w + 2} height={11} fill={`url(#${gid}-ribbon)`} opacity={0.92} />
                <rect x={cx - w / 2 - 1} y={bandY + bandH + 11.5} width={w + 2} height={1.4} fill="#b39455" opacity={0.75} />
              </g>
            )}
            {config.bow === "bow" && (
              <g transform={`translate(${cx + w / 2 + 5} ${bandY + bandH / 2})`}>
                <path d="M2 2 C10 26 6 44 -2 58 L6 58 C14 42 15 22 9 2 Z" fill={rb} opacity={0.95} />
                <path d="M-2 2 C-12 24 -12 42 -8 56 L-1 55 C-5 40 -4 22 2 2 Z" fill={rbHi} opacity={0.95} />
                <ellipse cx={-14} cy={-4} rx={15} ry={9} transform="rotate(-18 -14 -4)" fill={rb} stroke="#ffffff" strokeOpacity={0.35} strokeWidth={0.8} />
                <ellipse cx={14} cy={-4} rx={15} ry={9} transform="rotate(18 14 -4)" fill={rb} stroke="#ffffff" strokeOpacity={0.35} strokeWidth={0.8} />
                <circle r={5.4} fill={rbHi} stroke="#ffffff" strokeOpacity={0.4} strokeWidth={0.8} />
              </g>
            )}
            {config.bow === "knot" && (
              <g>
                <path d={`M${cx - 3} ${bandY + bandH - 2} C${cx - 16} ${bandY + bandH + 30} ${cx - 20} ${bandY + bandH + 52} ${cx - 14} ${bandY + bandH + 66} L${cx - 6} ${bandY + bandH + 62} C${cx - 11} ${bandY + bandH + 44} ${cx - 7} ${bandY + bandH + 24} ${cx + 2} ${bandY + bandH - 2} Z`} fill={rb} />
                <path d={`M${cx + 3} ${bandY + bandH - 2} C${cx + 15} ${bandY + bandH + 26} ${cx + 17} ${bandY + bandH + 44} ${cx + 12} ${bandY + bandH + 58} L${cx + 4} ${bandY + bandH + 55} C${cx + 9} ${bandY + bandH + 40} ${cx + 6} ${bandY + bandH + 22} ${cx - 2} ${bandY + bandH - 2} Z`} fill={rbHi} />
                <ellipse cx={cx} cy={bandY + bandH / 2 + 2} rx={8} ry={6} fill={rb} stroke="#ffffff" strokeOpacity={0.4} strokeWidth={0.8} />
              </g>
            )}

            {/* pearl strand with cross */}
            {config.cross === "pearl-cross" && (
              <g>
                {Array.from({ length: 9 }).map((_, i) => {
                  const t = i / 8;
                  const px = cx - w / 2 + 7 + t * (w - 14);
                  const py = bandY + bandH + 16 + Math.sin(Math.PI * t) * 14;
                  return <circle key={i} cx={px} cy={py} r={3.6} fill="#f4ecda" stroke="#d8c49b" strokeWidth={0.8} />;
                })}
                <line x1={cx} y1={bandY + bandH + 30} x2={cx} y2={bandY + bandH + 36} stroke="#a5854a" strokeWidth={1} />
                <LatinCross x={cx} y={bandY + bandH + 36} s={0.8} />
              </g>
            )}

            {/* cross pendants */}
            {config.cross === "orthodox" && (
              <g>
                <line x1={cx} y1={bandY + bandH} x2={cx} y2={bandY + bandH + 24} stroke="#a5854a" strokeWidth={1.4} strokeDasharray="1 3.4" strokeLinecap="round" />
                <OrthodoxCross x={cx} y={bandY + bandH + 24} s={0.95} />
              </g>
            )}
            {config.cross === "latin" && (
              <g>
                <line x1={cx} y1={bandY + bandH} x2={cx} y2={bandY + bandH + 24} stroke="#a5854a" strokeWidth={1.4} strokeDasharray="1 3.4" strokeLinecap="round" />
                <LatinCross x={cx} y={bandY + bandH + 24} s={0.95} />
              </g>
            )}

            {/* name + date engraving */}
            {showName && (
              <g>
                <text
                  x={cx}
                  y={nameY}
                  textAnchor="middle"
                  fontFamily='"Cormorant Garamond", Georgia, serif'
                  fontStyle={script ? "italic" : "normal"}
                  fontWeight={500}
                  fontSize={nameSize}
                  letterSpacing={script ? 1.5 : 5}
                  fill={nameColorHex}
                >
                  {config.childName.trim()}
                </text>
                {config.dateText.trim() && (
                  <text x={cx} y={nameY + 22} textAnchor="middle" fontFamily='"Manrope", sans-serif' fontWeight={600} fontSize={10.5} letterSpacing={3.4} fill="#8d8271">
                    {config.dateText.trim().toUpperCase()}
                  </text>
                )}
                <circle cx={cx - 34} cy={nameY - 26} r={1.4} fill={nameColorHex} opacity={0.7} />
                <circle cx={cx + 34} cy={nameY - 26} r={1.4} fill={nameColorHex} opacity={0.7} />
              </g>
            )}

            {/* flowers */}
            {flower?.id === "blush-bloom" && (
              <g>
                <Leaf x={cx - w / 2 - 8} y={bandY + 24} rot={-30} />
                <Leaf x={cx - w / 2 + 26} y={bandY + 32} rot={18} />
                <Blossom x={cx - w / 2 - 2} y={bandY + 2} r={11} c1={fc1} c2="#f2e3c8" />
                <Blossom x={cx - w / 2 - 16} y={bandY + 18} r={8.5} c1={fc2} c2="#efd9ae" />
                <Blossom x={cx - w / 2 + 12} y={bandY + 17} r={7.5} c1={fc1} c2="#f2e3c8" />
                <Blossom x={cx - w / 2 - 6} y={bandY + 33} r={6} c1={fc2} c2="#efd9ae" />
                <circle cx={cx - w / 2 + 22} cy={bandY + 30} r={2.2} fill="#f4ecda" stroke="#d8c49b" strokeWidth={0.7} />
              </g>
            )}
            {flower?.id === "ivory-bloom" && (
              <g>
                {[-2, -1, 0, 1, 2].map((i) => (
                  <Blossom key={i} x={cx + i * 21} y={top + 30 + Math.abs(i) * 4} r={8 - Math.abs(i)} c1={i % 2 ? fc2 : fc1} c2="#e9d5a8" rot={i * 14} />
                ))}
                {[-1.5, -0.5, 0.5, 1.5].map((i) => (
                  <circle key={i} cx={cx + i * 21} cy={top + 40} r={2} fill="#f4ecda" stroke="#d8c49b" strokeWidth={0.6} />
                ))}
              </g>
            )}
            {flower?.id === "powder-cascade" && (
              <g>
                <path d={`M${cx + w / 2 + 2} ${bandY + 34} C ${cx + w / 2 + 16} ${bandY + 60} ${cx + w / 2 + 14} ${bandY + 90} ${cx + w / 2 + 4} ${bandY + 116}`} fill="none" stroke="#9db28d" strokeWidth={1.4} />
                <Leaf x={cx + w / 2 + 14} y={bandY + 56} rot={40} s={0.9} />
                <Leaf x={cx + w / 2 + 2} y={bandY + 92} rot={-30} s={0.9} />
                <Blossom x={cx + w / 2 + 3} y={bandY + 40} r={9} c1={fc1} c2="#f2ead6" />
                <Blossom x={cx + w / 2 + 13} y={bandY + 64} r={7.5} c1={fc2} c2="#efd9ae" />
                <Blossom x={cx + w / 2 + 8} y={bandY + 88} r={8} c1={fc1} c2="#f2ead6" />
                <Blossom x={cx + w / 2 + 3} y={bandY + 112} r={6} c1={fc2} c2="#efd9ae" />
                <circle cx={cx + w / 2 + 15} cy={bandY + 102} r={2.2} fill="#f4ecda" stroke="#d8c49b" strokeWidth={0.7} />
              </g>
            )}
            {flower?.id === "lavender-whisper" && (
              <g>
                {[-1, 0, 1].map((i) => {
                  const bx = cx - w / 2 - 4 + i * 9;
                  return (
                    <g key={i}>
                      <path d={`M${bx} ${bandY + 26} C ${bx - 4 + i * 5} ${bandY - 4} ${bx + i * 8} ${bandY - 22} ${bx + i * 12} ${bandY - 34}`} fill="none" stroke="#9db28d" strokeWidth={1.2} />
                      {[0, 1, 2, 3].map((j) => (
                        <ellipse key={j} cx={bx + i * (3 + j * 2.4)} cy={bandY - 8 - j * 8} rx={3} ry={4.4} fill={j % 2 ? fc2 : fc1} />
                      ))}
                    </g>
                  );
                })}
                <circle cx={cx - w / 2 + 6} cy={bandY + 30} r={2.2} fill="#f4ecda" stroke="#d8c49b" strokeWidth={0.7} />
                <circle cx={cx - w / 2 - 12} cy={bandY + 22} r={2.2} fill="#f4ecda" stroke="#d8c49b" strokeWidth={0.7} />
              </g>
            )}

            {/* dove charm */}
            {config.toy === "dove-charm" && (
              <DoveCharm x={config.bow === "bow" ? cx + w / 2 - 14 : cx + 16} y={bandY - 14} />
            )}
          </g>

          {/* bear */}
          {config.toy === "bear" && <Bear x={cx + w / 2 + 54} y={648} ribbon={rb} />}

          {/* towel stack */}
          {towel && (
            <g transform={`translate(${towelX} 644)`}>
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <rect x={-56 + i * 3} y={-18 - i * 19} width={112 - i * 6} height={19} rx={9} fill={i === 2 ? towel.swatch2 ?? "#f8f1e2" : towel.swatch ?? "#f1e9d8"} stroke="#d8cbae" strokeOpacity={0.6} strokeWidth={0.8} />
                </g>
              ))}
              <rect x={-8} y={-75} width={16} height={75} rx={5} fill={rb} opacity={0.9} />
              <path d={`M-8 -70 L8 -70 M-8 -14 L8 -14`} stroke="#ffffff" strokeOpacity={0.35} strokeWidth={1} />
              <g stroke="#b39455" strokeWidth={1.4} strokeLinecap="round">
                <line x1={30} y1={-58} x2={30} y2={-44} />
                <line x1={24} y1={-53} x2={36} y2={-53} />
              </g>
              <Blossom x={-32} y={-72} r={6.5} c1={fc1} c2="#f2e3c8" />
            </g>
          )}

          {/* holder — front parts */}
          {config.holder === "brass" && (
            <g>
              <path d={`M${cx - 94} 618 v12 a94 14 0 0 0 188 0 v-12`} fill={`url(#${gid}-brass)`} />
              <ellipse cx={cx} cy={630} rx={94} ry={14} fill="none" stroke="#8f7440" strokeOpacity={0.4} strokeWidth={1} />
            </g>
          )}
          {config.holder === "ceramic" && (
            <g>
              <rect x={cx - 80} y={566} width={160} height={56} rx={12} fill={`url(#${gid}-ceramic)`} stroke="#d5c9ad" strokeWidth={1} />
              <path d={`M${cx - 80} 566 a80 12 0 0 0 160 0`} fill="#f7f0df" stroke="#d5c9ad" strokeWidth={1} />
              <rect x={cx - 62} y={580} width={8} height={30} rx={4} fill="#ffffff" opacity={0.4} />
            </g>
          )}
          {config.holder === "glass" && (
            <g>
              <rect x={cx - 74} y={490} width={148} height={132} rx={15} fill="#ffffff" opacity={0.16} />
              <rect x={cx - 74} y={490} width={148} height={132} rx={15} fill="none" stroke="#d3c8a6" strokeWidth={1.6} opacity={0.9} />
              <ellipse cx={cx} cy={490} rx={74} ry={10} fill="#ffffff" opacity={0.22} />
              <ellipse cx={cx} cy={490} rx={74} ry={10} fill="none" stroke="#d3c8a6" strokeWidth={1.4} />
              <ellipse cx={cx} cy={622} rx={74} ry={9} fill="#e9dfc4" opacity={0.55} />
              <rect x={cx - 60} y={504} width={7} height={104} rx={3.5} fill="#ffffff" opacity={0.5} />
            </g>
          )}

          {/* floating motes of light */}
          {lit && (
            <g fill="#d8b96e">
              <circle cx={cx - 60} cy={top - 46} r={1.6} opacity={0.7} />
              <circle cx={cx + 70} cy={top - 20} r={1.3} opacity={0.55} />
              <circle cx={cx + 44} cy={top - 70} r={1.8} opacity={0.5} />
              <circle cx={cx - 34} cy={top - 90} r={1.2} opacity={0.6} />
            </g>
          )}
        </g>
      </svg>

      {interactive && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLit((v) => !v)}
            aria-pressed={lit}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
              lit ? "border-gold bg-gold text-ivory shadow-soft" : "border-gold-soft bg-ivory/85 text-gold hover:bg-white"
            }`}
            title={lit ? "Extinguish the flame" : "Light the candle"}
          >
            <FlameIcon className="h-4.5 w-4.5" />
          </button>
          <div className="flex items-center gap-1 rounded-full border border-gold-soft bg-ivory/85 p-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.8, +(z - 0.15).toFixed(2)))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold-pale"
              aria-label="Zoom out"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M5 12h14" /></svg>
            </button>
            <span className="w-10 text-center text-[11px] font-semibold tracking-wide text-ink-soft">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.15).toFixed(2)))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold-pale"
              aria-label="Zoom in"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
