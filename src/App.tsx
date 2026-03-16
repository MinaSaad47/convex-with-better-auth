import { Authenticated, Unauthenticated } from "convex/react";
import { SignIn } from "./components/auth/sign-in";
import { SignUp } from "./components/auth/sign-up";
import { TodoList } from "./components/todo-list";
import { useState } from "react";

function App() {
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Unauthenticated>
        {authMode === "sign-in" ? (
          <SignIn onToggle={() => setAuthMode("sign-up")} />
        ) : (
          <SignUp onToggle={() => setAuthMode("sign-in")} />
        )}
      </Unauthenticated>

      <Authenticated>
        <TodoList />
      </Authenticated>
    </div>
  );
}

export default App;
