"use client";

import React, { useEffect, useState } from "react";

export const HeroVideo = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after component is rendered on the client
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render nothing on the server to avoid hydration mismatch
    return null;
  }

  return (
    <div className="flex justify-center">
      <video
        src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4"
        className="max-w-4xl"
        controls={false}
        muted
        autoPlay
        loop
      />
    </div>
  );
};
