import { Button } from "@/Components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Task } from "@/types";


type TaskDetailsProps = {
    open: boolean;
    opOpenChange: (value: boolean) => void;
    task:Task|null
};

const TaskDetails = ({
    open,
    opOpenChange,
    task
}: TaskDetailsProps) => {
    return (task && <Dialog open={open} onOpenChange={opOpenChange}>
        <DialogContent aria-describedby="Delete Confirmattion">
            <DialogHeader>
                <DialogTitle>{task.name}</DialogTitle>
                <DialogDescription>
                    {task.description}
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-x-2">
                <DialogClose asChild>
                    <Button variant={"secondary"}>Close</Button>
                </DialogClose>
            </div>
        </DialogContent>
    </Dialog>);
};

export default TaskDetails;
