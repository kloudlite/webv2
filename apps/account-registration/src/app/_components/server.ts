"use server";

import { listDNSRecords, suggestDomains } from "@repo/cf-domain-management/allocator-interface/index";

const config =  {
    CLOUDFLARE_EMAIL: process.env.CLOUDFLARE_EMAIL ?? (() => { throw new Error("CLOUDFLARE_EMAIL is not defined"); })(),
    CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY ?? (() => { throw new Error("CLOUDFLARE_API_KEY is not defined"); })(),
    CLOUDFLARE_ZONE_ID: process.env.CLOUDFLARE_ZONE_ID ?? (() => { throw new Error("CLOUDFLARE_ZONE_ID is not defined"); })()
}

export const getSuggestedNames = async (companyName: string) => {
    const suggestedNames = await suggestDomains(    
        config,
        companyName,
    )
    return suggestedNames.map((name) => {
        return name.replace(/\.khost\.dev$/, "");
    })
}