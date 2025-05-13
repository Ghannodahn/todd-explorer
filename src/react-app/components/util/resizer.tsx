import React, { useEffect, useRef } from 'react';

interface ResizerProps {
  initialWidth: number;
  minWidth?: number;
  maxWidth?: number;
  onWidthChange: (newWidth: number) => void;
  containerRef: React.RefObject<HTMLElement>;
  navWidth?: number;
  direction?: 'horizontal' | 'vertical';
}

const Resizer: React.FC<ResizerProps> = ({
  initialWidth,
  minWidth = 10,
  maxWidth,
  onWidthChange,
  containerRef,
  navWidth = 0,
  direction = 'horizontal',
}) => {
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef<number>(0);
  const dragStartWidthRef = useRef<number>(0);
  const currentWidthRef = useRef<number>(initialWidth);
  const resizerRef = useRef<HTMLDivElement>(null);

  // Update ref when prop changes
  useEffect(() => {
    currentWidthRef.current = initialWidth;
  }, [initialWidth]);

  useEffect(() => {
    const resizer = resizerRef.current;
    if (!resizer) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      dragStartPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
      dragStartWidthRef.current = currentWidthRef.current;
      
      // Visual feedback without state update
      resizer.style.background = '#718096';
      document.body.style.cursor = direction === 'horizontal' ? 'ew-resize' : 'ns-resize';
      document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      
      // Direct calculation without state updates
      const containerSize = direction === 'horizontal' 
        ? containerRef.current.offsetWidth 
        : containerRef.current.offsetHeight;
      
      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
      const deltaPos = dragStartPosRef.current - currentPos;
      
      const calculatedMaxWidth = maxWidth || (containerSize - navWidth - 20);
      
      // Update width ref directly
      currentWidthRef.current = Math.max(
        minWidth, 
        Math.min(calculatedMaxWidth, dragStartWidthRef.current + deltaPos)
      );
      
      // Only update parent component once per animation frame for smooth performance
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          // Update the sibling element directly during drag for immediate visual feedback
          if (resizer.nextElementSibling) {
            (resizer.nextElementSibling as HTMLElement).style.width = `${currentWidthRef.current}px`;
          }
        });
      }
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      
      isDraggingRef.current = false;
      resizer.style.background = '#ddd';
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Only update React state at the end of the drag operation
      onWidthChange(currentWidthRef.current);
    };

    const handleDoubleClick = (e: MouseEvent) => {
      e.preventDefault();
      
      const newWidth = currentWidthRef.current < 50 ? 300 : minWidth;
      currentWidthRef.current = newWidth;
      onWidthChange(newWidth);
    };

    // Add event listeners directly to the resize handle
    resizer.addEventListener('mousedown', handleMouseDown);
    resizer.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown);
      resizer.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [direction, minWidth, maxWidth, navWidth, onWidthChange, containerRef]);

  return (
    <div
      ref={resizerRef}
      className="resize-handle"
      style={{
        width: direction === 'horizontal' ? '6px' : '100%',
        height: direction === 'horizontal' ? '100%' : '6px',
        cursor: direction === 'horizontal' ? 'ew-resize' : 'ns-resize',
        background: '#ddd',
        zIndex: 10,
        transition: 'background-color 0.2s'
      }}
    />
  );
};

export default Resizer;