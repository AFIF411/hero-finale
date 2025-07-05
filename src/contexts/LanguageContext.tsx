
import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  fr: {
    // Header
    'header.cart': 'Panier',
    'header.admin': 'Admin',
    
    // Home page
    'home.title': 'Planifiez votre fête parfaite',
    'home.subtitle': 'Organisez des événements mémorables avec notre plateforme intuitive et personnalisable',
    'home.planning': 'Planification facile',
    'home.locations': 'Lieux variés',
    'home.experience': 'Expérience personnalisée',
    
    // Party types
    'party.soutenance.title': 'Je planifie ma fête de soutenance',
    'party.soutenance.description': 'Célébrez votre réussite académique avec style',
    'party.nationale.title': 'Je planifie une fête nationale',
    'party.nationale.description': 'Organisez un événement patriotique mémorable',
    'party.religieuse.title': 'Fête religieuse',
    'party.religieuse.description': 'Préparez une célébration spirituelle authentique',
    'party.scientifique.title': 'Je planifie une fête scientifique',
    'party.scientifique.description': 'Créez un événement éducatif et ludique',
    'party.start': 'Commencer à planifier',
    
    // Footer
    'footer.text': '© 2024 FêtePlan. Créez des moments inoubliables.',
  },
  en: {
    // Header
    'header.cart': 'Cart',
    'header.admin': 'Admin',
    
    // Home page
    'home.title': 'Plan your perfect party',
    'home.subtitle': 'Organize memorable events with our intuitive and customizable platform',
    'home.planning': 'Easy planning',
    'home.locations': 'Various locations',
    'home.experience': 'Personalized experience',
    
    // Party types
    'party.soutenance.title': 'I plan my graduation party',
    'party.soutenance.description': 'Celebrate your academic success in style',
    'party.nationale.title': 'I plan a national party',
    'party.nationale.description': 'Organize a memorable patriotic event',
    'party.religieuse.title': 'Religious party',
    'party.religieuse.description': 'Prepare an authentic spiritual celebration',
    'party.scientifique.title': 'I plan a science party',
    'party.scientifique.description': 'Create an educational and fun event',
    'party.start': 'Start planning',
    
    // Footer
    'footer.text': '© 2024 FêtePlan. Create unforgettable moments.',
  },
  ar: {
    // Header
    'header.cart': 'السلة',
    'header.admin': 'المشرف',
    
    // Home page
    'home.title': 'خطط لحفلتك المثالية',
    'home.subtitle': 'نظم فعاليات لا تُنسى بمنصتنا البديهية والقابلة للتخصيص',
    'home.planning': 'تخطيط سهل',
    'home.locations': 'مواقع متنوعة',
    'home.experience': 'تجربة شخصية',
    
    // Party types
    'party.soutenance.title': 'أخطط لحفل التخرج',
    'party.soutenance.description': 'احتفل بنجاحك الأكاديمي بأناقة',
    'party.nationale.title': 'أخطط لحفل وطني',
    'party.nationale.description': 'نظم حدثاً وطنياً لا يُنسى',
    'party.religieuse.title': 'حفل ديني',
    'party.religieuse.description': 'حضر احتفالاً روحانياً أصيلاً',
    'party.scientifique.title': 'أخطط لحفل علمي',
    'party.scientifique.description': 'أنشئ حدثاً تعليمياً وممتعاً',
    'party.start': 'ابدأ التخطيط',
    
    // Footer
    'footer.text': '© 2024 FêtePlan. اصنع لحظات لا تُنسى.',
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
