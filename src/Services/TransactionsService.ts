import {
    AxiosError,
    AxiosInstance,
} from 'axios';
import axiosInstance from '../Client/AxiosInstance';
import { ApiResponse } from '../DTOs/ApiResponse.ts';
import TransactionsIndex from '../DTOs/Transaction/Response/TransactionsIndex.ts';
import TransactionsFilter, { DateRangeFilter } from '../DTOs/Transaction/Filter/TransactionsFilter.ts';
import CreateTransaction from '../DTOs/Transaction/Request/CreateTransaction.ts';
import UpdateTransaction from '../DTOs/Transaction/Request/UpdateTransaction.ts';
import Transaction from '../DTOs/Transaction/Transaction.ts';

class TransactionsService{
    private static instance: TransactionsService;
    private axios: AxiosInstance;

    private constructor(){
        this.axios = axiosInstance;
    }

    public static getInstance(): TransactionsService{
        if(!TransactionsService.instance){
            TransactionsService.instance = new TransactionsService();
        }
        return TransactionsService.instance;
    }

    public async getTransactions(filters?: TransactionsFilter): Promise<Transaction[]>{
        try{
            const response = await this.axios.get<ApiResponse<TransactionsIndex>>('/transactions', { data: filters },  // Changed from params to data to send in body
            );
            return response.data.data.transactions;
        }
        catch(error){
            throw this.handleError(error as AxiosError<API.ErrorResponse>);
        }
    }

    public async getTransactionsByDateRange(range: DateRangeFilter): Promise<Transaction[]>{
        const filters: TransactionsFilter = {
            date: range,
        };
        return this.getTransactions(filters);
    }

    public async getTransaction(id: number): Promise<Transaction>{
        try{
            const response = await this.axios.get<ApiResponse<Transaction>>(`/transactions/${id}`);
            return response.data.data;
        }
        catch(error){
            throw this.handleError(error as AxiosError<API.ErrorResponse>);
        }
    }

    public async createTransaction(transaction: CreateTransaction): Promise<Transaction>{
        try{
            const response = await this.axios.post<ApiResponse<Transaction>>('/transactions', transaction);
            return response.data.data;
        }
        catch(error){
            throw this.handleError(error as AxiosError<API.ErrorResponse>);
        }
    }

    public async updateTransaction(id: number, transaction: UpdateTransaction): Promise<Transaction>{
        try{
            const response = await this.axios.put<ApiResponse<Transaction>>(`/transactions/${id}`, transaction);
            return response.data.data;
        }
        catch(error){
            throw this.handleError(error as AxiosError<API.ErrorResponse>);
        }
    }

    public async deleteTransaction(id: number): Promise<void>{
        try{
            await this.axios.delete(`/transactions/${id}`);
        }
        catch(error){
            throw this.handleError(error as AxiosError<API.ErrorResponse>);
        }
    }

    private handleError(error: AxiosError<API.ErrorResponse>): Error{
        if(error.response){
            return new Error(error.response.data.details?.message || 'An error occurred');
        }
        return new Error('Network error occurred');
    }
}

export default TransactionsService;
