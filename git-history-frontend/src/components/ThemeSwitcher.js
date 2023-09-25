import React, { useState } from 'react';

function ThemeSwitcher({ onToggleTheme }) {
    const [isDark, setIsDark] = useState(false); // By default, let's assume it's light theme

    const toggleTheme = () => {
        setIsDark(!isDark);
        onToggleTheme(isDark ? 'light' : 'dark');
    }

    return (
        <div className="theme-switcher">
            <button onClick={toggleTheme}>
                Switch to {isDark ? 'Light' : 'Dark'} Theme
            </button>
        </div>
    );
}

export default ThemeSwitcher;
