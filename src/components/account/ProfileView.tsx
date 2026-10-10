"use client";

import { useAppState } from "@/lib/store/app-store";
import { ProfileForm } from "./ProfileForm";

export function ProfileView() {
  const profile = useAppState((s) => s.profile);
  if (!profile) return null;
  return <ProfileForm key={profile.phone} profile={profile} />;
}
