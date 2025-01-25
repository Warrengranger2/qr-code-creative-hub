import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  QrCode,
  Edit,
  Trash2,
  Eye,
  Settings as SettingsIcon
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const businessName = "Five Corners Cafe"; // This will come from Supabase later

  const menuItems = [
    {
      title: "Create New QR Code",
      icon: QrCode,
      path: "/create-qr",
    },
    {
      title: "Edit QR Code",
      icon: Edit,
      path: "/edit-qr",
    },
    {
      title: "Delete QR Code",
      icon: Trash2,
      path: "/delete-qr",
    },
    {
      title: "View QR Codes",
      icon: Eye,
      path: "/view-qr",
    },
    {
      title: "Settings",
      icon: SettingsIcon,
      path: "/settings",
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{businessName} Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your QR codes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="outline"
              className="h-32 glass-panel flex flex-col items-center justify-center gap-4 hover:bg-primary/20"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-8 h-8" />
              <span>{item.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}