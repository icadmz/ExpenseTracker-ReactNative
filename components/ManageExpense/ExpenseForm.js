import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UserInterface/Button";
import { useState } from "react";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value, // + converts it to a number since it's automatically a string
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = (expenseData.description || '').trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((currentInputs) => {
                return {
                    amount: {
                        value: currentInputs.amount.value, 
                        isValid: amountIsValid
                    },
                    date: {
                        value: currentInputs.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: currentInputs.description.value,
                        isValid: descriptionIsValid
                    }
                };
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = 
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRows}>
                <Input 
                    style={styles.rowInput}
                    label="Amount" 
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input 
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>   
            <Input 
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>The data you have entered is invalid. Please retry.</Text>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    mode="flat"
                    onPress={onCancel}
                    style={styles.button}
                >
                    Cancel
                </Button>
                <Button
                    onPress={submitHandler}
                    style={styles.button}
                >
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRows: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});