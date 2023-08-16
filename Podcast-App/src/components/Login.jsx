import React from "react";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import LogoHeader from "./LogoHeader";

const supabase = createClient(
  "https://sgcuecxeqiqzznshceyy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnY3VlY3hlcWlxenpuc2hjZXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5OTcyODAsImV4cCI6MjAwNzU3MzI4MH0.PIegs_9jF51LqZk6JRXfR32iwWCB4vr0-z3H8WRhq9k"
);

export default function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/");
    }
    // No need for an "else" condition as we don't want to navigate when signed out.
  });

  return (
    <div className="App">
        
      <header className="App-Header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
        />
      </header>
    </div>
  );
}
