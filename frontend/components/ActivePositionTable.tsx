"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	ArrowDown,
	ArrowUp,
	ChevronsUpDown,
	MoreHorizontal,
} from "lucide-react";
import {
	CellContext,
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
	Column,
} from "@tanstack/react-table";

interface ActivePosition {
	amount: string;
	lockDuration: string;
	startTime: number;
	timeLeft: number;
	expectedYield: string;
	Actions?: string;
}

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						{column.getIsSorted() === "desc" ? (
							<ArrowDown />
						) : column.getIsSorted() === "asc" ? (
							<ArrowUp />
						) : (
							<ChevronsUpDown />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
						Desc
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export function ActivePositionTable() {
	const [sorting, setSorting] = useState<SortingState>([]);

	const columns: ColumnDef<
		ActivePosition,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any
	>[] = [
		{
			accessorKey: "amount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Amount" />
			),
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"));
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(amount);

				return <div className="font-medium">{formatted}</div>;
			},
		},
		{
			accessorKey: "lockDuration",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="LockDuration" />
			),
			cell: ({ row }) => {
				const lockDuration = row.getValue("lockDuration") as string;
				return <div className="font-medium">{lockDuration}</div>;
			},
		},
		{
			accessorKey: "startTime",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="StartTime" />
			),
			cell: ({ row }) => {
				const startTime = new Date(row.getValue("startTime"));
				const formattedDate = startTime.toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});

				return <div className="font-medium">{formattedDate}</div>;
			},
		},
		{
			accessorKey: "timeLeft",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="TimeLeft" />
			),
			cell: ({ row }) => {
				const timeLeft = new Date(row.getValue("timeLeft"));
				const formattedDate = timeLeft.toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});

				return <div className="font-medium">{formattedDate}</div>;
			},
		},
		{
			accessorKey: "expectedYield",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="ExpectedYield" />
			),
			cell: ({ row }) => {
				const expectedYield = row.getValue("expectedYield") as string;
				return <div className="font-medium">{expectedYield}</div>;
			},
		},
		{
			accessorKey: "Actions",
			id: "actions",
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
			cell: ({ row }: CellContext<ActivePosition, any>) => {
				// access the row data using row.original
				// const payment = row.original;

				return (
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="bg-[#1A1B1F]  text-white"
							align="end"
						>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Unstake</DropdownMenuItem>
							<DropdownMenuItem>Withdraw</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
	const [allPositions] = useState([
		{
			amount: "1000",
			lockDuration: "30",
			startTime: Date.now() / 1000,
			timeLeft: 25,
			expectedYield: "25.5",
		},
		{
			amount: "500",
			lockDuration: "90",
			startTime: (Date.now() - 86400000) / 1000, // 1 day ago
			timeLeft: 89,
			expectedYield: "12.3",
		},
	]);

	const table = useReactTable({
		data: allPositions,
		columns,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});
	// State for positions
	// const [currentPosition, setCurrentPosition] = useState({
	// 	amount: "1000",
	// 	lockDuration: "30",
	// 	startTime: Date.now() / 1000,
	// 	timeLeft: 25,
	// 	expectedYield: "25.5",
	// });

	return (
		<Card className="mt-6 bg-transparent border-none text-white">
			<CardContent>
				<CardHeader>
					<CardTitle>All Active Positions</CardTitle>
				</CardHeader>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow className="hover:bg-transparent" key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => {
									// if user is not in top 10 show on the bottom else default position
									// if (row.getVisibleCells().includes(currentPosition.)) {
									// 	return (
									// 		<TableRow
									// 			className="bg-[#0E76FD]"
									// 			key={row.id}
									// 			data-state={row.getIsSelected() && "selected"}
									// 		>
									// 			{row.getVisibleCells().map((cell) => {
									// 				return (
									// 					<TableCell key={cell.id}>
									// 						{flexRender(
									// 							cell.column.columnDef.cell,
									// 							cell.getContext()
									// 						)}
									// 					</TableCell>
									// 				);
									// 			})}
									// 		</TableRow>
									// 	);
									// }
									return (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => {
												return (
													<TableCell key={cell.id}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				<div className="flex px-3 items-center justify-end space-x-2 py-4">
					<Button
						variant="default"
						className="text-white"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						className="text-white"
						variant="default"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
