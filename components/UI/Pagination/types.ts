export interface PaginationProps {
  offset: number;
  limit: number;
  totalCount: number;
  loading: boolean;
  error: any;
  handlePageChange: (offset: number, limit?: number) => void;
  handleLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
