import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    businessName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register the user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            surname: formData.surname,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update the profile with business name
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: formData.firstName,
            surname: formData.surname,
            business_name: formData.businessName,
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        });
        
        navigate("/login");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 rounded-xl bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Register your business</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-gray-300 mb-2">
                Surname
              </label>
              <Input
                id="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                Business Name
              </label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Five Corners Cafe"
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-blue-400 hover:text-blue-300"
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