import BaseModel from './BaseModel.ts';

interface DatedModel extends BaseModel{
    created_at?: string;
    updated_at?: string;
}

export default DatedModel;
