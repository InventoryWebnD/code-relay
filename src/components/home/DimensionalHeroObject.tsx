"use client";

import { useState } from "react";

export default function DimensionalHeroObject() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center p-4 select-none cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 2.5D Isometric Canvas Frame */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Floor plane surface */}
        <div className="absolute inset-4 rounded-2xl border-2 border-[#160207] bg-[#380412] overflow-hidden shadow-hard-lg">
          {/* Subtle grid lines in warm ivory */}
          <div 
            className="w-full h-full opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(to right, #F6F0E8 1px, transparent 1px),
                linear-gradient(to bottom, #F6F0E8 1px, transparent 1px)
              `,
              backgroundSize: '28px 28px'
            }}
          />
        </div>

        {/* The 2.5D Dimensional Composition */}
        <div 
          className="relative z-10 w-[92%] h-[92%] transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0px) scale(1)'
          }}
        >
          <svg
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[14px_14px_0px_#160207]"
          >
            {/* GROUND SHADOW LAYER */}
            <g id="hard-shadows">
              <polygon
                points="110,360 250,430 390,360 390,380 250,450 110,380"
                fill="#160207"
                opacity="0.95"
              />
              <path
                d="M 140 260 L 260 330 L 380 260 L 400 280 L 260 360 L 140 290 Z"
                fill="#160207"
              />
            </g>

            {/* BASE DIMENSIONAL PLATFORM */}
            <g id="base-platform">
              <polygon
                points="100,340 250,420 250,436 100,356"
                fill="#2A040E"
                stroke="#160207"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <polygon
                points="250,420 400,340 400,356 250,436"
                fill="#1E030A"
                stroke="#160207"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <polygon
                points="250,260 400,340 250,420 100,340"
                fill="#4D0719"
                stroke="#160207"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <polyline
                points="140,340 250,398 360,340"
                stroke="#991B3D"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <polyline
                points="180,318 250,356 320,318"
                stroke="#4B5D86"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </g>

            {/* WEB2 DIMENSIONAL BLOCK */}
            <g id="web2-block" className="transition-transform duration-300">
              <polygon
                points="130,225 210,270 210,310 130,265"
                fill="#160207"
              />
              <polygon
                points="110,200 190,245 190,290 110,245"
                fill="#991B3D"
                stroke="#160207"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <polygon
                points="190,245 250,210 250,255 190,290"
                fill="#620821"
                stroke="#160207"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <polygon
                points="170,165 250,210 190,245 110,200"
                fill="#B82A4F"
                stroke="#160207"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <text x="135" y="248" fill="#F6F0E8" fontSize="13" fontWeight="800" fontFamily="sans-serif">
                WEB2
              </text>
              <line x1="125" y1="262" x2="175" y2="262" stroke="#F6F0E8" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="125" y1="272" x2="155" y2="272" stroke="#F6F0E8" strokeWidth="2" />
            </g>

            {/* WEB3 DIMENSIONAL BLOCK */}
            <g id="web3-block" className="transition-transform duration-300">
              <polygon
                points="270,225 350,180 350,230 270,275"
                fill="#160207"
              />
              <polygon
                points="250,210 330,165 330,215 250,260"
                fill="#4B5D86"
                stroke="#160207"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <polygon
                points="330,165 390,200 390,250 330,215"
                fill="#364464"
                stroke="#160207"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <polygon
                points="310,125 390,160 330,195 250,160"
                fill="#657AA8"
                stroke="#160207"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <text x="275" y="235" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">
                WEB3
              </text>
              <line x1="265" y1="248" x2="315" y2="220" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" />
            </g>

            {/* THE RELAY CONNECTOR / CENTRAL BATON */}
            <g id="relay-baton">
              <polygon
                points="210,160 290,160 310,230 230,230"
                fill="#160207"
                opacity="0.8"
              />
              <polygon
                points="220,130 280,130 280,210 220,210"
                fill="#F6F0E8"
                stroke="#160207"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <polygon
                points="280,130 300,115 300,195 280,210"
                fill="#E0D4C3"
                stroke="#160207"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <polygon
                points="220,130 240,115 300,115 280,130"
                fill="#FFFFFF"
                stroke="#160207"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Central Core Relay Chevrons */}
              <polygon
                points="240,150 260,170 240,190 250,190 270,170 250,150"
                fill="#991B3D"
                stroke="#160207"
                strokeWidth="1.5"
              />
              <polygon
                points="250,150 270,170 250,190 260,190 280,170 260,150"
                fill="#4B5D86"
                stroke="#160207"
                strokeWidth="1.5"
              />
            </g>

            {/* FLOATING 2.5D CUBES */}
            <g 
              id="floating-ivory-cube" 
              className="transition-transform duration-500 ease-out"
              style={{
                transform: isHovered ? 'translate(4px, -8px)' : 'translate(0px, 0px)'
              }}
            >
              <polygon points="380,110 405,95 405,120 380,135" fill="#160207" />
              <polygon points="360,95 385,110 385,135 360,120" fill="#F6F0E8" stroke="#160207" strokeWidth="2.5" />
              <polygon points="385,110 410,95 410,120 385,135" fill="#E0D4C3" stroke="#160207" strokeWidth="2.5" />
              <polygon points="360,95 385,80 410,95 385,110" fill="#FFFFFF" stroke="#160207" strokeWidth="2.5" />
            </g>

            <g 
              id="floating-slate-cube" 
              className="transition-transform duration-500 ease-out"
              style={{
                transform: isHovered ? 'translate(-5px, 6px)' : 'translate(0px, 0px)'
              }}
            >
              <polygon points="105,305 130,290 130,315 105,330" fill="#160207" />
              <polygon points="90,290 115,305 115,330 90,315" fill="#4B5D86" stroke="#160207" strokeWidth="2.5" />
              <polygon points="115,305 140,290 140,315 115,330" fill="#364464" stroke="#160207" strokeWidth="2.5" />
              <polygon points="90,290 115,275 140,290 115,305" fill="#657AA8" stroke="#160207" strokeWidth="2.5" />
            </g>

            <g 
              id="floating-burgundy-prism" 
              className="transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'translate(0px, -12px)' : 'translate(0px, 0px)'
              }}
            >
              <polygon points="235,60 250,70 250,85 235,75" fill="#991B3D" stroke="#160207" strokeWidth="2" />
              <polygon points="250,70 265,60 265,75 250,85" fill="#620821" stroke="#160207" strokeWidth="2" />
              <polygon points="235,60 250,50 265,60 250,70" fill="#B82A4F" stroke="#160207" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Physical Float Pill at bottom without node dots */}
        <div className="absolute -bottom-3 z-20 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-4 py-1.5 shadow-hard-sm">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#620821]">
            Dual Track Relay Architecture
          </span>
        </div>

      </div>
    </div>
  );
}
