"use client";

import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const AuthProviders = () => {
  const [providers, setproviders] = useState<Providers | null>(null);
  return <div>AuthProviders</div>;
};

export default AuthProviders;
