
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
}

const locations = [
  { id: "ft",     name: "Faculté de Technologie",                                           address: "Hay Salem, Route Nationale N°19, Chlef" },
  { id: "fsei",   name: "Faculté des Sciences Exactes et Informatique",                     address: "Pôle Univ. Ouled Fares, BP 78C, Chlef 02180" },
  { id: "fsnv",   name: "Faculté des Sciences de la Nature et de la Vie",                   address: "Pôle Univ. Ouled Fares, BP 78C, Chlef 02180" },
  { id: "fgca",   name: "Faculté de Génie Civil et d'Architecture",                         address: "Pôle Univ. Ouled Fares, BP 78C, Chlef 02180" },
  { id: "fla",    name: "Faculté des Lettres et des Arts",                                  address: "Pôle Univ. Ouled Fares, BP 78C, Chlef 02180" },
  { id: "fle",    name: "Faculté des Langues Étrangères",                                   address: "Pôle Univ. Ouled Fares, BP 78C, Chlef 02180" },
  { id: "fshs",   name: "Faculté des Sciences Humaines et Sociales",                        address: "Pôle Univ. Ouled Fares, BP 78C, Chlef 02180" },
  { id: "fdsp",   name: "Faculté de Droit et Sciences Politiques",                          address: "Campus Centre-ville, Chlef" },
  { id: "fsecsg", name: "Faculté des Sciences Économiques, Commerciales et de Gestion",     address: "Campus Centre-ville, Chlef" },
  { id: "ieps",   name: "Institut d’Éducation Physique et Sportive",                        address: "Pôle Univ. Ouled Fares, BP 78C, Chlef 02180" },

  /* DÉPARTEMENTS – Faculté de Technologie */
  { id: "ft-genie-procedes",      name: "Département de Génie des Procédés",   address: "Fac. Technologie, Hay Salem, Chlef" },
  { id: "ft-genie-mecanique",     name: "Département de Génie Mécanique",      address: "Fac. Technologie, Hay Salem, Chlef" },
  { id: "ft-electrotechnique",    name: "Département d'Électrotechnique",      address: "Fac. Technologie, Hay Salem, Chlef" },
  { id: "ft-electronique",        name: "Département d'Électronique",          address: "Fac. Technologie, Hay Salem, Chlef" },
  { id: "ft-tronc-commun",        name: "Département Tronc Commun (ST)",       address: "Fac. Technologie, Hay Salem, Chlef" },

  /* DÉPARTEMENTS – Sciences Exactes & Info */
  { id: "fsei-tronc-commun",      name: "Tronc Commun (SEI)",                  address: "FSEI, Ouled Fares, Chlef" },
  { id: "fsei-mathematiques",     name: "Mathématiques",                       address: "FSEI, Ouled Fares, Chlef" },
  { id: "fsei-informatique",      name: "Informatique",                        address: "FSEI, Ouled Fares, Chlef" },
  { id: "fsei-physique",          name: "Physique",                            address: "FSEI, Ouled Fares, Chlef" },
  { id: "fsei-chimie",            name: "Chimie",                              address: "FSEI, Ouled Fares, Chlef" },

  /* DÉPARTEMENTS – SNV */
  { id: "fsnv-tronc-commun",      name: "Tronc Commun (SNV)",                  address: "FSNV, Ouled Fares, Chlef" },
  { id: "fsnv-eedd",              name: "Eau, Environnement & Dév. Durable",   address: "FSNV, Ouled Fares, Chlef" },
  { id: "fsnv-alimentation",      name: "Sciences Alimentaires & Nutrition",   address: "FSNV, Ouled Fares, Chlef" },
  { id: "fsnv-agronomie",         name: "Sciences Agronomiques",               address: "FSNV, Ouled Fares, Chlef" },
  { id: "fsnv-biologie",          name: "Biologie",                            address: "FSNV, Ouled Fares, Chlef" },
  { id: "fsnv-biotechnologie",    name: "Biotechnologie",                      address: "FSNV, Ouled Fares, Chlef" },

  /* DÉPARTEMENTS – FGCA */
  { id: "fgca-genie-civil",       name: "Génie Civil",                         address: "FGCA, Ouled Fares, Chlef" },
  { id: "fgca-hydraulique",       name: "Hydraulique",                         address: "FGCA, Ouled Fares, Chlef" },
  { id: "fgca-architecture",      name: "Architecture",                        address: "FGCA, Ouled Fares, Chlef" },

  /* DÉPARTEMENTS – FSECSG */
  { id: "fsecsg-finance",         name: "Sciences Financière & Comptabilité",  address: "FSECSG, Centre-ville, Chlef" },
  { id: "fsecsg-commerciales",    name: "Sciences Commerciales",               address: "FSECSG, Centre-ville, Chlef" },
  { id: "fsecsg-economiques",     name: "Sciences Économiques",                address: "FSECSG, Centre-ville, Chlef" },
  { id: "fsecsg-gestion",         name: "Sciences de Gestion",                 address: "FSECSG, Centre-ville, Chlef" },

  /* DÉPARTEMENTS – FSHS */
  { id: "fshs-sc-humaines",       name: "Sciences Humaines",                   address: "FSHS, Ouled Fares, Chlef" },
  { id: "fshs-sc-sociales",       name: "Sciences Sociales",                   address: "FSHS, Ouled Fares, Chlef" },

  /* DÉPARTEMENTS – FLE */
  { id: "fle-francais",           name: "Langue Française",                    address: "FLE, Ouled Fares, Chlef" },
  { id: "fle-anglais",            name: "Langue Anglaise",                     address: "FLE, Ouled Fares, Chlef" },

  /* DÉPARTEMENTS – FLA */
  { id: "fla-litterature-arabe",  name: "Littérature Arabe",                   address: "FLA, Ouled Fares, Chlef" },
  { id: "fla-langue-arabe",       name: "Langue Arabe",                        address: "FLA, Ouled Fares, Chlef" },

  /* DÉPARTEMENTS – FDSP */
  { id: "fdsp-sc-politiques",     name: "Sciences Politiques",                 address: "FDSP, Centre-ville, Chlef" },
  { id: "fdsp-droit-public",      name: "Droit Public",                        address: "FDSP, Centre-ville, Chlef" },
  { id: "fdsp-droit-prive",       name: "Droit Privé",                         address: "FDSP, Centre-ville, Chlef" },

  /* DÉPARTEMENTS – IEPS */
  { id: "ieps-tronc-commun",      name: "Tronc Commun (EPS)",                  address: "IEPS, Ouled Fares, Chlef" },
  { id: "ieps-eps",               name: "Éducation Physique & Sportive",       address: "IEPS, Ouled Fares, Chlef" },
  { id: "ieps-management-sport",  name: "Management du Sport",                 address: "IEPS, Ouled Fares, Chlef" },
  { id: "ieps-entrainement",      name: "Entraînement Sportif",                address: "IEPS, Ouled Fares, Chlef" }
];

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleLocationChange = (locationId: string) => {
    setSelectedLocation(locationId);
    const location = locations.find(loc => loc.id === locationId);
    onLocationSelect(location?.name || "");
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={handleLocationChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir un lieu" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-violet-500" />
                <div>
                  <div className="font-medium">{location.name}</div>
                  <div className="text-xs text-gray-500">{location.address}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedLocation && (
        <div className="bg-violet-50 dark:bg-violet-950 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-violet-500" />
            <div className="text-sm">
              <p className="font-medium">
                {locations.find(loc => loc.id === selectedLocation)?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                {locations.find(loc => loc.id === selectedLocation)?.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
