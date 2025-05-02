import {
  GoalIcon,
  LightbulbIcon,
  ListCheck,
  SquareKanbanIcon,
} from "lucide-react";
import SectionWrapper from "./partials/SectionWrapper";
import SectionHeader from "./partials/SectionHeader";
import Reveal from "../Reveal";

type FeatureSectionProps = {};

const FeatureSection = (props: FeatureSectionProps) => {
  return (
    <SectionWrapper>
      <SectionHeader
        headerText="Powerful Feature to Elevate Your Workflow"
        subHeaderText="Explore advanced tools that help you make smarter decisions, track
          progress and manage your tasks with ease. Stay organized and in
          control with features designed to enhance your productivity."
      />

      <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        <Reveal delay={0.5} x={0} y={8} className="px-6 pb-8 pt-10 border border-border rounded-md transition-color ease-in duration-200 group hover:border-emerald-500/40 hover:bg-emerald-800/10">
          <div className=" w-12 h-12 flex items-center justify-center bg-muted/30 rounded-md mb-10 text-emerald-500 group-hover:bg-muted/70 transition-color ease-in duration-200">
            <LightbulbIcon className=" w-6 h-6" />
          </div>
          <h3 className=" text-2xl font-medium mb-1">Make Smart Decisions</h3>
          <p className="text-sm lg:text-base text-foreground/70 font-light">
            Get real-time insights, report and alerts to help you make more
            informed decisions.
          </p>
        </Reveal>

        <Reveal delay={0.7} x={0} y={8} className="px-6 pb-8 pt-10 border border-border rounded-md transition-color ease-in duration-200 group hover:border-rose-500/40 hover:bg-rose-800/10">
          <div className=" w-12 h-12 flex items-center justify-center bg-muted/30 rounded-md mb-10 text-rose-500 group-hover:bg-muted/70 transition-color ease-in duration-200">
            <GoalIcon className=" w-6 h-6" />
          </div>
          <h3 className=" text-2xl font-medium mb-1">Optimize Your Goals</h3>
          <p className="text-sm lg:text-base text-foreground/70 font-light">
            Track your progress and stay aligned with personal or project goals
            using smart tracking tools.
          </p>
        </Reveal>

        <Reveal delay={0.9} x={0} y={8} className="px-6 pb-8 pt-10 border border-border rounded-md transition-color ease-in duration-200 group hover:border-indigo-500/40 hover:bg-indigo-800/10">
          <div className=" w-12 h-12 flex items-center justify-center bg-muted/30 rounded-md mb-10 text-indigo-500 group-hover:bg-muted/70 transition-color ease-in duration-200">
            <ListCheck className=" w-6 h-6" />
          </div>
          <h3 className=" text-2xl font-medium mb-1">Project Management</h3>
          <p className="text-sm lg:text-base text-foreground/70 font-light">
            Easily manage tasks, deadlines and priorities to keep projects
            running smoothly.
          </p>
        </Reveal>

        <Reveal delay={1} x={0} y={8} className="px-6 pb-8 pt-10 border border-border rounded-md transition-color ease-in duration-200 group hover:border-yellow-500/40 hover:bg-yellow-800/10">
          <div className=" w-12 h-12 flex items-center justify-center bg-muted/30 rounded-md mb-10 text-yellow-500 group-hover:bg-muted/70 transition-color ease-in duration-200">
            <SquareKanbanIcon className=" w-6 h-6" />
          </div>
          <h3 className="text-2xl font-medium mb-1">Organized Workflow</h3>
          <p className="text-sm lg:text-base text-foreground/70 font-light">
            Stay on top of tasks by moving tasks across boards, and keeping
            projects on track.
          </p>
        </Reveal>
      </div>
    </SectionWrapper>
  );
};

export default FeatureSection;
