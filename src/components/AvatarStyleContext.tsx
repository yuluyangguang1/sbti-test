import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type AvatarStyle } from '../data';

interface AvatarStyleContextType {
  style: AvatarStyle;
  toggle: () => void;
  setStyle: (style: AvatarStyle) => void;
}

const AvatarStyleContext = createContext<AvatarStyleContextType>({
  style: 'remastered',
  toggle: () => {},
  setStyle: () => {},
});

export function AvatarStyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyleState] = useState<AvatarStyle>(() => {
    // 从 localStorage 恢复
    const saved = localStorage.getItem('sbti-avatar-style');
    return (saved === 'original' ? 'original' : 'remastered') as AvatarStyle;
  });

  const setStyle = useCallback((newStyle: AvatarStyle) => {
    setStyleState(newStyle);
    localStorage.setItem('sbti-avatar-style', newStyle);
  }, []);

  const toggle = useCallback(() => {
    setStyleState(prev => {
      const next = prev === 'remastered' ? 'original' : 'remastered';
      localStorage.setItem('sbti-avatar-style', next);
      return next;
    });
  }, []);

  return (
    <AvatarStyleContext.Provider value={{ style, toggle, setStyle }}>
      {children}
    </AvatarStyleContext.Provider>
  );
}

export function useAvatarStyle() {
  return useContext(AvatarStyleContext);
}
