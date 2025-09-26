"use client";
import React, { useState } from "react";
import { Bell, Flame, Forward, Gift, Tag } from "lucide-react";

function UpcomingLaunchCard({ banner, brand, logo, title, desc, reward, distance }) {
  const [notifyCount, setNotifyCount] = useState(0);
  const [isHotlisted, setIsHotlisted] = useState(false);
  const [animateFire, setAnimateFire] = useState(false);

  const handleHotlistClick = () => {
    setIsHotlisted(!isHotlisted);
    setAnimateFire(true);
    setTimeout(() => setAnimateFire(false), 500); // Fire animation duration
  };

  return (
    <div className="w-[280px] mt-10 shrink-0 mr-4 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 font-sans hover:shadow-xl transition-shadow duration-300">
      {/* Banner */}
      <div className="relative">
        <img
          src={banner}
          alt="Campaign Banner"
          className="h-48 w-full object-cover"
        />

        {/* Top tag overlay */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-sm bg-green-500 text-white text-xs font-semibold shadow-md">
          Upcoming
        </div>

        {/* Overlay brand logo */}
        <div className="absolute left-4 -bottom-6 flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-md">
          <img
            src={logo}
            alt={`${brand} Logo`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-800">{brand}</span>
        </div>

        {/* Forward button - right middle overlay */}
        <div className="absolute right-3 transform -translate-y-1/2">
          <button className="flex items-center justify-center p-3 rounded-full bg-white shadow hover:bg-gray-50 transition duration-300">
            <Forward className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-8 pb-6">
        {/* Title + Description */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{title}</h2>
        <p className="text-sm text-gray-600 leading-tight">{desc}</p>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {/* Reward */}
          <div className="flex items-center gap-1 text-xs font-medium text-pink-600 bg-pink-50 px-2.5 py-1.5 rounded-sm border border-pink-100">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>{reward}</span>
          </div>

          {/* Notify Count Tag */}
          <div className="flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-sm border border-indigo-100">
            <Tag className="w-3.5 h-3.5 text-gray-500" />
            <span>{notifyCount} people</span>
          </div>
        </div>

        {/* Distance tag */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <Tag className="w-3 h-3 text-gray-500" /> {distance} km away from you
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          {/* Notify Me button covering most space */}
          <button
            onClick={() => setNotifyCount(notifyCount + 1)}
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-sm font-medium shadow hover:bg-gray-900 transition duration-300"
          >
            <Bell className="w-4 h-4" /> Notify Me
          </button>

          {/* Hotlist circular button with fire animation */}
          <div className="relative">
            <button
              onClick={handleHotlistClick}
              className={`flex items-center justify-center w-10 h-10 border rounded-full transition duration-300
                ${isHotlisted ? "bg-red-500 border-red-500 text-white" : "border-gray-300 text-red-500 hover:bg-gray-50"}`}
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

  .animate-fire1 { animation: fire1 0.8s ease-out forwards; }
  .animate-fire2 { animation: fire2 0.8s ease-out forwards; }
  .animate-fire3 { animation: fire3 0.8s ease-out forwards; }
`}</style>

    </div>
  );
}

export default function UpcomingCampaignsSlider() {
  const campaigns = [
    {
      banner: '/image.jpg',
      brand: "Abcoffee",
      logo: "https://yt3.googleusercontent.com/1DWwsCrTUkkVC3kKojcMjLd7qrRGj8IZ5iuQ-rXI70VVx6NXAHIWppv3ReibMz0lWh6euqGL=s160-c-k-c0x00ffffff-no-rj",
      title: "Buy One Get One Free",
      desc: "Visit Abcoffee and get an instant discount on your favorite coffee.",
      reward: "Up to ₹50 off",
      distance: 1.2,
    },
    {
      banner: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
      brand: "Cafe Rio",
      logo: "https://img.icons8.com/color/96/cafe.png",
      title: "Latte Special",
      desc: "Flat ₹30 off on all lattes this season.",
      reward: "₹30 off",
      distance: 0.8,
    },
    {
      banner: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
      brand: "Mocha House",
      logo: "https://img.icons8.com/color/96/mocha.png",
      title: "Festive Coffee Combo",
      desc: "Order 2 and get 20% off on every festive combo pack.",
      reward: "Save ₹100",
      distance: 2.5,
    },
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex pl-4">
        {campaigns.map((c, i) => (
          <UpcomingLaunchCard key={i} {...c} />
        ))}
        <div className="pr-4" />
      </div>
    </div>
  );
}
