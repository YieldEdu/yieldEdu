import { lessonsInterface } from "@/data/lessons";
import { supabase } from "./server";

export const storeTransaction = async (transaction: {
	transaction_hash: string;
	owner: string;
	amount: number;
}) => {
	// First check if transaction already exists
	const { data: existingTx } = await supabase
		.from("transactions")
		.select()
		.eq("transactionHash", transaction.transaction_hash)
		.single();

	// If transaction already exists, return early
	if (existingTx) {
		return { data: existingTx, error: null };
	}

	// If transaction doesn't exist, insert it
	const { data, error } = await supabase
		.from("transactions")
		.insert({
			...transaction,
		})
		.single();

	return { data, error };
};

export const getTransactions = async () => {
	return supabase.from("transactions").select();
};

export const removeTransaction = async (
	transaction_hash: string,
	owner: string
) => {
	const { error } = await supabase
		.from("transactions")
		.delete()
		.eq("transaction_hash", transaction_hash)
		.eq("owner", owner);

	return { error };
};

export const addLesson = async (lesson: lessonsInterface[]) => {
	const { data, error } = await supabase.from("lessons").insert(lesson);
	if (error) {
		console.error("Error adding lesson:", error);
	} else {
		console.log("Lesson added:", data);
	}
};
