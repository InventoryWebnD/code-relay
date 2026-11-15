import { redirect } from "next/navigation";
import { REGISTER_URL } from "@/data/cr5";

/**
 * Registration happens on Unstop. This route stays only as a redirect, so old
 * links and bookmarks still land somewhere useful.
 */
export default function RegisterPage() {
  redirect(REGISTER_URL || "/");
}
