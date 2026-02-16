export interface Member {
  id: string;
  member_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  role: string; // ADD THIS
  kyc_status?: string; // ADD THIS
  kyc_verified_at?: string; // ADD THIS
  date_of_birth: string;
  status: 'pending' | 'active' | 'suspended';
  registration_date: string;
}

export interface SavingsAccount {
  id: string;
  member_id: string;
  account_type: 'regular' | 'target';
  balance: number;
  target_amount?: number;
  target_date?: string;
  created_at: string;
  updated_at: string;
}

export interface SavingsTransaction {
  id: string;
  savings_account_id: string;
  transaction_type: 'deposit' | 'withdrawal';
  amount: number;
  balance_after: number;
  description: string;
  transaction_date: string;
}

export interface Loan {
  id: string;
  member_id: string;
  loan_type: 'personal' | 'business' | 'emergency' | 'educational';
  amount_requested: number;
  amount_approved?: number;
  interest_rate: number;
  duration_months: number;
  monthly_repayment?: number;
  outstanding_balance?: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'completed';
  purpose: string;
  application_date: string;
  approval_date?: string;
  disbursement_date?: string;
}

export interface LoanRepayment {
  id: string;
  loan_id: string;
  amount: number;
  payment_date: string;
  balance_after: number;
  payment_method: string;
  reference_number: string;
}

export interface Notification {
  id: string;
  member_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export interface AdminStats {
  members: {
    total: number;
    active: number;
    pending: number;
  };
  savings: {
    total: number;
    accounts: number;
  };
  loans: {
    pending: number;
    active: number;
    totalDisbursed: number;
    totalOutstanding: number;
  };
}

export interface MemberWithDetails extends Member {
  savingsBalance?: number;
  activeLoans?: number;
}

export interface PendingLoan extends Loan {
  member: {
    id: string;
    member_number: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export interface AdminActivity {
  id: string;
  admin_id: string;
  action: string;
  target_type: string;
  target_id: string;
  details: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
  admin?: {
    member_number: string;
    first_name: string;
    last_name: string;
  };
}