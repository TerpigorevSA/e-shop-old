import React, { useLayoutEffect, useState, useRef } from 'react';

import useResizeObserver from '../../hooks/useResizeObserver';

type CropTextProps = {
  text: string;
  crop: boolean;
};

const INIT_TEXT = 'A';

const CropText = ({ text, crop }: CropTextProps) => {
  const lineHeight = useRef<number>(null);
  const element = useRef<HTMLDivElement>();
  const ind = useRef(0);
  const [calculated, setCalculated] = useState(false);
  const [croppedText, setCroppedText] = useState(INIT_TEXT);
  useLayoutEffect(() => {
    lineHeight.current = lineHeight.current ?? element.current.getBoundingClientRect()?.height;
  }, [text, crop]);

  useLayoutEffect(() => {
    if (calculated || !crop) {
      return;
    }
    const postfix = '...';
    const words = text.split(' ');
    if (ind.current >= words.length - 1) {
      setCalculated(true);
      setCroppedText(text);
    }
    if (lineHeight.current < element.current.getBoundingClientRect().height) {
      setCalculated(true);
      ind.current--;
      setCroppedText([words.slice(0, ind.current + 1).join(' '), postfix].join(''));
      return;
    }
    ind.current++;
    setCroppedText([words.slice(0, ind.current + 1).join(' '), ind.current < words.length - 1 ? postfix : ''].join(''));
  }, [text, croppedText, calculated, crop]);

  useResizeObserver(element, false, true, () => {
    setCroppedText(INIT_TEXT);
    setCalculated(false);
    ind.current = 0;
  });

  return <div ref={element}>{crop ? croppedText : text}</div>;
};

export default CropText;
