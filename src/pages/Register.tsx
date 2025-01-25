import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    businessName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase registration
    toast({
      title: "Registration functionality coming soon",
      description: "Please connect to Supabase first",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-muted-foreground mt-2">Register your business</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="surname" className="block text-sm font-medium mb-2">
                Surname
              </label>
              <Input
                id="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                Business Name
              </label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Five Corners Cafe"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="form-input"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-primary"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}