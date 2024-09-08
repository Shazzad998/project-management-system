import { metaLinks } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

type Props = {
    links: metaLinks[];
    from?: number;
    to?: number | null;
    total?: number | null;
};

const Pagination = ({ links, from, to, total }: Props) => {
    return (
        <div className=" flex items-center justify-center md:justify-between gap-2 flex-wrap w-full">
            <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong>
                    {from}-{to}
                </strong>{" "}
                of <strong>{total}</strong> products
            </div>

            <nav className=" flex gap-2">
                {links.map((link, index) => {
                    const isFirstElement = index === 0;
                    const isLastElement = index === links.length - 1;
                    return (
                        <Button
                            key={index}
                            asChild
                            variant={link.active ? "default" : "outline"}
                            size={
                                isFirstElement || isLastElement
                                    ? "default"
                                    : "icon"
                            }
                        >
                            {link.url ? (
                                <Link
                                    preserveScroll
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    className=" cursor-pointer"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )}
                        </Button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Pagination;
