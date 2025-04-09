import Cloudflare from "cloudflare";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { generateNameSuggestions } from "../utils/commons.ts";
import { RecordListParams } from "cloudflare/resources/dns/records";

interface Config {
  CLOUDFLARE_EMAIL: string;
  CLOUDFLARE_API_KEY: string;
  CLOUDFLARE_ZONE_ID: string;
}

const getCli = (config: Config) => {
  return new Cloudflare({
    apiEmail: config.CLOUDFLARE_EMAIL,
    apiKey: config.CLOUDFLARE_API_KEY,
  });
};
export const listDNSRecords = async (
  config: Config,
  domainName: string,
  type: RecordListParams["type"]
) => {
  const client = getCli(config);
  console.log(client.dns.records.list);
  const records = await client.dns.records.list({
    zone_id: config.CLOUDFLARE_ZONE_ID!,
    type,
    name: {
      exact: domainName,
    },
  });
  return records;
};

export const checkDomainAvailability = async (
  config: Config,
  domainName: string
) => {
  const client = getCli(config);
  console.log(config, domainName);
  const txtRecords = await listDNSRecords(config, domainName, "TXT");
  return txtRecords.result.length == 0;
};

export const suggestDomains = async (config: Config, companyName: string) => {
  const availNames: string[] = [];
  const sNames = generateNameSuggestions(companyName, 10);
  for (let i = 0; i < sNames.length; i++) {
    const sn = sNames[i];
    if (availNames.length >= 4) {
      break;
    }
    const available = await checkDomainAvailability(config, `${sn}.khost.dev`);
    if (available) {
      availNames.push(sn?.toLowerCase() + ".khost.dev");
    }
  }
  return availNames;
};

export const reserveDomain = async (config: Config, domainName: string) => {
  const client = getCli(config);
  const uniquekey = uuid();
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(uniquekey, salt);

  const res = await client.dns.records.create({
    zone_id: config.CLOUDFLARE_ZONE_ID!,
    type: "TXT",
    name: domainName,
    content: `"${hash}"`,
    proxied: false,
    ttl: 1,
  });

  return res.id + ":" + uniquekey + ":" + salt;
};

export const registerDomain = async (
  config: Config,
  reservationToken: string,
  nsRecords: string[]
) => {
  const client = getCli(config);

  const [txtId, uniqueKey, salt] = reservationToken.split(":");
  if (!txtId || !uniqueKey || !salt) {
    throw new Error("Invalid reservation token");
  }
  const hash = await bcrypt.hash(uniqueKey, salt);

  const txtRes = await client.dns.records.get(txtId, {
    zone_id: config.CLOUDFLARE_ZONE_ID!,
  });

  if (txtRes.content === `"${hash}"`) {
    const records = await client.dns.records.list({
      zone_id: config.CLOUDFLARE_ZONE_ID!,
      type: "NS",
      name: {
        exact: txtRes.name,
      },
    });

    console.log(records);

    for (let i = 0; i < records.result.length; i++) {
      const record = records.result[i];
      if (!record) {
        continue;
      }
      await client.dns.records.delete(record.id, {
        zone_id: config.CLOUDFLARE_ZONE_ID!,
      });
    }

    for (let i = 0; i < nsRecords.length; i++) {
      const ns = nsRecords[i];
      await client.dns.records.create({
        zone_id: config.CLOUDFLARE_ZONE_ID!,
        type: "NS",
        name: txtRes.name,
        content: ns,
        proxied: false,
        ttl: 1,
      });
    }
  }
};