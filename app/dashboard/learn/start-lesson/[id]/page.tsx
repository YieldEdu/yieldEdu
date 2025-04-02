import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Brain, BarChart3 } from "lucide-react";
import Link from "next/link";

interface CoursePageProps {
	params: {
		slug: string;
	};
}

export default function CoursePage({ params }: CoursePageProps) {
	// This would normally come from a database or API
	const courseData = {
		"web3-fundamentals": {
			title: "Web3 Fundamentals",
			description:
				"Learn the core concepts of blockchain, smart contracts, and decentralized applications.",
			level: "Beginner",
			sessions: 4,
			enrolled: 1245,
			icon: <Brain className="h-16 w-16 text-primary" />,
			topics: [
				"Blockchain Architecture",
				"Consensus Mechanisms",
				"Smart Contract Basics",
				"Web3 Applications",
			],
			color: "rgb(var(--primary))",
		},
		"cryptography-basics": {
			title: "Cryptography Basics",
			description:
				"Master the principles of cryptography that power blockchain security and privacy.",
			level: "Intermediate",
			sessions: 3,
			enrolled: 876,
			icon: <Brain className="h-16 w-16 text-secondary" />,
			topics: [
				"Public & Private Keys",
				"Hash Functions",
				"Digital Signatures",
				"Zero-Knowledge Proofs",
			],
			color: "rgb(var(--secondary))",
		},
		"dao-governance": {
			title: "DAO Governance",
			description:
				"Understand how decentralized autonomous organizations operate and make decisions.",
			level: "Advanced",
			sessions: 5,
			enrolled: 542,
			icon: <Brain className="h-16 w-16 text-accent" />,
			topics: [
				"DAO Structures",
				"Voting Mechanisms",
				"Treasury Management",
				"Governance Proposals",
				"Legal Considerations",
			],
			color: "rgb(var(--accent))",
		},
	}[params.slug] || {
		title: "Course Not Found",
		description: "This course does not exist.",
		level: "N/A",
		sessions: 0,
		enrolled: 0,
		icon: <Brain className="h-16 w-16 text-gray-400" />,
		topics: [],
		color: "#84cc16 ",
	};

	return (
		<div className="min-h-screen text-foreground overflow-hidden relative">
			<main className="container mx-auto px-4 relative z-10">
				<div className="mb-8">
					<Link
						href="/dashboard/learn"
						className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
					>
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
					</Link>

					<Card className="relative overflow-hidden dark:bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm p-8  border-border/20 mb-8">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
							<div>
								<h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
									{courseData.title}
								</h1>
								<div className="flex flex-wrap gap-3">
									<span className="text-gray-400">Student: 0x7a...3f9b</span>
									<span className="text-gray-400">Date: March 22, 2025</span>
								</div>
							</div>

							<div className="mt-4 md:mt-0 flex items-center">
								<div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-2xl font-bold mr-4">
									{courseData.enrolled > 0
										? Math.floor(Math.random() * 30) + 70
										: 0}
								</div>
								<div>
									<div
										className="text-lg font-bold"
										style={{ color: courseData.color }}
									>
										Score
									</div>
									<div className="flex items-center text-primary">
										<div className="h-2 w-2 rounded-full bg-primary mr-1"></div>{" "}
										In Progress
									</div>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-xl font-bold mb-4 text-primary flex items-center">
									<Brain className="h-5 w-5 mr-2" /> Course Overview
								</h2>

								<p className="text-gray-300 mb-6">{courseData.description}</p>

								<div className="bg-slate-100 dark:bg-slate-900/50  border-slate-200 dark:border-slate-700 rounded-lg p-4 border border-border/10 mb-6">
									<h3 className="font-bold mb-2 text-secondary">
										What You&apos;ll Learn
									</h3>
									<ul className="space-y-3">
										{courseData.topics.map((topic, index) => (
											<li key={index} className="flex items-start">
												<div
													className="mr-3 mt-1 h-5 w-5 bg-[#1a0b2e]/80 rounded-full flex items-center justify-center text-xs"
													style={{ color: courseData.color }}
												>
													{index + 1}
												</div>
												<span>{topic}</span>
											</li>
										))}
									</ul>
								</div>
							</div>

							<div>
								<h2 className="text-xl font-bold mb-4 text-secondary flex items-center">
									<BarChart3 className="h-5 w-5 mr-2" /> Course Details
								</h2>

								<div className="space-y-4 mb-6">
									<div className="bg-slate-100 dark:bg-slate-900/50  border-slate-200 dark:border-slate-700 rounded-lg p-4 border border-border/10">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<p className="text-sm text-gray-400">Level</p>
												<p
													className="font-medium"
													style={{ color: courseData.color }}
												>
													{courseData.level}
												</p>
											</div>
											<div>
												<p className="text-sm text-gray-400">Sessions</p>
												<p
													className="font-medium"
													style={{ color: courseData.color }}
												>
													{courseData.sessions}
												</p>
											</div>
											<div>
												<p className="text-sm text-gray-400">Enrolled</p>
												<p
													className="font-medium"
													style={{ color: courseData.color }}
												>
													{courseData.enrolled}
												</p>
											</div>
											<div>
												<p className="text-sm text-gray-400">Token Reward</p>
												<p
													className="font-medium"
													style={{ color: courseData.color }}
												>
													250 LEARN
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="bg-slate-100 dark:bg-slate-900/50  border-slate-200 dark:border-slate-700 rounded-lg p-4 border border-border/10">
									<h3 className="font-bold mb-3 text-primary">
										How This Course Works
									</h3>
									<p className="text-gray-300 mb-4">
										This course is delivered through interactive conversations
										with our specialized AI mentor. You&apos;ll engage in
										natural dialogue, receive real-time feedback, and earn
										verifiable credentials upon completion.
									</p>

									<Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-background font-medium py-6 text-lg">
										Start the Session
									</Button>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</main>
		</div>
	);
}
