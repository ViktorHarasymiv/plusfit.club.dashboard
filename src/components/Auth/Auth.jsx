import React from "react";

import Login from "./Login";

import css from "./Style.module.css";
import SignUp from "./SignUp";

import { useAuthModalStore } from "../../store/useAuthModalStore";

function Auth() {
  const { isSignInOpen, isSignUpOpen } = useAuthModalStore();
  return (
    <main className="main-wrapper">
      <section className="section">
        <div className={css.wrapper}>
          {/* FORM */}
          {isSignInOpen ? <Login /> : isSignUpOpen ? <SignUp /> : null}
        </div>
      </section>
    </main>
  );
}

export default Auth;
