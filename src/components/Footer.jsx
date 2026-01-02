import React from 'react'

const Footer = () => {
    return (
        <div
            className="
                bg-slate-800 text-white
                flex flex-col justify-center items-center
                w-full
                py-3 sm:py-4
                px-2  "  >

            {/* LOGO */}
            <div className="logo font-bold text-white text-xl sm:text-2xl">
                <span className="text-green-500">&lt;</span>
                <span>Pass</span>
                <span className="text-green-500">OP/&gt;</span>
            </div>

            {/* TEXT */}
            <div
                className="
                    flex justify-center items-center
                    text-xs sm:text-sm
                    mt-1
                    text-center
                    flex-wrap "   >
                <span>Created with</span>

                <span className="
                        mx-2
                        text-base sm:text-lg
                        cursor-pointer
                        transition-all duration-300
                        hover:scale-110
                        hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] ">
                    ❤️
                </span>

                <span>
                    by <span className="font-medium text-green-400">PD</span>
                </span>
            </div>

        </div>
    )
}

export default Footer
