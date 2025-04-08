"use server";

import { listDNSRecords } from "@repo/cf-domain-management";


export const DnsRecord = async () => {
    return await listDNSRecords(
        {
            CLOUDFLARE_EMAIL: process.env.CLOUDFLARE_EMAIL ?? (() => { throw new Error("CLOUDFLARE_EMAIL is not defined"); })(),
            CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY ?? (() => { throw new Error("CLOUDFLARE_API_KEY is not defined"); })(),
            CLOUDFLARE_ZONE_ID: process.env.CLOUDFLARE_ZONE_ID ?? (() => { throw new Error("CLOUDFLARE_ZONE_ID is not defined"); })()
        },
        process.env.DOMAIN_NAME ?? (() => { throw new Error("DOMAIN_NAME is not defined"); })(),
        "TXT"
    )
};