import React, { useState } from "react";

type Props = {
  delay?: number;
  direction?: string;
  children: React.ReactNode;
  content: string;
  roles: string[];
};
export default function Tooltip({ delay, children, direction, content, roles }: Props) {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div className={`tooltip ${direction || "top"}`}>
          {/* Content */}
          <span>{"You need a"}
                { roles.map( (role) => {
                  return <span className="highlight" key={role}>{role}</span>
                }) }
                {"account to access this content. Please use the link above to upgrade your subscription."}
                </span>
        </div>
      )}
      <style jsx>{`
        .highlight {
          font-weight: 600;
          color: white;
          margin: 0 0.25rem;
          padding: 0 0.25rem;
          background-color: Crimson;
        }
        /* Wrapping */
        .tooltip-wrapper {
          display: inline-block;
          position: relative;
        }
        
        /* Absolute positioning */
        .tooltip {
          min-width: 300px;
          // white-space: normal;
          position: absolute;
          display: flex;
          // border-radius: 4px;
          border: 2px solid Crimson;
          // left: 50%;
          // transform: translateX(-50%);
          padding: 0.5rem;
          color: black;
          background: LightSalmon;
          // font-size: 14px;
          // font-family: sans-serif;
          line-height: 1.5rem;
          z-index: 100;
          // white-space: nowrap;
        }
        
        /* CSS border triangles */
        .tooltip::before {
          content: " ";
          right: 30px;
          border: solid transparent;
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-width: 8px;
          margin-left: -8px;
        }
        
        /* Absolute positioning */
        .tooltip.top {
          bottom: 40px;
          right: 0px;
        }
        /* CSS border triangles */
        .tooltip.top::before {
          top: 100%;
          border-top-color: Crimson;
        }
        
      `}</style>
    </div>
  );
}
