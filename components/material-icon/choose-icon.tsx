import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIconComponent } from '@material-ui/icons';
import * as icons from '@material-ui/icons';
import { renderToStaticMarkup } from 'react-dom/server';

import { ChooseIconWrapper, SelectedItemContainer } from './choose-icon.styles';
import { MaterialIcons } from './icons/material-icons-list';

interface ChooseIconProps {
  placeholder?: string;
  textFieldWidth?: number;
  textFieldVariant?: 'filled' | 'outlined' | 'standard';
}

interface IconProps {
  iconName: string;
}

const useStyles = makeStyles({
  option: {
    '& > span': {
      marginRight: 10,
    },
  },
});

const DEFAULT_PLACEHOLDER = 'Choose an Icon';
const WIDTH = 500;
const DEFAULT_TEXT_FIELD_VARIANT = 'standard';

export const ChooseIcon = ({ placeholder, textFieldWidth, textFieldVariant }: ChooseIconProps) => {
  const [selectedIconSvg, setIconSvg] = useState<string | null>(null);
  const styles = useStyles();

  const loadIcons = useCallback(async ({ iconName }: IconProps) => {
    try {
      const icon = await import(`@material-ui/icons/esm/${iconName}`);
      return icon;
    } catch (err) {
      const unknownIcon = await import('./default-icon');
      return unknownIcon;
    }
  }, []);

  const MaterialIconWrapper = useCallback((iconName: IconProps) => {
    const Icon = React.lazy(() => loadIcons(iconName));
    return <Icon />;
  }, []);

  const getSVG = useCallback((iconName: string): void => {
    if (!iconName) {
      return setIconSvg(null);
    }

    try {
      const IconComponent = (icons as React.ReactNode)[iconName] as SvgIconComponent;
      const iconSvgString = renderToStaticMarkup(<IconComponent />);

      if (!iconSvgString.includes('<svg')) {
        return setIconSvg(null);
      }

      setIconSvg(iconSvgString);
    } catch (err) {
      setIconSvg(null);
    }
  }, []);

  return (
    <ChooseIconWrapper>
      <SelectedItemContainer>
        {selectedIconSvg && <div dangerouslySetInnerHTML={{ __html: selectedIconSvg }} />}
      </SelectedItemContainer>
      <Autocomplete
        id="naterial-icons-list"
        style={{ width: textFieldWidth ?? WIDTH }}
        options={MaterialIcons}
        classes={{
          option: styles.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option}
        renderOption={(option) => (
          <>
            <span>
              <React.Suspense fallback={<div>Loading...</div>}>
                <MaterialIconWrapper iconName={option} />
              </React.Suspense>
            </span>
            {option}
          </>
        )}
        onChange={(_, value) => getSVG(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder ?? DEFAULT_PLACEHOLDER}
            variant={textFieldVariant ?? DEFAULT_TEXT_FIELD_VARIANT}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </ChooseIconWrapper>
  );
};
