import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Package,
  Globe,
  LogOut,
  User,
  Mail,
  Phone,
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
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useCart } from "@/hooks/useCart";
import AdminLogin from "@/components/AdminLogin";
import { useLanguage } from "@/contexts/LanguageContext";

const Admin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdminAuth();
  const { getConfirmedOrders } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Retrieve confirmed orders
  const orders = getConfirmedOrders();

  const getPartyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      soutenance: "Graduation party",
      nationale: "National celebration",
      religieuse: "Religious celebration",
      scientifique: "Scientific event",
    };
    return labels[type] || type;
  };

  const getPartyTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      soutenance: "bg-orange-100 text-orange-800",
      nationale: "bg-violet-100 text-violet-800",
      religieuse: "bg-green-100 text-green-800",
      scientifique: "bg-blue-100 text-blue-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === "all") return true;
    return order.partyType === selectedFilter;
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-violet-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent">
                  FêtePlan Administration
                </h1>
              </div>
              <Button
                  variant="outline"
                  onClick={logout}
                  className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRevenue} DA</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders this month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    orders.filter(
                        (order) => order.orderDate.getMonth() === new Date().getMonth(),
                    ).length
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by party type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All parties</SelectItem>
                <SelectItem value="soutenance">Graduation parties</SelectItem>
                <SelectItem value="nationale">National celebrations</SelectItem>
                <SelectItem value="religieuse">Religious celebrations</SelectItem>
                <SelectItem value="scientifique">Scientific events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Confirmed orders</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Confirmed orders will appear here
                    </p>
                  </div>
              ) : (
                  <div className="space-y-8">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <h3 className="font-semibold text-lg">{order.id}</h3>
                              <Badge className={getPartyTypeColor(order.partyType)}>
                                {getPartyTypeLabel(order.partyType)}
                              </Badge>
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                              {order.total} DA
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Order Details */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                                Event details
                              </h4>
                              <div className="space-y-2">
                                {order.date && (
                                    <div className="flex items-center space-x-2 text-sm">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <span>{order.date.toLocaleDateString("fr-FR")}</span>
                                    </div>
                                )}
                                {order.location && (
                                    <div className="flex items-center space-x-2 text-sm">
                                      <MapPin className="w-4 h-4 text-gray-500" />
                                      <span>{order.location}</span>
                                    </div>
                                )}
                                <div className="text-sm text-gray-500">
                                  Ordered on {order.orderDate.toLocaleDateString("fr-FR")}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h5 className="font-medium text-sm">Ordered items:</h5>
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-300"
                                    >
                                      {item.name} x{item.quantity} - {item.price * item.quantity} DA
                                    </div>
                                ))}
                              </div>
                            </div>


                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Informations client</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="w-4 h-4 text-gray-500" />
                            <span>{order.userInfo.firstName} {order.userInfo.lastName}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{order.userInfo.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{order.userInfo.phone}</span>
                          </div>
                          {order.userInfo.notes && (
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                              <strong>Notes:</strong> {order.userInfo.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
