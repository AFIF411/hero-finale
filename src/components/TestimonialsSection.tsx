/* -----------------------------------------------
 *          TestimonialsSection.tsx
 * --------------------------------------------- */

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Review {
    name: string;
    message: string;
    rating: 1 | 2 | 3 | 4 | 5;
}

const reviews: Review[] = [
    { name: "Sarah B.",  rating: 5, message: "Service impeccable ! L’équipe répond vite et avec le sourire." },
    { name: "Mohamed K.", rating: 4, message: "Très satisfait ; quelques détails à peaufiner mais je recommande." },
    { name: "Amel R.",    rating: 5, message: "Une expérience fluide du début à la fin. Merci !" },
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="py-16 bg-gray-50/60 dark:bg-gray-800/70">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-violet-600 to-orange-600 bg-clip-text text-transparent">
                        Avis de nos utilisateurs
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300">
                        Ils parlent mieux de nous que nous-mêmes !
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, i) => (
                        <Card key={i} className="shadow-lg h-full flex flex-col">
                            <CardHeader className="pb-2">
                                <div className="flex items-center space-x-2">
                                    {Array.from({ length: review.rating }).map((_, idx) => (
                                        <Star key={idx} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                                    ))}
                                    {Array.from({ length: 5 - review.rating }).map((_, idx) => (
                                        <Star key={idx} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between">
                                <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                                    “{review.message}”
                                </p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    — {review.name}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
