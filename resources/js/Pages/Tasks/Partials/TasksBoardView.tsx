import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { FireExtinguisher, Plus, Trash } from "lucide-react";
import {
    Dispatch,
    DragEvent,
    FormEvent,
    SetStateAction,
    useState,
} from "react";

type Props = {};

const TasksBoardView = (props: Props) => {
    return <Board />;
};

type CardType = {
    id: string;
    title: string;
    column: string;
};
const DEFAULT_CARDS = [
    {
        id: "1",
        title: "Fix render bug in Dashboard",
        column: "backlog",
    },
    {
        id: "2",
        title: "Update user profile page design",
        column: "todo",
    },
    {
        id: "3",
        title: "Implement authentication flow",
        column: "in_progress",
    },
    {
        id: "4",
        title: "Optimize database queries",
        column: "completed",
    },
    {
        id: "5",
        title: "Refactor task creation modal",
        column: "backlog",
    },
    {
        id: "6",
        title: "Write unit tests for user service",
        column: "todo",
    },
    {
        id: "7",
        title: "Create documentation for API endpoints",
        column: "in_progress",
    },
    {
        id: "8",
        title: "Deploy new release to production",
        column: "completed",
    },
    {
        id: "9",
        title: "Fix login issue on mobile devices",
        column: "backlog",
    },
    {
        id: "10",
        title: "Integrate third-party API for payment processing",
        column: "in_progress",
    },
    {
        id: "11",
        title: "Set up CI/CD pipeline",
        column: "todo",
    },
    {
        id: "12",
        title: "Design error handling strategy",
        column: "backlog",
    },
    {
        id: "13",
        title: "Create new marketing landing page",
        column: "completed",
    },
    {
        id: "14",
        title: "Research new JavaScript testing libraries",
        column: "todo",
    },
    {
        id: "15",
        title: "Fix image upload bug on profile page",
        column: "in_progress",
    },
    {
        id: "16",
        title: "Migrate old data to new database",
        column: "completed",
    },
    {
        id: "17",
        title: "Review security audit report",
        column: "backlog",
    },
    {
        id: "18",
        title: "Improve performance on search functionality",
        column: "todo",
    },
    {
        id: "19",
        title: "Review security audit report",
        column: "backlog",
    },
    {
        id: "20",
        title: "Improve performance on search functionality",
        column: "todo",
    },
    {
        id: "21",
        title: "Review security audit report",
        column: "backlog",
    },
    {
        id: "22",
        title: "Improve performance on search functionality",
        column: "todo",
    },
];

const Board = () => {
    const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);
    return (
        <Card className=" flex gap-3 overflow-auto py-12 px-4">
            <Column
                title="Backlog"
                column="backlog"
                headignColor="text-neutral-500"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="TODO"
                column="todo"
                headignColor="text-yellow-200"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="In Progress"
                column="in_progress"
                headignColor="text-blue-200"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Completed"
                column="completed"
                headignColor="text-emerald-200"
                cards={cards}
                setCards={setCards}
            />

            <DeleteColumn setCards={setCards} />
        </Card>
    );
};

type ColunmProps = {
    title: string;
    headignColor: string;
    column: string;
    cards: CardType[];
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
    title,
    headignColor,
    column,
    cards,
    setCards,
}: ColunmProps) => {
    const [active, setActive] = useState<boolean>(false);

    const handleDragStart = (e: DragEvent<HTMLDivElement>, card: CardType) => {
        e.dataTransfer?.setData("cardId", card.id);
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
    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        setActive(false);
        clearHighlights();
        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";
        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;

            cardToTransfer = { ...cardToTransfer, column };
            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;
                copy.splice(insertAtIndex, 0, cardToTransfer)
            }

            setCards(copy)
        }
    };

    const filteredCards = cards.filter((c) => c.column === column);

    return (
        <div className=" w-56 shrink-0">
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
                className={` h-full w-full rounded-md p-2 transition-colors ${
                    active ? " bg-muted/70" : " bg-muted/20"
                }`}
            >
                {filteredCards.map((c) => {
                    return (
                        <TaskCard
                            handleDragStart={handleDragStart}
                            key={c.id}
                            {...c}
                        />
                    );
                })}
                <DropIndicator beforeId="-1" column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
};

const TaskCard = ({
    title,
    id,
    column,
    handleDragStart,
}: {
    title: string;
    id: string;
    column: string;
    handleDragStart: (e: DragEvent<HTMLDivElement>, card: CardType) => void;
}) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <div
                draggable={true}
                onDragStart={(e) => handleDragStart(e, { id, title, column })}
                className=" cursor-grab rounded-md border border-border bg-background p-3 active:cursor-grabbing"
            >
                <p className=" text-sm text-neutral-100"> {title}</p>
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

const DeleteColumn = ({
    setCards,
}: {
    setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
    const [active, setActive] = useState<boolean>(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        setActive(false);
    };
    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId");
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
                active
                    ? " border-red-800 bg-red-800/20 text-red-500"
                    : " border-neutral-500 bg-neutral-500/20 text-neutral-500"
            }`}
        >
            {active ? (
                <FireExtinguisher className=" animate-bounce w-5 h-5" />
            ) : (
                <Trash className=" w-5 h-5" />
            )}
        </div>
    );
};

const AddCard = ({
    column,
    setCards,
}: {
    column: string;
    setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
    const [text, setText] = useState<string>("");
    const [adding, setAdding] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim().length) return;

        const newCard = {
            column,
            title: text.trim(),
            id: Math.random().toString(),
        };
        setCards((prev) => [...prev, newCard]);
        setAdding(false);
    };
    return (
        <>
            {adding ? (
                <form onSubmit={handleSubmit}>
                    <Textarea
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Add new task"
                        className=" w-full rounded border border-primary/50 bg-primary/10"
                    />
                    <div className=" mt-1.5 flex items-center justify-end gap-1.5">
                        <Button
                            size={"sm"}
                            onClick={() => setAdding(false)}
                            variant={"secondary"}
                        >
                            Close
                        </Button>
                        <Button size={"sm"} type="submit">
                            Add
                        </Button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setAdding(true)}
                    className=" flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-foreground/50 transition-colors hover:text-foreground"
                >
                    <span> Add Card</span>
                    <Plus className=" w-4 h-4" />
                </button>
            )}
        </>
    );
};

export default TasksBoardView;
