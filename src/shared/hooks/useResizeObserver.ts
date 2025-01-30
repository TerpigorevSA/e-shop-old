import { useLayoutEffect } from 'react';

const useResizeObserver = <T extends HTMLElement>(
  element: React.RefObject<T>,
  observeHeight: boolean,
  observeWidth: boolean,
  onResize: () => void
) => {
  useLayoutEffect(() => {
    const prevWidth = element.current.clientWidth;
    const prevHeight = element.current.clientHeight;
    const observer = new ResizeObserver(([entry]) => {
      if (
        (observeWidth && prevWidth !== entry.contentRect.width) ||
        (observeHeight && prevHeight !== entry.contentRect.height)
      ) {
        onResize();
      }
    });
    const currentRef = element.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  });
};

export default useResizeObserver;
