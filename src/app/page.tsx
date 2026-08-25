import type { Metadata } from "next";
import Dashboard from "./_components/Dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aotearoa Festivals — NZ Music Festival Directory",
  description:
    "Discover New Zealand music festivals, promoters, and artists. Browse by region, genre, or status.",
};

export default Dashboard;
