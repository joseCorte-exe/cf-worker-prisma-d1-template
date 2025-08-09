import { PrismaClient } from "../../generated/prisma";

export let prisma: PrismaClient;

export function initializePrisma(client: PrismaClient) {
  prisma = client;
}