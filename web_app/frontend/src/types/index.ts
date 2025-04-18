export type UserRole = 'super_admin' | 'admin' | 'manager' | 'employee' | 'guard' | 'visitor';
export type EmployeeType = 'privileged' | 'normal';
export type EntryType = 'employee' | 'material';
export type EntryStatus = 'pending' | 'approved' | 'rejected';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    location_id: number;
    manager_id?: number;
    employee_type?: EmployeeType;
    is_active: boolean;
}

export interface Location {
    id: number;
    name: string;
    address: string;
    is_active: boolean;
}

export interface Entry {
    id: number;
    entry_type: EntryType;
    user_id: number;
    location_id: number;
    entry_time: string;
    exit_time?: string;
    approved_by_id?: number;
    status: EntryStatus;
}

export interface MaterialEntry extends Entry {
    bill_number: string;
    material_type: string;
    quantity: number;
    unit: string;
    supplier_name: string;
    receiver_id: number;
    ocr_data?: any;
}

export interface OutPass {
    id: number;
    user_id: number;
    approved_by_id?: number;
    reason: string;
    requested_at: string;
    approved_at?: string;
    valid_until: string;
    status: EntryStatus;
} 