
import { router } from "@inertiajs/react";
import { useState } from "react";
import { User } from "@/types";
import { DataTable } from "@/Components/ui/data-table";
import DeleteConfirm from "@/Components/DeleteConfirm";
import { UserColumns } from "./UserColumns";

type UsersTableProps = {
    users: User[];
    setUser: (item: User) => void;
};

const UsersTable = ({ users, setUser }: UsersTableProps) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const deleteItem = () => {
        if (deleteId) {
            router.delete(route("users.destroy", deleteId), {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setDeleteId(null);
                },
            });
        }
    };
    return (
        <>
            <DeleteConfirm
                open={deleteDialogOpen}
                opOpenChange={setDeleteDialogOpen}
                onConfirm={deleteItem}
            />
            <DataTable
                data={users}
                columns={UserColumns(confirmDelete, setUser)}
                filters={[{
                    title: "Verified",
                    value: "email_verified_at",
                    options: [{label:"Yes", value:"Yes"}, {label:"No", value:"No"}],
                },]}
                searchableColumns={['name', 'email']}
            />
        </>
    );
};

export default UsersTable;
