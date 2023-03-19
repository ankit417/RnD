import { useEffect, useState, useCallback } from 'react';

import { BASE_URL } from './api.config';
import { getLaunchOption } from './helper/launchOption.helper';

export const useLaunchData = ({ limit }: Api.GetLaunchServiceProps): { launchData?: Api.LaunchResponse } => {
  const [launchData, setlaunchData] = useState<Api.LaunchResponse>();

  const options = getLaunchOption(limit);
  const query = {
    success: {
      $in: [true, false],
    },
  };

  const fetchLaunch = useCallback(async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          query,
          options,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setlaunchData(data);
    } catch (error) {
      console.error(error);
    }
  }, [limit]);

  useEffect(() => {
    fetchLaunch();
  }, [fetchLaunch]);

  return { launchData };
};
