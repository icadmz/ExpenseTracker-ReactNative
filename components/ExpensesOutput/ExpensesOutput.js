import { View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'New Balance shoes',
        amount: 5000.00,
        date: new Date('2025-01-02')
    },
    {
        id: 'e2',
        description: 'Spy x Family manga volumes 1-3',
        amount: 1200.00,
        date: new Date('2025-10-26')
    },
    {
        id: 'e3',
        description: 'Birthday cakes',
        amount: 1220.00,
        date: new Date('2025-10-28')
    },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View>
            <ExpensesSummary 
                expenses={DUMMY_EXPENSES}
                periodName={expensesPeriod}
            />
            <ExpensesList 
                expenses={DUMMY_EXPENSES}
                
            />
        </View>
    );
}

export default ExpensesOutput;