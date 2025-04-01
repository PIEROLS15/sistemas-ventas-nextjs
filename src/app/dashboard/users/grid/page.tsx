'use client'
import DashboardShell from "@/components/layout/dashboardShell";
import { UsersHeader } from "@/components/layout/users/userHeader";
import UsersGrid from "@/components/layout/users/usersGrid";
import useUsers from "@/hooks/useUsers";

const Users = () => {
    const { users, loading, error, fetchUsers } = useUsers();

    return (
        <DashboardShell>
            <UsersHeader />
            <UsersGrid users={users} loading={loading} error={error} fetchUsers={fetchUsers} />
        </DashboardShell>
    );
}

export default Users;