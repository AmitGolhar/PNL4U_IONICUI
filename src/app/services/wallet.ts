import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WalletMaster, TransactionMaster } from '../models/wallet.model';
 

@Injectable({ providedIn: 'root' })
export class WalletService {
  private dummyWallet: WalletMaster = {
    id: 1,
    userId: 101,
    balance: 850.75,
    loyaltyLevelId: 2,
    lastUpdated: new Date()
  };

  private dummyTransactions: TransactionMaster[] = [
    {
      id: 1,
      walletId: 1,
      amount: 100,
      type: 'CREDIT',
      description: 'Cashback from Club Infinity',
      date: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      walletId: 1,
      amount: 250,
      type: 'CREDIT',
      description: 'Referral bonus',
      date: new Date(Date.now() - 43200000)
    },
    {
      id: 3,
      walletId: 1,
      amount: 150,
      type: 'DEBIT',
      description: 'Redeemed for Drinks @ PNL Lounge',
      date: new Date()
    }
  ];

  constructor() {}

  getWallet(userId: number): Observable<WalletMaster> {
    return of(this.dummyWallet);
  }

  getTransactions(walletId: number): Observable<TransactionMaster[]> {
    return of(this.dummyTransactions);
  }

  redeemCashback(walletId: number, amount: number): Observable<WalletMaster> {
    // simulate balance deduction
    this.dummyWallet.balance -= amount;
    this.dummyWallet.lastUpdated = new Date();

    this.dummyTransactions.unshift({
      id: this.dummyTransactions.length + 1,
      walletId,
      amount,
      type: 'DEBIT',
      description: 'Redeemed cashback',
      date: new Date()
    });

    return of(this.dummyWallet);
  }
}
