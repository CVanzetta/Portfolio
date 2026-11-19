import React from 'react';

export default function WindowBar({ title, detail }) {
  return <div className="window-titlebar">
    <span className="window-name"><i aria-hidden="true"/>{title}</span>
    {detail && <span className="window-detail">{detail}</span>}
    <span className="window-chrome" aria-hidden="true"><i>–</i><i>□</i></span>
  </div>;
}
