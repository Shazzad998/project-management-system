
import { Card } from "@/Components/ui/card";
import { Task } from "@/types";
import { updateTaskStatus } from "@/lib/api";
import {
    Dispatch,
    DragEvent,
    SetStateAction,
    useState,
} from "react";

type Props = {
    tasks :Task[]
};

const TasksBoardView = ({tasks}: Props) => {
    const [tempTask, setTempTask] = useState<Task[]>(tasks);
    return (
        <Card className=" flex gap-3 overflow-auto pb-6 pt-4 px-4">
            <Column
                title="Pending"
                column="pending"
                headignColor="text-warning"
                tasks={tempTask}
                setTempTask={setTempTask}
            />

            <Column
                title="In Progress"
                column="in_progress"
                headignColor="text-primary"
                tasks={tempTask}
                setTempTask={setTempTask}
            />
            <Column
                title="Completed"
                column="completed"
                headignColor="text-success"
                tasks={tempTask}
                setTempTask={setTempTask}
            />
        </Card>
    );
};





type ColumnProps = {
    title: string;
    headignColor: string;
    column: string;
    tasks: Task[];
    setTempTask: Dispatch<SetStateAction<Task[]>>;
};

const Column = ({
    title,
    headignColor,
    column,
    tasks,
    setTempTask,
}: ColumnProps) => {
    const [active, setActive] = useState<boolean>(false);

    const handleDragStart = (e: DragEvent<HTMLDivElement>, task: Task) => {
        e.dataTransfer?.setData("taskId", String(task.id));
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    };

    const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();
        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const getNearestIndicator = (
        e: DragEvent<HTMLDivElement>,
        indicators: HTMLElement[]
    ) => {
        const DISTANCE_OFFSET = 50;
        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };
    const getIndicators = () => {
        return Array.from(
            document.querySelectorAll(`[data-column="${column}"]`)
        ) as HTMLElement[];
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        setActive(false);
        clearHighlights();
    };
    const handleDragEnd = async (e: DragEvent<HTMLDivElement>) => {
        setActive(false);
        clearHighlights();
        const taskId = e.dataTransfer.getData("taskId");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";
        if (before !== taskId) {
            let copy = [...tasks];
            let taskToTransfer = copy.find((c) => String(c.id) === taskId);
            if (!taskToTransfer) return;

            taskToTransfer = { ...taskToTransfer, status: column };
            
            copy = copy.filter((c) => String(c.id) !== taskId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(taskToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => String(el.id) === before);
                if (insertAtIndex === undefined) return;
                copy.splice(insertAtIndex, 0, taskToTransfer)
            }

            setTempTask(copy)
            await updateTaskStatus(taskToTransfer.id, column )
        }
    };

    const filteredCards = tasks.filter((c) => c.status === column);

    return (
        <div className=" w-96 shrink-0">
            <div className=" mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headignColor}`}>{title}</h3>
                <span className=" rounded text-sm text-neutral-400">
                    {" "}
                    {filteredCards.length}
                </span>
            </div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={` h-[600px] max-h-[600px] overflow-auto w-full rounded-md p-2 transition-colors ${
                    active ? " bg-muted/70" : " bg-muted/20"
                }`}
            >
                {filteredCards.map((c) => {
                    return (
                        <TaskCard
                            handleDragStart={handleDragStart}
                            key={c.id}
                            task={c}
                        />
                    );
                })}
                <DropIndicator beforeId="-1" column={column} />
            </div>
        </div>
    );
};

const TaskCard = ({
    task,
    handleDragStart,
    
}: {
    task:Task,
    handleDragStart: (e: DragEvent<HTMLDivElement>, task: Task) => void;
   }) => {
    return (
        <>
            <DropIndicator beforeId={String(task.id)} column={task.status} />
            <div
                draggable={true}
                onDragStart={(e) => handleDragStart(e, task)}
                className=" cursor-grab rounded-md border border-border bg-background p-3 active:cursor-grabbing"
            >
                <p className=" text-sm font-semibold text-neutral-100"> {task.name}</p>
                <p className="text-xs text-neutral-300">{task.due_date}</p>
                {task.assigned_user && <p className="text-xs text-blue-400">{task.assigned_user.name}</p>}
                <p className="text-xs text-red-400">{task.priority}</p>
            </div>
        </>
    );
};

const DropIndicator = ({
    beforeId,
    column,
}: {
    beforeId: string;
    column: string;
}) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className=" my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
};

export default TasksBoardView;
