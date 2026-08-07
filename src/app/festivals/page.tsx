import { redirect } from "next/navigation";
// All festival browsing is now on the unified home page
export default function FestivalsPage() {
  redirect("/");
}
