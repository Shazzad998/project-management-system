import { Button } from "@/Components/ui/button";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { DataTable } from "@/Components/ui/data-table";
import { Link, router } from "@inertiajs/react";
import { Role } from "@/types";
import { RoleColumns } from "./RoleColumns";
import DeleteConfirm from "@/Components/DeleteConfirm";

type RolesTableProps = {
    roles: Role[];
};

const RolesTable = ({ roles }: RolesTableProps) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const deleteItem = () => {
        if (deleteId) {
            router.delete(route("roles.destroy", deleteId), {
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
                data={roles}
                columns={RoleColumns(confirmDelete)}
                searchableColumns={['name']}
            />
        </>
    );
};

export default RolesTable;
