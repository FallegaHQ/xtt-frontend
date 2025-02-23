// noinspection JSUnusedGlobalSymbols

import { AxiosRequestConfig } from 'axios';

declare namespace API{

    export interface ErrorResponse extends BaseResponse{
        code: string;
        details?: Record<string, string>;
        validationErrors?: ValidationError[];
    }

    // Pagination Types
    export interface PaginationMeta{
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }

    export interface PaginationParams{
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }

    // Validation Types
    export interface ValidationError{
        field: string;
        message: string;
        code: string;
        value?: unknown;
    }

    // HTTP Client Types
    export interface RequestConfig extends Omit<AxiosRequestConfig, 'headers'>{
        headers?: Record<string, string>;
        skipAuth?: boolean;
        skipErrorHandler?: boolean;
        retryAttempts?: number;
    }

    // Service Configuration Types
    export interface ApiClientConfig{
        baseURL: string;
        timeout?: number;
        retryAttempts?: number;
        withCredentials?: boolean;
        defaultHeaders?: Record<string, string>;
    }

    // Entity Types
    export interface BaseEntity{
        id: number | string;
        createdAt: string;
        updatedAt: string;
    }

    export interface User extends BaseEntity{
        name: string;
        email: string;
    }

    export interface Transactionx extends BaseEntity{
        user: API.User;
        type: string;
        description: string;
        date: string;
        amount: string;
    }

    // Enum Types
    export type UserRole = 'admin' | 'user' | 'guest';
    export type UserStatus = 'active' | 'inactive' | 'suspended';

    // Custom Types
    export interface UserPreferences{
        theme: 'light' | 'dark' | 'system';
        notifications: boolean;
        language: string;
    }

    // Service Method Types
    export interface ServiceResponse<T>{
        data: T;
        error?: Error;
        meta?: {
            cache?: boolean; duration?: number;
        };
    }

    // Error Types
    export interface ApiError extends Error{
        code: string;
        status: number;
        response?: ErrorResponse;
    }

    // Utility Types
    export type QueryParams = Record<string, string | number | boolean | undefined>;

    export type WithPagination<T> = {
        items: T[]; meta: PaginationMeta;
    };

    export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

    // Generic Response Types
    export type ListResponse<T> = ApiResponse<T[]>;
    export type DetailResponse<T> = ApiResponse<T>;
    export type PaginatedResponse<T> = ApiResponse<WithPagination<T>>;
}

// Augment the Window interface to include global API configuration
declare global{
    interface Window{
        __API_CONFIG__?: {
            baseURL: string; version: string; environment: 'development' | 'staging' | 'production';
        };
    }
}

export = API;
export as namespace API;
