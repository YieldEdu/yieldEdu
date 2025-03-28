/* eslint-disable @typescript-eslint/no-unused-vars */
export const GET = async () => {
	return Response.json({
		data: {},
		success: true,
	});
};

export const POST = async (request: Request) => {
	const body = await request.json();
	const { title, description, content } = body;

	if (!title || !description || !content) {
		return Response.json(
			{
				error: "Missing required fields",
				success: false,
			},
			{ status: 400 }
		);
	}

	try {
		// Here you would typically interact with your database
		// For now, returning a mock response
		return Response.json(
			{
				data: {
					id: Date.now(),
					title,
					description,
					content,
					createdAt: new Date().toISOString(),
				},
				success: true,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return Response.json(
			{
				error: "Failed to create lesson",
				success: false,
			},
			{ status: 500 }
		);
	}
};
