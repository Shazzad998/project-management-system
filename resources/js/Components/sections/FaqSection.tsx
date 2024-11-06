
import { useState } from "react";

import {
  Briefcase,
  UserPlus,
  BarChart2,
  Shield,
  Settings,
  Smartphone
} from "lucide-react";
import SectionWrapper from "./partials/SectionWrapper";
import SectionHeader from "./partials/SectionHeader";
import Accordion from "./partials/Accordion";

type FaqSectionProps = {};

const FaqSection = (props: FaqSectionProps) => {
  const [active, setActive] = useState(1);
  const data = [
    {
      id: 1,
      title: "What features does the task management app offer?",
      content:
        "Our app includes task tracking, team collaboration, project timelines, priority setting, real-time notifications, and analytics to help you manage tasks efficiently. We also provide integration options with popular tools like Slack, Google Calendar, and more.",
      icon: <Briefcase className=" w-6 h-6"/>,
      active: true,
    },
  
    {
      id: 2,
      title: "How does task assignment work?",
      content:
        "You can easily assign tasks to team members by selecting their profiles within a project. Task owners receive notifications and can view their assignments in a personalized dashboard, ensuring everyone knows their responsibilities.",
      icon: <UserPlus className=" w-6 h-6"/>, 
      active: false,
    },
  
    {
      id: 3,
      title: "Can I track progress on tasks and projects?",
      content:
        "Yes! Our app includes progress tracking features, such as completion percentages, visual timelines, and status updates, so you can monitor tasks and project stages in real-time. We also offer detailed reports to keep you updated on overall progress.",
      icon: <BarChart2 className=" w-6 h-6"/>, 
      active: false,
    },
  
    {
      id: 4,
      title: "Is my data secure on your platform?",
      content:
        "Absolutely. We prioritize data security with advanced encryption, secure servers, and regular security audits. Our platform is compliant with industry standards to ensure your data remains safe and protected.",
      icon: <Shield className=" w-6 h-6"/>, 
      active: false,
    },
  
    {
      id: 5,
      title: "Can I customize task workflows to fit my team’s needs?",
      content:
        "Yes, our app allows you to create custom workflows to match your team's unique processes. You can set task stages, assign tags, and create automated reminders, ensuring tasks move smoothly from start to finish.",
      icon: <Settings className=" w-6 h-6"/>, 
      active: false,
    },
  
    {
      id: 6,
      title: "Do you offer mobile access for on-the-go task management?",
      content:
        "We have a mobile app that lets you manage tasks, update statuses, and collaborate with your team anytime, anywhere. Stay connected with real-time notifications and keep track of progress even when you’re away from your desktop.",
      icon: <Smartphone className=" w-6 h-6"/>, 
      active: false,
    }
  ];
  return (
    <SectionWrapper>
      <SectionHeader
        headerText="Find Answers to Common Questions"
        subHeaderText="Our FAQ section provides quick answers to common questions about our product. Find information on getting started, feature details, and technical support - all in one place!"
      />

      <div className=" max-w-6xl mx-auto">
        {data.map((item, index) => {
          return (
            <Accordion
              key={index}
              title={item.title}
              icon={item.icon}
              id={item.id}
              active={active}
              setActive={setActive}
            >
              {item.content}
            </Accordion>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default FaqSection;
