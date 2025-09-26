"use client";
import React, { useEffect, useState } from "react";
import { Clock, Gift, Tag, Flame, ArrowRight, Share2 } from "lucide-react";

function CampaignDiscoveryCard({
    banner,
    brand,
    logo,
    title,
    desc,
    distance,
    reward,
    endsIn, // in days
    tag = "New", // New | Trending | High Reward
    onVisit = () => { },
}) {
    const [timeLeft, setTimeLeft] = useState("");
    const [isHotlisted, setIsHotlisted] = useState(false);
    const [animateFire, setAnimateFire] = useState(false);

    useEffect(() => {
        if (endsIn && endsIn > 0) {
            setTimeLeft(`Ends in ${endsIn} days`);
        } else {
            setTimeLeft("Expired");
        }
    }, [endsIn]);

    const handleHotlistClick = () => {
        setIsHotlisted((v) => !v);
        setAnimateFire(true);
        setTimeout(() => setAnimateFire(false), 600);
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                const shareData = {
                    title: title,
                    text: `${title} by ${brand}\n${distance} away\nReward: ${reward}`,
                    url: window.location.href, // link to campaign
                };

                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${title} - ${brand} (${distance} away)`);
                alert("Campaign details copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
            alert("Could not share the campaign.");
        }
    };


    const tagColors = {
        New: "bg-blue-500",
        Trending: "bg-orange-500",
        "High Reward": "bg-purple-600",
    };

    return (
        <div className="w-[280px] mt-10 shrink-0 mr-4 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 font-sans hover:shadow-xl transition-shadow duration-300">
            {/* Banner */}
            <div className="relative">
                <img src={banner} alt="Campaign Banner" className="h-48 w-full object-cover" />

                {/* Tag overlay */}
                <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-sm text-white text-xs font-semibold shadow-md ${tagColors[tag] || "bg-gray-500"
                        }`}
                >
                    {tag}
                </div>

                {/* Brand overlay */}
                <div className="absolute left-4 -bottom-6 flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-md">
                    <img src={logo} alt={`${brand} Logo`} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-semibold text-gray-800">{brand}</span>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pt-8 pb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{title}</h2>

                {/* Description */}
                {desc && <p className="text-sm text-gray-600 leading-tight mb-3">{desc}</p>}

                {/* Reward */}
                <div className="flex items-center gap-2 text-xs font-medium text-pink-600 bg-pink-50 px-3 py-1.5 rounded-sm border border-pink-100 w-fit">
                    <Gift className="w-3.5 h-3.5 text-pink-500" />
                    <span>{reward}</span>
                </div>

                {/* Distance + Ends In */}
                <div className="mt-4 flex flex-col gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                        <Tag className="w-3 h-3 text-gray-500" /> {distance} away from you
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full w-fit">
                        <Clock className="w-3 h-3 text-gray-500" /> {timeLeft}
                    </span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center gap-3">
                    {/* Visit Now button covering most space */}
                    <button
                        onClick={onVisit}
                        className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-sm font-medium shadow hover:bg-gray-900 transition duration-300"
                    >
                        Visit Now <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Hotlist circular button with fire animation */}
                    <div className="relative">
                        <button
                            onClick={handleHotlistClick}
                            aria-pressed={isHotlisted}
                            className={`flex items-center justify-center w-10 h-10 border rounded-full transition duration-300 focus:outline-none
                ${isHotlisted ? "bg-red-500 border-red-500 text-white" : "border-gray-300 text-red-500 hover:bg-gray-50"}`}
                            title={isHotlisted ? "Remove from hotlist" : "Add to hotlist"}
                        >
                            <Flame className="w-5 h-5" />
                        </button>

                        {/* Fire animation */}
                        {animateFire && (
                            <div className="absolute top-1/2 left-1/2 w-10 h-16 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <div className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-fire1"></div>
                                <div className="absolute w-2 h-2 bg-orange-400 rounded-full animate-fire2"></div>
                                <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-fire3"></div>
                            </div>
                        )}
                    </div>

                    {/* Share button */}
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center w-10 h-10 border rounded-full text-blue-600 border-gray-300 hover:bg-gray-50 transition duration-300"
                        title="Share Campaign"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>

                </div>
            </div>

            {/* Fire animation styles */}
            <style jsx>{`
        @keyframes fire1 {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(-8px,-20px) scale(0.5); opacity: 0; }
        }
        @keyframes fire2 {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(8px,-18px) scale(0.5); opacity: 0; }
        }
        @keyframes fire3 {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(0,-22px) scale(0.5); opacity: 0; }
        }

        .animate-fire1 { animation: fire1 0.6s ease-out forwards; }
        .animate-fire2 { animation: fire2 0.6s ease-out forwards; }
        .animate-fire3 { animation: fire3 0.6s ease-out forwards; }
      `}</style>
        </div>
    );
}

export default function OngoingCampaignsSlider() {
    const campaigns = [
        {
            banner: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
            brand: "Coffee Corner",
            logo: "https://img.icons8.com/color/96/coffee-to-go.png",
            title: "Off on Every Cappuccino",
            desc: "Enjoy your afternoon break — ₹20 off on every cappuccino.",
            reward: "Save up to ₹100 instantly",
            distance: "200m",
            endsIn: 3,
            tag: "Trending",
            onVisit: () => alert("Navigating to Coffee Corner campaign page..."),
        },
        {
            banner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
            brand: "Brewsters",
            logo: "https://img.icons8.com/color/96/barista.png",
            title: "Happy Hours Buy 1 Get 1",
            desc: "Bring a friend and enjoy buy 1 get 1 on selected drinks between 4-6pm.",
            reward: "Free Coffee",
            distance: "500m",
            endsIn: 5,
            tag: "High Reward",
            onVisit: () => alert("Navigating to Brewsters campaign page..."),
        },
    ];



    return (
        <div className="overflow-x-auto scrollbar-hide">
            <div className="flex pl-4">
                {campaigns.map((c, i) => (
                    <CampaignDiscoveryCard key={i} {...c} />
                ))}
                <div className="pr-4" />
            </div>
        </div>
    );
}