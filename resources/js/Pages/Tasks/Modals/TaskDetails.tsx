import PriorityBadge from "@/Components/PriorityBadge";
import StatusBadge from "@/Components/StatusBadge";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Task } from "@/types";

type TaskDetailsProps = {
    open: boolean;
    opOpenChange: (value: boolean) => void;
    task: Task | null;
};

const TaskDetails = ({ open, opOpenChange, task }: TaskDetailsProps) => {
    return (
        task && (
            <Dialog open={open} onOpenChange={opOpenChange}>
                <DialogContent aria-describedby="Task Details">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>Task Details</DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <span className=" bg-accent text-accent-foreground rounded-md px-2 py-1 text-xs">{task.project.name}</span>
                        <div className=" pl-1 mt-1">
                        <h3 className=" font-bold text-2xl">{task.name}</h3>
                        <p className=" font-extralight text-foreground/70">
                            {task.description}
                        </p>
                        </div>

                        <div className=" flex gap-8 mt-6">
                            <div className=" flex flex-col gap-1 items-center">
                                Priority
                                <PriorityBadge priority={task.priority} />
                            </div>
                            <div className=" flex flex-col gap-1 items-center">
                                Status
                                
                            <StatusBadge status={task.status} />
                            </div>
                            <div className=" flex flex-col gap-1 items-center">
                                Deadline
                                
                            <span>{task.due_date}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <DialogClose asChild>
                            <Button variant={"secondary"}>Close</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        )
    );
};

export default TaskDetails;
