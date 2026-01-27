import React from 'react';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
  label?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '', label = '' }) => {
  const papers = [...items];

  const folderBackColor = darkenColor(color, 0.08);

  // Generate paper colors with varying shades
  const getPaperColor = (index: number, total: number) => {
    const darkening = 0.1 - (index / total) * 0.1;
    return darkenColor('#ffffff', Math.max(0, darkening));
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  // Calculate size based on index position (stacked effect)
  const getSizeStyles = (index: number, total: number) => {
    const baseWidth = 70 + (index / Math.max(total, 1)) * 20;
    const baseHeight = 60 + (index / Math.max(total, 1)) * 20;
    return {
      width: `${baseWidth}%`,
      height: `${baseHeight}%`
    };
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className="group relative transition-all duration-200 ease-in cursor-pointer hover:-translate-y-2"
        style={folderStyle}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {papers.map((item, i) => {
            const sizeStyles = getSizeStyles(i, papers.length);

            return (
              <div
                key={i}
                className="absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0"
                style={{
                  ...sizeStyles,
                  backgroundColor: getPaperColor(i, papers.length),
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className="absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out group-hover:[transform:skew(15deg)_scaleY(0.6)]"
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px'
            }}
          ></div>
          <div
            className="absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out group-hover:[transform:skew(-15deg)_scaleY(0.6)] flex items-center justify-center"
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px'
            }}
          >
            {label && (
              <span
                className="text-zinc-600 font-bold text-center px-2 leading-tight transition-opacity duration-300 group-hover:opacity-0"
                style={{
                  fontSize: '10px',
                  maxWidth: '95%',
                  wordBreak: 'keep-all',
                  overflowWrap: 'break-word',
                  hyphens: 'none'
                }}
              >
                {label}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
