"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
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
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useAppKitAccount } from "@reown/appkit/react";
import { ActivePosition } from "@/app/page";
import { useSearchParams } from "next/navigation";
import CountDown from "./CountDown";

interface ActivePositionTableProps {
	positions: ActivePosition[];
	setShowWithDrawModal: Dispatch<SetStateAction<boolean>>;
	setModalType: Dispatch<SetStateAction<"withdraw" | "unstake">>;
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
						<ArrowUp className="h-3.5  w-3.5 text-muted-foreground/70" />
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

export function ActivePositionTable({
	positions,
	setShowWithDrawModal,
	setModalType,
}: ActivePositionTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const { isConnected, address } = useAppKitAccount();
	const searchParams = useSearchParams();

	const latestPosition = positions.filter(
		(position) => position.positionAddress === address
	);

	const handleUnstake = (positionId: string) => {
		setModalType("unstake");
		const params = new URLSearchParams(searchParams.toString());
		params.set("positionId", positionId);
		window.history.pushState({}, "", `?${params.toString()}`);
		setShowWithDrawModal(true);
	};
	//get latest position
	const userPosition = latestPosition.reduce((latest, current) => {
		return current.startTime > latest.startTime ? current : latest;
	}, latestPosition[0]);

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

				return <div className="font-medium">{amount}</div>;
			},
		},

		{
			accessorKey: "lockDuration",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="LockDuration" />
			),
			cell: ({ row }) => {
				const lockDuration = row.getValue("lockDuration") as string;
				const formatted = Math.floor(Number(lockDuration) / (60 * 60 * 24));
				return (
					<div className="font-medium">
						{formatted} {Number(formatted) > 1 ? "days" : "day"}
					</div>
				);
			},
		},
		{
			accessorKey: "startTime",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="StartTime" />
			),
			cell: ({ row }) => {
				const startTimeUnix = row.getValue("startTime") as number;
				if (!startTimeUnix) return <div className="font-medium">-</div>;

				const startTime = new Date(startTimeUnix * 1000);
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
				<DataTableColumnHeader column={column} title="Time Left" />
			),
			cell: ({ row }) => {
				const startTime = row.getValue("startTime") as number;
				const lockDuration = row.getValue("lockDuration") as number;

				if (!startTime || !lockDuration)
					return <div className="font-medium">-</div>;

				const endTime = new Date((startTime + lockDuration) * 1000);

				const formattedDate = endTime.toLocaleDateString("en-US", {
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
				const expectedYield = row.getValue("expectedYield") as number;
				return <div className="font-medium">{expectedYield.toFixed(8)}</div>;
			},
		},
		{
			accessorKey: "Actions",
			id: "actions",
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: ({ row }: CellContext<ActivePosition, any>) => {
				// =row data using row.original
				// const payment = row.original;

				return (
					<DropdownMenu modal={false}>
						{row.original.positionAddress === address ? (
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
						) : (
							"-"
						)}

						{row.original.positionAddress === address && (
							<DropdownMenuContent
								className="bg-[#1A1B1F]  text-white"
								align="end"
							>
								<Button
									onClick={() => handleUnstake(row.original.id)}
									type="button"
									variant={"default"}
									className="hover:bg-[#0E76FD] w-full"
								>
									Unstake
								</Button>
								<CountDown
									positionId={row.original.id}
									setShowWithDrawModal={setShowWithDrawModal}
									isConnected={isConnected}
									lockDuration={Number(userPosition.lockDuration)}
									startTime={userPosition.startTime}
								/>
							</DropdownMenuContent>
						)}
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data: positions,
		columns,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	const sortedRows = table.getSortedRowModel().rows;
	const currentPositionIndex = sortedRows.findIndex(
		(row) => row.original.positionAddress === address
	);

	// console.log(currentPositionIndex);
	return (
		<Card className="mt-6 bg-transparent border-none text-white">
			<CardContent className="px-0">
				<CardHeader>
					<CardTitle>All Active Positions</CardTitle>
				</CardHeader>
				<div className="rounded-md border border-white/20 w-full">
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
							{sortedRows?.length ? (
								<>
									{sortedRows.map((row) => (
										<TableRow
											key={row.id}
											className={cn("", {
												"bg-[#0E76FD80] hover:bg-[#0E76FD]":
													row.original.positionAddress === address,
											})}
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
									))}
									{currentPositionIndex >= 10 && (
										<TableRow
											key={sortedRows[currentPositionIndex].id}
											className="bg-[#0E76FD] hover:bg-[#0E76FD80]"
											data-state={
												sortedRows[currentPositionIndex].getIsSelected() &&
												"selected"
											}
										>
											{sortedRows[currentPositionIndex]
												.getVisibleCells()
												.map((cell) => {
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
									)}
								</>
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
						className={cn("text-white", {
							"bg-[#0E76FD]": table.getCanPreviousPage(),
						})}
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						className={cn("text-white", {
							"bg-[#0E76FD]": table.getCanNextPage(),
						})}
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
