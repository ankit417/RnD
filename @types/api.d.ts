declare namespace Api {
  interface GetLaunchServiceProps {
    limit: number;
  }

  type Launch = {
    links: { patch: { small: string } };
    success: boolean;
    failures: Array<{ time: number; altitude: string | number | null; reason: string }> | [];
    details: string | null;
    payloads: Array<{ name: string; type: string; id: string }>;
    name: string;
    date_utc: string;
    cores: Array<{ core: { serial: string; id?: string } }>;
    id: string;
  };

  interface LaunchResponse {
    docs: Array<Launch>;
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
  }
}
