import { useEffect, useState, useContext, createContext, useMemo} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext(null);

export const useDarkTheme = () => useContext(ThemeContext);

export function DarkThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);
  
  const contextValue = { isDark, toggleTheme };

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
        },
      }),
    [isDark]
  );


  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}