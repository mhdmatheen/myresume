"use client";
import { projects } from "@/config/seeds/projects";

export default function ProjectsWindow () {
    return (
        <div className="bg-white/60 p-6">
            <div className="flex flex-col items-center justify-center px-4">
                <img className="h-16 w-16" src="/folders.png" alt="" />
                <h1 className="mb-4 text-slate-800 text-lg">My noteworthy projects from which I have learned a lot</h1>
            </div>

            <div className="space-y-4">
                {projects.map((project, idx) => (
                    <div key={idx} className="bg-white backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg space-y-2">
                        <h2 className="font-semibold">{project.title}</h2>
                        <p className="text-sm text-slate-700">{project.description}</p>
                        <div className="flex gap-2">
                            {project.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs text-slate-500 bg-slate-100 rounded-full px-2 py-1">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}