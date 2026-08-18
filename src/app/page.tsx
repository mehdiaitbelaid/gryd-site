import { redirect } from "next/navigation";

/* The homepage is a separate workstream. Until it lands, the root sends visitors
   to the hub, which is the part of the site that is built. */
export default function Home() {
  redirect("/projects");
}
