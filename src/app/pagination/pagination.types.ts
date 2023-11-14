export type TPaginationProps = {
  tasksPerPage: number;
  totalTasks: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};
