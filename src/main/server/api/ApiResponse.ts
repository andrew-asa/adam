
export interface ApiResponse {
    method?: string;
    path?: string;
    action?: (ctx) => any;
    actions?: Set<ApiResponse>
}

