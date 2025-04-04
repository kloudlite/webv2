'use client';

import { useState } from "react";


export const SignupForm = ()=>{
  const [email, setEmail]=useState<string>();
  return <div>
    
    <input type="text" value={email} onChange={(e)=>{
      setEmail(e.target.value);
    }}></input>
  </div>
}