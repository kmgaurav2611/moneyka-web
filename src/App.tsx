import { useState } from "react";
import supabase from "../utils/supabase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log("Signed up:", data.user);
      setUser(data.user);
    }
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log("Signed in:", data.user);
      setUser(data.user);
      console.log("JWT:", data.session.access_token);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Supabase Auth Test</h2>

      {!user ? (
        <>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button onClick={signUp}>Sign Up</button>
          <button onClick={signIn}>Sign In</button>
        </>
      ) : (
        <>
          <p>Logged in as: {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}
