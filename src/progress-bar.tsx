import React from 'react';
import { getTextLabelSize } from './get-text-label';

function renderBar(num: number, marker: string) {
  return (
    <div
      style={{ flexGrow: num }}
      className={`timebar-bar__bar-${marker} timebar-bar__bar`}
    >
      <div className="timebar-bar__bar-inner-text">
        {marker}:{num}
      </div>
    </div>
  );
}

export type Mode = 'page' | 'block' | 'query' | 'q';

function calculateTimeDiff(from: string, to: string, tz: number) {
  const fromHour = Number(from.split(':')[0]);
  const fromMinute = Number(from.split(':')?.[1] || '0');

  const toHour = Number(to.split(':')[0]);
  const toMinute = Number(to.split(':')?.[1] || '0');

  const totalFromMinutes = fromHour * 60 + fromMinute;
  const totalToMinutes = toHour * 60 + toMinute;
  const totalCurrentMinutes =
    new Date(Date.now() + tz * 60 * 60 * 1000).getHours() * 60 +
    new Date().getMinutes();

  const progress =
    (totalCurrentMinutes - totalFromMinutes) /
    (totalToMinutes - totalFromMinutes);

  return progress;
}

export function ProgressBar({
  from,
  to,
  mode,
}: {
  from?: number;
  to?: number;
  mode?: Mode;
}) {
  if (!from || !to) {
    return (
      <div className="timebar-bar">
        <div className="timebar-bar__target-not-found">
          Tracking target not found.
        </div>
      </div>
    );
  }

  const value = calculateTimeDiff(from.toString(), to.toString(), 0) * 100;

  const total = 100;
  const percentage = value === 0 ? `0` : ((value / total) * 100).toFixed(2);
  const shortText = `${percentage}%`;
  const fullText = `${mode}:${value}/${total}`;
  const [width] = getTextLabelSize(fullText);
  return (
    <div className="timebar-bar">
      <div className="timebar-bar__bars">
        {renderBar(value, 'fill')}
        {renderBar(total - value, 'empty')}
      </div>
      <div className="timebar-bar__label" style={{ width }}>
        <div className="timebar-bar__percentage-label">{shortText}</div>
        <div className="timebar-bar__fraction-label">{fullText}</div>
      </div>
    </div>
  );
}
