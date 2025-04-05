'use client';

import NLink from "next/link"
import type { UrlObject } from 'url';

export const Link = ({to, ...props }:{to:string | UrlObject})=>{
  return <NLink href={to} {...props} />
}