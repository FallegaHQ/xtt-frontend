interface BaseResponse{
    status: number;
    message: string;
    timestamp: string;
    meta?: unknown[];
}

export interface ApiResponse<T> extends BaseResponse{
    data: T;
}
