'use client';

import { useState } from "react";


export const SignupForm = ()=>{
  const [email, setEmail]=useState<string>();
  return <div>
    <h1>Signup</h1>
    <input type="text" value={email} onChange={(e)=>{
      setEmail(e.target.value);
    }}></input>
  </div>
}