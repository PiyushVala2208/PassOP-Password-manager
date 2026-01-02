import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
    const logoRef = useRef(null);
    const lettersRef = useRef([]);
    const dotRef = useRef(null);
    const githubBtnRef = useRef(null);

    const logoText = ["<", "Pass", "OP", "/>"];

    useEffect(() => {
        // Letters animation
        gsap.fromTo(
            lettersRef.current,
            { y: -50, opacity: 0, rotationX: -90 },
            { y: 0, opacity: 1, rotationX: 0, stagger: 0.05, duration: 0.8, ease: "power3.out" }
        );

        // Dot pulse
        gsap.to(dotRef.current, {
            scale: 1.2,
            opacity: 1,
            repeat: -1,
            yoyo: true,
            duration: 0.9,
            ease: "power1.inOut",
        });

        // Logo tilt
        const handleLogoMove = (e) => {
            const bounds = logoRef.current.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            const rotateX = ((mouseY - centerY) / centerY) * 8;
            const rotateY = ((mouseX - centerX) / centerX) * 8;

            gsap.to(logoRef.current, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 800,
                transformOrigin: "center",
                duration: 0.3,
            });
        };

        const resetLogo = () => {
            gsap.to(logoRef.current, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power2.out" });
        };

        logoRef.current.addEventListener("mousemove", handleLogoMove);
        logoRef.current.addEventListener("mouseleave", resetLogo);

        // GitHub button tilt & neon glow
        const handleBtnMove = (e) => {
            const bounds = githubBtnRef.current.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            const rotateX = ((mouseY - centerY) / centerY) * 5;
            const rotateY = ((mouseX - centerX) / centerX) * 5;

            gsap.to(githubBtnRef.current, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 600,
                transformOrigin: "center",
                duration: 0.3,
            });
        };

        const resetBtn = () => {
            gsap.to(githubBtnRef.current, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
        };

        // Neon glow pulse
        gsap.to(githubBtnRef.current, {
            boxShadow: "0 0 20px rgba(34,197,94,0.7), 0 0 40px rgba(22,163,74,0.6)",
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "power1.inOut",
        });

        githubBtnRef.current.addEventListener("mousemove", handleBtnMove);
        githubBtnRef.current.addEventListener("mouseleave", resetBtn);

        return () => {
            if (logoRef.current) {
                logoRef.current.removeEventListener("mousemove", handleLogoMove);
                logoRef.current.removeEventListener("mouseleave", resetLogo);
            }
            if (githubBtnRef.current) {
                githubBtnRef.current.removeEventListener("mousemove", handleBtnMove);
                githubBtnRef.current.removeEventListener("mouseleave", resetBtn);
            }
        };
    }, []);

    return (
        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-16">
                {/* Logo */}
                <div ref={logoRef} className="passop-ultra relative flex items-center cursor-pointer select-none">
                    {logoText.map((char, idx) => (
                        <span
                            key={idx}
                            ref={(el) => (lettersRef.current[idx] = el)}
                            className={`text-2xl sm:text-3xl font-extrabold ${char.includes("Pass") ? "accent" : "text-white"} px-1`}
                        >
                            {char}
                        </span>
                    ))}
                    <span ref={dotRef} className="glow-dot ml-2"></span>
                </div>

                <button
                    ref={githubBtnRef}
                    className="relative flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    <img className="invert w-6 sm:w-7 p-0.5" src="/icons/github.svg" alt="github logo" />
                    <span className="px-1 sm:px-2">GitHub</span>
                    <span className="absolute inset-0 rounded-full bg-white/10 pointer-events-none blur-sm animate-pulse-glow"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
