// Create LanguageContext
// Provide translations for "welcome", "goodbye", "hello"
// Create a button to switch languages
// Display translated text in multiple components

import { createContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({children}) {
    const [mode, setmode] = useState('English')
    const [translations, setTranslations] = useState(['Welcome', 'Goodbye', 'Hello'].join(' '));

    const changeTranslation = () => {
        if (mode === 'English') {
            setTranslations(['bienvenido', 'adiós', 'hola'].join(" "))
            setmode(prev => prev === 'English' ? 'Spanish': 'English')
        } else {
            setTranslations(['Welcome', 'Goodbye', 'Hello'].join(' '))
            setmode(prev => prev === 'English' ? 'Spanish': 'English')
        }
    }

    const value = {mode, translations, changeTranslation};

    return(
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext;

// export function LanguageProvider({children}) {
//     const [mode, setmode] = useState('English')
    
//     const allTranslations = {
//         English: 'Welcome Goodbye Hello',
//         Spanish: 'Bienvenido Adiós Hola'
//     }

//     const changeTranslation = () => {
//         setmode(prev => prev === 'English' ? 'Spanish' : 'English')
//     }

//     const value = {
//         mode, 
//         translations: allTranslations[mode], 
//         changeTranslation
//     };

//     return(
//         <LanguageContext.Provider value={value}>
//             {children}
//         </LanguageContext.Provider>
//     )
// }