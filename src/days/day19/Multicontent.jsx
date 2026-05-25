// Exercise 1: Multi-Context App
// Create an app with 3 contexts:

// AuthContext: Login/logout, current user
// ThemeContext: Light/dark mode
// LanguageContext: English/Spanish

// Build a navbar that displays user name, theme toggle, and language selector.

import { AuthComponent } from './contexts';
import { ThemeProvider } from './contexts';
import { LangProvider } from './contexts';
import Navbar from './Navbar';

export default function Multicontent() {
    return (
        <AuthComponent>
            <ThemeProvider>
                <LangProvider>
                    <Navbar />
                </LangProvider>
            </ThemeProvider>
        </AuthComponent>
    )
}