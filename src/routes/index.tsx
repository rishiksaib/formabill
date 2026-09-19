import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/home";

export const Route = createFileRoute("/")({ component: LandingPage });
