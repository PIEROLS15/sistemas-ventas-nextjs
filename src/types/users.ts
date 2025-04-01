export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetToken: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    role: {
        id: number;
        name: string;
    };
    roleName: string;
}

export interface Role {
    id: string;
    name: string;
}

export interface UsersTableProps {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => void;
}

export interface UserCardProps {
    users: User;
    fetchUsers: () => void;
}

export interface UsersGridProps {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => void;
}

export interface UserDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: User
}

export interface UserUpdateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User;
    onSuccess: () => void;
}

export interface UserStatusDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: User
    onSuccess: () => void;
}