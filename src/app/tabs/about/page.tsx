import { Footprints } from "lucide-react";

export default function AboutTab() {
    const imageLink = '';
    return (
        <div className="flex gap-2 items-center">
            <img className="w-sm" src="https://www.matheen.dev/man-with-laptop.png" alt="" />
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-light mb-2 charm">Hello! Its me. <span className="text-blue-500 font-semibold border-b border-dashed">Matheen</span>.</h2>
                <p className="mt-1 mb-2">Let me introduce myself. Am very <strong className="italic border-b border-slate-300 border-dotted">innovative</strong>, <strong className="italic border-b border-slate-300 border-dotted">introverted</strong>, <strong className="italic border-b border-slate-300 border-dotted">interesting</strong> person who can code and do more than code.</p>

                <p className="mb-4">
                    I would describe myself as a highly enthusiastic and empathetic person who is more skilled enough to solve problems and reach goals that benefits my career, my life and my team.
                </p>

                <p className="italic font-semibold">
                    Want to know more about me?
                </p>

                <div className="flex">
                    <button className="bg-blue-500 hover:bg-blue-800 text-white py-3 px-5 rounded shadow cursor-pointer font-semibold monospace text-md flex gap-1 items-center">View My Journey <Footprints /></button>
                </div>
            </div>
        </div>
    );

}