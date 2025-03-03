export interface TableConfig {
    headers: ColumnConfig[]
    currentByDefault: OrderBy | undefined;
    pagination: PaginationConfig;
    actions?: actionsConfig;
};

export interface ColumnConfig{
    key: string;
    columnName: string;
    type: 'String' | 'Number' | 'Date';
    ordinable?: boolean;
    filtrable?: boolean;
}

export interface OrderBy{
    key: string;
    orderby: 'asc' | 'desc';
}

export interface PaginationConfig{
    itemsPerPage: number;
    currentPage: number; 
}

export interface actionsConfig {
    actions: {
      name: string; 
      visible?: (row: any) => boolean;
    }[];
  }