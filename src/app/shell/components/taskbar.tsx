"use client";
import { settings } from "@/config/app";
import {
    User,
    Settings,
    LogOut
} from "lucide-react";
import React from "react";
import { useState, useEffect, useRef } from "react";

interface TaskbarProps {
    onAppClick: (app: string) => void;
    openApps: string[]; // List of opened apps
}

export const Taskbar = ({ onAppClick, openApps }: TaskbarProps) => {
    const [startOpen, setStartOpen] = useState(false);
    const [currentWindow, setCurrentWindow] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    const userImage = settings.userImage;

    const startMenuItems = [
        { name: "About Me", icon: <img className="w-8 h-8" src="/programmer.png" alt="about me window" draggable={false} />, app: 'About' },
        { name: "My Experiences", icon: <img className="w-8 h-8" src="/suitcase.png" alt="experiences window" draggable={false} />, app: 'Experiences' },
        { name: "My Projects", icon: <img className="w-8 h-8" src="/folders.png" alt="projects window" draggable={false} />, app: 'Projects' },
        { name: "My Skills", icon: <img className="w-8 h-8" src="/soft-skills.png" alt="skills window" draggable={false} />, app: 'Skills' },
        { name: "About this Project", icon: <img className="w-8 h-8" src="/binary-code.png" alt="code window" draggable={false} />, app: 'Code' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                startOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setStartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [startOpen]);

    const handleStartMenuItemClick = (app: string) => {
        setCurrentWindow(app);
        onAppClick(app);
        setStartOpen(false);
    };

    return (
        <div className="taskbar-wrapper">
            {/* Start Menu */}
            {startOpen && (
                <div
                    id="taskbar"
                    ref={menuRef}
                    className="absolute z-[100] px-1 py-1 bottom-14 left-4 w-64 rounded-xl backdrop-blur-3xl bg-cyan-200/30 border border-white/20 shadow-lg shadow-black/30 space-y-2 animate-fade-in"
                >
                    <img className="z-10 shadow-lg absolute left-1/2 transform -translate-x-1/2 rounded-full mx-auto h-14 w-14 -mt-8 border-2 border-white/20 text-white" src={userImage} alt="User Image" />
                    <div className="z-0 relative shadow-lg bg-gradient-to-b from-white/50 to-cyan-100/10 backdrop-blur-3xl rounded-lg border border-white/20 dark:text-slate-700 dark:border-slate-300">
                        <div className="flex flex-col px-2 pt-6 py-4 items-center justify-center">
                            <div className="flex gap-1 items-center justify-center">
                                <p>Mohamed</p>
                                <p className="font-semibold">Matheen</p>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">Senior Desktop Engineer</span>
                        </div>
                        <div className="px-4 pt-2 pb-4">
                            {startMenuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleStartMenuItemClick(item.app)}
                                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 font-medium rounded hover:bg-white/60 hover:shadow hover:shadow-black/10 transition-all duration-300 cursor-pointer"
                                >
                                    {item.icon} {item.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 items-center justify-end px-3 py-2">
                            <a href="https://www.linkedin.com/in/i-am-matheen/" target="_blank" rel=""><img className="w-6 h-6" src="https://www.linkedin.com/favicon.ico" alt="linkedin" draggable={false} /></a>
                            <a href="mailto:mhdmatheen@gmail.com" target="_blank" rel=""><img className="w-6 h-6" src="/envelope.png" alt="email" draggable={false} /></a>
                        </div>
                    </div>
                </div>
            )}

            {/* Taskbar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2 backdrop-blur-md bg-cyan-200/30 border-t border-white/30 flex gap-3 items-center">
                {/* Start Button */}
                <button
                    id="start-button"
                    onClick={() => setStartOpen((prev) => !prev)}
                    className="pl-2 pr-3 py-1 flex gap-1 items-center justify-center text-white font-bold rounded-full overflow-hidden hover:bg-white/20 transition backdrop-blur-sm border border-white/20 shadow-lg shadow-white/10"
                >
                    <img className="w-6 h-6 rounded-full" src={userImage} alt="User Image" draggable={false} />
                    Start
                </button>

                <div className="border-r h-full border-white/20 mr-2">&nbsp;</div>

                {/* Open Apps Scrollable Container */}
                <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                    <div className="flex gap-2">
                        {openApps && openApps.length > 0 && openApps.map((app) => {
                            const matchedItem = startMenuItems.find(item => item.app === app);
                            return (
                                <button
                                    key={app}
                                    onClick={() => { onAppClick(app); setCurrentWindow(app); }}
                                    className={`
                                        px-3 py-1 text-white text-sm rounded hover:bg-white/20 transition border flex items-center gap-2
                                        ${currentWindow == app
                                            ? 'border-white/20 shadow-md shadow-white/10 backdrop-blur-sm bg-gradient-to-b from-white/10 to-cyan-200/10 from-80%'
                                            : 'border-white/10'}
                                    `}
                                >
                                    {matchedItem && React.cloneElement(matchedItem.icon, {
                                        className: "w-4 h-4"
                                    })}
                                    <span>{app}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Taskbar;
