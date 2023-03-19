export function getLaunchOption(limit: number) {
  return {
    limit: limit,
    sort: {
      date_utc: 'asc',
    },
    select: ['links.patch.small', 'name', 'date_utc', 'success', 'failures', 'details'],
    populate: [
      {
        path: 'payloads',
        select: ['type', 'name'],
      },
      {
        path: 'cores.core',
        select: ['serial'],
      },
      {
        path: 'failures',
        select: ['reason'],
      },
    ],
  };
}
