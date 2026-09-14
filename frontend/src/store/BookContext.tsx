import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import * as seed from "../data/seed";
import { uid } from "../lib/format";
import { wait } from "../services/api";
import type {
  Account,
  BankTxn,
  Bill,
  Customer,
  Expense,
  Invoice,
  JournalEntry,
  Organisation,
  Supplier,
  Transaction,
  TeamUser,
} from "../types";

interface BookState {
  org: Organisation;
  setOrg: (o: Organisation) => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (id: string, t: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  journals: JournalEntry[];
  addJournal: (j: Omit<JournalEntry, "id">) => Promise<void>;
  accounts: Account[];
  addAccount: (a: Omit<Account, "id">) => Promise<void>;
  updateAccount: (id: string, a: Partial<Account>) => Promise<void>;
  customers: Customer[];
  addCustomer: (c: Omit<Customer, "id">) => Promise<void>;
  updateCustomer: (id: string, c: Partial<Customer>) => Promise<void>;
  suppliers: Supplier[];
  addSupplier: (s: Omit<Supplier, "id">) => Promise<void>;
  invoices: Invoice[];
  addInvoice: (i: Omit<Invoice, "id">) => Promise<void>;
  updateInvoice: (id: string, i: Partial<Invoice>) => Promise<void>;
  bills: Bill[];
  expenses: Expense[];
  updateExpense: (id: string, e: Partial<Expense>) => Promise<void>;
  addExpense: (e: Omit<Expense, "id">) => Promise<void>;
  bankTxns: BankTxn[];
  matchBank: (id: string, bookRef: string) => Promise<void>;
  team: TeamUser[];
  addUser: (u: Omit<TeamUser, "id">) => Promise<void>;
}

const BookContext = createContext<BookState | null>(null);

export function BookProvider({ children }: { children: ReactNode }) {
  const [org, setOrg] = useState(seed.organisation);
  const [transactions, setTransactions] = useState(seed.transactions);
  const [journals, setJournals] = useState(seed.journals);
  const [accounts, setAccounts] = useState(seed.accounts);
  const [customers, setCustomers] = useState(seed.customers);
  const [suppliers, setSuppliers] = useState(seed.suppliers);
  const [invoices, setInvoices] = useState(seed.invoices);
  const [bills, setBills] = useState(seed.bills);
  const [expenses, setExpenses] = useState(seed.expenses);
  const [bankTxns, setBankTxns] = useState(seed.bankTxns);
  const [team, setTeam] = useState(seed.team);

  const value = useMemo<BookState>(
    () => ({
      org,
      setOrg,
      transactions,
      async addTransaction(t) {
        await wait();
        setTransactions((xs) => [{ ...t, id: uid("tx") }, ...xs]);
      },
      async updateTransaction(id, t) {
        await wait();
        setTransactions((xs) => xs.map((x) => (x.id === id ? { ...x, ...t } : x)));
      },
      async deleteTransaction(id) {
        await wait();
        setTransactions((xs) => xs.filter((x) => x.id !== id));
      },
      journals,
      async addJournal(j) {
        await wait();
        setJournals((xs) => [{ ...j, id: uid("je") }, ...xs]);
      },
      accounts,
      async addAccount(a) {
        await wait();
        setAccounts((xs) => [...xs, { ...a, id: uid("acc") }]);
      },
      async updateAccount(id, a) {
        await wait();
        setAccounts((xs) => xs.map((x) => (x.id === id ? { ...x, ...a } : x)));
      },
      customers,
      async addCustomer(c) {
        await wait();
        setCustomers((xs) => [{ ...c, id: uid("c") }, ...xs]);
      },
      async updateCustomer(id, c) {
        await wait();
        setCustomers((xs) => xs.map((x) => (x.id === id ? { ...x, ...c } : x)));
      },
      suppliers,
      async addSupplier(s) {
        await wait();
        setSuppliers((xs) => [{ ...s, id: uid("s") }, ...xs]);
      },
      invoices,
      async addInvoice(i) {
        await wait();
        setInvoices((xs) => [{ ...i, id: uid("inv") }, ...xs]);
      },
      async updateInvoice(id, i) {
        await wait();
        setInvoices((xs) => xs.map((x) => (x.id === id ? { ...x, ...i } : x)));
      },
      bills,
      expenses,
      async updateExpense(id, e) {
        await wait();
        setExpenses((xs) => xs.map((x) => (x.id === id ? { ...x, ...e } : x)));
      },
      async addExpense(e) {
        await wait();
        setExpenses((xs) => [{ ...e, id: uid("e") }, ...xs]);
      },
      bankTxns,
      async matchBank(id, bookRef) {
        await wait();
        setBankTxns((xs) => xs.map((x) => (x.id === id ? { ...x, matched: true, bookRef } : x)));
      },
      team,
      async addUser(u) {
        await wait();
        setTeam((xs) => [...xs, { ...u, id: uid("u") }]);
      },
    }),
    [org, transactions, journals, accounts, customers, suppliers, invoices, bills, expenses, bankTxns, team],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBook() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used within BookProvider");
  return ctx;
}
