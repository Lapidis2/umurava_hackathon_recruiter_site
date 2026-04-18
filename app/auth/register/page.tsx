"use client"

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
// Import the UI component you created in the other file
// Make sure the path to your UI component is correct!
import RegisterFormUI from "@/components/common/RegisterForm"; 

export default function RegisterPage() { // Changed name from RegisterForm to RegisterPage
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
    }, {
      onRequest: () => setLoading(true),
      onError: (ctx) => {
        setLoading(false);
        alert(ctx.error.message);
      },
      onSuccess: () => {
        setLoading(false);
        // Better-Auth handles the redirect to callbackURL automatically
      },
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -z-10" />
      
       <RegisterFormUI 
        handleSignUp={handleSignUp}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
      />
    </div>
  );
}
