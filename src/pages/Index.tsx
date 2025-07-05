import { useState } from "react";
import { Calendar, MapPin, ShoppingCart, Users, GraduationCap, Flag, Church, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PartyCard from "@/components/PartyCard";
import Cart from "@/components/Cart";
import ContactSection from "@/components/ContactSection";
import { useCart } from "@/hooks/useCart";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [selectedPartyType, setSelectedPartyType] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, getTotalItems } = useCart();
  const { t, currentLanguage } = useLanguage();

  const partyTypes = [
    {
      id: "soutenance",
      title: t("party.soutenance.title"),
      description: t("party.soutenance.description"),
      icon: GraduationCap,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      id: "nationale",
      title: t("party.nationale.title"),
      description: t("party.nationale.description"),
      icon: Flag,
      color: "from-violet-400 to-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-950"
    },
    {
      id: "religieuse",
      title: t("party.religieuse.title"),
      description: t("party.religieuse.description"),
      icon: Church,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      id: "scientifique",
      title: t("party.scientifique.title"),
      description: t("party.scientifique.description"),
      icon: FlaskConical,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    }
  ];

  const handlePartySelect = (partyId: string) => {
    setSelectedPartyType(partyId);
  };

  const totalItems = getTotalItems();

  if (selectedPartyType) {
    return (
      <PartyCard 
        partyType={selectedPartyType} 
        onBack={() => setSelectedPartyType(null)}
        onCartOpen={() => setIsCartOpen(true)}
        isCartOpen={isCartOpen}
        onCartClose={() => setIsCartOpen(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-violet-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent">
                FêtePlan
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t("header.cart")}
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/admin'}
              >
                {t("header.admin")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-violet-600 to-green-600 bg-clip-text text-transparent">
            {t("home.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t("home.subtitle")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">{t("home.planning")}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 rounded-full px-4 py-2">
              <MapPin className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">{t("home.locations")}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 rounded-full px-4 py-2">
              <Users className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">{t("home.experience")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Party Types Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {partyTypes.map((party) => {
            const IconComponent = party.icon;
            return (
              <div
                key={party.id}
                className={`${party.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 cursor-pointer`}
                onClick={() => handlePartySelect(party.id)}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${party.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    {party.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {party.description}
                  </p>
                  
                  <Button 
                    className={`bg-gradient-to-r ${party.color} hover:opacity-90 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300`}
                  >
                    {t("party.start")}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>{t("footer.text")}</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
