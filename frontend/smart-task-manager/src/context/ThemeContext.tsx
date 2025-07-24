import { createContext, useEffect, useState, type ReactNode } from "react";

//Type for context value
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

//Create the Context
export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
});

//Provider component wraps the app and controls the theme
export function ThemeProvider({ children }: { children: ReactNode }) {
    //Read saved theme from localStorage or default to light
    const [theme, setTheme] = useState<'light' | 'dark'>(
        () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    );

    //Toggle between light and dark themes
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); //save preferences
    };

    //Update <body> classes when theme changes
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}