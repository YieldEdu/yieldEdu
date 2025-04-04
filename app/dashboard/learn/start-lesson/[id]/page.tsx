import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLesson, lessonsInterface } from "@/data/lessons";
import { ArrowLeft, Brain, BarChart3 } from "lucide-react";
import Link from "next/link";

interface CoursePageProps {
	params: {
		id: string;
	};
}

export default async function CoursePage({ params }: CoursePageProps) {
	// This would normally come from a database or API

	const course = await getLesson(await params.id);
	const courseData = course.data?.[0];

	const courseData2:lessonsInterface = {
	topics: [
		"Introduction to AI in Education",
		"Understanding AI Algorithms",
		"AI Tools for Learning",
		"Ethical Considerations in AI",
		"Future of AI in Education",
	],
	level: "Intermediate",
	sessions: 5,
	enrolled: 10,
	color: "#FF5733",
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
									{courseData?.title}
								</h1>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-xl font-bold mb-4 text-primary flex items-center">
									<Brain className="h-5 w-5 mr-2" /> Course Overview
								</h2>

								<p className="text-gray-300 mb-6">{courseData?.description}</p>

								<div className="bg-slate-100 dark:bg-slate-900/50  border-slate-200 dark:border-slate-700 rounded-lg p-4 border border-border/10 mb-6">
									<h3 className="font-bold mb-2 text-secondary">
										What You&apos;ll Learn
									</h3>
									<ul className="space-y-3">
										{/* {courseData.topics.map((topic, index) => (
											<li key={index} className="flex items-start">
												<div
													className="mr-3 mt-1 h-5 w-5 bg-[#1a0b2e]/80 rounded-full flex items-center justify-center text-xs"
													style={{ color: courseData.color }}
												>
													{index + 1}
												</div>
												<span>{topic}</span>
											</li>
										))} */}
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
										natural dialogue, receive real-time feedback upon
										completion.
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
