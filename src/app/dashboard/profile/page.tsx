'use client'

import DashboardShell from "@/components/layout/dashboardShell";
import ProfileHeader from "@/components/layout/profile/profileHeader"
import ProfileForm from "@/components/layout/profile/profileForm"
import PasswordChangeForm from "@/components/layout/profile/passwordChangeForm"
import { Separator } from "@/components/ui/separator"

const Profile = () => {
    return (
        <DashboardShell>
            <ProfileHeader />
            <div className="grid gap-6">
                <div className="space-y-6">
                    <ProfileForm />
                    <Separator />
                    <PasswordChangeForm />
                </div>
            </div>
        </DashboardShell>
    );
}

export default Profile;