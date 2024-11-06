import ApplicationLogo from '@/Components/ApplicationLogo';
import { Card } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-12 sm:pt-0 bg-background">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-44 fill-current text-foreground" />
                </Link>
            </div>
            <Card className="mx-auto max-w-sm min-w-80 sm:min-w-96 mt-6">
                {children}
            </Card>
        </div>
    );
}
