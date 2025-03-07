import { supabase } from "./server";

export const storeTransaction = async (transaction: {
	transactionHash: string;
	user_id: string;
}) => {
	// First check if transaction already exists
	const { data: existingTx } = await supabase
		.from("transactions")
		.select()
		.eq("transactionHash", transaction.transactionHash)
		.single();

	// If transaction already exists, return early
	if (existingTx) {
		return { data: existingTx, error: null };
	}

	// If transaction doesn't exist, insert it
	const { data, error } = await supabase
		.from("transactions")
		.insert(transaction)
		.single();

	return { data, error };
};

export const getStransactions = async () => {
	return supabase.from("transactions").select();
};
