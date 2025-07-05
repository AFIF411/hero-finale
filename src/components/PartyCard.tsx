import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import DateSelector from "./DateSelector";
import LocationSelector from "./LocationSelector";
import Cart from "./Cart";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface PartyCardProps {
  partyType: keyof typeof partyProducts;
  onBack: () => void;
  onCartOpen: () => void;
  isCartOpen: boolean;
  onCartClose: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // emoji or /images/...
  category: keyof typeof productOptions;
}

interface ProductOptions {
  sizes: string[];
  colors: string[];
  tastes: string[];
}

/* ------------------------------------------------------------------ */
/* Données produits                                                    */
/* ------------------------------------------------------------------ */

const partyProducts: Record<string, Product[]> = {
  soutenance: [
    {
      id: 1,
      name: "Décoration académique 1",
      price: 1500,
      image: "/images/soutenance/deco/4b4214505d2d2bf2ebcbdd2907ae7a44.jpg",
      category: "decoration",
    },
    {
      id: 2,
      name: "Décoration académique 2",
      price: 2000,
      image: "/images/soutenance/deco/4e6a834445adc36f8aabb61632d1a2e2.jpg",
      category: "decoration",
    },
    {
      id: 3,
      name: "Décoration académique 3",
      price: 2500,
      image: "/images/soutenance/deco/dca8e2cab02978309acca6d4acf21ebe.jpg",
      category: "decoration",
    },
    {
      id: 4,
      name: "Décoration académique 4",
      price: 3500,
      image: "/images/soutenance/deco/eaffd183cfc42e15dc7d32361ed1ba9a.jpg",
      category: "decoration",
    },

    {
      id: 5,
      name: "Gâteau de diplôme",
      price: 80,
      image: "/images/soutenance/menu/0.jpg",
      category: "menu",
    },
    {
      id: 6,
      name: "Gâteau de diplôme",
      price: 80,
      image: "/images/soutenance/menu/0c1c0dec7025d3bf558bb5fb0ccec079.jpg",
      category: "menu",
    },
    {
      id: 7,
      name: "Gâteau de diplôme",
      price: 80,
      image: "/images/soutenance/menu/1e41345b5d83703fd85c7a5053d57948.jpg",
      category: "menu",
    },
    {
      id: 8,
      name: "Gâteau de diplôme",
      price: 80,
      image: "/images/soutenance/menu/1ea9032fcbaacb00f98888b6efe17232.jpg",
      category: "menu",
    },
    {
      id: 9,
      name: "Gâteau de diplôme",
      price: 80,
      image: "/images/soutenance/menu/2de6e3f27e8cb73af1b6b398f8616014.jpg",
      category: "menu",
    },
    {
      id: 10,
      name: "Gâteau de diplôme",
      price: 80,
      image: "/images/soutenance/menu/093ae166279431dfc6a8f645023a49a2.jpg",
      category: "menu",
    },
    {
      id: 11,
      name: "Gâteau de diplôme",
      price: 80,
      image: "/images/soutenance/menu/8081078f5be1b048598185aceaddafee.jpg",
      category: "menu",
    },
    {
      id: 12,
      name: "Photographe professionnel",
      price: 300,
      image: "📸",
      category: "photographe",
    },
    {
      id: 13,
      name: "Cadeaux personnalisés",
      price: 45,
      image: "/images/soutenance/cadeaux/4afdb08687421e8dd0b2699f0d65b89d.jpg",
      category: "cadeaux",
    },
    {
      id: 14,
      name: "Cadeaux personnalisés",
      price: 45,
      image: "/images/soutenance/cadeaux/8508bfe3848ae2bae0a0e0df72d26269.jpg",
      category: "cadeaux",
    },
    {
      id: 15,
      name: "Cadeaux personnalisés",
      price: 45,
      image: "/images/soutenance/cadeaux/cf79fe950b6b7e5231fc1706136e935c.jpg",
      category: "cadeaux",
    },
    {
      id: 16,
      name: "Invitations élégantes",
      price: 25,
      image: "/images/soutenance/invitation/9a12220b342423643fe927bdef7f2d1e.jpg",
      category: "invitations",
    },
    {
      id: 18,
      name: "Invitations élégantes",
      price: 25,
      image: "/images/soutenance/invitation/d2f4eb7462669776e83070c8d2153692.jpg",
      category: "invitations",
    },
  ],

  nationale: [
    {
      id: 19,
      name: "Drapeaux et bannières",
      price: 120,
      image: "/images/nationale/deco/imge8.jpg",
      category: "decoration",
    },
    {
      id: 20,
      name: "Drapeaux et bannières",
      price: 120,
      image: "/images/nationale/deco/img8.jpg",
      category: "decoration",
    },
    {
      id: 21,
      name: "Drapeaux et bannières",
      price: 120,
      image: "/images/nationale/deco/img9.jpg",
      category: "decoration",
    },
    {
      id: 22,
      name: "Drapeaux et bannières",
      price: 120,
      image: "/images/nationale/deco/img10.jpg",
      category: "decoration",
    },
    {
      id: 23,
      name: "Drapeaux et bannières",
      price: 120,
      image: "/images/nationale/deco/img15.jpg",
      category: "decoration",
    },
    {
      id: 24,
      name: "Drapeaux et bannières",
      price: 120,
      image: "/images/nationale/deco/img16.jpg",
      category: "decoration",
    },
    {
      id: 25,
      name: "Drapeaux et bannières",
      price: 120,
      image: "/images/nationale/deco/img17.jpg",
      category: "decoration",
    },
    {
      id: 26,
      name: "Menu patriotique",
      price: 95,
      image: "/images/nationale/menu/img6.jpg",
      category: "menu",
    },
    {
      id: 27,
      name: "Menu patriotique",
      price: 95,
      image: "/images/nationale/menu/img7.jpg",
      category: "menu",
    },
    {
      id: 28,
      name: "Menu patriotique",
      price: 95,
      image: "/images/nationale/menu/img10.jpg",
      category: "menu",
    },
    {
      id: 29,
      name: "Menu patriotique",
      price: 95,
      image: "/images/nationale/menu/img11.jpg",
      category: "menu",
    },
    {
      id: 30,
      name: "Menu patriotique",
      price: 95,
      image: "/images/nationale/menu/img13.jpg",
      category: "menu",
    },
    {
      id: 31,
      name: "Menu patriotique",
      price: 95,
      image: "/images/nationale/menu/img14.jpg",
      category: "menu",
    },

    {
      id: 32,
      name: "Photographe événementiel",
      price: 280,
      image: "📸",
      category: "photographe",
    },
    {
      id: 33,
      name: "Invitations officielles",
      price: 30,
      image: "💌",
      category: "invitations",
    },
  ],

  religieuse: [
    {
      id: 34,
      name: "Décoration spirituelle",
      price: 100,
      image: "/images/religieuse/deco/img6.jpg",
      category: "decoration",
    },
    {
      id: 35,
      name: "Repas traditionnel",
      price: 110,
      image: "/images/religieuse/menu/img4.jpg",
      category: "menu",
    },
    {
      id: 36,
      name: "Repas traditionnel",
      price: 110,
      image: "/images/religieuse/menu/img5.jpg",
      category: "menu",
    },
    {
      id: 16,
      name: "Photographe cérémoniel",
      price: 250,
      image: "📸",
      category: "photographe",
    },
    {
      id: 17,
      name: "Cadeaux bénis",
      price: 40,
      image: "🎁",
      category: "cadeaux",
    },
    {
      id: 18,
      name: "Invitations sacrées",
      price: 28,
      image: "/images/religieuse/invitation/img5.jpg",
      category: "invitations",
    },
  ],

  scientifique: [
    {
      id: 19,
      name: "Décoration laboratoire",
      price: 180,
      image: "/images/scientifique/programme/img2.jpg",
      category: "decoration",
    },
    {
      id: 19,
      name: "Décoration laboratoire",
      price: 180,
      image: "/images/scientifique/programme/img2.jpg",
      category: "decoration",
    },
    {
      id: 20,
      name: "Menu moléculaire",
      price: 140,
      image: "🍴",
      category: "menu",
    },
    {
      id: 21,
      name: "Photographe scientifique",
      price: 320,
      image: "📸",
      category: "photographe",
    },
    {
      id: 22,
      name: "Gadgets scientifiques",
      price: 55,
      image: "🎁",
      category: "cadeaux",
    },
    {
      id: 23,
      name: "Invitations high-tech",
      price: 35,
      image: "/images/scientifique/invitation/img1.jpg",
      category: "invitations",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Options                                                             */
/* ------------------------------------------------------------------ */

const productOptions: Record<string, ProductOptions> = {
  decoration: {
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    colors: ["Red", "Blue", "Green", "Yellow", "Pink", "Violet", "Orange"],
    tastes: [],
  },
  menu: {
    sizes: ["Individual", "For 5 ppl", "For 10 ppl", "For 20 ppl"],
    colors: [],
    tastes: ["Vanilla", "Chocolate", "Strawberry", "Lemon", "Caramel", "Red fruits"],
  },
  photographe: {
    sizes: ["2h", "4h", "6h", "Full day"],
    colors: [],
    tastes: [],
  },
  cadeaux: {
    sizes: ["Small", "Medium", "Large"],
    colors: ["Red", "Blue", "Green", "Yellow", "Pink", "Violet"],
    tastes: [],
  },
  invitations: {
    sizes: ["Pack 10", "Pack 25", "Pack 50", "Pack 100"],
    colors: ["White", "Cream", "Blue", "Green", "Pink"],
    tastes: [],
  },
};

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

const categories = [
  { id: "decoration", name: "Decoration", icon: "🎨" },
  { id: "menu", name: "Menu", icon: "🍽️" },
  { id: "photographe", name: "Photographer", icon: "📸" },
  { id: "cadeaux", name: "Gifts", icon: "🎁" },
  { id: "invitations", name: "Invitations", icon: "💌" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const PartyCard: React.FC<PartyCardProps> = ({
                                               partyType,
                                               onBack,
                                               onCartOpen,
                                               isCartOpen,
                                               onCartClose,
                                             }) => {
  /* ------------------------- états locaux ------------------------ */
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});
  const [selectedTastes, setSelectedTastes] = useState<Record<number, string>>({});

  /* ---------------------------- cart ----------------------------- */
  const { addToCart, getTotalItems } = useCart();

  /* ------------------------- produits ---------------------------- */
  const products = partyProducts[partyType] || [];

  const filteredProducts =
      selectedCategory === "all"
          ? products
          : products.filter((p) => p.category === selectedCategory);

  /* ---------------------- helpers internes ----------------------- */
  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      partyType,
      date: selectedDate,
      location: selectedLocation,
      size: selectedSizes[product.id],
      color: selectedColors[product.id],
      taste: selectedTastes[product.id],
    });
  };

  const titles: Record<string, string> = {
    soutenance: "Fête de Soutenance",
    nationale: "Fête Nationale",
    religieuse: "Fête Religieuse",
    scientifique: "Fête Scientifique",
  };

  const colors: Record<string, string> = {
    soutenance: "from-orange-400 to-orange-600",
    nationale: "from-violet-400 to-violet-600",
    religieuse: "from-green-400 to-green-600",
    scientifique: "from-blue-400 to-blue-600",
  };

  const totalItems = getTotalItems();

  /* ------------------------------ UI ----------------------------- */
  return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* -------------- Header -------------- */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${
                      colors[partyType] ?? "from-gray-400 to-gray-600"
                  }`}
              >
                <span className="text-lg text-white">🎉</span>
              </div>

              <h1 className="bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
                {titles[partyType] ?? "Fête"}
              </h1>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={onCartOpen}
                className="relative"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Panier
              {totalItems > 0 && (
                  <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
              )}
            </Button>
          </div>
        </header>

        {/* -------------- Contenu principal -------------- */}
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {/* Date & Lieu */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Date */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <span>Date de l'événement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DateSelector onDateSelect={setSelectedDate} />
                </CardContent>
              </Card>

              {/* Lieu */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-violet-500" />
                    <span>Lieu de la fête</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationSelector onLocationSelect={setSelectedLocation} />
                </CardContent>
              </Card>
            </div>

            {/* Filtres catégories */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">Catégories</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    className="rounded-full"
                >
                  Tout voir
                </Button>

                {categories.map((cat) => (
                    <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="rounded-full"
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </Button>
                ))}
              </div>
            </div>

            {/* Grille produits */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredProducts.map((product) => {
                const options = productOptions[product.category];
                const qty = quantities[product.id] || 0;

                return (
                    <Card
                        key={product.id}
                        className="transition-shadow duration-300 hover:shadow-lg"
                    >
                      <CardContent className="p-6">
                        {/* Visuel produit */}
                        <div className="mb-4 text-center">
                          {product.image.startsWith("/") ? (
                              <img
                                  src={import.meta.env.BASE_URL + product.image.slice(1)}
                                  alt={product.name}
                                  className="mb-3 h-40 w-full rounded-md object-cover"
                              />
                          ) : (
                              <span className="mb-3 text-6xl">{product.image}</span>
                          )}

                          <h3 className="mb-2 text-xl font-semibold">
                            {product.name}
                          </h3>
                          <p className="mb-4 text-2xl font-bold text-green-600">
                            {product.price} DA
                          </p>
                        </div>

                        {/* Options produit */}
                        <div className="mb-4 space-y-3">
                          {/* Taille */}
                          {options.sizes.length > 0 && (
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Taille
                                </label>
                                <Select
                                    onValueChange={(v) =>
                                        setSelectedSizes((p) => ({ ...p, [product.id]: v }))
                                    }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir une taille" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {options.sizes.map((size) => (
                                        <SelectItem key={size} value={size}>
                                          {size}
                                        </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                          )}

                          {/* Couleur */}
                          {options.colors.length > 0 && (
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Couleur
                                </label>
                                <Select
                                    onValueChange={(v) =>
                                        setSelectedColors((p) => ({ ...p, [product.id]: v }))
                                    }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir une couleur" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {options.colors.map((color) => (
                                        <SelectItem key={color} value={color}>
                                          {color}
                                        </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                          )}

                          {/* Goût */}
                          {options.tastes.length > 0 && (
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Goût
                                </label>
                                <Select
                                    onValueChange={(v) =>
                                        setSelectedTastes((p) => ({ ...p, [product.id]: v }))
                                    }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir un goût" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {options.tastes.map((taste) => (
                                        <SelectItem key={taste} value={taste}>
                                          {taste}
                                        </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                          )}
                        </div>

                        {/* Gestion quantité + bouton panier */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(product.id, -1)}
                                disabled={qty <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[2rem] text-center font-semibold">
                          {qty}
                        </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(product.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                              onClick={() => handleAddToCart(product)}
                              disabled={qty === 0}
                              className="bg-gradient-to-r from-orange-500 to-violet-500 hover:opacity-90"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Ajouter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                );
              })}
            </div>
          </div>

          {/* Colonne récap */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">
                      {selectedDate.toLocaleDateString("fr-FR")}
                    </span>
                      </div>
                  )}

                  {selectedLocation && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-violet-500" />
                        <span className="text-sm">{selectedLocation}</span>
                      </div>
                  )}

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sélectionnez vos articles et ajoutez-les au panier pour
                      continuer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* -------------- Cart Sidebar -------------- */}
        <Cart isOpen={isCartOpen} onClose={onCartClose} />
      </div>
  );
};

export default PartyCard;
