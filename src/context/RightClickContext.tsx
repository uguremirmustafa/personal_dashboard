import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface ContextMenu {
  isOpen: boolean;
  x: number;
  y: number;
  children?: ReactNode;
}
const defaultContextMenu: ContextMenu = {
  isOpen: false,
  x: 0,
  y: 0,
};

interface InitialValues {
  setCtxMenu: React.Dispatch<React.SetStateAction<ContextMenu>>;
  ctxMenu: ContextMenu;
  close: () => void;
}

const initialValues: InitialValues = {
  ctxMenu: defaultContextMenu,
  setCtxMenu: () => {},
  close: () => {},
};

const Context = createContext<InitialValues>(initialValues);

interface IProps {
  children: ReactNode;
}

export const RightClickContext = (props: IProps) => {
  const { children } = props;
  const [ctxMenu, setCtxMenu] = useState<ContextMenu>(defaultContextMenu);
  const close = () => {
    setCtxMenu(defaultContextMenu);
  };

  const contextValue = useMemo(
    () => ({
      setCtxMenu,
      ctxMenu,
      close,
    }),
    [ctxMenu, close, setCtxMenu]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useRightClick = () => {
  const context = useContext(Context);

  return context;
};
