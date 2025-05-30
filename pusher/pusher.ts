"use client"; // Add this to enforce it's client-only

import Pusher from "pusher-js";

Pusher.logToConsole = true;

class PusherClient {
  private pusher: Pusher;
  private isConnected: boolean = false;

  constructor() {
    if (typeof window === "undefined") return; // Skip on server

    const PUSHER_KEY = process.env.PUSHER_KEY! || "7e1f499e8a4730060fd6";
    const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER! || "ap2";

    if (!PUSHER_KEY || !PUSHER_CLUSTER) {
      throw new Error("Pusher env vars are missing");
    }

    this.pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });

    this.pusher.connection.bind("connected", () => {
      console.log("Pusher connected!");
      this.isConnected = true;
    });

    this.pusher.connection.bind("disconnected", () => {
      console.log("Pusher disconnected!");
      this.isConnected = false;
    });

    this.pusher.connection.bind("error", (err: any) => {
      console.error("Pusher error:", err);
      this.isConnected = false;
    });
  }

  public subscribe(channel: string) {
    if (!this.isConnected) {
      this.pusher.connect();
    }
    return this.pusher.subscribe(channel);
  }

  public unsubscribe(channel: string) {
    this.pusher.unsubscribe(channel);
  }

  public disconnect() {
    this.pusher.disconnect();
  }
}

const pusherClient = typeof window !== "undefined" ? new PusherClient() : null;
export default pusherClient;
