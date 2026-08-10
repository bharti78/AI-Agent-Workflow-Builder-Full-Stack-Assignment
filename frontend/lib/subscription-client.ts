import { createClient as createWSClient } from "graphql-ws";
import { nhost } from "./nhost";

let wsClient: ReturnType<typeof createWSClient> | null = null;

export function getSubscriptionClient() {
  if (wsClient) return wsClient;

  const subdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN ?? "";
  const region = process.env.NEXT_PUBLIC_NHOST_REGION ?? "";
  const wsUrl = `wss://${subdomain}.graphql.${region}.nhost.run/v1/graphql`;

  wsClient = createWSClient({
    url: wsUrl,
    connectionParams: async () => {
      const session = nhost.getUserSession();
      return {
        headers: {
          Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
        },
      };
    },
    on: {
      connected: () => console.log("Subscription client connected"),
      error: (err) => console.error("Subscription client error:", err),
    },
    lazy: false,
  });

  return wsClient;
}

export function closeSubscriptionClient() {
  if (wsClient) {
    wsClient.dispose();
    wsClient = null;
  }
}
