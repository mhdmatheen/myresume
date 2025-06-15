// app/layout or a page
"use client";
import { useEffect, useState } from "react";
import Taskbar from "./shell/components/taskbar";
import Window from "./shell/components/window";
import About from "@/app/(windows)/about/page";
import ExperiencesWindow from "./(windows)/experiences/page";
import SkillsWindow from "./(windows)/skills/page";
import ProjectsWindow from "./(windows)/projects/page";
import CodeWindow from "./code/page";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [currentWindow, setCurrentWindow] = useState<string | null>(null);

  const windowConfig = [
    { title: "About", component: <About /> },
    { title: "Experiences", component: <ExperiencesWindow /> },
    { title: "Projects", component: <ProjectsWindow /> },
    { title: "Skills", component: <SkillsWindow /> },
    { title: "Code", component: <CodeWindow /> },
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const closeWindow = (app: string) => {
    setOpenWindows(openWindows.filter(w => w !== app));
    setOpenApps(openApps.filter(w => w !== app));
  };

  const handleAppClick = (app: string) => {
    // if already open, focus it or do nothing
    setCurrentWindow(app);
    if (!openApps.includes(app)) {
      setOpenApps([...openApps, app]);
    }
    if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
    }
  };

  const toggleApp = (app: string) => {
    if (openApps.includes(app)) {
      setOpenApps(openApps.filter((a) => a !== app));
    } else {
      setOpenApps([...openApps, app]);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative min-h-screen overflow-hidden">
        {windowConfig.map(({ title, component }) =>
          openWindows.includes(title) ? (
            <Window
              key={title}
              title={title}
              onClose={() => closeWindow(title)}
              currentWindow={currentWindow}
              setCurrentWindow={setCurrentWindow}
            >
              {component}
            </Window>
          ) : null
        )}

        {/* Taskbar */}
        <Taskbar
          onAppClick={handleAppClick}
          openApps={openApps}
          currentWindow={currentWindow}
          setCurrentWindow={setCurrentWindow}
        />
      </div>

    </div>
  );
}
