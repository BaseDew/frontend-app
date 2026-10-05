import React from 'react';


interface Account {
  id: number;
  userId: number;
  currency: string;
  funds: number;
  blockedFunds: number;
}

interface AccountDataType {
  data: Account;
}

const AccountData: React.FC<AccountDataType> = (accountData: AccountDataType) => {

    return (
        <div>
            <div>Currency: {accountData.data.currency}, Funds: {accountData.data.funds}, Blocked funds:{accountData.data.blockedFunds}</div>
        </div>
    );
};

export default AccountData;