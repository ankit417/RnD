import React, { useState } from 'react';

import { ChooseIcon } from '../components/material-icon/choose-icon';

const TestingIcon = () => {
  const [svgElement, setSvg] = useState<string | null>(null);

  const SVG = (svg: string | null) => {
    setSvg(svg);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <ChooseIcon selectedSvg={SVG} />
      </div>
      {svgElement && (
        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 700, padding: 20, border: '1px solid', borderRadius: 10 }}>{svgElement}</div>
        </div>
      )}
    </div>
  );
};

export default TestingIcon;
