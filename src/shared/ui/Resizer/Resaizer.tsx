import React, { FC, useRef, useState } from 'react';
import cn from 'clsx';
import style from './Resizer.module.css';
import useResizeObserver from '../../hooks/useResizeObserver';

export type Size = { width: number; height: number };

export type ResizerProps = {
  className?: string;
  initialWidth: number;
  initialHeight: number;
  children: (size: Size) => React.ReactNode;
};

const MIN_SIZE = 32;

export const Resizer: FC<ResizerProps> = ({ className, children, initialWidth, initialHeight }) => {
  const root = useRef<HTMLDivElement>();

  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

  const safeSetSizes = (_size: Size) => {
    setSize({
      width: _size.width < MIN_SIZE ? MIN_SIZE : Math.round(_size.width),
      height: _size.height < MIN_SIZE ? MIN_SIZE : Math.round(_size.height),
    });
  };

  useResizeObserver(root, true, true, () => {
    const width = root.current.clientWidth;
    const height = root.current.clientHeight;
    safeSetSizes({ height, width });
  });

  return (
    <div ref={root} className={cn(style.root, className)}>
      <div className={style.wrapper}>{children(size)}</div>
    </div>
  );
};
