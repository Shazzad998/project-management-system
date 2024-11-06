import { cn } from '@/lib/utils';
import { ReactNode } from 'react'

type SectionWrapperProps = {
    className?:string;
    children:ReactNode
}

const SectionWrapper = ({className, children}: SectionWrapperProps) => {
  return (
    <section className={cn("py-8 md:py-12 lg:py-16 xl:py-20", className)}>
        {children}
    </section>
  )
}

export default SectionWrapper