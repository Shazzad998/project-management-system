import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { formatString } from "@/lib/utils";
import { useState } from "react";

type Permissions = {
    [key: string]: string[];
};
type PermissionsBoolean = {
    [key: string]: boolean;
};
type CheckBoxGroupProps = {
    permissions: Permissions;
    selectedPermissions: string[];
    setSelectedPermissions: (value: string[]) => void;
};

const CheckBoxGroup = ({
    permissions,
    selectedPermissions,
    setSelectedPermissions,
}: CheckBoxGroupProps) => {
    const setInitialChecks = (permissions: Permissions): PermissionsBoolean => {
        const result: PermissionsBoolean = {};
        Object.keys(permissions).forEach((key) => {
            result[key] = permissions[key].every((item) =>
                selectedPermissions.includes(item)
            );
        });
        return result;
    };
    const [isAllChecked, setIsAllChecked] = useState<PermissionsBoolean>(
        setInitialChecks(permissions)
    );
    const addToIsAllChecked = (key: string, value: boolean) => {
        setIsAllChecked((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    const handlePermissionChange = (permission: string, group: string) => {
        let temp = selectedPermissions;
        temp.includes(permission)
            ? (temp = temp.filter((item) => item !== permission))
            : temp.push(permission);
        setSelectedPermissions(temp);
        addToIsAllChecked(
            group,
            permissions[group].every((item) => temp.includes(item))
        );
    };

    const handleGroupChange = (group: string, add: string | boolean) => {
        let temp = selectedPermissions;
        let filtered = permissions[group].filter(
            (item) => !selectedPermissions.includes(item)
        );
        if (add) {
            temp = [...temp, ...filtered];
        } else {
            temp = temp.filter((item) => !permissions[group].includes(item));
        }
        setSelectedPermissions(temp);
        addToIsAllChecked(group, add as boolean);
    };
    return (
        <div className=" grid gap-8">
            {Object.entries(permissions).map(([group, permissions]) => (
                <div className=" grid gap-4" key={group}>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={group}
                            checked={isAllChecked[group]}
                            onCheckedChange={(value) =>
                                handleGroupChange(group, value)
                            }
                        />
                        <Label htmlFor={group}>{formatString(group)}</Label>
                    </div>
                    <div className=" flex flex-wrap gap-3 pl-6">
                        {permissions.map((permission) => (
                            <div
                                className="flex items-center space-x-2"
                                key={permission}
                            >
                                <Checkbox
                                    id={permission}
                                    checked={selectedPermissions.includes(
                                        permission
                                    )}
                                    onCheckedChange={() =>
                                        handlePermissionChange(
                                            permission,
                                            group
                                        )
                                    }
                                />
                                <Label htmlFor={permission}>{permission}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckBoxGroup;
