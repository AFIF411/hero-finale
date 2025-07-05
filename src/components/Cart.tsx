import { useState } from "react";
import { X, Plus, Minus, ShoppingCart, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import CheckoutForm, { UserInfo } from "./CheckoutForm";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart, confirmOrder } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const deliveryFee = 15;
  const totalWithDelivery = getTotalPrice() + (cartItems.length > 0 ? deliveryFee : 0);

  const handleCheckoutSubmit = (userInfo: UserInfo) => {
    setIsCheckingOut(true);

    // Get event details from cart items
    const eventDate = cartItems[0]?.date;
    const eventLocation = cartItems[0]?.location;

    setTimeout(() => {
      confirmOrder({
        date: eventDate,
        location: eventLocation,
        userInfo
      });
      alert("Order confirmed! You will receive a confirmation email.");
      setIsCheckingOut(false);
      setShowCheckoutForm(false);
      onClose();
    }, 2000);
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleBackToCart = () => {
    setShowCheckoutForm(false);
  };

  return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              {showCheckoutForm && (
                  <Button variant="ghost" size="sm" onClick={handleBackToCart} className="p-1">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
              )}
              <ShoppingCart className="w-5 h-5" />
              <span>{showCheckoutForm ? "Complete Order" : `My Cart (${cartItems.length})`}</span>
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {showCheckoutForm ? (
                <CheckoutForm
                    onSubmit={handleCheckoutSubmit}
                    onCancel={handleBackToCart}
                    isLoading={isCheckingOut}
                />
            ) : (
                <>
                  {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Your cart is empty</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Add items to start planning
                        </p>
                      </div>
                  ) : (
                      <>
                        {/* Cart Items */}
                        <div className="space-y-4">
                          {cartItems.map((item, index) => (
                              <div key={`${item.id}-${item.partyType}-${index}`} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <span className="text-2xl">{item.image}</span>
                                      <div>
                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                        <p className="text-xs text-gray-500 capitalize">{item.partyType}</p>
                                      </div>
                                    </div>

                                    {/* Product Options */}
                                    <div className="space-y-1 mb-2">
                                      {item.size && (
                                          <p className="text-xs text-gray-600 dark:text-gray-400">
                                            📏 Size: {item.size}
                                          </p>
                                      )}
                                      {item.color && (
                                          <p className="text-xs text-gray-600 dark:text-gray-400">
                                            🎨 Color: {item.color}
                                          </p>
                                      )}
                                      {item.taste && (
                                          <p className="text-xs text-gray-600 dark:text-gray-400">
                                            👅 Taste: {item.taste}
                                          </p>
                                      )}
                                    </div>

                                    {item.date && (
                                        <p className="text-xs text-gray-500">
                                          📅 {item.date.toLocaleDateString('fr-FR')}
                                        </p>
                                    )}

                                    {item.location && (
                                        <p className="text-xs text-gray-500">
                                          📍 {item.location}
                                        </p>
                                    )}
                                  </div>

                                  <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFromCart(item.id, item.partyType)}
                                      className="text-red-500 hover:text-red-700 p-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.partyType, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="h-8 w-8 p-0"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </Button>
                                    <span className="font-medium text-sm min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.partyType, item.quantity + 1)}
                                        className="h-8 w-8 p-0"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </Button>
                                  </div>

                                  <div className="text-right">
                                    <p className="font-semibold text-green-600">
                                      {(item.price * item.quantity).toFixed(2)} DA
                                    </p>
                                  </div>
                                </div>
                              </div>
                          ))}
                        </div>

                        {/* Order Summary */}
                        <div className="border-t pt-6 space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>{getTotalPrice().toFixed(2)} DA</span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span>Delivery fee</span>
                            <span>{deliveryFee} DA</span>
                          </div>

                          <div className="flex justify-between font-semibold text-lg border-t pt-3">
                            <span>Total</span>
                            <span className="text-green-600">{totalWithDelivery.toFixed(2)} DA</span>
                          </div>
                        </div>

                        {/* Checkout Button */}
                        <div className="space-y-3">
                          <Button
                              onClick={handleProceedToCheckout}
                              className="w-full bg-gradient-to-r from-orange-500 to-violet-500 hover:opacity-90 text-white font-semibold py-3"
                          >
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-5 h-5" />
                              <span>Place Order</span>
                            </div>
                          </Button>

                          <Button
                              variant="outline"
                              onClick={() => clearCart()}
                              className="w-full"
                          >
                            Clear Cart
                          </Button>
                        </div>
                      </>
                  )}
                </>
            )}
          </div>
        </SheetContent>
      </Sheet>
  );
};

export default Cart;
