// app/layout or a page
"use client";
import { useEffect, useState } from "react";
import Taskbar from "./shell/components/taskbar";
import Window from "./shell/components/window";
import About from "@/app/(windows)/about/page";
import ExperiencesWindow from "./(windows)/experiences/page";
import SkillsWindow from "./(windows)/skills/page";
import ProjectsWindow from "./(windows)/projects/page";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [currentWindow, setCurrentWindow] = useState<string | null>(null);

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
      {/* Render windows */}
      {openWindows.includes("About") && (
        <Window title="About" onClose={() => closeWindow("About")} currentWindow={currentWindow} setCurrentWindow={setCurrentWindow}>
          <About />
        </Window>
      )}
      {openWindows.includes("Experiences") && (
        <Window title="Experiences" onClose={() => closeWindow("Experiences")} currentWindow={currentWindow} setCurrentWindow={setCurrentWindow}>
          <ExperiencesWindow />
        </Window>
      )}
      {openWindows.includes("Projects") && (
        <Window title="Projects" onClose={() => closeWindow("Projects")} currentWindow={currentWindow} setCurrentWindow={setCurrentWindow}>
          <ProjectsWindow />
        </Window>
      )}
      {openWindows.includes("Skills") && (
        <Window title="Skills" onClose={() => closeWindow("Skills")} currentWindow={currentWindow} setCurrentWindow={setCurrentWindow}>
          <SkillsWindow />
        </Window>
      )}

      {/* Taskbar */}
      <Taskbar onAppClick={handleAppClick} openApps={openApps} />
    </div>
  );
}
