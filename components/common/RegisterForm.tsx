"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";

interface RegisterFormProps {
    handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    loading: boolean;
}

function RegisterForm({ 
    handleSignUp, 
    setName, 
    setEmail, 
    setPassword, 
    loading 
}: RegisterFormProps) {
  return (
    <form onSubmit={handleSignUp} className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <Card className="border-border/50 bg-background/60 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 rounded-full bg-primary/10">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details below to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Input 
                placeholder="Full Name" 
                className="h-11 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>
            <div className="grid gap-2">
              <Input 
                type="email"
                placeholder="name@example.com" 
                className="h-11 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="grid gap-2">
              <Input 
                type="password" 
                placeholder="Create a password" 
                className="h-11 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            
            <Button 
              className="w-full h-11 text-base font-medium transition-all hover:shadow-lg active:scale-[0.98]" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 border-t border-border/50 pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
  )
}

export default RegisterForm;
