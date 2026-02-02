import { useRef, useEffect, useState, ReactNode, createContext, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollStackContextType {
  totalItems: number;
  registerItem: () => number;
}

const ScrollStackContext = createContext<ScrollStackContextType | null>(null);

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
}

export const ScrollStackItem = ({ children, className = '' }: ScrollStackItemProps) => {
  const context = useContext(ScrollStackContext);
  const [index, setIndex] = useState(-1);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context) {
      const idx = context.registerItem();
      setIndex(idx);
    }
  }, [context]);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  return (
    <motion.div
      ref={itemRef}
      style={{ scale, opacity, y }}
      className={`glass-strong rounded-2xl p-8 transition-all duration-300 hover:border-primary/50 ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  gap?: number;
}

const ScrollStack = ({ children, className = '', gap = 24 }: ScrollStackProps) => {
  const indexRef = useRef(0);
  const [totalItems, setTotalItems] = useState(0);

  const registerItem = () => {
    const currentIndex = indexRef.current;
    indexRef.current += 1;
    setTotalItems(prev => Math.max(prev, indexRef.current));
    return currentIndex;
  };

  return (
    <ScrollStackContext.Provider value={{ totalItems, registerItem }}>
      <div 
        className={`flex flex-col ${className}`}
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
    </ScrollStackContext.Provider>
  );
};

export default ScrollStack;
